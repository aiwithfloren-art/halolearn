import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { codesStore, CodeEntry } from '@/app/lib/store';

const ADMIN_EMAIL = 'aiwithfloren@gmail.com';

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'HL-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { role } = await req.json();
    if (!role) return NextResponse.json({ error: 'Role required' }, { status: 400 });

    let newCode = generateCode();
    while (codesStore.find((c) => c.code === newCode)) newCode = generateCode();

    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const entry: CodeEntry = { code: newCode, role, email: null, expiresAt: expiresAt.toISOString(), used: false, createdAt: new Date().toISOString() };
    codesStore.push(entry);

    return NextResponse.json({ success: true, code: newCode, role });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ codes: codesStore });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { code, email } = await req.json();
    const idx = codesStore.findIndex((c) => c.code === code);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    codesStore[idx].used = true;
    if (email) codesStore[idx].email = email;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
