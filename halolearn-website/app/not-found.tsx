import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-white text-slate-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">halolearn</Link>
        </div>
      </header>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <div className="mb-8 text-6xl md:text-8xl">😅</div>

          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-slate-900">
            Halaman Tidak Ditemukan
          </h1>

          <p className="mb-12 text-lg text-slate-600">
            Tapi jangan pergi dulu — mau cek CV kamu?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cv-analyzer"
              className="rounded-lg bg-slate-900 px-8 py-3.5 text-sm font-medium text-white hover:bg-slate-800 transition inline-block"
            >
              Analisa CV — Rp50.000
            </Link>
            <Link
              href="/harga"
              className="rounded-lg border border-slate-300 px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-50 transition inline-block"
            >
              Lihat Paket
            </Link>
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
            <p className="text-sm text-slate-600 mb-4">
              <strong>Atau kembali ke halaman utama:</strong>
            </p>
            <Link
              href="/"
              className="inline-block text-sm text-slate-900 font-medium hover:underline"
            >
              ← Kembali ke Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-600">© 2024 Halolearn. Semua hak dilindungi.</p>
        </div>
      </footer>
    </main>
  );
}
