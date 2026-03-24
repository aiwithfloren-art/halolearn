'use client';

import Link from 'next/link';
import PromoCountdown from '../components/PromoCountdown';
import DarkHero from '../components/DarkHero';

const whatsappLink = 'https://wa.me/6285260421274?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20Halolearn.%20Kode%20promo%3A%20H4LO10';

const getWhatsappLink = (packageName: string) => {
  const encodedText = encodeURIComponent(`Halo, saya tertarik dengan paket ${packageName}. Kode promo: H4LO10`);
  return `https://wa.me/6285260421274?text=${encodedText}`;
};

// Individual Services
const individualServices = [
  { name: 'CV Review', price: 'Rp175.000' },
  { name: 'CV ATS Friendly', price: 'Rp195.000', oldPrice: 'Rp225.000' },
  { name: 'CV Kreatif/Design', price: 'Rp225.000', oldPrice: 'Rp250.000' },
  { name: 'LinkedIn Optimization', price: 'Rp195.000', oldPrice: 'Rp225.000' },
  { name: 'Interview Prep (500+ Soal)', price: 'Rp195.000' },
  { name: 'Simulasi Interview (Live)', price: 'Rp195.000' },
  { name: 'Surat Lamaran/Cover Letter', price: 'Rp160.000' },
  { name: 'Template LinkedIn', price: 'Rp150.000' },
  { name: 'Konsultasi Karir', price: 'mulai Rp399.000/bulan' },
  { name: 'Handbook Psikotest', price: 'Rp148.000' },
  { name: 'Template Email HRD', price: 'Rp85.000', bonus: 'bonus Rp65.000' },
  { name: 'Portofolio', price: 'mulai Rp699.000' }
];

// Bundling Packages
const bundlingPackages = [
  {
    name: 'Basic Career 1',
    description: 'CV ATS + Review',
    price: 'Rp195.000',
    oldPrice: 'Rp225.000',
    highlighted: false
  },
  {
    name: 'Basic Career 2',
    description: 'CV Kreatif + Konsul 1 Hari',
    price: 'Rp225.000',
    oldPrice: 'Rp250.000',
    highlighted: false
  },
  {
    name: 'Basic Super 1 (LinkedIn)',
    description: 'LinkedIn + Konsul 1 Minggu',
    price: 'Rp255.000',
    oldPrice: 'Rp285.000',
    highlighted: false
  },
  {
    name: 'Basic Super 1 (CV)',
    description: 'CV ATS/Kreatif + Konsul 1 Minggu',
    price: 'Rp255.000',
    oldPrice: 'Rp285.000',
    highlighted: false
  },
  {
    name: 'Supreme 1',
    description: 'CV + LinkedIn + Konsul 2 Minggu + Revisi 1x + Bonus Template Email',
    price: 'Rp335.000',
    oldPrice: 'Rp365.000',
    highlighted: true,
    label: '⭐ Best Seller'
  },
  {
    name: 'Supreme 2',
    description: 'CV + LinkedIn + Cover Letter + Konsul 1 Bulan + Revisi 1x',
    price: 'Rp435.000',
    oldPrice: 'Rp465.000',
    highlighted: true,
    label: '⭐ Best Seller'
  },
  {
    name: 'Supreme Super Lengkap 1',
    description: 'Paket terlengkap dengan CV, LinkedIn, dan konsultasi karir penuh.',
    price: 'Rp899.000',
    oldPrice: 'Rp1.199.000',
    highlighted: false,
    label: '🔥 Paling Lengkap',
    subtext: '*Promo berlaku dengan share testimoni di sosmed',
    features: [
      'Pilih 1 CV: ATS Friendly atau CV Kreatif/Design',
      'CV Review lengkap + saran feedback',
      'LinkedIn Optimisasi (terima jadi, bisa buat baru +Rp25K)',
      'Surat Lamaran/Cover Letter',
      'Konsultasi Karir 1 Bulan',
      'Revisi 1x CV',
      '1x Simulasi Interview 30 menit (Live + Feedback, Private)',
      'BONUS: Template Email HRD + Handbook Kumpulan Psikotest'
    ]
  },
  {
    name: 'Supreme Super Lengkap 2',
    description: 'Paket premium terlengkap dengan sertifikasi, portofolio, dan konsultasi 2 bulan.',
    price: 'Rp1.660.000',
    oldPrice: 'Rp2.200.000',
    highlighted: false,
    label: '👑 Most Premium',
    subtext: 'HEMAT Rp540.000! *Promo berlaku dengan share testimoni di sosmed',
    features: [
      'Pilih 1 CV: ATS Friendly atau CV Kreatif/Design',
      'CV Review lengkap + saran feedback',
      'LinkedIn Optimisasi (terima jadi, bisa buat baru +Rp25K)',
      'Surat Lamaran/Cover Letter',
      '1 Portfolio (bisa tebus murah, chat admin)',
      'Konsultasi Karir 2 Bulan',
      'Revisi 2x CV',
      '1x Simulasi Interview 30 menit (Live + Feedback, Private)',
      'BONUS: Template Email HRD + Handbook Kumpulan Psikotest'
    ]
  }
];

// LinkedIn Branding (Management)
const linkedinBranding = [
  {
    name: 'LinkedIn Basic',
    posts: '4 konten/bulan',
    price: 'Rp599.000/bulan'
  },
  {
    name: 'LinkedIn Basic 2',
    posts: '6 konten/bulan',
    price: 'Rp999.000/bulan'
  },
  {
    name: 'LinkedIn Super',
    posts: '10 konten/bulan',
    price: 'Rp1.500.000/bulan'
  },
  {
    name: 'LinkedIn Exclusive',
    posts: '12 konten/bulan',
    price: 'Contact Halolearn'
  }
];

export default function PricingPage() {
  const faqItems = [
    {
      q: 'Berapa lama pengerjaan CV?',
      a: '6-8 hari kerja (tidak termasuk weekend, hari libur, tanggal merah). Butuh express? Hubungi admin — tersedia opsi express 1 hari, 2-3 hari, atau 3-4 hari.'
    },
    {
      q: 'Apakah ada revisi?',
      a: 'Revisi tersedia untuk paket Supreme ke atas. Jumlah revisi sesuai paket yang dipilih. Revisi hanya bisa diklaim maksimal 3 hari setelah CV diterima.'
    },
    {
      q: 'CV ATS atau CV Kreatif, mana yang lebih baik?',
      a: 'Kebanyakan perusahaan Indonesia sudah pakai sistem ATS. Namun untuk posisi kreatif, CV Kreatif lebih cocok. Halolearn menyarankan memiliki 2 jenis CV. Konsultasikan dengan tim kami.'
    },
    {
      q: 'Apakah bisa dalam bahasa Inggris?',
      a: 'Bisa! CV dan LinkedIn bisa dibuat dalam bahasa Indonesia atau Inggris. Untuk terjemahan ke Inggris ada biaya tambahan — hubungi admin untuk info lebih lanjut.'
    },
    {
      q: 'Apakah LinkedIn penting untuk fresh graduate?',
      a: 'Sangat penting! HRD biasanya melakukan double check via LinkedIn setelah menerima CV. Beberapa HRD bahkan hunting kandidat langsung di LinkedIn.'
    },
    {
      q: 'Sudah berapa klien Halolearn?',
      a: 'Lebih dari 10.000+ peserta, dan 95% di antaranya berhasil mendapatkan pekerjaan dalam kurun waktu kurang dari 3-6 bulan.'
    },
    {
      q: 'Apakah bisa tambah pengalaman lebih dari 4?',
      a: 'Bisa, dengan biaya tambahan Rp49.000 per pengalaman tambahan.'
    },
    {
      q: 'Bagaimana cara pemesanan?',
      a: 'Konsultasi via WhatsApp → pilih paket → isi form pemesanan → bayar → proses pembuatan → dikirim ke email.'
    }
  ];

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
        subtitle="💎 PAKET & HARGA"
        title="Pilih Paket yang Tepat"
        description="Promo berlaku dengan share testimoni di sosmed. Pengerjaan 6-8 hari kerja."
      />

      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Promo Info */}
        <div className="mb-16 text-center">
          <p className="text-lg font-semibold text-slate-900">
            Gunakan kode promo <span className="text-amber-600">H4LO10</span> untuk diskon 10%
          </p>
        </div>

        {/* Individual Services Notice */}
        <div className="mb-20 text-center p-6 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-sm text-slate-600">
            <strong>Layanan satuan tersedia,</strong> hubungi admin untuk info harga.
          </p>
        </div>

        {/* Bundling Packages */}
        <div className="mb-20 -mx-6 bg-slate-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">Paket Bundling</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {bundlingPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col rounded-2xl transition ${
                    pkg.highlighted
                      ? 'border-2 border-slate-900 bg-gradient-to-br from-slate-900 to-slate-800 text-white lg:scale-105 shadow-xl'
                      : 'border border-slate-200 bg-white'
                  }`}
              >
                  {pkg.label && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        pkg.highlighted
                          ? 'bg-amber-500 text-white'
                          : pkg.label.includes('🔥') ? 'bg-orange-500 text-white'
                          : pkg.label.includes('👑') ? 'bg-purple-500 text-white'
                          : 'bg-slate-900 text-white'
                      }`}>
                        {pkg.label}
                      </span>
                    </div>
                  )}

                  <div className={`border-b px-6 py-6 ${pkg.highlighted ? 'border-slate-700' : 'border-slate-200'}`}>
                    <h3 className={`text-xl font-bold ${pkg.highlighted ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                    <p className={`mt-2 text-sm ${pkg.highlighted ? 'text-slate-200' : 'text-slate-600'}`}>{pkg.description}</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      {pkg.oldPrice && (
                        <span className={`text-sm line-through ${pkg.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>{pkg.oldPrice}</span>
                      )}
                      <span className={`text-3xl font-bold ${pkg.highlighted ? 'text-white' : 'text-slate-900'}`}>{pkg.price}</span>
                    </div>
                    {pkg.subtext && (
                      <p className={`mt-2 text-xs ${pkg.highlighted ? 'text-slate-300' : 'text-slate-500'}`}>{pkg.subtext}</p>
                    )}
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className={`flex items-start gap-2 text-xs ${pkg.highlighted ? 'text-slate-200' : 'text-slate-600'}`}>
                            <span className={`mt-1 flex-shrink-0 ${pkg.highlighted ? 'text-amber-400' : 'text-green-600'}`}>✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className={`flex-1 border-t px-6 py-6 ${pkg.highlighted ? 'border-slate-700' : 'border-slate-200'}`}>
                    <a
                      href={getWhatsappLink(pkg.name)}
                      target="_blank"
                      rel="noreferrer"
                      className={`block rounded-lg py-3 text-center text-sm font-medium transition ${
                        pkg.highlighted
                          ? 'bg-white text-slate-900 hover:bg-slate-100'
                          : 'border border-slate-300 text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Pesan Sekarang
                    </a>
                  </div>
              </div>
              ))}
            </div>
          </div>
        </div>

        {/* LinkedIn Branding */}
        <div className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">LinkedIn Branding (Management)</h2>
          <p className="mb-8 text-slate-600">Min order 3 bulan. Hasil: 300+ profile visit, +1000% impression</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {linkedinBranding.map((pkg, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition">
                <h3 className="font-bold text-slate-900">{pkg.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{pkg.posts}</p>
                <p className="mt-4 text-2xl font-bold text-slate-900">{pkg.price}</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block rounded-lg border border-slate-300 py-2 text-center text-sm font-medium text-slate-900 hover:bg-slate-50 transition"
                >
                  Info Lebih Lanjut
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="mb-12 text-2xl font-bold text-slate-900">FAQ</h2>
          <div className="space-y-6">
            {faqItems.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="font-semibold text-slate-900">{item.q}</p>
                <p className="mt-3 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-16 text-center text-white md:py-20 shadow-xl">
          <h2 className="mb-4 text-4xl font-bold">Mulai Perjalanan Karir Kamu</h2>
          <p className="mb-8 text-lg text-slate-300">
            Pilih paket, gunakan kode H4LO10 untuk diskon, dan chat kami sekarang juga
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
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white py-12 mt-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-600">© 2024 Halolearn. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm text-slate-600">Hubungi kami: <a href={whatsappLink} className="font-medium hover:text-slate-900">WhatsApp 085260421274</a></p>
        </div>
      </footer>
    </main>
  );
}
