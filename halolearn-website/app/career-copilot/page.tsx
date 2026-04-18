'use client';

import Link from 'next/link';
import { useState } from 'react';
import PromoCountdown from '../components/PromoCountdown';
import DarkHero from '../components/DarkHero';

const whatsappBase = 'https://wa.me/6285260421274';

const getWhatsappLink = (paket: string) => {
  const text = encodeURIComponent(`Halo, saya tertarik dengan Career Copilot — paket ${paket}. Mau tahu lebih lanjut!`);
  return `${whatsappBase}?text=${text}`;
};

const whatsappGeneral = `${whatsappBase}?text=${encodeURIComponent('Halo, saya tertarik dengan Career Copilot Halolearn. Bisa info lebih lanjut?')}`;

const roles = [
  'Management Trainee',
  'Data Analyst',
  'Software Engineer',
  'Marketing',
  'Human Resources',
  'Finance & Accounting',
  'Business Development',
  'Product Manager',
  'UI/UX Designer',
  'Konsultan',
  'Dan posisi lainnya...',
];

const pricingCards = [
  {
    name: 'Career Copilot',
    subtitle: 'Analisis Role + Roadmap',
    price: 'Rp100.000',
    features: [
      'Pilih target role (wajib)',
      'Opsional: target perusahaan',
      'Upload CV kamu saat ini',
      'Analisis gap skill vs role target',
      'Roadmap karir personal',
      'Rekomendasi skill yang perlu ditambah',
      'Strategi positioning untuk role tersebut',
    ],
    cta: 'Mulai Analisis',
    highlighted: false,
  },
  {
    name: 'Career Copilot + CV',
    subtitle: 'Analisis + CV Spesifik Role',
    price: 'Rp200.000',
    oldPrice: 'Rp260.000',
    features: [
      'Semua fitur Career Copilot',
      'CV baru yang di-tailor untuk role target',
      'Bullet point achievement yang relevan',
      'Keyword ATS sesuai role & industri',
      'Summary/headline yang tepat sasaran',
      'Format yang recruiter suka untuk role itu',
      'Output final langsung jadi — tanpa revisi',
    ],
    cta: 'Ambil Paket Ini',
    highlighted: true,
    label: 'Best Value',
  },
  {
    name: 'Career Copilot Lengkap',
    subtitle: 'Analisis + CV + Cover Letter',
    price: 'Rp300.000',
    oldPrice: 'Rp420.000',
    features: [
      'Semua fitur Career Copilot + CV',
      'Cover letter / surat lamaran spesifik role',
      'Naratif yang connect pengalaman ke target role',
      'Tersedia dalam bahasa Indonesia atau Inggris',
      'Disesuaikan untuk perusahaan target (jika diisi)',
      'Template yang bisa dipakai ulang',
      'Output final langsung jadi — tanpa revisi',
    ],
    cta: 'Paket Terlengkap',
    highlighted: false,
    label: 'Hemat Rp120.000',
  },
];

const steps = [
  {
    num: '1',
    icon: '🎯',
    title: 'Pilih Target Role',
    desc: 'Tentukan posisi yang kamu incar. Ini jadi pondasi semua analisis.',
  },
  {
    num: '2',
    icon: '📄',
    title: 'Upload CV Saat Ini',
    desc: 'Kirimkan CV terakhir kamu. Kami analisis kekuatan & gap-nya.',
  },
  {
    num: '3',
    icon: '🏢',
    title: 'Target Perusahaan (Opsional)',
    desc: 'Punya perusahaan impian? Kami sesuaikan strateginya.',
  },
  {
    num: '4',
    icon: '📊',
    title: 'Dapat Analisis Lengkap',
    desc: 'Roadmap karir, gap analysis, dan strategi positioning.',
  },
  {
    num: '5',
    icon: '✍️',
    title: 'Upgrade CV Spesifik Role',
    desc: 'CV baru yang di-tailor khusus untuk role target kamu.',
  },
  {
    num: '6',
    icon: '💌',
    title: 'Tambah Cover Letter',
    desc: 'Surat lamaran yang connect pengalamanmu ke posisi target.',
  },
];

const faqItems = [
  {
    q: 'Apa bedanya Career Copilot dengan CV biasa Halolearn?',
    a: 'CV biasa kami review dan perbaiki secara umum. Career Copilot dimulai dari target role kamu — semua analisis, CV, dan cover letter disesuaikan spesifik untuk posisi yang kamu incar. Hasilnya jauh lebih tajam dan targeted.',
  },
  {
    q: 'Apakah target role wajib diisi?',
    a: 'Ya, target role wajib. Inilah yang membuat Career Copilot berbeda — semua dimulai dari posisi yang kamu tuju. Target perusahaan boleh dikosongkan (opsional).',
  },
  {
    q: 'Berapa lama prosesnya?',
    a: 'Career Copilot (analisis): 2-3 hari kerja. Tambah CV: +3-4 hari kerja. Tambah Cover Letter: +1-2 hari kerja. Total paket lengkap sekitar 5-7 hari kerja.',
  },
  {
    q: 'Bisa untuk switch karir / pindah industri?',
    a: 'Sangat bisa! Justru Career Copilot paling powerful untuk career switcher. Kami bantu framing pengalaman lama kamu agar relevan dengan role baru.',
  },
  {
    q: 'Apakah ini produk sekali jadi?',
    a: 'Ya. Career Copilot adalah produk digital one-time delivery. Setelah kamu kirim data dan CV, kami proses dan kirimkan output final. Tidak ada revisi — jadi pastikan info yang kamu berikan selengkap mungkin.',
  },
  {
    q: 'Bagaimana cara order?',
    a: 'Isi form order di website → pilih paket → kirim CV via WhatsApp → bayar → terima output dalam waktu yang ditentukan.',
  },
];

const outputExamples = [
  {
    title: 'Gap Analysis',
    icon: '📊',
    content: [
      'Target: Product Manager di startup tech',
      'Skill match: 68% — perlu tambah data analytics & stakeholder management',
      'Experience framing: project lead bisa di-reposition sebagai product ownership',
      'Recommended certifications: Google PM Certificate',
    ],
  },
  {
    title: 'CV Spesifik Role',
    icon: '📄',
    content: [
      'Headline: "Aspiring Product Manager | Ex-Project Lead | Data-Driven Decision Maker"',
      'Summary di-tailor untuk PM job description',
      'Achievement bullets pakai metrik yang PM recruiter cari',
      'Keyword ATS: product roadmap, user research, sprint planning, KPI',
    ],
  },
  {
    title: 'Cover Letter',
    icon: '💌',
    content: [
      'Opening yang langsung connect ke company mission',
      'Paragraph 2: transferable skills dari pengalaman sebelumnya',
      'Paragraph 3: kenapa role ini, kenapa sekarang, kenapa perusahaan ini',
      'Closing yang confident tanpa over-promise',
    ],
  },
];

export default function CareerCopilotPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white text-slate-900">
      <PromoCountdown />

      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">halolearn</Link>
          <nav className="hidden gap-6 md:flex items-center">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/belajar" className="text-sm text-slate-600 hover:text-slate-900">Belajar</Link>
            <Link href="/harga" className="text-sm text-slate-600 hover:text-slate-900">Harga</Link>
          </nav>
          <a
            href={whatsappGeneral}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Hubungi Kami
          </a>
        </div>
      </header>

      {/* Hero */}
      <DarkHero
        subtitle="🚀 Career Copilot — Produk Digital"
        title="Tau Mau Jadi Apa? Kita Bantu Sampai Sana."
        description="Pilih target role, kirim CV — kami kirimkan analisis gap, CV spesifik role, dan cover letter yang bikin recruiter tertarik. Satu kali proses, output langsung jadi."
      >
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link
            href="/career-copilot/order"
            className="rounded-lg bg-white px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-lg"
          >
            Order Sekarang
          </Link>
          <a
            href="#pricing"
            className="rounded-lg border border-white/30 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition backdrop-blur-sm"
          >
            Lihat Paket & Harga
          </a>
        </div>
      </DarkHero>

      {/* Problem / Value Prop */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <span className="inline-block rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 mb-4">Masalah Umum</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">CV Bagus Saja Tidak Cukup</h2>
            <div className="space-y-4">
              {[
                'CV kamu generic — tidak tajam untuk posisi spesifik',
                'Kamu tidak tahu skill apa yang kurang untuk role target',
                'Cover letter kamu template copy-paste',
                'Recruiter lihat CV kamu 6 detik — dan skip',
              ].map((problem, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-red-500 flex-shrink-0">✗</span>
                  <p className="text-slate-600">{problem}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="inline-block rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-600 mb-4">Solusi Career Copilot</span>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Semua Dimulai dari Target Role</h2>
            <div className="space-y-4">
              {[
                'Analisis gap skill kamu vs requirement role target',
                'CV yang di-tailor spesifik — bukan template umum',
                'Cover letter yang connect cerita kamu ke posisi target',
                'Strategi positioning yang bikin recruiter bilang "ini kandidat kita"',
              ].map((solution, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-green-600 flex-shrink-0">✓</span>
                  <p className="text-slate-700 font-medium">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Roles */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Untuk Role Apa Saja?</h2>
            <p className="text-slate-600">Career Copilot bisa dipakai untuk hampir semua posisi. Beberapa contoh:</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {roles.map((role) => (
              <span key={role} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-400 transition">
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works / User Flow */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Cara Kerja Career Copilot</h2>
          <p className="text-slate-600">6 langkah simpel menuju karir yang kamu targetkan</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="relative rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm flex-shrink-0">
                  {step.num}
                </div>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.desc}</p>
              {parseInt(step.num) >= 5 && (
                <span className="mt-3 inline-block rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs text-amber-700">
                  {parseInt(step.num) === 5 ? '+Rp100.000' : '+Rp100.000'}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">Step 1-4 termasuk di paket dasar (Rp100.000). Step 5 & 6 adalah add-on opsional.</p>
        </div>
      </section>

      {/* Output Examples */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Contoh Output Career Copilot</h2>
            <p className="text-slate-300">Sekilas preview apa yang kamu dapat</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {outputExamples.map((example) => (
              <div key={example.title} className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{example.icon}</span>
                  <h3 className="text-lg font-semibold text-white">{example.title}</h3>
                </div>
                <ul className="space-y-3">
                  {example.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1 text-amber-400 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-6 italic">
            *Contoh ilustrasi. Output aktual disesuaikan dengan profil dan target role kamu.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 scroll-mt-20">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700 mb-4">Harga Spesial Launch</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Pilih Paket Career Copilot</h2>
          <p className="text-slate-600">Mulai dari Rp100.000 — investasi terbaik untuk karir kamu</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingCards.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-2xl transition ${
                pkg.highlighted
                  ? 'border-2 border-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-white md:scale-105 shadow-xl'
                  : 'border border-slate-200 bg-white'
              }`}
            >
              {pkg.label && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    pkg.highlighted ? 'bg-amber-500 text-white' : 'bg-green-600 text-white'
                  }`}>
                    {pkg.label}
                  </span>
                </div>
              )}

              <div className={`border-b px-6 py-8 ${pkg.highlighted ? 'border-slate-700' : 'border-slate-200'}`}>
                <h3 className={`text-xl font-bold ${pkg.highlighted ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                <p className={`mt-1 text-sm ${pkg.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>{pkg.subtitle}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  {pkg.oldPrice && (
                    <span className={`text-sm line-through ${pkg.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{pkg.oldPrice}</span>
                  )}
                  <span className={`text-3xl font-bold ${pkg.highlighted ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>
                </div>
              </div>

              <div className={`flex-1 px-6 py-6`}>
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${pkg.highlighted ? 'text-slate-200' : 'text-slate-600'}`}>
                      <span className={`mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-amber-400' : 'text-green-600'}`}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pb-6">
                <Link
                  href={`/career-copilot/order?paket=${encodeURIComponent(pkg.name)}`}
                  className={`block rounded-lg py-3 text-center text-sm font-medium transition ${
                    pkg.highlighted
                      ? 'bg-white text-slate-900 hover:bg-slate-100'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {pkg.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Pembayaran via transfer bank. Proses dimulai setelah pembayaran dikonfirmasi.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white border border-slate-200 p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-slate-900">10.000+</div>
              <p className="mt-2 text-sm text-slate-600">Klien karir terbantu oleh Halolearn</p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-slate-900">95%</div>
              <p className="mt-2 text-sm text-slate-600">Tingkat keberhasilan mendapat kerja</p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-slate-900">50+</div>
              <p className="mt-2 text-sm text-slate-600">Universitas mempercayai Halolearn</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-2xl font-bold text-slate-900 text-center">Pertanyaan yang Sering Ditanyakan</h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqItems.map((item, idx) => (
            <div key={idx} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
                <span className={`text-slate-400 transition-transform flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5">
                  <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-center text-white md:py-20 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-5" />
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold">Sudah Tau Target Role Kamu?</h2>
            <p className="mb-2 text-lg text-slate-300">
              Mulai dari Rp100.000 — kamu dapat analisis lengkap + roadmap karir personal.
            </p>
            <p className="mb-8 text-sm text-slate-400">
              Konsultasi gratis dulu juga boleh. Klik tombol di bawah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/career-copilot/order"
                className="inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-md"
              >
                Order Career Copilot Sekarang
              </Link>
              <a
                href="#pricing"
                className="inline-block rounded-lg border border-white/30 px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Lihat Paket Lagi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-600">© 2026 Halolearn. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm text-slate-600">
            Hubungi kami: <a href={whatsappGeneral} className="font-medium text-slate-900 hover:text-slate-700">WhatsApp 0852 6042 1274</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
