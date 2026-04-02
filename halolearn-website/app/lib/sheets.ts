import { google } from 'googleapis';

const SHEET_ID = '13pJIayjqsfeuiuDo7rQiIoAOsZHKoV-7Y0Swb9OMf24';
const CODES_RANGE = 'Sheet1';
const ACCESS_RANGE = 'UserAccess';

export const ALL_ROLES = ['management-trainee', 'akuntansi', 'admin', 'human-resources', 'odp-bank'];

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export interface CodeEntry {
  code: string;
  role: string;
  email: string;
  used: boolean;
  createdAt: string;
  expiresAt: string;
  usedAt: string;
}

export interface UserAccess {
  email: string;
  roles: string[];
  expiresAt: string;
}

export async function getCodes(): Promise<CodeEntry[]> {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${CODES_RANGE}!A2:G`,
    });
    const rows = res.data.values || [];
    return rows.map(r => ({
      code: r[0] || '',
      role: r[1] || '',
      email: r[2] || '',
      used: r[3] === 'TRUE',
      createdAt: r[4] || '',
      expiresAt: r[5] || '',
      usedAt: r[6] || '',
    })).filter(c => c.code);
  } catch { return []; }
}

export async function addCode(entry: CodeEntry): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${CODES_RANGE}!A:G`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[entry.code, entry.role, entry.email, entry.used ? 'TRUE' : 'FALSE', entry.createdAt, entry.expiresAt, entry.usedAt]] },
  });
}

export async function markCodeUsed(code: string, email: string): Promise<boolean> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  
  // Find row
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `${CODES_RANGE}!A:G` });
  const rows = res.data.values || [];
  const rowIdx = rows.findIndex(r => r[0] === code);
  if (rowIdx < 1) return false; // not found (row 0 is header)
  
  // Update row (rowIdx + 1 because sheets is 1-indexed)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${CODES_RANGE}!D${rowIdx + 1}:G${rowIdx + 1}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [['TRUE', rows[rowIdx][4], rows[rowIdx][5], new Date().toISOString()]] },
  });
  
  // Update email
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${CODES_RANGE}!C${rowIdx + 1}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[email]] },
  });
  
  return true;
}

export async function getUserAccess(email: string): Promise<string[]> {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    // Try to get UserAccess sheet
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${ACCESS_RANGE}!A2:C`,
    });
    const rows = res.data.values || [];
    const userRow = rows.find(r => r[0] === email);
    if (!userRow) return [];
    return (userRow[1] || '').split(',').filter(Boolean);
  } catch { return []; }
}

export async function grantUserAccess(email: string, roles: string[]): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${ACCESS_RANGE}!A:C`,
    });
    const rows = res.data.values || [];
    const rowIdx = rows.findIndex(r => r[0] === email);
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    
    if (rowIdx < 1) {
      // New user
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${ACCESS_RANGE}!A:C`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[email, roles.join(','), expiresAt.toISOString()]] },
      });
    } else {
      // Update existing
      const existing = (rows[rowIdx][1] || '').split(',').filter(Boolean);
      const merged = [...new Set([...existing, ...roles])];
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${ACCESS_RANGE}!B${rowIdx + 1}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [[merged.join(',')]] },
      });
    }
  } catch (e) {
    console.error('grantUserAccess error:', e);
  }
}
