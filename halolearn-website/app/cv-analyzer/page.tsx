'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import EmailGateModal from '../components/EmailGateModal';
import AuthGuard from '../components/AuthGuard';
import DarkHero from '../components/DarkHero';

// Track user to Google Sheets
const trackUserToSheets = async (name: string | null | undefined, email: string | null | undefined, targetRole?: string) => {
  if (!name || !email) return;

  // Check if already tracked in this session
  const tracked = localStorage.getItem('tracked_cv');
  if (tracked) return;

  try {
    await fetch('/api/track-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        page: 'CV Analyzer',
        targetRole: targetRole || undefined,
      }),
    });

    // Mark as tracked
    localStorage.setItem('tracked_cv', 'true');
  } catch (error) {
    console.error('Failed to track user:', error);
  }
};

interface UserData {
  name: string;
  email: string;
  whatsapp: string;
  targetRole: string;
  experience: string;
  registeredAt: string;
}

const loadingMessages = [
  'Membaca CV kamu...',
  'Menganalisa struktur ATS...',
  'Scanning keyword matching...',
  'Menghitung role compatibility...',
  'Menyiapkan detailed insights...',
];

// Data untuk analisis detail
const analysisData = {
  atsScore: 72,
  roleMatches: [
    {
      role: 'Digital Marketing Specialist',
      score: 87,
      reasoning: 'Pengalaman di social media dan campaign management terdeteksi'
    },
    {
      role: 'Brand Marketing Executive',
      score: 74,
      reasoning: 'Skill branding dan content creation relevan untuk role ini'
    },
    {
      role: 'Marketing Communications',
      score: 68,
      reasoning: 'Background komunikasi dan copywriting mendukung role ini'
    }
  ],
  categoryBreakdown: [
    { label: 'Format & Struktur', score: 80, color: 'bg-green-500' },
    { label: 'Keyword Relevance', score: 58, color: 'bg-yellow-500' },
    { label: 'Pengalaman & Achievement', score: 48, color: 'bg-red-500' },
    { label: 'Skills Presentation', score: 70, color: 'bg-yellow-500' },
    { label: 'Summary/Objective', score: 42, color: 'bg-red-500' }
  ],
  foundKeywords: ['marketing', 'social media', 'content', 'campaign', 'digital'],
  missingKeywords: ['KPI', 'ROI', 'data analytics', 'performance metrics', 'budget management', 'analytics', 'conversion', 'engagement rate'],
  problems: [
    {
      id: 1,
      level: 'PENTING',
      title: 'Bagian "Pengalaman Kerja": Tidak ada angka atau metrics konkret',
      wrong: 'Mengelola kampanye media sosial perusahaan',
      right: 'Meningkatkan engagement Instagram sebesar 340% dalam 3 bulan dengan budget Rp15jt'
    },
    {
      id: 2,
      level: 'PENTING',
      title: 'Summary/Objective terlalu generik dan tidak menonjolkan value proposition',
      wrong: 'Saya adalah lulusan komunikasi yang bersemangat dan pekerja keras',
      right: 'Digital Marketer dengan 2 tahun pengalaman scaling social media brand FMCG, spesialisasi paid ads dengan track record ROAS 4.2x'
    }
  ],
  lockedProblems: [
    'Skills section tidak diurutkan berdasarkan relevansi untuk target role',
    'Tidak ada link LinkedIn/Portfolio di header CV',
    'Format tanggal tidak konsisten (ada yg pakai Jan 2022, ada yg 01/2022)',
    'Certification dan award sections tidak visible atau under-emphasized',
    'Gap periods tidak dijelaskan dengan context yang jelas',
    'Resume objective tidak aligned dengan job description target'
  ],
  recommendations: {
    companies: ['Tokopedia', 'Shopee', 'Grab', 'Blibli'],
    count: 24
  },
  projectedImprovement: {
    atsScoreFrom: 72,
    atsScoreTo: 94,
    interviewBoost: 180
  }
};

function CVAnalyzerContent() {
  const { data: session } = useSession();
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Membaca CV kamu...');
  const [showPayment, setShowPayment] = useState(true);

  // Track user on component mount if session exists
  useEffect(() => {
    if (session?.user) {
      trackUserToSheets(session.user.name, session.user.email);
    }
  }, [session]);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setFileName(file.name);
      startAnalysis();
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      handleFileSelect(file || null);
    };
    input.click();
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word') || file.type.includes('document'))) {
      handleFileSelect(file);
    }
  };

  const startAnalysis = () => {
    setLoading(true);
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex++;
      }
    }, 1200);

    setTimeout(() => {
      clearInterval(messageInterval);
      setLoading(false);
      setUploaded(true);
    }, loadingMessages.length * 1200 + 800);
  };

  const paymentLinkBasic = `https://wa.me/6285260421274?text=${encodeURIComponent(`Halo min, saya ${session?.user?.name} mau bayar Analisa CV Basic Rp50.000. Email: ${session?.user?.email}`)}`;
  const paymentLinkPremium = `https://wa.me/6285260421274?text=${encodeURIComponent(`Halo min, saya ${session?.user?.name} mau bayar Analisa CV Premium Rp80.000. Email: ${session?.user?.email}`)}`;

  return (
    <main className="bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">halolearn</Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/tentang-cv" className="text-sm text-slate-600 hover:text-slate-900">Kenapa CV Penting?</Link>
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
        title={`Halo, ${session?.user?.name?.split(' ')[0]}! 👋`}
        description="Upload CV kamu dan dapatkan analisis lengkap compatibility dengan Applicant Tracking System"
      />

      <div className="mx-auto max-w-4xl px-6 py-20">
        {!uploaded ? (
          <>
            <div className="mb-4 text-center">
              <p className="text-xl font-medium text-slate-900">CV ATS Analyzer</p>
            </div>

            {/* Explanation Section */}
            <section className="mb-16">
              <div className="mb-12">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">Tau Persis Kenapa CV Kamu Sering Diabaikan</h2>
                <p className="text-slate-600 mb-6">Kebanyakan CV tidak lolos ATS filter. Halolearn membantu kamu optimize CV agar HR bisa lihat kualifikasimu</p>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 border border-blue-200">
                    <div className="text-3xl mb-3">🤖</div>
                    <h3 className="font-semibold text-slate-900 mb-2">ATS Score Check</h3>
                    <p className="text-sm text-slate-600">Rating CV kamu terhadap standard ATS terbaru</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 border border-green-200">
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="font-semibold text-slate-900 mb-2">Detailed Analysis</h3>
                    <p className="text-sm text-slate-600">Breakdown per kategori dengan actionable insights</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6 border border-purple-200">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="font-semibold text-slate-900 mb-2">Role Matching</h3>
                    <p className="text-sm text-slate-600">Posisi yang paling cocok dengan profile CV</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8">
                <h3 className="font-semibold text-slate-900 mb-4">Apa yang akan kami analisis?</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span>✓</span> ATS compatibility & keyword optimization
                  </li>
                  <li className="flex gap-3">
                    <span>✓</span> Formatting & structure issues
                  </li>
                  <li className="flex gap-3">
                    <span>✓</span> Skills presentation & relevance
                  </li>
                  <li className="flex gap-3">
                    <span>✓</span> Rekomendasi improvement dengan contoh
                  </li>
                  <li className="flex gap-3">
                    <span>✓</span> Proyeksi score improvement & next steps
                  </li>
                </ul>
              </div>
            </section>

            {/* Upload Section */}
            <div className="mb-12">
              <div
                onDrop={handleDragDrop}
                onDragOver={(e) => e.preventDefault()}
                className="rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-white to-slate-50 p-12 text-center hover:border-slate-900 hover:bg-gradient-to-br hover:from-slate-50 hover:to-slate-100 transition cursor-pointer shadow-sm"
              >
                <div className="text-4xl mb-4">📄</div>
                <h3 className="font-semibold text-slate-900 mb-2">Upload CV Kamu</h3>
                <p className="text-slate-600 mb-6">Drag and drop atau klik untuk pilih file</p>
                <p className="text-xs text-slate-500 mb-6">Format: PDF, DOC, DOCX (max 10MB)</p>
                <button
                  onClick={handleUploadClick}
                  className="rounded-lg bg-slate-900 px-8 py-3 text-white font-medium hover:bg-slate-800 transition"
                >
                  Pilih File
                </button>
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
          </>
        ) : (
          <>
            {/* Results Container with Blur */}
            <div className="mb-12 relative">
              <h2 className="mb-8 text-3xl font-bold text-slate-900">Hasil Analisis CV Kamu</h2>

              {/* Blurred Results Content */}
              <div className="relative" style={{ filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' }}>
                {/* ATS Score */}
                <div className="mb-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
                  <p className="mb-6 text-center text-sm uppercase tracking-wider text-slate-500 font-semibold">ATS Score</p>
                  <div className="flex flex-col items-center">
                    <div className="relative h-40 w-40">
                      <svg className="h-full w-full" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          strokeDasharray={`${(analysisData.atsScore / 100) * 314.159} 314.159`}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dasharray 1.5s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-amber-600">{analysisData.atsScore}</span>
                        <span className="text-xs text-slate-600 mt-1">/100</span>
                      </div>
                    </div>
                    <p className="mt-8 text-xl font-semibold text-slate-900">Cukup Baik</p>
                    <p className="mt-2 text-center text-sm text-slate-600 max-w-xs">Ada beberapa area yang perlu diperbaiki untuk maksimalkan peluang lolos ATS filter</p>
                  </div>
                </div>

                {/* Role Matches */}
                <div className="mb-12">
                  <h3 className="mb-6 text-lg font-semibold text-slate-900">🎯 CV Kamu Paling Cocok Untuk:</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {analysisData.roleMatches.map((match) => (
                      <div key={match.role} className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-slate-900 text-sm">{match.role}</h4>
                          <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">{match.score}%</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{match.reasoning}</p>
                        <div className="mt-4 flex-1 bg-slate-200 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: `${match.score}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="mb-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8">
                  <h3 className="mb-6 text-lg font-semibold text-slate-900">📊 Category Breakdown</h3>
                  <div className="space-y-5">
                    {analysisData.categoryBreakdown.map((category) => (
                      <div key={category.label}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-slate-900">{category.label}</span>
                          <span className="text-sm font-semibold text-slate-600">{category.score}/100</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className={`${category.color} h-2.5 rounded-full transition-all duration-1000`} style={{width: `${category.score}%`}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problems */}
                <div className="mb-12">
                  <h3 className="mb-6 text-lg font-semibold text-slate-900">❌ Issues Found</h3>
                  <div className="space-y-4">
                    {analysisData.problems.map((problem) => (
                      <div key={problem.id} className="rounded-lg border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-slate-900">{problem.title}</h4>
                          <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">{problem.level}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-slate-600">❌ <strong>Wrong:</strong> <em>"{problem.wrong}"</em></p>
                          </div>
                          <div>
                            <p className="text-green-700">✅ <strong>Better:</strong> <em>"{problem.right}"</em></p>
                          </div>
                        </div>
                      </div>
                    ))}
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
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Hasil Analisa CV Kamu Sudah Siap!</h3>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                      {/* Option 1 - Basic */}
                      <div className="border-2 border-slate-300 rounded-xl p-6 bg-slate-50">
                        <h4 className="text-lg font-bold text-slate-900 mb-1">Analisa Basic</h4>
                        <div className="text-3xl font-bold text-slate-900 mb-1">Rp50.000</div>
                        <span className="inline-block px-3 py-1 mb-4 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">⚡ Selesai dalam 30 menit</span>

                        <ul className="space-y-2 mb-6 text-sm text-slate-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>ATS Score</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>3 masalah utama</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Rekomendasi dasar</span>
                          </li>
                        </ul>

                        <a
                          href={paymentLinkBasic}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-bold py-3 px-4 rounded-lg text-center transition"
                        >
                          Bayar Rp50.000 →
                        </a>
                      </div>

                      {/* Option 2 - Premium (Highlighted) */}
                      <div className="border-2 border-slate-900 rounded-xl p-6 bg-white relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3">
                          <span className="text-sm font-bold text-slate-900">⭐ REKOMENDASI</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">Analisa Premium</h4>
                        <div className="text-3xl font-bold text-slate-900 mb-1">Rp80.000</div>
                        <span className="inline-block px-3 py-1 mb-4 bg-green-100 text-green-700 text-xs font-semibold rounded-full">⚡ Selesai dalam 30 menit</span>

                        <ul className="space-y-2 mb-6 text-sm text-slate-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>ATS Score + 8 masalah detail</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Role match + keyword gap</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold mt-0.5">✅</span>
                            <span>Rekomendasi lengkap per bagian</span>
                          </li>
                        </ul>

                        <a
                          href={paymentLinkPremium}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg text-center transition"
                        >
                          Bayar Rp80.000 →
                        </a>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 text-center">
                      💬 <strong>Pembayaran via WhatsApp</strong> — Konfirmasi transfer dan hasil dikirim dalam 5 menit
                    </p>

                    <div className="border-t border-slate-200 mt-6 pt-6">
                      <p className="text-xs text-slate-600 text-center">
                        Atau ambil paket <strong>Supreme</strong> mulai Rp335.000 — termasuk analisa + revisi CV + konsultasi
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

export default function CVAnalyzerPage() {
  return (
    <AuthGuard>
      <CVAnalyzerContent />
    </AuthGuard>
  );
}
