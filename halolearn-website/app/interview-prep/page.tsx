'use client';

import Link from 'next/link';
import { interviewData } from '../data/interviewQuestions';
import DarkHero from '../components/DarkHero';

const whatsappLink = 'https://wa.me/6285260421274?text=Halo%2C%20saya%20mau%20beli%20akses%20Interview%20Prep%20Halolearn%20seharga%20Rp195.000';

export default function InterviewPrepPage() {
  const roles = Object.keys(interviewData) as Array<keyof typeof interviewData>;

  return (
    <main className="bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">halolearn</Link>
          <nav className="hidden gap-8 md:flex">
            <Link href="/cv-analyzer" className="text-sm text-slate-600 hover:text-slate-900">CV Analyzer</Link>
            <Link href="/interview-prep" className="text-sm font-medium text-slate-900">Interview Prep</Link>
            <Link href="/harga" className="text-sm text-slate-600 hover:text-slate-900">Harga</Link>
          </nav>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Beli Akses
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <DarkHero
        subtitle="🎯 Interview Cheat Sheet"
        title="Contekan Interview Anti Gugup"
        description="Latihan dengan pertanyaan nyata yang sering ditanyakan HRD. Lengkap dengan jawaban model + penjelasan strategi."
      />

      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Role Preview Cards - All Locked */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Tersedia untuk 10+ Role</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {roles.slice(0, 6).map((role) => (
              <div
                key={role}
                className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition opacity-60 cursor-not-allowed"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{interviewData[role].title}</h3>
                    <p className="text-sm text-slate-500 mt-2">50+ pertanyaan</p>
                  </div>
                  <span className="text-2xl">🔒</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16 rounded-xl border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Apa yang Kamu Dapatkan:</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span className="text-slate-700"><strong>50+ pertanyaan per role</strong> yang sering ditanyakan HRD</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span className="text-slate-700"><strong>Jawaban model + strategi</strong> yang terbukti meningkatkan confidence</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span className="text-slate-700"><strong>Update rutin</strong> setiap bulan dengan pertanyaan terbaru</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span className="text-slate-700"><strong>10+ role berbeda</strong> dari entry-level hingga senior</span>
            </li>
          </ul>
        </section>

        {/* Sample Question Teaser */}
        <section className="mb-16">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Contoh Pertanyaan:</h3>
          <div className="relative rounded-xl border border-slate-200 bg-white p-8">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/80 pointer-events-none rounded-xl"></div>
            <div className="relative blur-sm opacity-50">
              <p className="text-slate-700 font-medium mb-4">Ceritakan tentang diri Anda dan pengalaman kerja Anda</p>
              <p className="text-slate-600 text-sm">
                Jawaban model akan menunjukkan bagaimana menjawab pertanyaan ini dengan strategi STAR method...
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-slate-600 mt-4">
            <em>Beli akses untuk melihat jawaban lengkap dan 50+ pertanyaan lainnya</em>
          </p>
        </section>

        {/* Pricing & CTA */}
        <section className="mb-16">
          <div className="rounded-2xl border-2 border-amber-500 bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-center shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-4">Rp195.000</h3>
            <p className="text-slate-300 mb-6">Akses unlimited untuk semua 10+ role + update selamanya</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-lg bg-white px-8 py-3 text-slate-900 font-semibold hover:bg-slate-100 transition shadow-md"
            >
              Beli Akses Interview Prep →
            </a>
            <p className="text-xs text-slate-400 mt-6 max-w-md mx-auto">
              Sudah punya paket Supreme? Akses gratis — hubungi admin untuk aktivasi
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
