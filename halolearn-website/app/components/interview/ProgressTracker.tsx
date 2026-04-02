'use client';

interface ProgressTrackerProps {
  answered: number;
  free: number;
  total: number;
}

export default function ProgressTracker({
  answered,
  free,
  total,
}: ProgressTrackerProps) {
  const progressPercent = Math.round((answered / total) * 100);

  return (
    <div className="mb-12 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-slate-600 font-medium mb-1">Progress Latihan</p>
          <p className="text-3xl font-bold text-slate-900">
            {answered} <span className="text-lg text-slate-600">/ {total}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600 mb-1">Gratis hingga</p>
          <p className="text-2xl font-bold text-green-600">{free} soal</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-slate-900 h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progressPercent, 100)}%` }}
        />
      </div>

      <p className="text-xs text-slate-600 mt-3 text-center">
        {answered === 0 && '👉 Mulai latihan sekarang untuk unlock semua soal premium'}
        {answered > 0 && answered < free && `${answered} soal sudah dijawab — masih ada ${free - answered} soal gratis`}
        {answered >= free && '🎉 Kamu sudah latihan semua soal gratis. Upgrade untuk akses 50+ soal per role × kategori lengkap!'}
      </p>
    </div>
  );
}
