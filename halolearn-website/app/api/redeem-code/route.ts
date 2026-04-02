import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCodes, markCodeUsed, grantUserAccess, ALL_ROLES } from '@/app/lib/sheets';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Login dulu ya' }, { status: 401 });
    }

    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: 'Kode wajib diisi' }, { status: 400 });

    const codes = await getCodes();
    const codeEntry = codes.find(c => c.code === code.toUpperCase().trim());

    if (!codeEntry) return NextResponse.json({ error: 'Kode tidak ditemukan. Pastikan kode benar.' }, { status: 404 });
    if (codeEntry.used) return NextResponse.json({ error: 'Kode sudah pernah digunakan.' }, { status: 400 });
    if (codeEntry.expiresAt && new Date(codeEntry.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'Kode sudah kadaluarsa.' }, { status: 400 });
    }

    await markCodeUsed(codeEntry.code, session.user.email);

    const roles = codeEntry.role === 'all' ? ALL_ROLES : [codeEntry.role];
    await grantUserAccess(session.user.email, roles);

    return NextResponse.json({ success: true, role: codeEntry.role, roles });
  } catch (e) {
    console.error('redeem error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
