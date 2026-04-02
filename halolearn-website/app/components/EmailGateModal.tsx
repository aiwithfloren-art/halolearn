'use client';

import { useState } from 'react';

interface EmailGateModalProps {
  onClose: (email: string, name: string) => void;
}

export default function EmailGateModal({ onClose }: EmailGateModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Nama tidak boleh kosong');
      return;
    }

    if (!email.trim()) {
      setError('Email tidak boleh kosong');
      return;
    }

    if (!validateEmail(email)) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);

    // Simulate save to localStorage
    setTimeout(() => {
      localStorage.setItem('halolearn_email', email);
      localStorage.setItem('halolearn_name', name);
      setIsLoading(false);
      onClose(email, name);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-4 text-4xl">📧</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Lihat Hasil Analisa CV Kamu
          </h2>
          <p className="text-sm text-slate-600">
            Masukkan email untuk akses hasil lengkap
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Sub Text */}
          <p className="text-xs text-slate-600 text-center px-2">
            ✨ Kami akan kirim tips CV gratis ke email kamu. Tidak ada spam.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              'Lihat Hasil Gratis'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
