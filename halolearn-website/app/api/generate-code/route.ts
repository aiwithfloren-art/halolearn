import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const ADMIN_EMAIL = 'aiwithfloren@gmail.com';

// In-memory store (resets on cold start, but works for Vercel serverless)
// For production, use Vercel KV or external DB
let codesStore: Array<{
  code: string;
  role: string;
  email: string | null;
  expiresAt: string | null;
  used: boolean;
  createdAt: string;
}> = [];

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
    if (!role) {
      return NextResponse.json({ error: 'Role required' }, { status: 400 });
    }

    // Generate unique code
    let newCode = generateCode();
    while (codesStore.find((c) => c.code === newCode)) {
      newCode = generateCode();
    }

    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const newEntry = {
      code: newCode,
      role,
      email: null,
      expiresAt: expiresAt.toISOString(),
      used: false,
      createdAt: new Date().toISOString(),
    };

    codesStore.push(newEntry);

    return NextResponse.json({ success: true, code: newCode, role });
  } catch (error) {
    console.error('Generate code error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ codes: codesStore });
  } catch (error) {
    console.error('Get codes error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
  } catch (error) {
    console.error('Mark used error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
