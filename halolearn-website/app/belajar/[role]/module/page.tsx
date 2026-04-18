'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { ROLE_NAMES, levelDescriptions, levelLabels, roleOverviewData } from '@/app/lib/belajar';
import { roleEnhancementData } from '@/app/lib/roleEnhancements';

interface Question {
  id: number;
  level: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

type Phase = 'loading' | 'no-access' | 'ready';

export default function RoleModulePage() {
  const params = useParams();
  const role = params.role as string;
  const { status } = useSession();
  const [phase, setPhase] = useState<Phase>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      setPhase('no-access');
      return;
    }

    async function load() {
      try {
        const accessRes = await fetch('/api/user-access');
        const accessData = await accessRes.json();
        if (!accessData.roles?.includes(role)) {
          setPhase('no-access');
          return;
        }

        const qRes = await fetch(`/api/questions/${role}`);
        const qData = await qRes.json();
        if (!qData.questions?.length) {
          setPhase('no-access');
          return;
        }

        setQuestions(qData.questions);
        setPhase('ready');
      } catch {
        setPhase('no-access');
      }
    }

    load();
  }, [role, status]);

  const grouped = useMemo(() => {
    return [1, 2, 3].map((level) => ({
      level,
      label: levelLabels[level],
      description: levelDescriptions[level],
      questions: questions.filter((question) => question.level === level),
    }));
  }, [questions]);

  const roleName = ROLE_NAMES[role] ?? 'Role Belajar';
  const roleOverview = roleOverviewData[role];
  const roleEnhancement = roleEnhancementData[role];

  if (phase === 'loading' || status === 'loading') {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Menyiapkan modul belajar...</p>
        </div>
      </main>
    );
  }

  if (phase === 'no-access') {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-black mb-4">Akses Modul Diperlukan</h1>
          {status === 'unauthenticated' ? (
            <>
              <p className="text-white/60 mb-8">Login dengan Google dulu untuk membuka modul belajar ini.</p>
              <button
                onClick={() => signIn('google')}
                className="bg-[#F5C518] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition"
              >
                Login dengan Google
              </button>
            </>
          ) : (
            <>
              <p className="text-white/60 mb-8">Kamu belum punya akses ke modul <strong>{roleName}</strong>. Kalau sudah beli, redeem kode dulu di dashboard. Kalau belum, beli aksesnya dulu ya.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/belajar/dashboard"
                  className="bg-[#F5C518] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition inline-block"
                >
                  🎟️ Redeem di Dashboard
                </Link>
                <Link
                  href={`/belajar/${role}`}
                  className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition inline-block"
                >
                  Lihat Detail Akses
                </Link>
              </div>
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

  return (
    <main className="min-h-screen bg-[#0A0E1A] text-white">
      <nav className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link href="/belajar/dashboard" className="text-white/60 hover:text-white transition text-sm">
            ← Dashboard
          </Link>
          <div className="text-center">
            <p className="text-[#F5C518] font-semibold text-sm">Modul Belajar</p>
            <p className="text-white/60 text-xs">{roleName}</p>
          </div>
          <Link
            href={`/belajar/quiz/${role}`}
            className="bg-[#F5C518] text-[#0A0E1A] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition"
          >
            Mulai Quiz
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-[#F5C518]/8 blur-3xl rounded-full" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-14 relative">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] px-4 py-2 rounded-full text-sm font-medium mb-6">
            📘 Belajar dulu, baru uji diri
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mb-4">
            Modul Belajar <span className="text-[#F5C518]">{roleName}</span>
          </h1>
          <p className="text-white/65 text-lg max-w-3xl leading-relaxed mb-8">
            Pelajari 100 pertanyaan interview yang sudah dibagi per level. Di setiap kartu kamu bisa lihat konteks jawaban terbaik,
            kunci jawaban, dan pembahasan singkat supaya sebelum masuk quiz kamu benar-benar paham polanya.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl">
            {grouped.map((group) => (
              <div key={group.level} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#F5C518] mb-2">{group.label}</p>
                <p className="text-3xl font-black mb-2">{group.questions.length}</p>
                <p className="text-white/55 text-sm leading-relaxed">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        {roleOverview && (
          <div className="mb-8 rounded-3xl border border-[#F5C518]/20 bg-gradient-to-br from-[#F5C518]/10 via-white/5 to-white/5 p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5C518]/20 bg-[#F5C518]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5C518]">
              {roleOverview.badge}
            </div>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <h2 className="text-2xl md:text-3xl font-black mb-3">Kenali dulu dunia {roleName}</h2>
                <p className="text-white/70 leading-relaxed text-base md:text-lg">{roleOverview.intro}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-[#F5C518] text-xs uppercase tracking-[0.2em] mb-2">Positioning</p>
                  <p className="text-white/80 text-sm leading-relaxed">Pelajari konteks role-nya dulu supaya kamu tidak cuma hafal jawaban, tapi juga paham cara berpikir recruiter.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-[#F5C518] text-xs uppercase tracking-[0.2em] mb-2">Interview Focus</p>
                  <p className="text-white/80 text-sm leading-relaxed">Fokus recruiter umumnya ada di skill inti, kedewasaan komunikasi, dan kesiapan kerja sesuai karakter role ini.</p>
                </div>
              </div>
            </div>

            {roleEnhancement && (
              <div className="mt-8 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-[#F5C518]/20 bg-[#0A0E1A]/70 p-5">
                  <p className="text-[#F5C518] text-xs uppercase tracking-[0.2em] mb-3">Salary Highlight</p>
                  <div className="text-3xl font-black mb-2">{roleEnhancement.salary.range}</div>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">{roleEnhancement.salary.note}</p>
                  <ul className="space-y-2 text-sm text-white/72 leading-relaxed">
                    {roleEnhancement.salary.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="text-[#F5C518]">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-[#F5C518] text-xs uppercase tracking-[0.2em] mb-4">Career Path</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {roleEnhancement.careerPath.map((step, index) => (
                      <div key={step} className="flex items-center gap-2">
                        <div className="rounded-full border border-white/10 bg-[#0A0E1A]/80 px-4 py-2 text-sm font-medium text-white/85">
                          {step}
                        </div>
                        {index < roleEnhancement.careerPath.length - 1 && (
                          <span className="text-[#F5C518] text-lg">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {roleOverview.sections.map((section) => (
                <div key={section.title} className="rounded-2xl border border-white/10 bg-[#0A0E1A]/55 p-5">
                  <h3 className="text-lg font-bold mb-3">{section.title}</h3>
                  <p className="text-white/68 text-sm leading-relaxed">{section.body}</p>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2 text-sm text-white/72 leading-relaxed">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-[#F5C518]">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {roleEnhancement && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A0E1A]/55 p-5 md:p-6">
                <p className="text-[#F5C518] text-xs uppercase tracking-[0.2em] mb-4">FAQ Singkat</p>
                <div className="space-y-3">
                  {roleEnhancement.faq.map((item) => (
                    <details key={item.q} className="group rounded-2xl border border-white/10 bg-white/5 p-4 open:border-[#F5C518]/40">
                      <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
                        <span className="font-semibold text-white/90">{item.q}</span>
                        <span className="text-white/40 group-open:rotate-45 transition text-xl leading-none">+</span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-white/68">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black mb-2">Alur belajar yang disarankan</h2>
            <p className="text-white/60 max-w-2xl">
              Mulai dari easy untuk paham pola pertanyaan, lanjut medium untuk melatih struktur jawaban, lalu hard untuk simulasi tekanan interview yang lebih realistis.
            </p>
            <p className="text-white/40 text-sm mt-3">
              Sudah beli akses tapi belum kebuka? Redeem dulu kodenya di dashboard.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/belajar/dashboard"
              className="inline-flex items-center justify-center border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition"
            >
              🎟️ Redeem Kode
            </Link>
            <Link
              href={`/belajar/quiz/${role}`}
              className="inline-flex items-center justify-center bg-[#F5C518] text-[#0A0E1A] px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
            >
              Saya sudah siap → Quiz
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {grouped.map((group) => (
            <section key={group.level} className="scroll-mt-24" id={`level-${group.level}`}>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-[#F5C518] font-semibold mb-3">
                    Level {group.level}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black">{group.label}</h3>
                  <p className="text-white/55 mt-2 max-w-3xl">{group.description}</p>
                </div>
                <div className="text-sm text-white/45">{group.questions.length} materi</div>
              </div>

              <div className="space-y-4">
                {group.questions.map((item, index) => (
                  <details
                    key={item.id}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden open:border-[#F5C518]/40"
                  >
                    <summary className="list-none cursor-pointer p-5 md:p-6 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs text-[#F5C518] font-semibold mb-2">#{index + 1} • {group.label}</div>
                        <h4 className="font-semibold text-white/95 leading-relaxed">{item.question}</h4>
                      </div>
                      <div className="text-white/40 group-open:rotate-45 transition text-xl leading-none">+</div>
                    </summary>

                    <div className="px-5 md:px-6 pb-6 border-t border-white/10 space-y-5">
                      <div className="grid md:grid-cols-2 gap-3 pt-5">
                        {item.options.map((option, optionIndex) => {
                          const isCorrect = optionIndex === item.answer;
                          return (
                            <div
                              key={`${item.id}-${optionIndex}`}
                              className={`rounded-xl border px-4 py-3 text-sm ${
                                isCorrect
                                  ? 'border-green-500/40 bg-green-500/10 text-green-300'
                                  : 'border-white/10 bg-white/5 text-white/60'
                              }`}
                            >
                              <span className="font-mono mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                              {option}
                              {isCorrect && <span className="ml-2 text-xs font-semibold">✓ Kunci jawaban</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
                        <div className="rounded-2xl bg-[#F5C518]/8 border border-[#F5C518]/20 p-5">
                          <p className="text-xs uppercase tracking-[0.2em] text-[#F5C518] mb-3">Pembahasan</p>
                          <p className="text-white/78 leading-relaxed text-sm md:text-base">{item.explanation}</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Tips belajar cepat</p>
                          <ul className="space-y-2 text-sm text-white/70 leading-relaxed">
                            <li>• Pahami kenapa jawaban ini paling tepat, bukan sekadar hafal hurufnya.</li>
                            <li>• Coba jawab dengan kata-katamu sendiri sebelum buka quiz.</li>
                            <li>• Catat pertanyaan yang masih bikin ragu untuk diulang lagi nanti.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-br from-[#F5C518]/15 to-[#F5C518]/5 border border-[#F5C518]/30 rounded-3xl p-8 text-center">
          <p className="text-[#F5C518] font-semibold mb-2">Sudah selesai belajar?</p>
          <h3 className="text-3xl font-black mb-4">Saatnya ukur kesiapanmu di quiz</h3>
          <p className="text-white/60 max-w-2xl mx-auto mb-6">
            Masuk ke quiz untuk lihat seberapa siap kamu menghadapi interview sungguhan. Nilai terbaikmu akan tersimpan di dashboard.
          </p>
          <Link
            href={`/belajar/quiz/${role}`}
            className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition"
          >
            🎯 Lanjut ke Quiz
          </Link>
        </div>
      </section>
    </main>
  );
}
