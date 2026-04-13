'use client';

import { useState } from 'react';
import Link from 'next/link';
import PromoCountdown from '../components/PromoCountdown';
import DarkHero from '../components/DarkHero';

const whatsappBase = 'https://wa.me/6285260421274';

const getWhatsappLink = (packageName: string) => {
  const encodedText = encodeURIComponent(`Halo, saya tertarik dengan paket ${packageName}. Kode promo: H4LO5`);
  return `${whatsappBase}?text=${encodedText}`;
};

const whatsappLink = getWhatsappLink('Halolearn');

// ─── Package Data ───────────────────────────────────────────────

type Package = {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  price: string;
  priceNum: number;
  oldPrice?: string;
  savings?: string;
  label?: string;
  labelColor?: string;
  recommended?: boolean;
  features: string[];
  note?: string;
};

// ─── Digital Products (separate from service packages) ────────
type DigitalProduct = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  oldPrice?: string;
  features: string[];
  fileSize: string;
  pages: number;
  previewUrl?: string;
};

const digitalProducts: DigitalProduct[] = [
  {
    id: 'template-cv-bumn',
    name: 'Template CV BUMN',
    tagline: 'PDF panduan CV ATS-proof untuk bank & BUMN',
    description: 'Entry-level digital product. Template siap-copy + studi kasus lolos BNI ODP — tanpa review personal.',
    price: 'Rp65.000',
    features: [
      'PDF 8 halaman — instant delivery via WhatsApp',
      'Sample CV before/after — studi kasus lolos BNI ODP Retail Banking 2026',
      'Blank template siap-copy ke Word / Google Docs',
      'Keyword library BUMN per sektor (banking, energi, infra, manufaktur)',
      'Checklist 10 kesalahan fatal CV BUMN',
    ],
    fileSize: '56 KB',
    pages: 8,
  },
];

const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic Career',
    tagline: 'CV ATS + Review profesional',
    audience: 'Cocok untuk kamu yang butuh CV siap ATS dengan cepat.',
    price: 'Rp195.000',
    priceNum: 195000,
    oldPrice: 'Rp225.000',
    features: [
      'CV ATS-Friendly (terima jadi)',
      'CV Review lengkap + saran feedback',
      'Pengerjaan 5-7 hari kerja',
    ],
  },
  {
    id: 'super',
    name: 'Basic Super',
    tagline: 'CV/LinkedIn + Konsultasi 1 Minggu',
    audience: 'Untuk kamu yang mau CV + arahan awal dari tim karir.',
    price: 'Rp255.000',
    priceNum: 255000,
    oldPrice: 'Rp285.000',
    features: [
      'Pilih: CV ATS/Kreatif ATAU LinkedIn Optimization',
      'Konsultasi Karir 1 Minggu',
      'Pengerjaan 5-7 hari kerja',
    ],
  },
  {
    id: 'supreme1',
    name: 'Supreme 1',
    tagline: 'CV + LinkedIn + Konsul 2 Minggu',
    audience: 'Paling populer! Untuk job seeker serius yang mau profil lengkap.',
    price: 'Rp335.000',
    priceNum: 335000,
    oldPrice: 'Rp365.000',
    label: 'Best Seller',
    labelColor: 'bg-amber-500',
    recommended: true,
    features: [
      'CV ATS-Friendly (terima jadi)',
      'LinkedIn Optimization (terima jadi)',
      'Konsultasi Karir 2 Minggu',
      'Revisi 1x CV',
      'BONUS: Template Email HRD',
    ],
  },
  {
    id: 'supreme2',
    name: 'Supreme 2',
    tagline: 'CV + LinkedIn + Cover Letter + Konsul 1 Bulan',
    audience: 'Untuk kamu yang mau persiapan lengkap sebelum apply.',
    price: 'Rp435.000',
    priceNum: 435000,
    oldPrice: 'Rp465.000',
    label: 'Best Value',
    labelColor: 'bg-green-600',
    features: [
      'CV ATS-Friendly (terima jadi)',
      'LinkedIn Optimization (terima jadi)',
      'Surat Lamaran / Cover Letter',
      'Konsultasi Karir 1 Bulan',
      'Revisi 1x CV',
    ],
  },
  {
    id: 'lengkap1',
    name: 'Supreme Super Lengkap 1',
    tagline: 'Semua yang kamu butuhkan + Simulasi Interview',
    audience: 'Untuk kamu yang mau full preparation — CV, LinkedIn, interview.',
    price: 'Rp899.000',
    priceNum: 899000,
    oldPrice: 'Rp1.199.000',
    savings: 'Hemat Rp300.000',
    label: 'Paling Lengkap',
    labelColor: 'bg-orange-500',
    note: '*Promo berlaku dengan share testimoni di sosmed',
    features: [
      'Pilih 1 CV: ATS Friendly atau Kreatif/Design',
      'CV Review lengkap + saran feedback',
      'LinkedIn Optimization (terima jadi)',
      'Surat Lamaran / Cover Letter',
      'Konsultasi Karir 1 Bulan',
      'Revisi 1x CV',
      '1x Simulasi Interview 30 menit (Live + Feedback)',
      'BONUS: Template Email HRD + Handbook Psikotest',
    ],
  },
  {
    id: 'lengkap2',
    name: 'Supreme Super Lengkap 2',
    tagline: 'Paket ultimate + Portfolio + Konsul 2 Bulan',
    audience: 'Investasi terbaik untuk karir kamu. Semua termasuk.',
    price: 'Rp1.660.000',
    priceNum: 1660000,
    oldPrice: 'Rp2.200.000',
    savings: 'Hemat Rp540.000',
    label: 'Most Premium',
    labelColor: 'bg-purple-600',
    note: '*Promo berlaku dengan share testimoni di sosmed',
    features: [
      'Pilih 1 CV: ATS Friendly atau Kreatif/Design',
      'CV Review lengkap + saran feedback',
      'LinkedIn Optimization (terima jadi)',
      'Surat Lamaran / Cover Letter',
      '1 Portfolio (termasuk)',
      'Konsultasi Karir 2 Bulan',
      'Revisi 2x CV',
      '1x Simulasi Interview 30 menit (Live + Feedback)',
      'BONUS: Template Email HRD + Handbook Psikotest',
    ],
  },
];

// ─── Comparison features ────────────────────────────────────────

type CompareRow = {
  feature: string;
  values: (boolean | string)[];
};

const comparePackageNames = ['Basic Career', 'Basic Super', 'Supreme 1', 'Supreme 2', 'Super Lengkap 1', 'Super Lengkap 2'];

const compareRows: CompareRow[] = [
  { feature: 'CV ATS-Friendly', values: [true, true, true, true, true, true] },
  { feature: 'CV Kreatif (pilihan)', values: [false, true, false, false, true, true] },
  { feature: 'CV Review + Feedback', values: [true, false, false, false, true, true] },
  { feature: 'LinkedIn Optimization', values: [false, '1 pilihan', true, true, true, true] },
  { feature: 'Surat Lamaran', values: [false, false, false, true, true, true] },
  { feature: 'Portfolio', values: [false, false, false, false, false, true] },
  { feature: 'Konsultasi Karir', values: ['—', '1 minggu', '2 minggu', '1 bulan', '1 bulan', '2 bulan'] },
  { feature: 'Revisi CV', values: ['—', '—', '1x', '1x', '1x', '2x'] },
  { feature: 'Simulasi Interview', values: [false, false, false, false, '30 menit', '30 menit'] },
  { feature: 'Template Email HRD', values: [false, false, true, false, true, true] },
  { feature: 'Handbook Psikotest', values: [false, false, false, false, true, true] },
];

// ─── LinkedIn Branding ──────────────────────────────────────────

const linkedinBranding = [
  { name: 'LinkedIn Basic', posts: '4 konten/bulan', price: 'Rp599.000', period: '/bulan' },
  { name: 'LinkedIn Basic 2', posts: '6 konten/bulan', price: 'Rp999.000', period: '/bulan' },
  { name: 'LinkedIn Super', posts: '10 konten/bulan', price: 'Rp1.500.000', period: '/bulan' },
  { name: 'LinkedIn Exclusive', posts: '12 konten/bulan', price: 'Hubungi Kami', period: '' },
];

// ─── FAQ ────────────────────────────────────────────────────────

const faqItems = [
  {
    q: 'Berapa lama pengerjaan CV?',
    a: '5-7 hari kerja (tidak termasuk weekend & hari libur). Butuh express? Tersedia opsi 1 hari, 2-3 hari, atau 3-4 hari — hubungi admin.',
  },
  {
    q: 'Apa bedanya CV ATS dan CV Kreatif?',
    a: 'CV ATS dirancang untuk lolos sistem screening otomatis yang dipakai 80%+ perusahaan Indonesia. CV Kreatif lebih cocok untuk posisi desain/kreatif. Kami sarankan punya keduanya.',
  },
  {
    q: 'Apakah ada revisi?',
    a: 'Revisi tersedia untuk paket Supreme ke atas, sesuai jumlah di paket. Klaim revisi maksimal 3 hari setelah CV diterima.',
  },
  {
    q: 'Bisa dalam bahasa Inggris?',
    a: 'Bisa! CV dan LinkedIn bisa dibuat dalam bahasa Indonesia atau Inggris. Ada biaya tambahan untuk terjemahan — hubungi admin.',
  },
  {
    q: 'Kenapa LinkedIn penting?',
    a: 'HRD sering double check profil LinkedIn setelah terima CV. Beberapa bahkan hunting kandidat langsung dari LinkedIn. Profil LinkedIn yang rapi = peluang lebih besar.',
  },
  {
    q: 'Berapa tingkat keberhasilan Halolearn?',
    a: 'Lebih dari 10.000+ klien, dan 95% berhasil mendapatkan pekerjaan dalam 3-6 bulan setelah menggunakan layanan kami.',
  },
  {
    q: 'Bisa tambah pengalaman lebih dari 4?',
    a: 'Bisa, dengan biaya tambahan Rp49.000 per pengalaman.',
  },
  {
    q: 'Bagaimana cara order?',
    a: 'Chat WhatsApp → pilih paket → isi form → bayar → proses pembuatan → dikirim ke email. Mudah dan cepat!',
  },
];

// ─── Component ──────────────────────────────────────────────────

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white text-slate-900">
      <PromoCountdown />

      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">halolearn</Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Order Sekarang
          </a>
        </div>
      </header>

      {/* Hero */}
      <DarkHero
        subtitle="PAKET & HARGA"
        title="Investasi Karir Terbaik Kamu"
        description="10.000+ klien sukses. 95% dapat kerja dalam 3-6 bulan. Pilih paket yang sesuai kebutuhanmu."
      >
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs">✓</span>
            Pengerjaan 5-7 hari kerja
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs">✓</span>
            Revisi tersedia sesuai paket
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs">✓</span>
            Tim berpengalaman
          </div>
        </div>
      </DarkHero>

      {/* Social Proof Strip */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6 py-5 text-center text-sm text-slate-600">
          <div><span className="font-bold text-slate-900">10.000+</span> klien</div>
          <div className="hidden sm:block h-4 w-px bg-slate-300" />
          <div><span className="font-bold text-slate-900">95%</span> tingkat sukses</div>
          <div className="hidden sm:block h-4 w-px bg-slate-300" />
          <div><span className="font-bold text-slate-900">50+</span> universitas</div>
          <div className="hidden sm:block h-4 w-px bg-slate-300" />
          <div><span className="font-bold text-slate-900">100+</span> perusahaan</div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center">
          <p className="text-sm font-medium text-amber-800">
            Gunakan kode <span className="inline-block rounded bg-amber-600 px-2 py-0.5 font-bold text-white">H4LO5</span> untuk diskon 5% semua paket
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">

        {/* ─── Digital Products Section (entry-level, under Rp100K) ─── */}
        <div className="pt-16 pb-4">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-blue-700">
              DIGITAL PRODUCT · INSTANT DELIVERY
            </span>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">Belum siap ambil paket review personal?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-slate-600">Mulai dari template di bawah Rp100.000 — siap dipake hari ini.</p>
          </div>

          <div className="mx-auto max-w-4xl">
            {digitalProducts.map((product) => {
              const productWaLink = `${whatsappBase}?text=${encodeURIComponent(
                `Halo, saya mau order ${product.name} (${product.price})`
              )}`;
              return (
                <div
                  key={product.id}
                  className="grid gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-[1fr_280px]"
                >
                  {/* Left: details */}
                  <div className="p-8">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        PDF · {product.pages} halaman
                      </span>
                      <span className="text-xs text-slate-500">{product.fileSize}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
                    <p className="mt-1 text-sm font-medium text-amber-600">{product.tagline}</p>
                    <p className="mt-2 text-sm text-slate-600">{product.description}</p>
                    <ul className="mt-5 space-y-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-slate-700">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Right: price + CTA */}
                  <div className="flex flex-col justify-center gap-4 border-t border-slate-200 bg-slate-50 p-8 md:border-l md:border-t-0">
                    <div className="text-center">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Harga</div>
                      <div className="mt-1 text-4xl font-black text-slate-900">{product.price}</div>
                      <div className="mt-1 text-xs text-slate-500">sekali bayar · instant delivery</div>
                    </div>
                    <a
                      href={productWaLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Order via WhatsApp
                    </a>
                    <p className="text-center text-xs text-slate-500">
                      Chat admin → bayar → file dikirim di chat.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Butuh CV kamu di-review & di-rewrite langsung oleh tim? Scroll ke paket di bawah ↓
          </p>
        </div>

        {/* Quick Guide */}
        <div className="py-16 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">Bingung Pilih Paket?</h2>
          <p className="mx-auto mb-10 max-w-2xl text-slate-600">
            Lihat rekomendasi berdasarkan kebutuhanmu.
          </p>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-left">
              <div className="mb-3 text-2xl">🎓</div>
              <h3 className="font-bold text-slate-900">Fresh Graduate</h3>
              <p className="mt-1 text-sm text-slate-600">Baru lulus, butuh CV profesional yang lolos ATS.</p>
              <p className="mt-3 text-sm font-semibold text-amber-600">→ Supreme 1 (Rp335K)</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-left">
              <div className="mb-3 text-2xl">💼</div>
              <h3 className="font-bold text-slate-900">Pindah Karir</h3>
              <p className="mt-1 text-sm text-slate-600">Mau switch industry, perlu CV + LinkedIn + surat lamaran.</p>
              <p className="mt-3 text-sm font-semibold text-amber-600">→ Supreme 2 (Rp435K)</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-left">
              <div className="mb-3 text-2xl">🚀</div>
              <h3 className="font-bold text-slate-900">Full Preparation</h3>
              <p className="mt-1 text-sm text-slate-600">Mau serius siap tempur — CV, LinkedIn, interview, portfolio.</p>
              <p className="mt-3 text-sm font-semibold text-amber-600">→ Super Lengkap (Rp899K+)</p>
            </div>
          </div>
        </div>

        {/* ─── Pricing Cards ─────────────────────────────────────── */}
        <div className="pb-20">
          <h2 className="mb-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">Semua Paket</h2>
          <p className="mb-4 text-center text-slate-600">Harga sekali bayar. Tidak ada biaya langganan.</p>
          <p className="mb-12 text-center text-sm text-slate-500">Kalau kamu ingin pilihan paling aman untuk mayoritas user, fokus lihat <span className="font-semibold text-slate-900">Supreme 1</span> dulu.</p>

          {/* Top row: first 4 packages */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.slice(0, 4).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Bottom row: 2 premium packages */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {packages.slice(4).map((pkg) => (
              <PremiumCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* ─── Social Proof Near Pricing ─────────────────────────── */}
        <div className="pb-20">
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 p-8 md:p-10 shadow-sm">
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-[0.2em] text-emerald-700 border border-emerald-200">
                SOCIAL PROOF
              </span>
              <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">Kenapa orang akhirnya ambil paket, bukan cuma lihat harga</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                Saat user sudah sampai ke pricing, yang mereka butuhkan bukan lebih banyak jargon — tapi alasan yang bikin mereka yakin kalau paket ini memang layak dibeli.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3 mb-8">
              {[
                { value: '10.000+', label: 'klien terbantu', note: 'sudah pakai layanan Halolearn' },
                { value: '95%', label: 'tingkat keberhasilan', note: 'mendapat kerja dalam 3–6 bulan' },
                { value: '50+', label: 'universitas', note: 'sudah mempercayakan persiapan karirnya' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white bg-white/90 p-6 text-center shadow-sm">
                  <div className="text-3xl font-black text-slate-900">{item.value}</div>
                  <div className="mt-2 text-sm font-semibold text-slate-700">{item.label}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  quote: 'Awalnya cuma mau rapihin CV, tapi setelah ambil paket yang lebih lengkap aku jadi jauh lebih pede kirim lamaran. Dalam beberapa minggu mulai masuk panggilan interview.',
                  name: 'Fresh Graduate',
                  result: 'Naik dari “bingung mulai dari mana” ke “siap apply”',
                },
                {
                  quote: 'Paket yang ada LinkedIn-nya ternyata ngaruh banget. Profil jadi lebih rapi dan recruiter lebih gampang ngerti positioning aku.',
                  name: 'Career Switcher',
                  result: 'Lebih gampang jual diri secara profesional',
                },
                {
                  quote: 'Yang bikin worth it bukan cuma file akhirnya, tapi arah strategi apply-nya jadi lebih jelas dan nggak asal kirim CV ke mana-mana.',
                  name: 'Job Seeker Serius',
                  result: 'Lebih terarah, lebih percaya diri, lebih siap closing peluang',
                },
              ].map((item) => (
                <div key={item.name} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <p className="text-sm leading-relaxed text-slate-700">“{item.quote}”</p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-emerald-700 mt-1">{item.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Comparison Table ──────────────────────────────────── */}
        <div className="pb-20">
          <h2 className="mb-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">Perbandingan Paket</h2>
          <p className="mb-10 text-center text-slate-600">Lihat fitur lengkap setiap paket.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Fitur</th>
                  {comparePackageNames.map((name) => (
                    <th key={name} className="px-3 py-3 text-center font-semibold text-slate-700 whitespace-nowrap">{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-4 py-3 font-medium text-slate-700">{row.feature}</td>
                    {row.values.map((val, vIdx) => (
                      <td key={vIdx} className="px-3 py-3 text-center text-slate-600">
                        {val === true ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">✓</span>
                        ) : val === false ? (
                          <span className="text-slate-300">—</span>
                        ) : (
                          <span className="text-xs">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Price row */}
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td className="px-4 py-3 font-bold text-slate-900">Harga</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="px-3 py-3 text-center">
                      <span className="font-bold text-slate-900 text-xs">{pkg.price}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Individual Services ───────────────────────────────── */}
        <div className="pb-20">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12">
            <h2 className="mb-2 text-2xl font-bold text-slate-900">Layanan Satuan</h2>
            <p className="mb-6 text-slate-600">Butuh satu layanan aja? Bisa! Hubungi admin untuk order satuan.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: 'CV Review', price: 'Rp175.000' },
                { name: 'CV ATS-Friendly', price: 'Rp195.000' },
                { name: 'CV Kreatif/Design', price: 'Rp225.000' },
                { name: 'LinkedIn Optimization', price: 'Rp195.000' },
                { name: 'Interview Prep (500+ Soal)', price: 'Rp195.000' },
                { name: 'Simulasi Interview (Live)', price: 'Rp195.000' },
                { name: 'Cover Letter', price: 'Rp160.000' },
                { name: 'Template LinkedIn', price: 'Rp150.000' },
                { name: 'Konsultasi Karir', price: 'mulai Rp399K/bln' },
                { name: 'Handbook Psikotest', price: 'Rp148.000' },
                { name: 'Template Email HRD', price: 'Rp85.000' },
                { name: 'Portfolio', price: 'mulai Rp699.000' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-white px-4 py-3 border border-slate-100">
                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  <span className="text-sm font-semibold text-slate-900 whitespace-nowrap ml-4">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 transition"
              >
                Chat Admin untuk Order Satuan
              </a>
            </div>
          </div>
        </div>

        {/* ─── LinkedIn Branding ─────────────────────────────────── */}
        <div className="pb-20">
          <h2 className="mb-2 text-center text-2xl font-bold text-slate-900 md:text-3xl">LinkedIn Branding & Management</h2>
          <p className="mb-10 text-center text-slate-600">
            Min. order 3 bulan. Hasil nyata: 300+ profile visit, +1000% impression.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {linkedinBranding.map((pkg, idx) => (
              <div key={idx} className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition">
                <h3 className="font-bold text-slate-900">{pkg.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{pkg.posts}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900">{pkg.price}</span>
                  {pkg.period && <span className="text-sm text-slate-500">{pkg.period}</span>}
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-5 block rounded-lg border border-slate-300 py-2.5 text-center text-sm font-medium text-slate-900 hover:bg-slate-50 transition"
                >
                  Info Selengkapnya
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Guarantee ─────────────────────────────────────────── */}
        <div className="pb-20">
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">🛡️</div>
              <h2 className="mb-3 text-2xl font-bold text-slate-900">Komitmen Kami</h2>
              <p className="text-slate-700 leading-relaxed">
                Kami sudah membantu <strong>10.000+ klien</strong> mendapatkan pekerjaan impian mereka.
                Setiap CV dikerjakan oleh tim profesional berpengalaman — bukan template otomatis.
                Kalau ada revisi, kami kerjakan sampai kamu puas sesuai paket yang dipilih.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Dikerjakan manusia, bukan AI
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Revisi sesuai paket
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Konsultasi langsung via WhatsApp
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── FAQ ───────────────────────────────────────────────── */}
        <div className="pb-20">
          <h2 className="mb-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">Pertanyaan yang Sering Ditanyakan</h2>
          <p className="mb-10 text-center text-slate-600">Belum menemukan jawabanmu? Chat kami langsung.</p>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
                  <span className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="border-t border-slate-100 px-6 py-4">
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Final CTA ─────────────────────────────────────────── */}
        <div className="pb-20">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-center text-white md:py-20 shadow-xl relative overflow-hidden">
            {/* Subtle orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="orb absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#3b82f6' }} />
              <div className="orb orb-2 absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#8b5cf6' }} />
            </div>
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Siap Upgrade Karir Kamu?</h2>
              <p className="mb-3 text-lg text-slate-300">
                Pilih paket, gunakan kode <span className="font-semibold text-amber-400">H4LO5</span> untuk diskon 5%.
              </p>
              <p className="mb-8 text-slate-400">
                Chat kami sekarang — konsultasi gratis, tanpa komitmen.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-8 py-3.5 text-sm font-semibold text-white hover:bg-green-600 transition shadow-lg animate-pulse-button"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-600">&copy; 2026 Halolearn. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm text-slate-600">
            Hubungi kami:{' '}
            <a href={whatsappLink} className="font-medium hover:text-slate-900 transition">
              WhatsApp 0852 6042 1274
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}

// ─── Package Card (compact, for first 4) ────────────────────────

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div className={`relative flex flex-col rounded-2xl transition hover:shadow-lg ${
      pkg.recommended
        ? 'border-2 border-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl ring-4 ring-slate-900/10'
        : 'border border-slate-200 bg-white'
    }`}>
      {pkg.label && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm ${pkg.labelColor}`}>
            {pkg.label}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className={`text-lg font-bold ${pkg.recommended ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
        <p className={`mt-1 text-sm ${pkg.recommended ? 'text-slate-300' : 'text-slate-500'}`}>{pkg.tagline}</p>

        <div className="mt-4 flex items-baseline gap-2">
          {pkg.oldPrice && (
            <span className={`text-sm line-through ${pkg.recommended ? 'text-slate-400' : 'text-slate-400'}`}>{pkg.oldPrice}</span>
          )}
        </div>
        <span className={`text-3xl font-bold ${pkg.recommended ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>

        <p className={`mt-3 text-xs leading-relaxed ${pkg.recommended ? 'text-slate-300' : 'text-slate-500'}`}>{pkg.audience}</p>

        <ul className="mt-5 flex-1 space-y-2">
          {pkg.features.map((f, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm ${pkg.recommended ? 'text-slate-200' : 'text-slate-600'}`}>
              <span className={`mt-0.5 flex-shrink-0 ${pkg.recommended ? 'text-amber-400' : 'text-green-600'}`}>✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={getWhatsappLink(pkg.name)}
          target="_blank"
          rel="noreferrer"
          className={`mt-6 block rounded-lg py-3 text-center text-sm font-semibold transition ${
            pkg.recommended
              ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-md'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          Pesan {pkg.name}
        </a>
      </div>
    </div>
  );
}

// ─── Premium Card (wider, for last 2) ──────────────────────────

function PremiumCard({ pkg }: { pkg: Package }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition overflow-hidden">
      {pkg.label && (
        <div className="absolute top-0 right-0">
          <span className={`inline-block rounded-bl-xl px-4 py-1.5 text-xs font-bold text-white ${pkg.labelColor}`}>
            {pkg.label}
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Left: Info */}
        <div className="flex-1 p-6 md:p-8">
          <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{pkg.tagline}</p>
          <p className="mt-2 text-xs text-slate-500">{pkg.audience}</p>

          <div className="mt-4 flex items-baseline gap-3">
            {pkg.oldPrice && (
              <span className="text-sm text-slate-400 line-through">{pkg.oldPrice}</span>
            )}
            <span className="text-3xl font-bold text-slate-900">{pkg.price}</span>
          </div>
          {pkg.savings && (
            <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-700">{pkg.savings}</span>
          )}
          {pkg.note && (
            <p className="mt-2 text-xs text-slate-400">{pkg.note}</p>
          )}

          <a
            href={getWhatsappLink(pkg.name)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* Right: Features */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 bg-slate-50/50 p-6 md:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Yang kamu dapat:</p>
          <ul className="space-y-2.5">
            {pkg.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 flex-shrink-0 text-green-600">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
