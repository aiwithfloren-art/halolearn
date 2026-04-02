'use client';

interface PremiumCTAProps {
  whatsappLink: string;
}

export default function PremiumCTA({ whatsappLink }: PremiumCTAProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-10 border border-slate-700">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🔒 Akses 50 Pertanyaan Lengkap Per Role
          </h3>
          <p className="text-slate-300">30 pertanyaan HRD + 20 pertanyaan user interview per role — 100 pertanyaan untuk 2 role pertama</p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">✅</span>
            <div>
              <p className="font-medium text-white">15+ Role Lengkap</p>
              <p className="text-sm text-slate-400">HR, Admin, Marketing, Finance, IT, Sales, dan lainnya</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">✅</span>
            <div>
              <p className="font-medium text-white">100+ Pertanyaan Setiap Role</p>
              <p className="text-sm text-slate-400">30 HRD + 20 User interview × kategori lengkap + jawaban + strategi</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">✅</span>
            <div>
              <p className="font-medium text-white">Simulasi Interview LIVE</p>
              <p className="text-sm text-slate-400">Praktek langsung dengan tim Halolearn</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">✅</span>
            <div>
              <p className="font-medium text-white">Feedback Personal</p>
              <p className="text-sm text-slate-400">Dari HR expert Halolearn</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">✅</span>
            <div>
              <p className="font-medium text-white">Update Rutin</p>
              <p className="text-sm text-slate-400">Pertanyaan terbaru setiap bulan</p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-xl flex-shrink-0">✅</span>
            <div>
              <p className="font-medium text-white">Access Forever</p>
              <p className="text-sm text-slate-400">Beli sekali, akses selamanya</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700/50">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-bold text-white">Rp195.000</span>
            <span className="text-sm text-slate-400">/seumur hidup</span>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            💡 Paket termasuk: 500+ pertanyaan + 1x simulasi interview LIVE
          </p>
          <p className="text-xs text-slate-400 border-t border-slate-700/50 pt-4">
            <strong>Atau paket Supreme 2:</strong> Akses Interview Prep + CV Optimization + LinkedIn Score + Bonus konsultasi 1x
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="block w-full text-center bg-white text-slate-900 font-bold py-4 rounded-lg hover:bg-slate-100 transition duration-200 mb-4"
        >
          Beli Akses Sekarang →
        </a>

        <p className="text-xs text-slate-400 text-center">
          💬 Klik tombol di atas untuk chat via WhatsApp dan confirm pembelian
        </p>
      </div>
    </div>
  );
}
