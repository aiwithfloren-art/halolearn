'use client';

import { useState } from 'react';
import Link from 'next/link';

const WA_ORDER = 'https://wa.me/6285260421274?text=' + encodeURIComponent(
  'Halo, saya mau order 10 ATS Keyword Banking (Rp 30.000) — belum punya kode akses.'
);

export default function ResourcesPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [remaining, setRemaining] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/resources/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, code }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setPdfUrl(data.pdfUrl);
        setRemaining(data.remaining ?? null);
        setMessage('Kode berhasil di-redeem! Download PDF di bawah.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Gagal redeem kode.');
      }
    } catch {
      setStatus('error');
      setMessage('Koneksi error. Coba lagi.');
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ─── HERO ─── */}
      <section className="px-4 pt-20 pb-10 md:px-8 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-amber-300">
            HALOLEARN RESOURCES
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
            Free Resource untuk <span className="text-amber-400">Follower Halolearn</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            Masukin kode akses yang kamu dapet dari admin via IG DM.
            Input nama + email + kode — PDF langsung bisa di-download.
          </p>
        </div>
      </section>

      {/* ─── RESOURCE CARD + FORM ─── */}
      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl md:grid-cols-[1fr_1.2fr]">

            {/* LEFT: Resource preview */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-8">
              <div>
                <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-300">
                  PDF · 6 HALAMAN · INSTANT
                </span>
                <h2 className="mt-4 text-2xl font-bold text-white">
                  10 ATS Keyword Banking
                </h2>
                <p className="mt-2 text-sm text-amber-300">
                  Ready to copy ke CV kamu — untuk apply BNI, Mandiri, BRI, BTN
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
                  {[
                    '10 keyword banking + arti + contoh bullet CV',
                    'Case study D.A. — ATS score 23 → 87',
                    'How to use: insert natural, not stuffing',
                    'BONUS: 5 role-specific (Treasury, Corp, Retail, Audit, Risk)',
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Belum punya kode?
                </div>
                <div className="mt-1 text-white">
                  <span className="text-2xl font-black">Rp 30.000</span>
                  <span className="ml-2 text-sm text-slate-400">direct order</span>
                </div>
                <a
                  href={WA_ORDER}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Order via WhatsApp →
                </a>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="p-8">
              {status !== 'success' ? (
                <>
                  <h3 className="text-xl font-bold text-white">
                    Input Kode Akses
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Masukin nama, email, dan kode yang dikasih admin Halolearn lewat IG DM.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Nama
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama kamu"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@contoh.com"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Kode Akses
                      </label>
                      <input
                        type="text"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder="HALOLEARN-ATS10-FREE50"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-white placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="rounded-lg border border-red-700 bg-red-900/30 px-4 py-3 text-sm text-red-200">
                        {message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full rounded-lg bg-amber-400 px-4 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300 disabled:opacity-60"
                    >
                      {status === 'loading' ? 'Memproses...' : 'Redeem Kode & Download PDF'}
                    </button>

                    <p className="text-center text-xs text-slate-500">
                      1 kode hanya berlaku untuk 1 email. Belum follow @halolearn?
                      <br />
                      <a
                        href="https://instagram.com/halolearn"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 underline underline-offset-2 hover:text-amber-300"
                      >
                        Follow dulu di sini →
                      </a>
                    </p>
                  </form>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
                    ✓
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-white">
                    Berhasil!
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {message}
                  </p>
                  {remaining !== null && remaining >= 0 && (
                    <p className="mt-1 text-xs text-slate-500">
                      {remaining} slot tersisa untuk kode ini.
                    </p>
                  )}

                  <a
                    href={pdfUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block rounded-lg bg-amber-400 px-8 py-3.5 font-bold text-slate-950 transition hover:bg-amber-300"
                  >
                    📥 Download PDF Sekarang
                  </a>

                  <p className="mt-5 text-xs text-slate-500">
                    Data kamu juga kami kirim ke inbox — cek email <b className="text-slate-300">{email}</b>.
                  </p>

                  <div className="mt-8 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 text-left">
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Next step
                    </div>
                    <p className="mt-1 text-sm text-slate-300">
                      Mau prep BNI ODP lengkap? <Link href="/harga" className="font-semibold text-amber-400 underline">BNI ODP Playbook</Link> 59 halaman — Rp 135.000.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ─── FAQ / Info ─── */}
          <div className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-400">
            <p>
              Kode didapat setelah <b className="text-white">follow + repost cover ke story + komen &apos;ATS10&apos;</b> di post IG @halolearn.
            </p>
            <p className="mt-2">
              Admin akan DM kode akses dalam 24 jam.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
