import { NextRequest, NextResponse } from 'next/server';
import { redeemResourceCode } from '@/app/lib/resources';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, name, email } = body as { code?: string; name?: string; email?: string };

    if (!code || !name || !email) {
      return NextResponse.json(
        { success: false, error: 'Nama, email, dan kode wajib diisi.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid.' },
        { status: 400 },
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Nama terlalu pendek.' },
        { status: 400 },
      );
    }

    const result = await redeemResourceCode({
      code: code.trim(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('redeem error', err);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan. Coba lagi.' },
      { status: 500 },
    );
  }
}
