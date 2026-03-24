'use client';

import Link from 'next/link';
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
          <div className="text-xl font-semibold tracking-tight">halolearn</div>
          <nav className="hidden gap-8 md:flex">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/cv-analyzer" className="text-sm text-slate-600 hover:text-slate-900">CV Analyzer</Link>
            <Link href="/interview-prep" className="text-sm text-slate-600 hover:text-slate-900">Interview Prep</Link>
            <Link href="/linkedin-score" className="text-sm text-slate-600 hover:text-slate-900">LinkedIn Score</Link>
            <Link href="/tentang-cv" className="text-sm text-slate-600 hover:text-slate-900">Kenapa CV Penting?</Link>
            <Link href="/success-stories" className="text-sm text-slate-600 hover:text-slate-900">Success Stories</Link>
            <Link href="/harga" className="text-sm text-slate-600 hover:text-slate-900">Harga</Link>
          </nav>
          {session ? (
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">
                👤 <span className="font-medium">{session.user?.name || 'User'}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:border-slate-900 transition"
              >
                Keluar
              </button>
            </div>
          ) : (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
            >
              Mulai Gratis
            </a>
          )}
        </div>
      </header>

      {/* Hero Section with DarkHero */}
      <DarkHero
        subtitle="🏆 #1 Career Platform Indonesia"
        title="Dapatkan Pekerjaan Impianmu Lebih Cepat"
        description="Kami membantu CV dan LinkedIn profilemu menonjol untuk recruiter. Dari analisis ATS hingga strategi konsultasi karir."
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link
            href="/cv-analyzer"
            className="rounded-lg bg-white px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-lg"
          >
            Cek CV Gratis
          </Link>
          <Link
            href="/harga"
            className="rounded-lg border border-white/30 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition backdrop-blur-sm"
          >
            Lihat Paket
          </Link>
        </div>
      </DarkHero>

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Stats Section */}
        <section className="mb-32">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border-l-4 border-amber-500 bg-white p-6 shadow-sm">
              <AnimatedCounter target={10247} label="Klien Terbantu" suffix="+" />
            </div>
            <div className="rounded-xl border-l-4 border-amber-500 bg-white p-6 shadow-sm">
              <AnimatedCounter target={95} label="Tingkat Sukses" suffix="%" />
            </div>
            <div className="rounded-xl border-l-4 border-amber-500 bg-white p-6 shadow-sm">
              <div className="text-4xl font-bold text-slate-900">2-6</div>
              <p className="mt-2 text-sm text-slate-600">Bulan Mendapat Kerja</p>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="mb-32 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-white p-12 shadow-sm">
          <div className="mb-4 inline-block rounded-full bg-white border border-slate-300 px-4 py-2 mx-auto block text-center">
            <span className="text-sm font-semibold text-slate-700">🎓 Dipercaya 10.000+ Kandidat</span>
          </div>
          <h3 className="mb-2 text-center text-2xl font-bold text-slate-900">Dipercaya oleh Mahasiswa & Alumni dari 50+ Universitas</h3>
          <p className="mb-10 text-center text-sm text-slate-600 font-medium">Ribuan mahasiswa dan alumni dari berbagai universitas terkemuka sudah mempercayakan persiapan karir mereka ke Halolearn</p>
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

        {/* Services */}
        <section className="mb-32">
          <h2 className="mb-12 text-3xl font-bold text-slate-900">Layanan Kami</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '📄', title: 'CV ATS Score', desc: 'Analisis CV untuk compatibility dengan Applicant Tracking System' },
              { icon: '💼', title: 'LinkedIn Optimization', desc: 'Strategi dan eksekusi untuk meningkatkan visibility profile' },
              { icon: '🎯', title: 'Konsultasi Karir', desc: 'Bimbingan personal dari tim Halolearn berpengalaman' },
              { icon: '🎤', title: 'Interview Prep', desc: 'Simulasi dan coaching untuk persiapan interview yang matang' }
            ].map((service) => (
              <div key={service.title} className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:bg-gradient-to-br hover:from-white hover:to-slate-50 transition duration-300">
                <div className="mb-3 text-3xl">{service.icon}</div>
                <h3 className="font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-32">
          <h2 className="mb-12 text-3xl font-bold text-slate-900">Cara Kerja</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { num: '1', icon: '📤', title: 'Upload CV', desc: 'Unggah CV kamu dalam format PDF atau Word' },
              { num: '2', icon: '🤖', title: 'Analisis AI', desc: 'Sistem kami menganalisis score ATS dan memberikan feedback' },
              { num: '3', icon: '💬', title: 'Konsultasi', desc: 'Chat dengan mentor untuk strategi improvement' }
            ].map((step) => (
              <div key={step.num} className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-center">
                <div className="mb-4 text-4xl">{step.icon}</div>
                <div className="mb-4 inline-block rounded-full bg-slate-900 text-white h-10 w-10 flex items-center justify-center font-bold">{step.num}</div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-32 -mx-6 bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-3xl font-bold text-white">Testimoni Klien</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  quote: 'CV saya diterima di 3 perusahaan setelah menggunakan Halolearn',
                  name: 'Budi S.',
                  role: 'Product Manager'
                },
                {
                  quote: 'Konsultasi karir sangat membantu memperjelas direction yang tepat',
                  name: 'Siti R.',
                  role: 'UX Designer'
                },
                {
                  quote: 'Proses cepat dan feedback sangat actionable untuk improvement',
                  name: 'Ahmad P.',
                  role: 'Software Engineer'
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="rounded-xl border border-slate-700 bg-white p-8 shadow-md hover:shadow-lg transition">
                  <p className="mb-6 font-medium text-slate-900">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
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

        {/* CTA Section */}
        <section className="mb-24 -mx-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-center text-white md:py-24 shadow-xl relative overflow-hidden mx-6">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-dot-grid opacity-5" />
          <div className="relative z-10">
            <h2 className="mb-4 text-4xl font-bold">Siap Meningkatkan Karir?</h2>
            <p className="mb-8 text-lg text-slate-300">
              Hubungi Tim Halolearn untuk Upgrade CV dan Strategi Karir Kamu
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-md"
            >
              Chat di WhatsApp
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-600">© 2024 Halolearn. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm text-slate-600">Hubungi kami: <a href={whatsappLink} className="font-medium text-slate-900 hover:text-slate-700">WhatsApp</a></p>
        </div>
      </footer>
    </main>
  );
}
