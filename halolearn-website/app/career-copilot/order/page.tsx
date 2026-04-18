'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

const whatsappBase = 'https://wa.me/6285260421274';

const packageOptions = [
  {
    value: 'Career Copilot',
    price: 'Rp100.000',
    note: 'Analisis role, gap skill, keyword ATS, dan interview direction.',
  },
  {
    value: 'Career Copilot + CV',
    price: 'Rp200.000',
    note: 'Analisis + CV spesifik untuk role target, tanpa revisi.',
  },
  {
    value: 'Career Copilot Lengkap',
    price: 'Rp300.000',
    note: 'Analisis + CV spesifik role + cover letter, tanpa revisi.',
  },
] as const;

export default function CareerCopilotOrderPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    targetRole: '',
    targetCompany: '',
    background: '',
    packageName: 'Career Copilot + CV',
    hasCvReady: 'Ya, CV sudah siap dikirim',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedFromQuery = params.get('paket');
    const found = packageOptions.find((item) => item.value === selectedFromQuery);
    if (found) {
      setForm((prev) => ({ ...prev, packageName: found.value }));
    }
  }, []);

  const selectedPackage = packageOptions.find((item) => item.value === form.packageName) ?? packageOptions[1];

  const whatsappLink = useMemo(() => {
    const text = [
      'Halo Halolearn, saya mau order Career Copilot.',
      '',
      `Nama: ${form.fullName || '-'}`,
      `Email: ${form.email || '-'}`,
      `WhatsApp aktif: ${form.whatsapp || '-'}`,
      `Paket: ${form.packageName}`,
      `Target role: ${form.targetRole || '-'}`,
      `Target company (opsional): ${form.targetCompany || '-'}`,
      `Background singkat: ${form.background || '-'}`,
      `CV siap dikirim: ${form.hasCvReady}`,
      '',
      'Saya siap lanjut ke pembayaran dan kirim CV.',
    ].join('\n');

    return `${whatsappBase}?text=${encodeURIComponent(text)}`;
  }, [form]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="min-h-screen bg-[#07111F] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07111F]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/career-copilot" className="text-sm text-white/60 hover:text-white transition">
            ← Kembali ke Career Copilot
          </Link>
          <div className="text-right">
            <p className="text-sm font-semibold text-[#F5C518]">Order Form</p>
            <p className="text-xs text-white/45">Self-serve flow untuk mulai lebih cepat</p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5C518]/20 bg-[#F5C518]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5C518]">
              Career Copilot Order
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
              Isi data sekali, lalu lanjut order via WhatsApp.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/68">
              Target role itu wajib. Target company opsional. Setelah form ini diisi, kamu langsung diarahkan ke WhatsApp dengan format order yang sudah rapi supaya prosesnya terasa cepat dan jelas.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#F5C518] mb-2">Step 1</p>
                <h2 className="font-bold mb-2">Isi data inti</h2>
                <p className="text-sm text-white/60">Nama, target role, paket, dan background singkat.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#F5C518] mb-2">Step 2</p>
                <h2 className="font-bold mb-2">Lanjut WhatsApp</h2>
                <p className="text-sm text-white/60">Detail order otomatis dirangkai supaya tidak perlu ngetik ulang.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#F5C518] mb-2">Step 3</p>
                <h2 className="font-bold mb-2">Kirim CV & bayar</h2>
                <p className="text-sm text-white/60">Setelah itu proses jalan sekali kirim, tanpa revisi.</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#F5C518]/20 bg-gradient-to-br from-[#F5C518]/10 to-white/5 p-6">
              <h3 className="text-xl font-black mb-3">Catatan penting</h3>
              <ul className="space-y-3 text-sm text-white/72 leading-relaxed">
                <li>• Produk ini bersifat <strong className="text-white">one-time digital output</strong>, jadi tidak ada revisi.</li>
                <li>• Semakin lengkap data yang kamu isi, semakin tajam hasil yang kami proses.</li>
                <li>• CV belum perlu di-upload di form ini. Setelah klik submit, kamu tinggal kirim file CV di WhatsApp.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white p-6 text-slate-900 shadow-2xl">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Form Order</p>
              <h2 className="mt-2 text-2xl font-black">Mulai order sekarang</h2>
              <p className="mt-2 text-sm text-slate-600">Isi form ini lalu klik tombol submit untuk melanjutkan ke WhatsApp.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold">Nama lengkap</label>
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="Nama kamu" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">Email aktif</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="nama@email.com" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">Nomor WhatsApp</label>
                  <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="08xxxxxxxxxx" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Target role <span className="text-red-500">*</span></label>
                <input value={form.targetRole} onChange={(e) => setForm({ ...form, targetRole: e.target.value })} required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="Contoh: Management Trainee / HR / Data Analyst" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Target company <span className="text-slate-400 font-normal">(opsional)</span></label>
                <input value={form.targetCompany} onChange={(e) => setForm({ ...form, targetCompany: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="Contoh: BCA / Unilever / tidak ada" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Background singkat</label>
                <textarea value={form.background} onChange={(e) => setForm({ ...form, background: e.target.value })} rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="Ceritakan background kamu singkat: posisi sekarang, pengalaman, jurusan, atau tujuan pindah role." />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Pilih paket</label>
                <div className="space-y-3">
                  {packageOptions.map((item) => (
                    <label key={item.value} className={`block cursor-pointer rounded-2xl border p-4 transition ${form.packageName === item.value ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white'}`}>
                      <input type="radio" name="packageName" className="sr-only" checked={form.packageName === item.value} onChange={() => setForm({ ...form, packageName: item.value })} />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold">{item.value}</p>
                          <p className="mt-1 text-sm text-slate-600">{item.note}</p>
                        </div>
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{item.price}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Status CV</label>
                <select value={form.hasCvReady} onChange={(e) => setForm({ ...form, hasCvReady: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-900">
                  <option>Ya, CV sudah siap dikirim</option>
                  <option>Belum final, tapi ada draft CV</option>
                  <option>Belum punya CV dan butuh dibantu dari awal</option>
                </select>
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900 mb-1">Upload CV sementara lewat WhatsApp</p>
                <p>Untuk MVP ini, setelah submit kamu akan diarahkan ke WhatsApp. Tinggal lampirkan file CV di chat yang sama supaya proses bisa langsung jalan.</p>
              </div>

              <button type="submit" className="w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800">
                Lanjutkan Order via WhatsApp
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#F5C518] mb-2">Ringkasan Paket</p>
              <h3 className="text-2xl font-black">{selectedPackage.value}</h3>
              <p className="mt-2 text-white/65 max-w-2xl">{selectedPackage.note}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/45">Total paket terpilih</p>
              <p className="text-4xl font-black text-[#F5C518]">{selectedPackage.price}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
