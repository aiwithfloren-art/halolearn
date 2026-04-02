import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserAccess } from '@/app/lib/sheets';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ roles: [] });
    const roles = await getUserAccess(session.user.email);
    return NextResponse.json({ roles });
  } catch (e) {
    return NextResponse.json({ roles: [] });
  }
}
