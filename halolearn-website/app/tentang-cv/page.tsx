'use client';

import Link from 'next/link';

const whatsappLink = 'https://wa.me/6285260421274?text=Halo%2C%20saya%20mau%20cek%20CV%20saya';

export default function AboutCVPage() {
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
            <Link href="/harga" className="text-sm text-slate-600 hover:text-slate-900">Harga</Link>
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

      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Hero */}
        <section className="mb-24 text-center">
          <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            CV yang Buruk = Peluang yang Hilang
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-600">
            Mayoritas pelamar tidak tahu bahwa CV mereka sudah ditolak sebelum dibaca oleh HRD. Pelajari fakta mengejutkan tentang dunia recruitment.
          </p>
        </section>

        {/* Fakta Mengejutkan */}
        <section className="mb-24">
          <h2 className="mb-12 text-3xl font-bold text-slate-900 text-center">📊 Fakta Mengejutkan tentang CV</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: '⏱️',
                stat: '6 Detik',
                title: 'Waktu HRD Membaca CV',
                desc: 'HRD hanya butuh 6 detik untuk memutuskan CV kamu layak dibaca lebih lanjut atau langsung reject'
              },
              {
                icon: '📋',
                stat: '75%',
                title: 'Ditolak ATS',
                desc: '75% CV ditolak oleh sistem ATS (Applicant Tracking System) sebelum sampai ke tangan HRD manusia'
              },
              {
                icon: '📞',
                stat: '3x',
                title: 'Lebih Sering Interview',
                desc: 'Kandidat dengan CV optimal dipanggil interview 3x lebih sering dibanding rata-rata'
              },
              {
                icon: '💼',
                stat: '87%',
                title: 'Recruiter Gunakan LinkedIn',
                desc: '87% recruiter menggunakan LinkedIn untuk cari kandidat. Banyak yang double-check CV via LinkedIn'
              }
            ].map((fact, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 hover:shadow-lg transition">
                <div className="mb-4 text-5xl">{fact.icon}</div>
                <div className="mb-3 text-3xl font-bold text-slate-900">{fact.stat}</div>
                <h3 className="mb-2 font-semibold text-slate-900">{fact.title}</h3>
                <p className="text-sm text-slate-600">{fact.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ATS Explanation */}
        <section className="mb-24">
          <h2 className="mb-12 text-3xl font-bold text-slate-900 text-center">🤖 Apa itu ATS (Applicant Tracking System)?</h2>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-12 mb-8">
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              ATS adalah software yang digunakan perusahaan untuk mengelola ratusan atau ribuan lamaran. Sistem ini secara otomatis <strong>scan CV, filter kandidat, dan rank mereka</strong> berdasarkan keyword dan struktur.
            </p>
            <p className="text-slate-600 mb-6">
              Sayangnya, banyak CV bagus dari manusia ditolak oleh robot ATS hanya karena format yang salah, font yang terlalu fancy, atau keyword yang tidak tepat.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-900 text-white text-lg font-bold">1</div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Kamu upload CV</h3>
                <p className="text-slate-600">CV kamu masuk ke sistem ATS perusahaan</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-900 text-white text-lg font-bold">2</div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">ATS Scan CV</h3>
                <p className="text-slate-600">Sistem otomatis membaca format, keyword, dan struktur CV kamu</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-900 text-white text-lg font-bold">3</div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Filter Otomatis</h3>
                <p className="text-slate-600">ATS membandingkan keyword di CV dengan job description dan filter kandidat</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-red-500 text-white text-lg font-bold">❌</div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Reject atau Lolos?</h3>
                <p className="text-slate-600">Jika score cukup tinggi, CV akan masuk ke HRD. Kalau tidak, langsung di-reject otomatis</p>
              </div>
            </div>
          </div>
        </section>

        {/* CV ATS vs CV Biasa */}
        <section className="mb-24">
          <h2 className="mb-12 text-3xl font-bold text-slate-900 text-center">📝 CV ATS vs CV Biasa</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Aspek</th>
                  <th className="px-6 py-4 text-left font-semibold text-red-600">❌ CV Biasa</th>
                  <th className="px-6 py-4 text-left font-semibold text-green-600">✅ CV ATS-Friendly</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    aspect: 'Format',
                    bad: 'Tabel kompleks, kolom, boxes',
                    good: 'Struktur linear, simple, clean'
                  },
                  {
                    aspect: 'Font',
                    bad: 'Fancy fonts (Comic Sans, Script)',
                    good: 'Standard fonts (Arial, Calibri, Times New Roman)'
                  },
                  {
                    aspect: 'Warna',
                    bad: 'Multiple colors, gradient background',
                    good: 'Black text, white background'
                  },
                  {
                    aspect: 'Konten',
                    bad: 'Deskripsi umum tanpa metrics',
                    good: 'Achievements dengan angka/KPI'
                  },
                  {
                    aspect: 'Keyword',
                    bad: 'Tidak sesuai dengan job description',
                    good: 'Match dengan keywords di job desc'
                  },
                  {
                    aspect: 'Foto',
                    bad: 'Foto besar atau formal ekstrem',
                    good: 'Opsi: no photo atau simple, professional'
                  },
                  {
                    aspect: 'File Format',
                    bad: 'PDF dengan banyak styling (risky)',
                    good: 'PDF atau Word, text-based (safer)'
                  }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 font-medium text-slate-900 border-b border-slate-200">{row.aspect}</td>
                    <td className="px-6 py-4 text-slate-700 border-b border-slate-200">{row.bad}</td>
                    <td className="px-6 py-4 text-slate-700 border-b border-slate-200">{row.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* LinkedIn Importance */}
        <section className="mb-24 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-12">
          <div className="flex gap-6 mb-6">
            <div className="text-5xl">💼</div>
            <div className="flex-1">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">Mengapa LinkedIn Sama Pentingnya?</h2>
              <p className="text-slate-700 mb-4">
                HRD tidak hanya berhenti di CV. Setelah menemukan kandidat yang lolos ATS, mereka biasanya double-check di LinkedIn untuk verifikasi dan deep dive ke career history kamu.
              </p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>87% recruiter</strong> menggunakan LinkedIn untuk cari kandidat</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span>LinkedIn profile yang bagus bisa membuka <strong>peluang langsung dari recruiter</strong> tanpa apply</span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span>Headline dan summary di LinkedIn bisa menjadi <strong>filter pertama bagi recruiter</strong></span>
                </li>
                <li className="flex gap-3">
                  <span>✓</span>
                  <span><strong>Recommendations & endorsements</strong> memberikan social proof yang kuat</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-24 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-16 text-center text-white shadow-xl">
          <h2 className="mb-4 text-4xl font-bold">Saatnya Cek Kualitas CV & LinkedIn Kamu</h2>
          <p className="mb-8 text-lg text-slate-300 max-w-2xl mx-auto">
            Jangan biarkan CV buruk atau LinkedIn yang tidak optimal menjadi penghalang mendapat pekerjaan impianmu. Gunakan tools kami untuk analisis mendalam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cv-analyzer"
              className="rounded-lg bg-white px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-md"
            >
              Analisa CV — Mulai Rp50.000
            </Link>
            <Link
              href="/linkedin-score"
              className="rounded-lg border border-white px-8 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Analisis LinkedIn
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24">
          <h2 className="mb-12 text-3xl font-bold text-slate-900 text-center">❓ FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Berapa lama CV aku harus diperbaiki?',
                a: 'Sebagian besar perbaikan CV bisa dilakukan dalam 1-2 hari jika kamu sudah punya pengalaman yang cukup. Fokus pada kejelasan struktur, menambah metrics, dan keyword optimization.'
              },
              {
                q: 'Apakah CV 1 halaman lebih baik dari 2 halaman?',
                a: 'Untuk fresh graduate atau pengalaman < 3 tahun, 1 halaman sudah cukup. Untuk yang lebih berpengalaman, 2 halaman acceptable selama isi relevan dan tidak ada filler.'
              },
              {
                q: 'Haruskah saya include foto di CV?',
                a: 'Di Indonesia, foto masih common practice. Namun untuk job di tech/startup, some companies prefer CV tanpa foto. Yang penting, foto professional dan clear jika ada.'
              },
              {
                q: 'Bagaimana cara tahu CV saya lolos ATS?',
                a: 'Gunakan CV analyzer tools seperti Halolearn untuk scan CV kamu dan dapatkan ATS score. Kami juga memberikan feedback spesifik tentang keyword dan struktur.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">Siap Mulai?</h2>
          <p className="mb-8 text-slate-600">
            Gunakan CV Analyzer kami untuk scan CV dan dapatkan actionable feedback untuk improvement
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg bg-slate-900 px-8 py-3.5 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Chat di WhatsApp
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-16 mt-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-600">© 2024 Halolearn. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm text-slate-600">Hubungi kami: <a href={whatsappLink} className="font-medium text-slate-900 hover:text-slate-700">WhatsApp</a></p>
        </div>
      </footer>
    </main>
  );
}
