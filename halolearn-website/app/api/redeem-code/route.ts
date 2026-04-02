import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { codesStore, userAccessStore, ALL_ROLES } from '@/app/lib/store';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Login dulu ya' }, { status: 401 });
    }

    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: 'Kode wajib diisi' }, { status: 400 });

    const codeIdx = codesStore.findIndex((c) => c.code === code.toUpperCase().trim());
    if (codeIdx === -1) return NextResponse.json({ error: 'Kode tidak ditemukan. Pastikan kode benar.' }, { status: 404 });

    const codeEntry = codesStore[codeIdx];
    if (codeEntry.used) return NextResponse.json({ error: 'Kode sudah pernah digunakan.' }, { status: 400 });
    if (codeEntry.expiresAt && new Date(codeEntry.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'Kode sudah kadaluarsa.' }, { status: 400 });
    }

    // Mark code as used
    codesStore[codeIdx].used = true;
    codesStore[codeIdx].email = session.user.email;

    // Grant access
    const role = codeEntry.role;
    const roles = role === 'all' ? ALL_ROLES : [role];
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const userIdx = userAccessStore.findIndex((u) => u.email === session.user!.email);
    if (userIdx === -1) {
      userAccessStore.push({ email: session.user.email, roles, purchasedAt: new Date().toISOString(), expiresAt: expiresAt.toISOString() });
    } else {
      userAccessStore[userIdx].roles = [...new Set([...userAccessStore[userIdx].roles, ...roles])];
    }

    return NextResponse.json({ success: true, role: codeEntry.role, roles });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
