'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect, useCallback, useRef } from 'react';

const ROLE_NAMES: Record<string, string> = {
  'management-trainee': 'Management Trainee',
  akuntansi: 'Akuntansi',
  admin: 'Administrasi',
  'human-resources': 'Human Resources',
  'odp-bank': 'ODP Bank',
};

const TIMER_SECONDS = 60;
const PASS_SCORE = 80;

interface Question {
  id: number;
  level: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface AnswerRecord {
  questionId: number;
  selected: number | null;
  correct: boolean;
  timeLeft: number;
}

type QuizPhase = 'loading' | 'no-access' | 'ready' | 'quiz' | 'result';

function saveProgress(role: string, score: number, passed: boolean) {
  if (typeof window === 'undefined') return;
  const key = `quiz_progress_${role}`;
  const existing = (() => { try { return JSON.parse(localStorage.getItem(key) ?? '{}'); } catch { return {}; } })();
  const updated = {
    attempts: (existing.attempts ?? 0) + 1,
    bestScore: Math.max(existing.bestScore ?? 0, score),
    lastScore: score,
    passed: existing.passed || passed,
    lastAttemptAt: new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(updated));
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const role = params.role as string;
  const { data: session, status } = useSession();

  const [phase, setPhase] = useState<QuizPhase>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const roleName = ROLE_NAMES[role] ?? role;

  const submitAnswer = useCallback(
    (sel: number | null) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const q = questions[current];
      const correct = sel !== null && sel === q.answer;
      const record: AnswerRecord = {
        questionId: q.id,
        selected: sel,
        correct,
        timeLeft,
      };
      setAnswers((prev) => {
        const updated = [...prev, record];
        if (current + 1 >= questions.length) {
          // Calculate final score
          const totalCorrect = updated.filter((a) => a.correct).length;
          const pct = Math.round((totalCorrect / questions.length) * 100);
          setScore(pct);
          saveProgress(role, pct, pct >= PASS_SCORE);
          setPhase('result');
        } else {
          setCurrent((c) => c + 1);
          setSelected(null);
          setTimeLeft(TIMER_SECONDS);
        }
        return updated;
      });
    },
    [current, questions, role, timeLeft]
  );

  // Timer
  useEffect(() => {
    if (phase !== 'quiz') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          submitAnswer(null);
          return TIMER_SECONDS;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, current, submitAnswer]);

  // Fetch questions + check access
  useEffect(() => {
    if (status === 'unauthenticated') { setPhase('no-access'); return; }
    if (status !== 'authenticated') return;

    async function load() {
      try {
        // Check access
        const accessRes = await fetch('/api/user-access');
        const accessData = await accessRes.json();
        if (!accessData.roles?.includes(role)) {
          setPhase('no-access');
          return;
        }
        // Load questions
        const qRes = await fetch(`/api/questions/${role}`);
        const qData = await qRes.json();
        if (!qData.questions?.length) { setPhase('no-access'); return; }
        setQuestions(qData.questions);
        setPhase('ready');
      } catch {
        setPhase('no-access');
      }
    }
    load();
  }, [status, role]);

  function startQuiz() {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setTimeLeft(TIMER_SECONDS);
    setPhase('quiz');
  }

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    submitAnswer(idx);
  }

  if (status === 'loading' || phase === 'loading') {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Memuat soal...</p>
        </div>
      </main>
    );
  }

  if (phase === 'no-access') {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-black mb-4">Akses Diperlukan</h1>
          {status === 'unauthenticated' ? (
            <>
              <p className="text-white/60 mb-8">Login dengan Google dulu untuk mengakses quiz ini.</p>
              <button
                onClick={() => signIn('google')}
                className="bg-[#F5C518] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition"
              >
                Login dengan Google
              </button>
            </>
          ) : (
            <>
              <p className="text-white/60 mb-8">
                Kamu belum punya akses ke quiz <strong>{roleName}</strong>. Beli akses via WhatsApp untuk mulai belajar.
              </p>
              <Link
                href={`/belajar/${role}`}
                className="bg-[#F5C518] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition inline-block"
              >
                Beli Akses Sekarang
              </Link>
            </>
          )}
          <div className="mt-6">
            <Link href="/belajar/dashboard" className="text-white/50 hover:text-white text-sm transition">
              ← Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (phase === 'ready') {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-3xl font-black mb-2">Quiz {roleName}</h1>
          <p className="text-white/60 mb-8">
            {questions.length} soal · 60 detik per soal · Passing score 80%
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-3">
            {[
              ['⏱️', 'Timer 60 detik — soal otomatis lewat jika waktu habis'],
              ['💡', 'Penjelasan jawaban ditampilkan di akhir'],
              ['🏆', 'Lulus jika score ≥ 80%'],
              ['📊', 'Progress tersimpan otomatis'],
            ].map(([icon, text], i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-white/70">
                <span className="flex-shrink-0">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <button
            onClick={startQuiz}
            className="w-full bg-[#F5C518] text-[#0A0E1A] py-4 rounded-xl font-bold text-xl hover:bg-yellow-400 transition"
          >
            ▶ Mulai Quiz
          </button>
          <div className="mt-4">
            <Link href="/belajar/dashboard" className="text-white/50 hover:text-white text-sm transition">
              ← Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (phase === 'quiz' && questions.length > 0) {
    const q = questions[current];
    const progress = ((current) / questions.length) * 100;
    const timerPct = (timeLeft / TIMER_SECONDS) * 100;

    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex flex-col">
        {/* Header */}
        <div className="bg-[#0D1B3E]/80 border-b border-white/10 px-4 py-3">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-white/60">{roleName}</span>
              <span className="text-white/60">Soal {current + 1} / {questions.length}</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F5C518] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8">
          {/* Timer */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-white/50 uppercase tracking-wider">
              Level {q.level}
            </span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    timeLeft <= 10 ? 'bg-red-500' : timeLeft <= 30 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${timerPct}%` }}
                />
              </div>
              <span className={`font-mono font-bold text-lg ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 flex-1">
            <p className="text-lg font-semibold leading-relaxed">{q.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`w-full text-left px-5 py-4 rounded-xl border font-medium transition ${
                  selected === null
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#F5C518]/40 active:scale-[0.98]'
                    : selected === idx
                    ? 'bg-[#F5C518]/20 border-[#F5C518] text-[#F5C518]'
                    : 'bg-white/3 border-white/5 opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="text-[#F5C518] font-mono mr-3">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </button>
            ))}
          </div>

          {selected !== null && (
            <p className="text-center text-white/50 text-sm mt-4 animate-pulse">
              Melanjutkan ke soal berikutnya...
            </p>
          )}
        </div>
      </main>
    );
  }

  if (phase === 'result') {
    const passed = score >= PASS_SCORE;
    const correctCount = answers.filter((a) => a.correct).length;
    const levelBreakdown = [1, 2, 3].map((lvl) => {
      const lvlQs = questions.filter((q) => q.level === lvl);
      const lvlAnswers = answers.filter((a) => {
        const q = questions.find((q) => q.id === a.questionId);
        return q?.level === lvl;
      });
      const correct = lvlAnswers.filter((a) => a.correct).length;
      return { level: lvl, total: lvlQs.length, correct };
    }).filter((l) => l.total > 0);

    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white">
        <div className="max-w-2xl mx-auto px-4 py-10">

          {/* Score card */}
          <div className={`rounded-2xl p-8 text-center mb-8 ${
            passed
              ? 'bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/30'
              : 'bg-gradient-to-br from-red-900/30 to-red-800/10 border border-red-500/20'
          }`}>
            <div className="text-6xl mb-4">{passed ? '🎉' : '💪'}</div>
            <h1 className="text-4xl font-black mb-2">{score}%</h1>
            <p className={`text-xl font-bold mb-2 ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {passed ? 'LULUS! Kamu siap interview!' : 'Belum lulus. Ayo coba lagi!'}
            </p>
            <p className="text-white/60">
              {correctCount} dari {questions.length} soal benar · Passing score 80%
            </p>
          </div>

          {/* Level breakdown */}
          {levelBreakdown.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="font-bold mb-4">Breakdown per Level</h2>
              <div className="space-y-3">
                {levelBreakdown.map((l) => {
                  const pct = l.total > 0 ? Math.round((l.correct / l.total) * 100) : 0;
                  return (
                    <div key={l.level}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">Level {l.level}</span>
                        <span className="text-white/70">{l.correct}/{l.total} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${pct >= 80 ? 'bg-green-400' : 'bg-[#F5C518]'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Answer Review */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="font-bold mb-4">Review Jawaban</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {answers.map((ans, i) => {
                const q = questions.find((q) => q.id === ans.questionId);
                if (!q) return null;
                return (
                  <div key={i} className={`rounded-xl p-4 border ${ans.correct ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="flex-shrink-0">{ans.correct ? '✅' : '❌'}</span>
                      <p className="text-sm font-medium text-white/90">{q.question}</p>
                    </div>
                    {!ans.correct && ans.selected !== null && (
                      <p className="text-xs text-red-400 mb-1 ml-6">
                        Kamu pilih: {q.options[ans.selected]}
                      </p>
                    )}
                    {ans.selected === null && (
                      <p className="text-xs text-yellow-400 mb-1 ml-6">Waktu habis — tidak menjawab</p>
                    )}
                    <p className="text-xs text-green-400 mb-2 ml-6">
                      Jawaban benar: {q.options[q.answer]}
                    </p>
                    <p className="text-xs text-white/50 ml-6 italic">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push(`/belajar/quiz/${role}`)}
              className="flex-1 border border-[#F5C518]/50 text-[#F5C518] py-3 rounded-xl font-bold hover:bg-[#F5C518]/10 transition text-center"
            >
              🔄 Coba Lagi
            </button>
            <Link
              href="/belajar/dashboard"
              className="flex-1 bg-[#F5C518] text-[#0A0E1A] py-3 rounded-xl font-bold hover:bg-yellow-400 transition text-center"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
