import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import serviceAccount from "../../../halolearn-service-account.json"

export async function POST(req: NextRequest) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount as any,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    // Set header row
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
