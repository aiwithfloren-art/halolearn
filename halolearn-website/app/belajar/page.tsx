'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

const WA_NUMBER = '6285260421274';

const roles = [
  {
    slug: 'management-trainee',
    name: 'Management Trainee',
    short: 'MT',
    icon: '🎯',
    price: 'Rp75.000',
    description: 'Kuasai interview MT perusahaan top. Soal berbasis kasus leadership & strategy.',
    tags: ['Leadership', 'Problem Solving', 'Strategy'],
  },
  {
    slug: 'mt-bumn',
    name: 'MT BUMN',
    short: 'MT BUMN',
    icon: '🏛️',
    price: 'Rp75.000',
    description: 'Siap Rekrutmen Bersama BUMN. Regulasi, GCG, AKHLAK, banking, energi, tambang, infra.',
    tags: ['RBB', 'GCG', 'AKHLAK', 'BUMN Sectors'],
  },
  {
    slug: 'akuntansi',
    name: 'Akuntansi',
    short: 'Akuntan',
    icon: '📊',
    price: 'Rp75.000',
    description: 'Siap wawancara akuntan & keuangan. Dari jurnal hingga laporan keuangan & audit.',
    tags: ['Jurnal', 'Laporan Keuangan', 'Audit'],
  },
  {
    slug: 'admin',
    name: 'Administrasi',
    short: 'Admin',
    icon: '📋',
    price: 'Rp75.000',
    description: 'Latihan soal administrasi perkantoran, SOP, korespondensi & manajemen dokumen.',
    tags: ['SOP', 'Korespondensi', 'Pengarsipan'],
  },
  {
    slug: 'human-resources',
    name: 'Human Resources',
    short: 'HR',
    icon: '👥',
    price: 'Rp75.000',
    description: 'Rekrutmen, UU Ketenagakerjaan, HRIS, dan performance management untuk posisi HR.',
    tags: ['Rekrutmen', 'UU Ketenagakerjaan', 'HRIS'],
  },
  {
    slug: 'odp-bank',
    name: 'ODP Bank',
    short: 'ODP',
    icon: '🏦',
    price: 'Rp75.000',
    description: 'Operasional bank, analisis kredit, regulasi OJK & manajemen risiko untuk ODP.',
    tags: ['Kredit', 'OJK', 'Risk Management'],
  },
];

const steps = [
  { step: '01', title: 'Pilih Role', desc: 'Pilih posisi yang ingin kamu lamar' },
  { step: '02', title: 'Chat WA', desc: 'Hubungi Minlearn, info email kamu' },
  { step: '03', title: 'Dapat Kode', desc: 'Admin kirim kode akses via WA setelah konfirmasi bayar' },
  { step: '04', title: 'Akses', desc: 'Login, redeem kode & mulai latihan!' },
];

function buildWaLink(role: string, email: string) {
  const text = `Halo Minlearn! Saya mau beli akses ${role}. Email saya: ${email || '[isi email kamu]'}. Mohon info pembayarannya.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function BelajarPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'individual' | 'bundle'>('individual');

  const bundleWa = buildWaLink('Bundle Semua Role (MT + Akuntansi + Admin + HR + ODP Bank)', session?.user?.email ?? '');

  return (
    <main className="min-h-screen bg-[#0A0E1A] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#F5C518] font-bold text-xl">Halolearn</span>
            <span className="text-white/40 text-sm hidden sm:block">/</span>
            <span className="text-white/70 text-sm hidden sm:block">Belajar</span>
          </Link>
          <div className="flex items-center gap-3">
            {session ? (
              <Link
                href="/belajar/dashboard"
                className="bg-[#F5C518] text-[#0A0E1A] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="bg-[#F5C518] text-[#0A0E1A] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#F5C518]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/30 text-[#F5C518] px-4 py-2 rounded-full text-sm font-medium mb-6">
            🎓 Platform Interview Prep Halolearn
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Persiapkan <span className="text-[#F5C518]">Interview</span> Kamu
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            100+ soal interview per role, berbasis kasus nyata. Belajar dari modul kami, pahami penjelasan,
            lalu uji kemampuan dengan quiz timed — kapan saja, di mana saja.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#roles"
              className="bg-[#F5C518] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition"
            >
              Lihat Paket Belajar
            </a>
            {session ? (
              <Link
                href="/belajar/dashboard"
                className="border border-[#F5C518]/40 text-[#F5C518] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#F5C518]/10 transition flex items-center gap-2 justify-center"
              >
                🎟️ Redeem Kode Akses
              </Link>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="border border-[#F5C518]/40 text-[#F5C518] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#F5C518]/10 transition flex items-center gap-2 justify-center"
              >
                🔐 Login untuk Redeem
              </button>
            )}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Minlearn! Saya mau tanya tentang Platform Belajar Halolearn 🙏')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 transition flex items-center gap-2 justify-center"
            >
              <span>💬</span> Tanya via WA
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 border-y border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-[#F5C518]">5</div>
            <div className="text-white/60 text-sm">Role Tersedia</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#F5C518]">100+</div>
            <div className="text-white/60 text-sm">Soal per Role</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#F5C518]">3</div>
            <div className="text-white/60 text-sm">Level Kesulitan</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#F5C518]">80%</div>
            <div className="text-white/60 text-sm">Passing Score</div>
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section id="roles" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Pilih Paket Belajarmu</h2>
            <p className="text-white/60">Tersedia 5 role — pilih sesuai posisi yang ingin kamu lamar</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/5 rounded-xl p-1 flex gap-1">
              <button
                onClick={() => setActiveTab('individual')}
                className={`px-6 py-2 rounded-lg font-semibold transition text-sm ${
                  activeTab === 'individual'
                    ? 'bg-[#F5C518] text-[#0A0E1A]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Per Role
              </button>
              <button
                onClick={() => setActiveTab('bundle')}
                className={`px-6 py-2 rounded-lg font-semibold transition text-sm ${
                  activeTab === 'bundle'
                    ? 'bg-[#F5C518] text-[#0A0E1A]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Bundle Hemat ✨
              </button>
            </div>
          </div>

          {activeTab === 'individual' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div
                  key={role.slug}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#F5C518]/40 transition group"
                >
                  <div className="text-4xl mb-4">{role.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{role.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{role.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#F5C518]/10 text-[#F5C518] text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="text-2xl font-black text-[#F5C518]">{role.price}</span>
                    <Link
                      href={`/belajar/${role.slug}`}
                      className="bg-[#F5C518] text-[#0A0E1A] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition"
                    >
                      Detail →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-[#F5C518]/20 to-[#F5C518]/5 border-2 border-[#F5C518]/50 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-[#F5C518] text-[#0A0E1A] text-xs font-bold px-3 py-1 rounded-full">
                  HEMAT 7%
                </div>
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-black mb-2">Bundle Semua Role</h3>
                <p className="text-white/70 mb-4">
                  Akses MT, Akuntansi, Admin, HR, dan ODP Bank sekaligus. Total 500+ soal!
                </p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-white/40 line-through text-lg">Rp375.000</span>
                  <span className="text-4xl font-black text-[#F5C518]">Rp350.000</span>
                </div>
                <p className="text-white/50 text-sm mb-6">Hemat Rp25.000 vs beli satuan</p>
                <div className="grid grid-cols-5 gap-2 mb-8">
                  {roles.map((r) => (
                    <div key={r.slug} className="bg-white/10 rounded-lg p-2 text-center">
                      <div className="text-xl mb-1">{r.icon}</div>
                      <div className="text-xs text-white/60">{r.short}</div>
                    </div>
                  ))}
                </div>
                <a
                  href={bundleWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#F5C518] text-[#0A0E1A] py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition block"
                >
                  💬 Beli Bundle via WA
                </a>
                <p className="text-white/40 text-xs mt-4">
                  Chat Minlearn → konfirmasi bayar → dapat kode akses via WA
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Cara Dapatkan Akses</h2>
            <p className="text-white/60">Proses mudah, kode akses masuk dalam hitungan jam</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-[#F5C518]/20" />
                )}
                <div className="w-16 h-16 bg-[#F5C518]/10 border border-[#F5C518]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-[#F5C518] font-black text-lg">{s.step}</span>
                </div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Info */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold text-lg mb-3">Cara Bayar</h3>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Hubungi <span className="text-[#F5C518] font-semibold">Minlearn via WhatsApp</span>,
              sebutkan role yang diinginkan & email kamu. Admin akan kirim info pembayaran.
              Setelah konfirmasi, <span className="text-[#F5C518] font-semibold">kode akses dikirim langsung via WA</span>.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Minlearn! Saya mau beli akses Platform Belajar Halolearn. Mohon info pembayarannya 🙏')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
            >
              <span>💬</span> Chat Minlearn Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 text-center text-white/40 text-sm">
        <p>© 2025 Halolearn. Platform Interview Prep #1 Indonesia</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/" className="hover:text-white/70 transition">Beranda</Link>
          <Link href="/belajar/dashboard" className="hover:text-white/70 transition">Dashboard</Link>
        </div>
      </footer>
    </main>
  );
}
