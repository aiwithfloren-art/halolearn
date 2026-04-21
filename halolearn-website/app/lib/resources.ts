import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// ─── Config ───────────────────────────────────────────────────────────────────

export type ResourceConfig = {
  id: string;
  title: string;
  pdfPath: string;
  paidPrice: number;
};

export const RESOURCES: Record<string, ResourceConfig> = {
  'ats10': {
    id: 'ats10',
    title: '10 ATS Keyword Banking',
    pdfPath: '/resources/Halolearn-10-ATS-Keyword-Banking-FREE.pdf',
    paidPrice: 30000,
  },
};

// Hardcoded codes — no separate codes database. Each code has a max-uses cap.
export const RESOURCE_CODES: Record<string, { resource: string; maxUses: number }> = {
  'HALOLEARN-ATS10-FREE50': { resource: 'ats10', maxUses: 50 },
};

// ─── Google Sheets Helpers ────────────────────────────────────────────────────

function cleanEnvValue(value?: string | null) {
  return value
    ?.replace(/^"|"$/g, '')
    .replace(/\\n+$/g, '')
    .replace(/\\r+$/g, '')
    .trim();
}

const SHEET_ID =
  cleanEnvValue(process.env.HALOLEARN_CODES_SHEET_ID) ||
  cleanEnvValue(process.env.GOOGLE_SHEETS_SPREADSHEET_ID) ||
  '13pJIayjqsfeuiuDo7rQiIoAOsZHKoV-7Y0Swb9OMf24';

// Dedicated tab for resource redemptions. Create this tab manually in the sheet.
const RESOURCE_LOG_RANGE = 'Resources';

function parseServiceAccountJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    const normalized = raw.replace(
      /"private_key"\s*:\s*"([\s\S]*?)"\s*,\s*"client_email"/,
      (_match, keyBody) => {
        const escapedKeyBody = keyBody
          .replace(/\\r/g, '')
          .replace(/\r/g, '')
          .replace(/\n/g, '\\n')
          .replace(/\t/g, '\\t')
          .replace(/"/g, '\\"');
        return `"private_key":"${escapedKeyBody}","client_email"`;
      },
    );
    return JSON.parse(normalized);
  }
}

function getCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return parseServiceAccountJson(cleanEnvValue(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) || '');
  }
  const localServiceAccountPath = path.join(process.cwd(), 'halolearn-service-account.json');
  if (fs.existsSync(localServiceAccountPath)) {
    return JSON.parse(fs.readFileSync(localServiceAccountPath, 'utf8'));
  }
  throw new Error('Google service account not configured');
}

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: getCredentials(),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

/**
 * Ensure "Resources" tab exists. If not, create it with headers.
 */
async function ensureResourcesTab() {
  const sheets = await getSheetsClient();
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const tabs = meta.data.sheets?.map((s) => s.properties?.title) || [];

  if (tabs.includes(RESOURCE_LOG_RANGE)) return;

  // Create tab
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: { title: RESOURCE_LOG_RANGE },
          },
        },
      ],
    },
  });

  // Add header row
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${RESOURCE_LOG_RANGE}!A1:E1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [['code', 'resource_id', 'name', 'email', 'redeemed_at']],
    },
  });
}

// ─── Core Logic ───────────────────────────────────────────────────────────────

export type RedeemResult = {
  success: boolean;
  pdfUrl?: string;
  remaining?: number;
  error?: string;
};

export type RedemptionLog = {
  code: string;
  resourceId: string;
  name: string;
  email: string;
  redeemedAt: string;
};

/**
 * Count existing redemptions for a specific code.
 * Sheet structure: code | resource_id | name | email | redeemed_at
 */
async function countRedemptions(code: string): Promise<number> {
  try {
    await ensureResourcesTab();
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${RESOURCE_LOG_RANGE}!A2:A`,
    });
    const rows = res.data.values || [];
    return rows.filter((r) => r[0] === code).length;
  } catch (err) {
    console.error('countRedemptions error', err);
    return 0;
  }
}

/**
 * Check if email already redeemed this code (prevent double-redeem).
 */
async function emailAlreadyRedeemed(code: string, email: string): Promise<boolean> {
  try {
    await ensureResourcesTab();
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${RESOURCE_LOG_RANGE}!A2:D`,
    });
    const rows = res.data.values || [];
    return rows.some((r) => r[0] === code && (r[3] || '').toLowerCase() === email.toLowerCase());
  } catch {
    return false;
  }
}

async function appendRedemption(log: RedemptionLog): Promise<void> {
  await ensureResourcesTab();
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${RESOURCE_LOG_RANGE}!A:E`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[log.code, log.resourceId, log.name, log.email, log.redeemedAt]],
    },
  });
}

export async function redeemResourceCode(params: {
  code: string;
  name: string;
  email: string;
}): Promise<RedeemResult> {
  const code = params.code.trim().toUpperCase();
  const codeConfig = RESOURCE_CODES[code];

  if (!codeConfig) {
    return { success: false, error: 'Kode tidak valid.' };
  }

  const resource = RESOURCES[codeConfig.resource];
  if (!resource) {
    return { success: false, error: 'Resource tidak ditemukan.' };
  }

  // Check if email already redeemed
  const already = await emailAlreadyRedeemed(code, params.email);
  if (already) {
    return {
      success: true,
      pdfUrl: resource.pdfPath,
      remaining: 0,
    };
  }

  // Check slot availability
  const currentCount = await countRedemptions(code);
  if (currentCount >= codeConfig.maxUses) {
    return {
      success: false,
      error: `Kode sudah habis — ${codeConfig.maxUses}/${codeConfig.maxUses} slot terpakai. Kamu bisa tetap akses dengan beli langsung Rp ${resource.paidPrice.toLocaleString('id-ID')}.`,
    };
  }

  // Append redemption log
  try {
    await appendRedemption({
      code,
      resourceId: resource.id,
      name: params.name,
      email: params.email,
      redeemedAt: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('appendRedemption error:', message);
    return {
      success: false,
      error: `Gagal simpan data. ${message.slice(0, 120)}`,
    };
  }

  return {
    success: true,
    pdfUrl: resource.pdfPath,
    remaining: codeConfig.maxUses - currentCount - 1,
  };
}
