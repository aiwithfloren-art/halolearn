import { NextResponse } from "next/server"
import { google } from "googleapis"
import fs from "fs"
import path from "path"

function cleanEnvValue(value?: string | null) {
  return value
    ?.replace(/^"|"$/g, '')
    .replace(/\\n+$/g, '')
    .replace(/\\r+$/g, '')
    .trim();
}

function getCredentials() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(cleanEnvValue(process.env.GOOGLE_SERVICE_ACCOUNT_JSON) || '');
  }

  const localPath = path.join(process.cwd(), 'halolearn-service-account.json');
  if (fs.existsSync(localPath)) {
    return JSON.parse(fs.readFileSync(localPath, 'utf8'));
  }

  throw new Error('Google service account not configured');
}

export async function POST() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: getCredentials(),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    await sheets.spreadsheets.values.update({
      spreadsheetId: "1fucZVGkRIP-LQzYKlqe0lOMgmkxqxHP4TbNQ_3oFVv8",
      range: "Sheet1!A1:F1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["Nama", "Email", "Tanggal & Waktu", "Halaman", "Target Role", "Sumber Login"]],
      },
    })

    return NextResponse.json({ success: true, message: "Headers initialized" })
  } catch (error) {
    console.error("Sheets init error:", error)
    return NextResponse.json({ error: "Failed to initialize sheets" }, { status: 500 })
  }
}
