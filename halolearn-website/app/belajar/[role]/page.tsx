'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { WA_NUMBER, roleLandingData as roleData } from '@/app/lib/belajar';

export default function RoleDetailPage() {
  const params = useParams();
  const role = params.role as string;
  const { data: session } = useSession();

  const data = roleData[role];

  if (!data) {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😅</div>
          <h1 className="text-2xl font-bold mb-4">Role tidak ditemukan</h1>
          <Link href="/belajar" className="text-[#F5C518] hover:underline">
            ← Kembali ke Belajar
          </Link>
        </div>
      </main>
    );
  }

  const email = session?.user?.email ?? '';
  const waMessage = `Halo Minlearn! Saya mau beli akses ${data.name}. Email saya: ${email || '[isi email kamu]'}. Mohon info pembayarannya.`;
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="min-h-screen bg-[#0A0E1A] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/belajar"
            className="text-white/60 hover:text-white transition flex items-center gap-2 text-sm"
          >
            ← Semua Role
          </Link>
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
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{data.icon}</div>
          <h1 className="text-4xl font-black mb-4">{data.name}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{data.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>✅</span> Yang Kamu Dapat
            </h2>
            <ul className="space-y-3">
              {data.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <span className="text-[#F5C518] text-sm flex-shrink-0">▸</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Purchase Card */}
          <div className="bg-gradient-to-br from-[#F5C518]/15 to-[#F5C518]/5 border border-[#F5C518]/30 rounded-2xl p-6 flex flex-col">
            <h2 className="font-bold text-lg mb-2">Akses Modul Belajarnya</h2>
            <p className="text-white/60 text-sm mb-6">
              Beli akses via WhatsApp. Setelah redeem, kamu masuk ke modul belajar dulu per level sebelum lanjut ke quiz.
            </p>
            <div className="text-4xl font-black text-[#F5C518] mb-6">{data.price}</div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#F5C518] text-[#0A0E1A] py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition block text-center mb-3"
            >
              💬 Beli via WhatsApp
            </a>

            {session ? (
              <div className="space-y-3">
                <Link
                  href="/belajar/dashboard"
                  className="w-full border border-white/20 text-white py-3 rounded-xl font-semibold text-sm hover:bg-white/5 transition block text-center"
                >
                  🎟️ Sudah punya kode? Redeem di Dashboard
                </Link>
                <Link
                  href={`/belajar/${role}/module`}
                  className="w-full border border-[#F5C518]/50 text-[#F5C518] py-3 rounded-xl font-semibold text-sm hover:bg-[#F5C518]/10 transition block text-center"
                >
                  📚 Lihat Modul Belajar
                </Link>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="w-full border border-white/20 text-white py-3 rounded-xl font-semibold text-sm hover:bg-white/5 transition"
              >
                Login untuk redeem & akses modul
              </button>
            )}

            <div className="mt-4 bg-white/5 rounded-xl p-3 text-xs text-white/50">
              <p className="font-semibold text-white/70 mb-1">💡 Cara Beli:</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Klik tombol WA di atas</li>
                <li>Chat Minlearn, info email kamu</li>
                <li>Bayar sesuai instruksi admin</li>
                <li>Kode akses masuk via WA</li>
                <li>Login & redeem kode di dashboard</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Sample Questions */}
        <div>
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <span>🔒</span> Preview 3 Contoh Soal
          </h2>
          <div className="space-y-4">
            {data.sampleQuestions.map((q, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden"
              >
                <p className="font-semibold mb-3 text-white/90">
                  {i + 1}. {q.q}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, j) => (
                    <div
                      key={j}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60"
                    >
                      {String.fromCharCode(65 + j)}. {opt}
                    </div>
                  ))}
                </div>
                {/* Lock overlay */}
                <div className="absolute inset-0 bg-[#0A0E1A]/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <p className="text-white/70 text-sm font-medium">Beli untuk akses jawaban & penjelasan</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="mt-12 text-center bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-black mb-4">
            Belajar dulu. Quiz belakangan.
          </h3>
          <p className="text-white/60 mb-4 max-w-2xl mx-auto">
            Flow baru Halolearn dimulai dari modul belajar per level, baru setelah itu lanjut ke quiz untuk mengukur kesiapanmu.
          </p>
          <p className="text-white/40 text-sm mb-6">
            Jadi produk ini terasa seperti platform belajar interview yang proper, bukan sekadar kumpulan soal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition"
            >
              💬 Beli Akses Belajar — {data.price}
            </a>
            {session && (
              <Link
                href={`/belajar/${role}/module`}
                className="inline-flex items-center gap-2 border border-[#F5C518]/50 text-[#F5C518] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#F5C518]/10 transition"
              >
                📚 Buka Modul Belajar
              </Link>
            )}
          </div>
          <p className="text-white/40 text-xs mt-4">
            Beli akses → redeem kode di dashboard → akses modul → lanjut quiz
          </p>
        </div>
      </div>
    </main>
  );
}
