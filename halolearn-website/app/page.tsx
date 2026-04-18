'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import AnimatedCounter from './components/AnimatedCounter';
import PromoCountdown from './components/PromoCountdown';
import LoginGate from './components/LoginGate';
import DarkHero from './components/DarkHero';

const whatsappLink = 'https://wa.me/6285260421274?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20Halolearn';

export default function Home() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-white text-slate-900">
      <PromoCountdown />
      <LoginGate />
      {/* Navbar */}
      <header className={`sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-none'}`} style={{backgroundColor: 'rgba(255, 255, 255, 0.95)'}}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">halolearn</Link>
          {/* Desktop nav */}
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/belajar" className="text-sm font-medium text-amber-600 hover:text-amber-700">✨ Belajar</Link>
            <Link href="/career-copilot" className="text-sm font-medium text-green-600 hover:text-green-700">🚀 Career Copilot</Link>
            <Link href="/harga" className="text-sm text-slate-600 hover:text-slate-900">Harga</Link>
            <Link href="/cv-analyzer" className="text-sm text-slate-600 hover:text-slate-900">CV Analyzer</Link>
            <Link href="/success-stories" className="text-sm text-slate-600 hover:text-slate-900">Success Stories</Link>
          </nav>
          <div className="flex items-center gap-3">
            {session ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/belajar/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Dashboard</Link>
                <button onClick={() => signOut()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition">Keluar</button>
              </div>
            ) : (
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="hidden md:inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition">
                Hubungi Kami
              </a>
            )}
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">
            <Link href="/" className="block text-sm text-slate-600 py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/belajar" className="block text-sm font-medium text-amber-600 py-2" onClick={() => setMobileMenuOpen(false)}>✨ Belajar — Soal Interview</Link>
            <Link href="/career-copilot" className="block text-sm font-medium text-green-600 py-2" onClick={() => setMobileMenuOpen(false)}>🚀 Career Copilot — BARU!</Link>
            <Link href="/harga" className="block text-sm text-slate-600 py-2" onClick={() => setMobileMenuOpen(false)}>Harga Layanan</Link>
            <Link href="/cv-analyzer" className="block text-sm text-slate-600 py-2" onClick={() => setMobileMenuOpen(false)}>CV Analyzer</Link>
            <Link href="/success-stories" className="block text-sm text-slate-600 py-2" onClick={() => setMobileMenuOpen(false)}>Success Stories</Link>
            {session ? (
              <>
                <Link href="/belajar/dashboard" className="block text-sm text-slate-600 py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard Belajar</Link>
                <button onClick={() => signOut()} className="block w-full text-left text-sm text-slate-600 py-2">Keluar</button>
              </>
            ) : (
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="block rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white text-center mt-2" onClick={() => setMobileMenuOpen(false)}>
                Hubungi Kami — Chat WA
              </a>
            )}
          </div>
        )}
      </header>

      {/* Hero Section with DarkHero */}
      <DarkHero
        subtitle="🏆 Dipercaya 10.000+ Kandidat di Indonesia"
        title="CV Kamu Belum Lolos ATS? Kami Bisa Bantu."
        description="Halolearn bikin CV kamu dilirik recruiter — bukan cuma bagus, tapi lolos sistem ATS. Sudah bantu ribuan fresh grad & profesional dapat interview."
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link
            href="/cv-analyzer"
            className="animate-pulse-button rounded-xl bg-white px-8 py-4 text-sm font-bold text-slate-900 hover:bg-slate-100 transition shadow-lg shadow-white/20"
          >
            Analisa CV — Mulai Rp50.000
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/30 px-8 py-4 text-sm font-medium text-white hover:bg-white/10 transition backdrop-blur-sm"
          >
            💬 Konsultasi via WhatsApp
          </a>
        </div>
      </DarkHero>

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Stats Section */}
        <section className="mb-32 -mt-12 relative z-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200/60 p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg">📊</div>
              <AnimatedCounter target={10247} label="Klien Terbantu" suffix="+" />
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-200/60 p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg">✅</div>
              <AnimatedCounter target={95} label="Tingkat Sukses" suffix="%" />
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200/60 p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg">⚡</div>
              <div className="text-4xl font-bold text-slate-900">2-6</div>
              <p className="mt-2 text-sm text-slate-600">Bulan Mendapat Kerja</p>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="mb-32 rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-8 md:p-14 shadow-sm">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white mb-4">🎓 UNIVERSITAS</span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Dipercaya oleh Mahasiswa & Alumni dari 50+ Universitas</h3>
            <p className="mt-2 text-sm text-slate-600">Ribuan mahasiswa dan alumni dari berbagai universitas terkemuka sudah mempercayakan persiapan karir mereka ke Halolearn</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Universitas Indonesia', 'UGM', 'ITB', 'Universitas Airlangga', 'BINUS', 'ITS', 'UNDIP', 'UNPAD', 'Universitas Brawijaya', 'Universitas Diponegoro', 'UNJ', 'Universitas Trisakti', 'Universitas Atmajaya', 'UPN Veteran', 'Politeknik UI'].map((univ) => (
              <span key={univ} className="px-4 py-2 bg-white border border-slate-300 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:border-slate-400 transition">
                {univ}
              </span>
            ))}
            <span className="px-4 py-2 bg-slate-50 border border-dashed border-slate-300 rounded-full text-sm text-slate-500">
              +35 universitas lainnya
            </span>
          </div>
        </section>

        {/* Product Chooser — Quick Navigation */}
        <section className="mb-32 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 md:p-14 shadow-sm border border-slate-100">
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white mb-4">PILIH LAYANAN</span>
            <h2 className="text-3xl font-bold text-slate-900">Mau Mulai dari Mana?</h2>
            <p className="mt-2 text-slate-600">Pilih sesuai kebutuhan kamu sekarang</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/cv-analyzer" className="group rounded-2xl border-2 border-slate-200 bg-white p-8 text-center hover:border-slate-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl group-hover:bg-slate-900 group-hover:scale-110 transition-all duration-300">📄</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Analisa CV</h3>
              <p className="text-sm text-slate-600 mb-5">Cek ATS score & dapat feedback detail untuk perbaiki CV kamu</p>
              <span className="inline-block rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">Mulai dari Rp50.000 &rarr;</span>
            </Link>
            <Link href="/belajar" className="group rounded-2xl border-2 border-amber-200 bg-gradient-to-b from-amber-50/80 to-white p-8 text-center hover:border-amber-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">🎯</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Latihan Interview</h3>
              <p className="text-sm text-slate-600 mb-5">100 soal real per role — MT, Akuntansi, HR, Admin, ODP Bank</p>
              <span className="inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">Mulai dari Rp75.000 &rarr;</span>
            </Link>
            <Link href="/career-copilot" className="group rounded-2xl border-2 border-green-200 bg-gradient-to-b from-green-50/80 to-white p-8 text-center hover:border-green-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">🚀</div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Career Copilot</h3>
              <p className="text-sm text-slate-600 mb-5">Gap analysis, CV targeted, cover letter — semua sesuai target role</p>
              <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">Mulai dari Rp100.000 &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="mb-32">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-4">LAYANAN KAMI</span>
            <h2 className="text-3xl font-bold text-slate-900">Apa yang Halolearn Bisa Bantu?</h2>
            <p className="mt-2 text-slate-600">Layanan lengkap dari CV sampai dapet kerja</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '📄', title: 'CV ATS-Friendly', desc: 'CV yang lolos filter ATS dan langsung sampai ke tangan recruiter', color: 'bg-blue-50' },
              { icon: '💼', title: 'LinkedIn Optimization', desc: 'Profile LinkedIn yang bikin HRD tertarik — bukan sekedar lengkap, tapi standout', color: 'bg-purple-50' },
              { icon: '🎯', title: 'Konsultasi Karir', desc: 'Diskusi 1-on-1 dengan tim Halolearn untuk strategi karir kamu', color: 'bg-amber-50' },
              { icon: '🎤', title: 'Interview Prep', desc: 'Simulasi interview + coaching untuk tampil percaya diri', color: 'bg-green-50' }
            ].map((service) => (
              <div key={service.title} className="group rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${service.color} text-2xl group-hover:scale-110 transition-transform duration-300`}>{service.icon}</div>
                <h3 className="font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-32">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 mb-4">CARA KERJA</span>
            <h2 className="text-3xl font-bold text-slate-900">Semudah 1-2-3</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
            {[
              { num: '1', icon: '📤', title: 'Upload CV', desc: 'Unggah CV kamu dalam format PDF atau Word' },
              { num: '2', icon: '👥', title: 'Review oleh Tim', desc: 'Tim Halolearn review CV kamu secara mendalam dan beri feedback detail' },
              { num: '3', icon: '💬', title: 'Konsultasi', desc: 'Chat dengan mentor untuk strategi improvement' }
            ].map((step) => (
              <div key={step.num} className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:shadow-md transition">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-lg shadow-lg relative z-10">{step.num}</div>
                <div className="mb-4 text-4xl">{step.icon}</div>
                <h3 className="font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-32 -mx-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-5" />
          <div className="mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-14">
              <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/80 mb-4">TESTIMONI</span>
              <h2 className="text-3xl font-bold text-white">Apa Kata Mereka?</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  quote: 'CV nya beneran ngefek! Lolos tahap screening di 4 perusahaan meskipun aku belum lulus. Langsung accept offering dalam hitungan hari setelah CV selesai.',
                  name: 'R.A.',
                  role: 'Fresh Graduate — Universitas Negeri'
                },
                {
                  quote: 'Awalnya ragu karena sudah coba CV review di tempat lain hasilnya sama aja. Setelah Halolearn, profile summary jadi keliatan bagus dan profesional banget.',
                  name: 'D.P.',
                  role: 'Fresh Graduate — sedang job hunting'
                },
                {
                  quote: 'Dari jarang dapat panggilan, sekarang dapat 3 interview sekaligus dalam 2 minggu. Worth every penny!',
                  name: 'B.K.',
                  role: 'Profesional — ingin switch karir'
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="rounded-2xl bg-white p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-4 flex gap-1 text-amber-400">{'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}</div>
                  <p className="mb-6 text-slate-700 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm">{testimonial.name[0]}</div>
                    <div>
                      <p className="font-bold text-slate-900">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LinkedIn Proof Section */}
        <section className="mb-32 -mx-6 bg-slate-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">Hasil Nyata LinkedIn Branding Halolearn</h2>
              <p className="text-slate-600 text-lg">Bukan janji — ini data asli dari dashboard LinkedIn klien kami</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-8 md:grid-cols-3 mb-16">
              <div className="rounded-xl bg-slate-900 p-8 text-center shadow-lg">
                <div className="text-5xl font-bold text-amber-400">+321.050%</div>
                <div className="mt-4 text-white text-lg font-medium">Peningkatan Tayangan</div>
              </div>
              <div className="rounded-xl bg-slate-900 p-8 text-center shadow-lg">
                <div className="text-5xl font-bold text-amber-400">6.423</div>
                <div className="mt-4 text-white text-lg font-medium">Tayangan dalam 7 hari</div>
              </div>
              <div className="rounded-xl bg-slate-900 p-8 text-center shadow-lg">
                <div className="text-5xl font-bold text-amber-400">273</div>
                <div className="mt-4 text-white text-lg font-medium">Followers Baru dalam 7 hari</div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {[
                '/proof/linkedin-proof-1.jpg',
                '/proof/linkedin-proof-2.jpg',
                '/proof/linkedin-proof-3.jpg'
              ].map((image, idx) => (
                <div key={idx} className="relative h-80 rounded-xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <Image
                    src={image}
                    alt={`LinkedIn Analytics Proof ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Caption */}
            <p className="text-center text-sm text-slate-600 mb-8 italic">
              *Screenshot asli dari dashboard LinkedIn Analytics klien. Nama & foto disamarkan untuk privasi.
            </p>

            {/* CTA */}
            <div className="text-center">
              <a
                href="https://wa.me/6285260421274?text=Halo%2C%20saya%20mau%20tanya%20tentang%20paket%20LinkedIn%20Branding%20Halolearn"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-lg bg-amber-500 hover:bg-amber-600 px-8 py-3.5 text-sm font-medium text-white transition shadow-md"
              >
                Mau hasil seperti ini? → LinkedIn Branding mulai Rp599.000/bulan
              </a>
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="mb-32 -mx-6 bg-white px-6 py-20 border-y border-slate-200">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="mb-3 text-3xl font-bold text-slate-900">Kandidat Kami Sudah Diterima di</h2>
              <p className="text-slate-600">100+ perusahaan terkemuka Indonesia & global</p>
            </div>

            <div className="space-y-6">
            {/* Row 1 */}
            <div className="overflow-hidden">
              <div className="animate-marquee">
                {[
                  { name: 'Gojek', color: '#00AA5B' },
                  { name: 'Tokopedia', color: '#42B549' },
                  { name: 'Shopee', color: '#EE4D2D' },
                  { name: 'Traveloka', color: '#0064D2' },
                  { name: 'Telkom', color: '#DC2626' },
                  { name: 'BCA', color: '#003F87' },
                  { name: 'Bank Mandiri', color: '#003087' },
                  { name: 'Unilever', color: '#1F3C88' },
                  { name: 'Astra', color: '#003087' },
                  { name: 'Pertamina', color: '#0050A0' },
                  { name: 'DANA', color: '#108EE9' },
                  { name: 'OVO', color: '#4C3494' },
                  { name: 'Grab', color: '#00B14F' },
                  { name: 'Bukalapak', color: '#E31E25' },
                  { name: 'Lazada', color: '#0F146D' },
                  { name: 'Blibli', color: '#0095DA' },
                ].concat([
                  { name: 'Gojek', color: '#00AA5B' },
                  { name: 'Tokopedia', color: '#42B549' },
                  { name: 'Shopee', color: '#EE4D2D' },
                  { name: 'Traveloka', color: '#0064D2' },
                  { name: 'Telkom', color: '#DC2626' },
                  { name: 'BCA', color: '#003F87' },
                  { name: 'Bank Mandiri', color: '#003087' },
                  { name: 'Unilever', color: '#1F3C88' },
                ]).map((company, idx) => (
                  <div
                    key={idx}
                    className="mx-3 flex-shrink-0 rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-8 rounded"
                        style={{ backgroundColor: company.color }}
                      />
                      <span className="font-semibold text-slate-900 text-sm">{company.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Reverse */}
            <div className="overflow-hidden">
              <div className="animate-marquee-reverse">
                {[
                  { name: 'Indosat Ooredoo', color: '#E60012' },
                  { name: 'XL Axiata', color: '#FF6600' },
                  { name: 'Axis', color: '#FF6600' },
                  { name: 'BRI', color: '#00539B' },
                  { name: 'Bank Rakyat', color: '#003087' },
                  { name: 'Jasa Mitra', color: '#FF9800' },
                  { name: 'Toko Emas', color: '#FFD700' },
                  { name: 'Kalbe', color: '#0066CC' },
                  { name: 'Bayer', color: '#00843D' },
                  { name: 'Sanofi', color: '#003DA5' },
                  { name: 'GSK', color: '#003087' },
                  { name: 'Roche', color: '#0066CC' },
                  { name: 'Garuda Indonesia', color: '#00539B' },
                  { name: 'Cathay Pacific', color: '#00539B' },
                  { name: 'Singapore Airlines', color: '#FFFFFF' },
                  { name: 'Thai Airways', color: '#FFD700' },
                ].concat([
                  { name: 'Indosat Ooredoo', color: '#E60012' },
                  { name: 'XL Axiata', color: '#FF6600' },
                  { name: 'Axis', color: '#FF6600' },
                  { name: 'BRI', color: '#00539B' },
                  { name: 'Bank Rakyat', color: '#003087' },
                  { name: 'Jasa Mitra', color: '#FF9800' },
                ]).map((company, idx) => (
                  <div
                    key={idx}
                    className="mx-3 flex-shrink-0 rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-8 rounded"
                        style={{ backgroundColor: company.color }}
                      />
                      <span className="font-semibold text-slate-900 text-sm">{company.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            <div className="text-center mt-8">
              <span className="inline-block px-4 py-2 bg-slate-100 border border-slate-300 rounded-full text-sm text-slate-600">
                +88 perusahaan lainnya
              </span>
            </div>
          </div>
        </section>

        {/* Belajar Section */}
        <section className="mb-20 -mx-6 bg-gradient-to-br from-amber-50 to-orange-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 mb-4">✨ BARU — Platform Belajar</span>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Latihan Soal Interview Sesuai Posisi Kamu</h2>
                <p className="text-slate-600 mb-6">85% kandidat gagal interview bukan karena tidak pintar — tapi karena tidak tahu apa yang ditanyakan. Latihan dengan 100 soal real per role, dilengkapi penjelasan dan timer.</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {['Management Trainee', 'Akuntansi', 'Administrasi', 'Human Resources', 'ODP Bank'].map((role) => (
                    <span key={role} className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">{role}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link href="/belajar" className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition">
                    Lihat Modul Belajar
                  </Link>
                  <span className="text-sm text-slate-600">Mulai dari <strong>Rp75.000</strong> / role</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:w-64 flex-shrink-0">
                {[
                  { label: '100', sub: 'Soal per role' },
                  { label: '5', sub: 'Role tersedia' },
                  { label: '80%', sub: 'Passing score' },
                  { label: '1 Tahun', sub: 'Masa akses' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white border border-amber-200 p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-slate-900">{stat.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Career Copilot Section */}
        <section className="mb-20 -mx-6 bg-gradient-to-br from-green-50 to-emerald-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-xl">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 mb-4">🚀 BARU — Career Copilot</span>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Tau Target Role Kamu? Kita Bantu Sampai Sana.</h2>
                <p className="text-slate-600 mb-6">Career Copilot dimulai dari posisi yang kamu incar. Kami analisis gap skill, bangun CV spesifik role, dan siapkan cover letter yang connect pengalamanmu ke target posisi.</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {['Gap Analysis', 'CV Spesifik Role', 'Cover Letter', 'Roadmap Karir'].map((item) => (
                    <span key={item} className="rounded-full border border-green-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">{item}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link href="/career-copilot" className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition">
                    Lihat Career Copilot
                  </Link>
                  <span className="text-sm text-slate-600">Mulai dari <strong>Rp100.000</strong></span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:w-64 flex-shrink-0">
                {[
                  { label: '🎯', sub: 'Role-first approach' },
                  { label: '📊', sub: 'Gap analysis' },
                  { label: '📄', sub: 'CV targeted' },
                  { label: '💌', sub: 'Cover letter' },
                ].map((stat) => (
                  <div key={stat.sub} className="rounded-xl bg-white border border-green-200 p-4 text-center shadow-sm">
                    <div className="text-2xl">{stat.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Snippet */}
        <section className="mb-20">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs font-semibold text-amber-700 mb-4">HARGA</span>
            <h2 className="text-3xl font-bold text-slate-900">Investasi Kecil, Dampak Besar</h2>
            <p className="mt-2 text-slate-600">Mulai dari Rp50.000 untuk analisa CV. Paket lengkap mulai Rp195.000.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Analisa CV', desc: 'ATS score + 3 masalah utama + rekomendasi dasar', price: 'Rp50.000', tag: 'Mulai Cepat' },
              { name: 'Analisa CV Premium', desc: 'ATS score + 8 masalah detail + role match + rekomendasi lengkap', price: 'Rp80.000', tag: 'Paling Populer', popular: true },
              { name: 'Supreme 1', desc: 'CV + LinkedIn + Konsul 2 Minggu + Revisi', price: 'Rp335.000', old: 'Rp365.000', best: true },
              { name: 'Supreme 2', desc: 'CV + LinkedIn + Cover Letter + Konsul 1 Bulan', price: 'Rp435.000', old: 'Rp465.000' },
            ].map((pkg, i) => (
              <div key={i} className={`rounded-2xl p-7 border-2 relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${pkg.best ? 'border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-900/20' : pkg.popular ? 'border-amber-400 bg-gradient-to-b from-amber-50 to-white shadow-lg shadow-amber-500/10' : 'border-slate-200 bg-white'}`}>
                {pkg.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-white shadow-md">POPULER</span></div>}
                {pkg.tag && !pkg.popular && <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700`}>{pkg.tag}</span>}
                {pkg.best && <span className="mb-3 inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">Best Seller</span>}
                <h3 className={`font-bold text-lg ${pkg.best ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${pkg.best ? 'text-slate-300' : 'text-slate-600'}`}>{pkg.desc}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  {pkg.old && <span className={`text-sm line-through ${pkg.best ? 'text-slate-400' : 'text-slate-400'}`}>{pkg.old}</span>}
                  <span className={`text-3xl font-bold ${pkg.best ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>
                </div>
                <a href={whatsappLink} target="_blank" rel="noreferrer"
                  className={`mt-5 block rounded-xl py-3 text-center text-sm font-bold transition ${pkg.best ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-md' : pkg.popular ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md' : 'border-2 border-slate-200 text-slate-900 hover:border-slate-900 hover:bg-slate-50'}`}>
                  Pesan Sekarang
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Lihat semua paket &rarr; <Link href="/harga" className="font-medium text-slate-900 underline hover:text-slate-700 transition">halaman harga</Link>
          </p>
        </section>

        {/* CTA Section */}
        <section className="mb-24 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-center text-white md:py-24 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-5" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="orb absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20" style={{ backgroundColor: '#f59e0b' }} />
            <div className="orb orb-2 absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-15" style={{ backgroundColor: '#3b82f6' }} />
          </div>
          <div className="relative z-10">
            <h2 className="mb-4 text-4xl md:text-5xl font-bold">Siap Meningkatkan Karir?</h2>
            <p className="mb-10 text-lg text-slate-300 max-w-xl mx-auto">
              Hubungi Tim Halolearn untuk Upgrade CV dan Strategi Karir Kamu
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="animate-pulse-button inline-block rounded-xl bg-white px-10 py-4 text-base font-bold text-slate-900 hover:bg-slate-100 transition shadow-lg shadow-white/20"
            >
              Chat di WhatsApp · 0852 6042 1274
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-lg font-semibold text-slate-900 mb-2">halolearn</p>
          <p className="text-sm text-slate-500 mb-4">Platform Karir #1 Indonesia</p>
          <div className="flex justify-center gap-6 mb-6">
            <Link href="/harga" className="text-sm text-slate-500 hover:text-slate-900 transition">Harga</Link>
            <Link href="/cv-analyzer" className="text-sm text-slate-500 hover:text-slate-900 transition">CV Analyzer</Link>
            <Link href="/success-stories" className="text-sm text-slate-500 hover:text-slate-900 transition">Success Stories</Link>
          </div>
          <div className="h-px bg-slate-200 max-w-xs mx-auto mb-6" />
          <p className="text-xs text-slate-400">&copy; 2026 Halolearn. Semua hak dilindungi.</p>
          <p className="mt-1 text-xs text-slate-400">Hubungi kami: <a href={whatsappLink} className="font-medium text-slate-600 hover:text-slate-900 transition">WhatsApp</a></p>
        </div>
      </footer>
    </main>
  );
}
