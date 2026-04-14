import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import fs from 'fs';
import path from 'path';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const roleFileMap: Record<string, string> = {
  'management-trainee': 'mt-questions.json',
  'mt-bumn': 'mt-bumn-questions.json',
  akuntansi: 'accounting-questions.json',
  admin: 'admin-questions.json',
  'human-resources': 'hr-questions.json',
  'odp-bank': 'odp-questions.json',
};

const levelPriority: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const toLetterIndex = (value: unknown) => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return 0;
  const letter = value.trim().toUpperCase().at(0);
  if (!letter) return 0;
  return Math.max(0, letter.charCodeAt(0) - 65);
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ role: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { role } = await params;
  const fileName = roleFileMap[role];
  if (!fileName) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const questionsPath = path.join(process.cwd(), 'data', 'interview-questions', fileName);

  try {
    const raw = fs.readFileSync(questionsPath, 'utf-8');
    const parsed = JSON.parse(raw) as Array<{
      id?: number | string;
      level?: string;
      question?: string;
      options?: string[];
      answer?: string | number;
      explanation?: string;
    }>;

    const questions = parsed.map((item, index) => ({
      id: typeof item.id === 'number' ? item.id : index + 1,
      level: levelPriority[(item.level ?? '').toLowerCase()] ?? 1,
      question: item.question ?? 'Soal belum tersedia',
      options: item.options ?? ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
      answer: toLetterIndex(item.answer ?? 0),
      explanation: item.explanation ?? 'Penjelasan akan tersedia segera.',
    }));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('[questions] failed to load questions', error);
    return NextResponse.json({
      questions: [
        {
          id: 1,
          level: 1,
          question: `Soal placeholder untuk role ${role}. File pertanyaan belum tersedia.`,
          options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
          answer: 0,
          explanation: 'Penjelasan akan tersedia segera.',
        },
      ],
    });
  }
}
