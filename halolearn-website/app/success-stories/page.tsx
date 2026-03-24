'use client';

import Link from 'next/link';
import DarkHero from '../components/DarkHero';

const whatsappLink = 'https://wa.me/6285260421274?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20Halolearn';

const stories = [
  {
    id: 1,
    name: 'Rizky Pratama',
    role: 'Social Media Specialist @ Tokopedia',
    background: 'Fresh graduate komunikasi, 8 bulan nganggur, kirim 60+ lamaran tidak ada yang reply',
    problem: 'CV tidak ATS friendly, summary generik, tidak ada metrics',
    solution: 'Rewrite total CV, optimasi LinkedIn, konsultasi 2 minggu',
    result: 'Dalam 12 hari setelah revisi dapat 4 panggilan interview, diterima di Tokopedia',
    salary: 'Rp8 juta',
    timeline: [
      { month: 'Agustus 2024', status: 'Sebelum', icon: '📋' },
      { month: 'September 2024', status: 'Proses', icon: '⚙️' },
      { month: 'Oktober 2024', status: 'Hasil', icon: '✨' }
    ],
    quote: 'Saya udah hampir nyerah. Tapi setelah CV direvisi Halolearn, dalam 2 minggu langsung ada yang hubungi. Sekarang udah kerja di Tokopedia!',
    avatar: 'RP'
  },
  {
    id: 2,
    name: 'Dewi Santika',
    role: 'Brand Manager @ Unilever',
    background: '3 tahun pengalaman marketing, mau naik level ke manager tapi CV tidak menunjukkan leadership',
    problem: 'CV tidak menampilkan leadership experience dengan jelas',
    solution: 'Premium package, reframe experience jadi leadership-focused, LinkedIn personal branding',
    result: 'Dapat offer Brand Manager di Unilever, gaji naik 60%',
    salary: 'Rp25 juta+ (naik 60%)',
    timeline: [
      { month: 'Januari 2024', status: 'Sebelum', icon: '📊' },
      { month: 'Februari 2024', status: 'Proses', icon: '🎯' },
      { month: 'Maret 2024', status: 'Hasil', icon: '🎉' }
    ],
    quote: 'Tim Halolearn bantu saya reframe experience jadi kelihatan lebih senior. Hasilnya? Offer dari Unilever dalam 3 minggu.',
    avatar: 'DS'
  },
  {
    id: 3,
    name: 'Budi Setiawan',
    role: 'Senior Engineer @ Gojek',
    background: 'Software engineer 5 tahun, mau apply ke startup tech tapi CV masih gaya lama',
    problem: 'CV tidak menggunakan tech keywords yang tepat untuk recruiter tech companies',
    solution: 'CV ATS + LinkedIn optimization fokus tech keywords',
    result: '3 recruiter Singapore reach out di LinkedIn, diterima di Gojek senior engineer',
    salary: 'Rp25+ juta',
    timeline: [
      { month: 'November 2023', status: 'Sebelum', icon: '💻' },
      { month: 'Desember 2023', status: 'Proses', icon: '🔧' },
      { month: 'Januari 2024', status: 'Hasil', icon: '🚀' }
    ],
    quote: 'LinkedIn saya sebelumnya sepi banget. Sekarang hampir tiap minggu ada recruiter yang reach out, bahkan dari luar negeri.',
    avatar: 'BS'
  },
  {
    id: 4,
    name: 'Sari Indah',
    role: 'Relationship Manager @ BCA',
    background: 'Ibu rumah tangga 2 tahun career gap, mau balik kerja tapi tidak tau cara address gap di CV',
    problem: 'Tidak tahu cara menjelaskan career gap 2 tahun di CV',
    solution: 'Strategi address career gap, reframe jadi skill development period, konsultasi interview',
    result: 'Diterima di BCA sebagai relationship manager',
    salary: 'Rp10 juta',
    timeline: [
      { month: 'Juli 2024', status: 'Sebelum', icon: '⏸️' },
      { month: 'Agustus 2024', status: 'Proses', icon: '🌱' },
      { month: 'September 2024', status: 'Hasil', icon: '💼' }
    ],
    quote: 'Saya khawatir gap 2 tahun jadi hambatan. Tim Halolearn kasih strategi jitu cara jelasin gap itu. Alhamdulillah langsung diterima!',
    avatar: 'SI'
  }
];

export default function SuccessStories() {
  return (
    <main className="bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">halolearn</Link>
          <nav className="hidden gap-8 md:flex">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/cv-analyzer" className="text-sm text-slate-600 hover:text-slate-900">CV Analyzer</Link>
            <Link href="/linkedin-score" className="text-sm text-slate-600 hover:text-slate-900">LinkedIn Score</Link>
            <Link href="/tentang-cv" className="text-sm text-slate-600 hover:text-slate-900">Kenapa CV Penting?</Link>
            <Link href="/success-stories" className="text-sm text-slate-900 font-medium">Success Stories</Link>
            <Link href="/harga" className="text-sm text-slate-600 hover:text-slate-900">Harga</Link>
          </nav>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Mulai Gratis
          </a>
        </div>
      </header>

      {/* Hero */}
      <DarkHero
        subtitle="✨ Kisah Nyata dari Klien Kami"
        title="Success Stories"
        description="Ribuan klien telah mendapatkan pekerjaan impian mereka dengan bantuan Halolearn. Berikut kisah nyata mereka."
      />

      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Stories Grid */}
        <div className="space-y-16">
          {stories.map((story, idx) => (
            <div
              key={story.id}
              className={`rounded-2xl border p-8 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in ${
                idx % 2 === 0
                  ? 'bg-white border-slate-200'
                  : 'bg-gradient-to-br from-slate-50 to-white border-slate-200'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Story Header */}
              <div className="mb-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {story.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{story.name}</h2>
                      <p className="text-sm text-green-600 font-semibold">{story.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{story.background}</p>
                </div>

                {/* Stats Highlight */}
                <div className="md:w-48 space-y-3">
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Gaji</p>
                    <p className="text-lg font-bold text-slate-900">{story.salary}</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Timeline</p>
                    <p className="text-sm font-bold text-slate-900">3 bulan</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8 p-6 bg-white border border-slate-200 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-4">Timeline Proses</h3>
                <div className="flex justify-between items-start">
                  {story.timeline.map((item, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <p className="text-xs text-slate-600 font-semibold text-center mb-1">{item.month}</p>
                      <span className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before/After */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-700 font-bold uppercase mb-2 tracking-wider">❌ Sebelum</p>
                  <p className="text-sm text-red-900">{story.problem}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-700 font-bold uppercase mb-2 tracking-wider">✅ Sesudah</p>
                  <p className="text-sm text-green-900">{story.solution}</p>
                </div>
              </div>

              {/* Hasil */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 font-bold uppercase mb-2 tracking-wider">🎯 Hasil</p>
                <p className="text-slate-900 font-semibold">{story.result}</p>
              </div>

              {/* Quote */}
              <div className="p-6 bg-slate-900 text-white rounded-lg">
                <p className="text-lg italic mb-3">"{story.quote}"</p>
                <p className="font-semibold text-sm">— {story.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-32 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-16 text-center text-white md:py-24 shadow-xl">
          <h2 className="mb-4 text-4xl font-bold">Pengen Cerita Suksesmu Juga Ditampilkan di Sini?</h2>
          <p className="mb-8 text-lg text-slate-300">
            Bergabunglah dengan ribuan klien yang telah meraih karir impian mereka bersama Halolearn
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-md"
          >
            Mulai Konsultasi Gratis
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-16 mt-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-600">© 2024 Halolearn. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm text-slate-600">Hubungi kami: <a href={whatsappLink} className="font-medium text-slate-900 hover:text-slate-700">WhatsApp</a></p>
        </div>
      </footer>
    </main>
  );
}
