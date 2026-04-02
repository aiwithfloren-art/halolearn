'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import AuthGuard from '../components/AuthGuard';
import DarkHero from '../components/DarkHero';

// Track user to Google Sheets
const trackUserToSheets = async (name: string | null | undefined, email: string | null | undefined) => {
  if (!name || !email) return;

  const tracked = localStorage.getItem('tracked_linkedin');
  if (tracked) return;

  try {
    await fetch('/api/track-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        page: 'LinkedIn Score',
      }),
    });

    localStorage.setItem('tracked_linkedin', 'true');
  } catch (error) {
    console.error('Failed to track user:', error);
  }
};

const loadingMessages = [
  'Mengakses profil LinkedIn kamu...',
  'Menganalisis profile strength...',
  'Scanning keywords dan visibility...',
  'Evaluating recruiter impression...',
  'Menyiapkan detailed insights...',
];

// LinkedIn Analysis Data
const analysisData = {
  profileScore: 68,
  sections: [
    {
      name: 'Profile Picture & Headline',
      score: 85,
      status: 'Bagus'
    },
    {
      name: 'About/Summary Section',
      score: 45,
      status: 'Perlu diperbaiki'
    },
    {
      name: 'Experience & Skills',
      score: 72,
      status: 'Lumayan'
    },
    {
      name: 'Recommendations & Endorsements',
      score: 38,
      status: 'Perlu ditingkatkan'
    },
    {
      name: 'Open to Opportunities',
      score: 90,
      status: 'Excellent'
    }
  ],
  improvements: [
    'Tambah keywords industri yang relevan di About section',
    'Dapatkan minimal 3 recommendations dari kolega/atasan',
    'Lengkapi semua field dalam Experience (achievements, skills)'
  ],
  visibility: {
    recruiterScore: 42,
    keywordOptimization: 55,
    completeness: 78
  }
};

function LinkedInScoreContent() {
  const { data: session } = useSession();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [showPayment, setShowPayment] = useState(true);

  // Track user on mount
  useEffect(() => {
    if (session?.user) {
      trackUserToSheets(session.user.name, session.user.email);
    }
  }, [session]);

  const handleAnalyze = () => {
    if (!linkedinUrl.trim()) {
      alert('Silakan masukkan URL LinkedIn kamu');
      return;
    }

    setLoading(true);
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex++;
      }
    }, 600);

    setTimeout(() => {
      clearInterval(messageInterval);
      setLoading(false);
      setAnalyzed(true);
    }, loadingMessages.length * 600 + 1200);
  };

  const paymentLinkFull = `https://wa.me/6285260421274?text=${encodeURIComponent(`Halo min, saya ${session?.user?.name} mau bayar analisa LinkedIn lengkap Rp75.000. Email: ${session?.user?.email}`)}`;
  const paymentLinkPromo = `https://wa.me/6285260421274?text=${encodeURIComponent(`Halo min mau promo 35ribu aja utk analisa linkedin. Nama: ${session?.user?.name}, Email: ${session?.user?.email}`)}`;

  return (
    <main className="bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">halolearn</Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">Tools</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">
              👤 <span className="font-medium">{session?.user?.name || 'User'}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:border-slate-900 transition"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <DarkHero
        title={`LinkedIn Profile Analyzer 📊`}
        description="Analisis lengkap profil LinkedIn kamu dan dapatkan actionable insights untuk meningkatkan visibility di mata recruiter"
      />

      <div className="mx-auto max-w-4xl px-6 py-20">
        {!analyzed ? (
          <>
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Tingkatkan LinkedIn Profile Kamu</h2>
              <p className="text-slate-600 mb-8">Masukkan URL LinkedIn kamu dan dapatkan score detail serta recommendations untuk meningkatkan visibility di mata recruiter</p>

              <div className="grid gap-4 md:grid-cols-3 mb-12">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 border border-blue-200">
                  <div className="text-3xl mb-3">⭐</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Profile Score</h3>
                  <p className="text-sm text-slate-600">Rating lengkap terhadap kelengkapan profile</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 border border-green-200">
                  <div className="text-3xl mb-3">🔍</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Visibility Analysis</h3>
                  <p className="text-sm text-slate-600">Seberapa mudah recruiter menemukan kamu</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6 border border-purple-200">
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Action Plan</h3>
                  <p className="text-sm text-slate-600">Strategi 30 hari untuk optimize profile</p>
                </div>
              </div>

              {/* Input Section */}
              <div className="rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-white to-slate-50 p-8">
                <label className="block mb-4">
                  <span className="block text-sm font-semibold text-slate-900 mb-2">URL LinkedIn Profile Kamu</span>
                  <input
                    type="text"
                    placeholder="https://www.linkedin.com/in/your-profile/"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition"
                  />
                </label>
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-lg transition"
                >
                  {loading ? 'Analyzing...' : 'Analyze Profile →'}
                </button>
              </div>

              {loading && (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
                  <div className="mb-6 flex justify-center">
                    <div className="h-12 w-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                  </div>
                  <p className="text-center text-slate-600 font-medium">{loadingMessage}</p>
                  <div className="mt-6 w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-slate-900 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Results Container with Blur */}
            <div className="mb-12 relative">
              <h2 className="mb-8 text-3xl font-bold text-slate-900">Hasil Analisis LinkedIn Profile Kamu</h2>

              {/* Blurred Results Content */}
              <div className="relative" style={{ filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' }}>
                {/* Profile Score */}
                <div className="mb-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
                  <p className="mb-6 text-center text-sm uppercase tracking-wider text-slate-500 font-semibold">Profile Strength Score</p>
                  <div className="flex flex-col items-center">
                    <div className="relative h-40 w-40">
                      <svg className="h-full w-full" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeDasharray={`${(analysisData.profileScore / 100) * 314.159} 314.159`}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dasharray 1.5s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-blue-600">{analysisData.profileScore}</span>
                        <span className="text-xs text-slate-600 mt-1">/100</span>
                      </div>
                    </div>
                    <p className="mt-8 text-xl font-semibold text-slate-900">Cukup Baik</p>
                    <p className="mt-2 text-center text-sm text-slate-600 max-w-xs">Ada beberapa area yang bisa ditingkatkan untuk maksimalkan visibility di mata recruiter</p>
                  </div>
                </div>

                {/* Section Breakdown */}
                <div className="mb-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
                  <h3 className="mb-6 text-lg font-semibold text-slate-900">📊 Section Analysis</h3>
                  <div className="space-y-5">
                    {analysisData.sections.map((section) => (
                      <div key={section.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-900">{section.name}</span>
                          <span className="text-xs font-semibold text-slate-600 px-2 py-1 bg-slate-200 rounded">{section.status}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000" style={{width: `${section.score}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div className="mb-12">
                  <h3 className="mb-6 text-lg font-semibold text-slate-900">🎯 Top 3 Areas to Improve</h3>
                  <div className="space-y-4">
                    {analysisData.improvements.map((improvement, idx) => (
                      <div key={idx} className="rounded-lg border border-amber-200 bg-amber-50 p-6">
                        <p className="text-slate-900"><strong>#{idx + 1}</strong> {improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visibility Metrics */}
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
                  <h3 className="mb-6 text-lg font-semibold text-slate-900">👁️ Recruiter Visibility Metrics</h3>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900">Recruiter Search Visibility</span>
                        <span className="text-sm font-semibold text-slate-600">{analysisData.visibility.recruiterScore}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{width: `${analysisData.visibility.recruiterScore}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900">Keyword Optimization</span>
                        <span className="text-sm font-semibold text-slate-600">{analysisData.visibility.keywordOptimization}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{width: `${analysisData.visibility.keywordOptimization}%`}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900">Profile Completeness</span>
                        <span className="text-sm font-semibold text-slate-600">{analysisData.visibility.completeness}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{width: `${analysisData.visibility.completeness}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Gate Card - Overlay */}
              {showPayment && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setShowPayment(false)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition"
                      aria-label="Close"
                    >
                      ✕
                    </button>

                    <div className="text-center mb-8">
                      <div className="text-4xl mb-4">🔒</div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Hasil Analisa LinkedIn Kamu Sudah Siap!</h3>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                      {/* Option 1 - Full Analysis (Highlighted) */}
                      <div className="border-2 border-slate-900 rounded-xl p-6 bg-white relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3">
                          <span className="text-sm font-bold text-slate-900">⭐ REKOMENDASI</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">⭐ Analisa Lengkap LinkedIn</h4>
                        <div className="text-3xl font-bold text-slate-900 mb-1">Rp75.000</div>
                        <span className="inline-block px-3 py-1 mb-4 bg-green-100 text-green-700 text-xs font-semibold rounded-full">⚡ Selesai dalam 30 menit</span>

                        <ul className="space-y-2 mb-6 text-sm text-slate-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Profile Strength Score</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Semua section yang perlu diperbaiki</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Keyword recommendations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Visibility tips untuk recruiter</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Action plan 30 hari</span>
                          </li>
                        </ul>

                        <a
                          href={paymentLinkFull}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg text-center transition"
                        >
                          Bayar Rp75.000 →
                        </a>
                      </div>

                      {/* Option 2 - Promo */}
                      <div className="border-2 border-slate-300 rounded-xl p-6 bg-slate-50">
                        <h4 className="text-lg font-bold text-slate-900 mb-1">🎁 Promo LinkedIn</h4>
                        <div className="text-3xl font-bold text-slate-900 mb-1">Rp35.000</div>
                        <span className="inline-block px-3 py-1 mb-4 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">🕐 Selesai dalam 1 jam</span>

                        <ul className="space-y-2 mb-6 text-sm text-slate-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Profile Score</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>3 area utama yang perlu diperbaiki</span>
                          </li>
                        </ul>

                        <a
                          href={paymentLinkPromo}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-bold py-3 px-4 rounded-lg text-center transition"
                        >
                          Klaim Promo Rp35.000 →
                        </a>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 text-center">
                      💬 <strong>Pembayaran via WhatsApp</strong> — Konfirmasi transfer dan hasil dikirim dalam 5 menit
                    </p>

                    <div className="border-t border-slate-200 mt-6 pt-6">
                      <p className="text-xs text-slate-600 text-center">
                        Atau ambil <strong>LinkedIn Optimization</strong> (Rp195.000) — kami yang optimasi langsung!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function LinkedInScorePage() {
  return (
    <AuthGuard>
      <LinkedInScoreContent />
    </AuthGuard>
  );
}
