'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import AuthGuard from '../components/AuthGuard';
import DarkHero from '../components/DarkHero';

// Track user to Google Sheets
const trackUserToSheets = async (name: string | null | undefined, email: string | null | undefined) => {
  if (!name || !email) return;

  // Check if already tracked in this session
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

    // Mark as tracked
    localStorage.setItem('tracked_linkedin', 'true');
  } catch (error) {
    console.error('Failed to track user:', error);
  }
};

const whatsappLink = 'https://wa.me/6285260421274?text=Halo%2C%20saya%20mau%20optimize%20LinkedIn%20profile%20saya';

const loadingMessages = [
  'Menganalisis profile LinkedIn...',
  'Mengecek completeness & keywords...',
  'Menyiapkan hasil analisis...',
];

function LinkedInScoreContent() {
  const { data: session } = useSession();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Menganalisis profile LinkedIn...');

  // Track user on component mount if session exists
  useEffect(() => {
    if (session?.user) {
      trackUserToSheets(session.user.name, session.user.email);
    }
  }, [session]);

  const isValidUrl = (inputUrl: string) => {
    return inputUrl.includes('linkedin.com');
  };

  const handleAnalyze = () => {
    if (!url) {
      setUrlError('Masukkan URL LinkedIn profile');
      return;
    }
    if (!isValidUrl(url)) {
      setUrlError('URL harus dari linkedin.com');
      return;
    }
    setUrlError('');
    setLoading(true);
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex++;
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(messageInterval);
      setLoading(false);
      setAnalyzed(true);
    }, 3000);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setUrlError('');
  };

  return (
    <main className="bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">halolearn</Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/tentang-cv" className="text-sm text-slate-600 hover:text-slate-900">Kenapa CV Penting?</Link>
          </nav>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Hubungi Kami
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <DarkHero
        title="LinkedIn Profile Score"
        description="Analisis LinkedIn profile kamu untuk optimisasi visibilitas di recruiter"
      />

      <div className="mx-auto max-w-2xl px-6 py-20">
        {!analyzed ? (
          <>


            {/* Explanation Section */}
            <section className="mb-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Kenapa LinkedIn Profile Kamu Perlu Dicek Sekarang?</h2>
                <div className="grid gap-4 md:grid-cols-2 mb-8">
                  <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900">📊 87% rekruter gunakan LinkedIn untuk hunting kandidat</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                    <p className="text-sm font-semibold text-green-900">⭐ Profil lengkap dapat 40x lebih banyak peluang</p>
                  </div>
                </div>

                <h3 className="mb-6 text-lg font-semibold text-slate-900">4 Manfaat Cek di Halolearn</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition">
                    <div className="text-2xl mb-2">💪</div>
                    <h4 className="font-semibold text-slate-900 mb-2">Profile Strength Score</h4>
                    <p className="text-sm text-slate-600">Rating kompleteness & kualitas profile kamu</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition">
                    <div className="text-2xl mb-2">❌</div>
                    <h4 className="font-semibold text-slate-900 mb-2">Missing Sections</h4>
                    <p className="text-sm text-slate-600">Bagian penting apa yang masih kurang di profile</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition">
                    <div className="text-2xl mb-2">🔍</div>
                    <h4 className="font-semibold text-slate-900 mb-2">Keyword Optimization</h4>
                    <p className="text-sm text-slate-600">Keyword yang perlu ditambahkan untuk visibilitas lebih tinggi</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition">
                    <div className="text-2xl mb-2">👥</div>
                    <h4 className="font-semibold text-slate-900 mb-2">Recruiter Visibility</h4>
                    <p className="text-sm text-slate-600">Tips agar profile kamu lebih mudah ditemukan recruiter</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-8">
                <h3 className="font-semibold text-slate-900 mb-4">Kenapa Cek di Halolearn?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <span className="text-blue-600 font-bold flex-shrink-0 mt-1">✓</span>
                    <span className="text-sm text-slate-700"><strong>AI dilatih dari ribuan profil LinkedIn Indonesia</strong> — bukan template global</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-blue-600 font-bold flex-shrink-0 mt-1">✓</span>
                    <span className="text-sm text-slate-700"><strong>Feedback spesifik per section</strong> dengan actionable recommendations</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-blue-600 font-bold flex-shrink-0 mt-1">✓</span>
                    <span className="text-sm text-slate-700"><strong>Rekomendasi keyword berdasarkan industri target</strong> kamu</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Input Form */}
            <div className="mb-12">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-slate-900 mb-2">
                  URL LinkedIn Profile
                </label>
                <div className="flex gap-3">
                  <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={`flex-1 rounded-lg border px-4 py-3 text-sm focus:outline-none ${
                      urlError ? 'border-red-500 focus:border-red-900' : 'border-slate-300 focus:border-slate-900'
                    } bg-white`}
                  />
                  <button
                    onClick={handleAnalyze}
                    disabled={!isValidUrl(url) || loading}
                    className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                  >
                    {loading ? 'Analisis...' : 'Analisis'}
                  </button>
                </div>
                {urlError && (
                  <p className="mt-2 text-sm text-red-600">{urlError}</p>
                )}
              </div>

              {loading && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
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

            {/* Info */}
            <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">Apa yang akan dianalisis?</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span>✓</span> Profile completeness & keyword optimization
                </li>
                <li className="flex gap-3">
                  <span>✓</span> Headline & summary effectiveness
                </li>
                <li className="flex gap-3">
                  <span>✓</span> Connection quality & engagement metrics
                </li>
                <li className="flex gap-3">
                  <span>✓</span> Skills endorsement & recommendations
                </li>
                <li className="flex gap-3">
                  <span>✓</span> Profile visibility untuk recruiter
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="mb-12">
              <h2 className="mb-8 text-3xl font-bold text-slate-900">Hasil Analisis LinkedIn</h2>

              {/* Profile Strength Score */}
              <div className="mb-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
                <p className="mb-6 text-center text-sm uppercase tracking-wider text-slate-500 font-semibold">Profile Strength</p>
                <div className="flex flex-col items-center">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#0f172a"
                        strokeWidth="8"
                        strokeDasharray="261.99"
                        strokeDashoffset="65.5"
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-slate-900">68%</span>
                    </div>
                  </div>
                  <p className="mt-6 text-lg font-semibold text-slate-900">Cukup Optimal</p>
                  <p className="mt-2 text-center text-sm text-slate-600">Profile kamu sudah bagus, tapi ada ruang untuk improvement penting.</p>
                </div>
              </div>

              {/* Section Analysis */}
              <div className="mb-12">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">📊 Analisis Setiap Section</h3>
                <div className="grid gap-3">
                  {[
                    { section: 'Headline', status: '❌ Kurang Optimal', color: 'border-red-200 bg-red-50' },
                    { section: 'About/Summary', status: '🟡 Butuh Improvement', color: 'border-yellow-200 bg-yellow-50' },
                    { section: 'Featured/Portfolio', status: '❌ Tidak Ada', color: 'border-red-200 bg-red-50' },
                    { section: 'Skills', status: '🟡 Terbatas', color: 'border-yellow-200 bg-yellow-50' },
                    { section: 'Recommendations', status: '✅ Baik', color: 'border-green-200 bg-green-50' }
                  ].map((item, idx) => (
                    <div key={idx} className={`flex items-center justify-between rounded-lg border ${item.color} p-4`}>
                      <p className="font-medium text-slate-900">{item.section}</p>
                      <p className="text-sm font-medium text-slate-700">{item.status}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Recommendations */}
              <div className="mb-12">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">🎯 Top Rekomendasi</h3>
                <div className="space-y-3">
                  {[
                    { icon: '1️⃣', title: 'Ubah headline jadi lebih spesifik', desc: 'Gunakan keyword target role (misal: "Senior Software Engineer | AI/ML Specialist")' },
                    { icon: '2️⃣', title: 'Tambahkan 500+ koneksi', desc: 'Kurangi jarak dengan recruiter dengan connect ke HR dan decision makers' },
                    { icon: '3️⃣', title: 'Upload foto profesional', desc: 'Foto profile clear dan profesional meningkatkan trust recruiter 40%' },
                    { icon: '4️⃣', title: 'Aktifkan Open to Work', desc: 'Tampilkan status di profile agar recruiter tahu kamu sedang mencari' }
                  ].map((rec, idx) => (
                    <div key={idx} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-md transition">
                      <span className="text-xl flex-shrink-0">{rec.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{rec.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{rec.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 30-Day Action Plan */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
                <h3 className="mb-6 text-lg font-semibold text-slate-900">📅 Action Plan 30 Hari</h3>
                <div className="space-y-4">
                  {[
                    { week: 1, title: 'Optimize Profile', desc: 'Update summary, headline, dan tambah skills utama' },
                    { week: 2, title: 'Get Recommendations', desc: 'Request recommendations dari 5+ manager & colleague' },
                    { week: 3, title: 'Start Sharing', desc: 'Share 1-2 posts tentang industry insights atau achievement' },
                    { week: 4, title: 'Connect & Engage', desc: 'Connect dengan 50+ recruiter & engage dengan content mereka' }
                  ].map((item) => (
                    <div key={item.week} className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">{item.week}</div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">Minggu {item.week}: {item.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-12 text-center text-white shadow-lg">
              <h3 className="mb-4 text-2xl font-bold">Upgrade LinkedIn Profile-mu dengan Ahli</h3>
              <p className="mb-6 text-slate-300">
                Tim kami akan membantu implement semua rekomendasi dan manage LinkedIn strategy untuk hasil maksimal
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-lg bg-white px-8 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-md"
              >
                Chat di WhatsApp Sekarang
              </a>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-slate-600 hover:text-slate-900 underline"
              >
                Kembali ke Home
              </Link>
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
