'use client';

import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';

const ADMIN_EMAIL = 'aiwithfloren@gmail.com';

const ROLES = [
  { value: 'management-trainee', label: 'Management Trainee' },
  { value: 'akuntansi', label: 'Akuntansi' },
  { value: 'admin', label: 'Administrasi' },
  { value: 'human-resources', label: 'Human Resources' },
  { value: 'odp-bank', label: 'ODP Bank' },
  { value: 'all', label: '🌟 Semua Role (Bundle)' },
];

interface CodeEntry {
  code: string;
  role: string;
  email: string | null;
  expiresAt: string | null;
  used: boolean;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [codes, setCodes] = useState<CodeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('management-trainee');
  const [generating, setGenerating] = useState(false);
  const [newCode, setNewCode] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'used' | 'unused'>('all');
  const [search, setSearch] = useState('');
  const [markingCode, setMarkingCode] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchCodes = useCallback(async () => {
    try {
      setErrorMessage(null);
      const res = await fetch('/api/generate-code');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Gagal memuat daftar kode');
      }
      if (data.codes) setCodes(data.codes);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal memuat daftar kode');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email === ADMIN_EMAIL) {
      fetchCodes();
    } else if (status !== 'loading') {
      setLoading(false);
    }
  }, [status, session, fetchCodes]);

  async function generateCode() {
    setGenerating(true);
    setNewCode(null);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Gagal generate kode');
      }
      if (data.code) {
        setNewCode(data.code);
        fetchCodes();
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal generate kode');
    } finally {
      setGenerating(false);
    }
  }

  async function markUsed(code: string) {
    setMarkingCode(code);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/generate-code', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Gagal update kode');
      }
      fetchCodes();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal update kode');
    } finally {
      setMarkingCode(null);
    }
  }

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-2xl font-black mb-4">Admin Login Required</h1>
          <button
            onClick={() => signIn('google')}
            className="bg-[#F5C518] text-[#0A0E1A] px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Login dengan Google
          </button>
        </div>
      </main>
    );
  }

  if (session?.user?.email !== ADMIN_EMAIL) {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-black mb-4">Akses Ditolak</h1>
          <p className="text-white/60 mb-6">Halaman ini hanya untuk admin Halolearn.</p>
          <Link href="/belajar" className="text-[#F5C518] hover:underline">← Kembali</Link>
        </div>
      </main>
    );
  }

  const filteredCodes = codes
    .filter((c) => {
      if (filter === 'used') return c.used;
      if (filter === 'unused') return !c.used;
      return true;
    })
    .filter((c) => {
      if (!search) return true;
      return (
        c.code.includes(search.toUpperCase()) ||
        c.role.includes(search.toLowerCase()) ||
        (c.email ?? '').includes(search.toLowerCase())
      );
    });

  const totalCodes = codes.length;
  const usedCodes = codes.filter((c) => c.used).length;
  const unusedCodes = totalCodes - usedCodes;

  return (
    <main className="min-h-screen bg-[#0A0E1A] text-white">
      <nav className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#F5C518] font-bold text-xl">Halolearn</span>
            <span className="text-white/40">/</span>
            <span className="text-white/70 text-sm">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-xs hidden sm:block">{session?.user?.email}</span>
            <Link href="/belajar/dashboard" className="text-white/60 hover:text-white text-sm transition">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-black mb-1">Admin Panel 🛠️</h1>
          <p className="text-white/50">Kelola kode akses Platform Belajar Halolearn</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Kode', value: totalCodes, color: 'text-white' },
            { label: 'Terpakai', value: usedCodes, color: 'text-green-400' },
            { label: 'Tersisa', value: unusedCodes, color: 'text-[#F5C518]' },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-white/50 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-300 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Generate Code */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">🎟️ Generate Kode Baru</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#F5C518] transition"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value} className="bg-[#0A0E1A]">
                  {r.label}
                </option>
              ))}
            </select>
            <button
              onClick={generateCode}
              disabled={generating}
              className="bg-[#F5C518] text-[#0A0E1A] px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {generating ? 'Generating...' : '+ Generate Kode'}
            </button>
          </div>

          {newCode && (
            <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium mb-1">✅ Kode berhasil dibuat!</p>
                <p className="font-mono text-2xl font-black text-white tracking-widest">{newCode}</p>
                <p className="text-white/50 text-xs mt-1">
                  Role: {ROLES.find((r) => r.value === selectedRole)?.label}
                </p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(newCode)}
                className="border border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition"
              >
                Copy
              </button>
            </div>
          )}
        </div>

        {/* Code List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <h2 className="font-bold text-lg flex-1">📋 Semua Kode</h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode / role / email..."
              className="bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-[#F5C518] transition w-full sm:w-64"
            />
            <div className="flex gap-2">
              {(['all', 'unused', 'used'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    filter === f ? 'bg-[#F5C518] text-[#0A0E1A]' : 'bg-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'Semua' : f === 'unused' ? 'Aktif' : 'Terpakai'}
                </button>
              ))}
            </div>
          </div>

          {filteredCodes.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              {codes.length === 0 ? 'Belum ada kode. Generate kode di atas.' : 'Tidak ada kode yang cocok.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 text-left border-b border-white/10">
                    <th className="pb-3 pr-4">Kode</th>
                    <th className="pb-3 pr-4">Role</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCodes.map((c) => (
                    <tr key={c.code} className="hover:bg-white/3 transition">
                      <td className="py-3 pr-4 font-mono font-bold text-[#F5C518] tracking-widest">{c.code}</td>
                      <td className="py-3 pr-4 text-white/70 text-xs">
                        {ROLES.find((r) => r.value === c.role)?.label ?? c.role}
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          c.used
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-[#F5C518]/20 text-[#F5C518]'
                        }`}>
                          {c.used ? '✓ Terpakai' : '○ Aktif'}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-white/50 text-xs">{c.email ?? '—'}</td>
                      <td className="py-3">
                        {!c.used && (
                          <button
                            onClick={() => markUsed(c.code)}
                            disabled={markingCode === c.code}
                            className="text-xs text-white/40 hover:text-red-400 transition disabled:opacity-50"
                          >
                            {markingCode === c.code ? '...' : 'Mark used'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
