import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

export async function POST(req: NextRequest) {
  try {
    const { name, email, page, targetRole } = await req.json()

    // Parse entire service account JSON from env
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
    if (!serviceAccountJson) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not set")
    }

    const credentials = JSON.parse(serviceAccountJson)

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    const now = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })

    await sheets.spreadsheets.values.append({
      spreadsheetId: "1fucZVGkRIP-LQzYKlqe0lOMgmkxqxHP4TbNQ_3oFVv8",
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name || "-", email || "-", now, page || "-", targetRole || "-", "Google OAuth"]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Sheets error:", error)
    return NextResponse.json({ error: "Failed", details: String(error) }, { status: 500 })
  }
}
