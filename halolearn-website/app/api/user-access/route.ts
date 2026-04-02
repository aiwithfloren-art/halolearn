import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { userAccessStore } from '@/app/lib/store';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ roles: [] });
    }
    const user = userAccessStore.find((u) => u.email === session.user!.email);
    return NextResponse.json({ roles: user?.roles || [], expiresAt: user?.expiresAt || null });
  } catch (e) {
    return NextResponse.json({ roles: [] });
  }
}
