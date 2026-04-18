'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

import { ALL_ROLES, WA_NUMBER } from '@/app/lib/belajar';

interface RoleProgress {
  attempts: number;
  bestScore: number;
  lastScore: number;
  passed: boolean;
  lastAttemptAt: string | null;
}

interface UserAccess {
  email: string;
  roles: string[];
  purchasedAt: string | null;
  expiresAt: string | null;
}

function getProgress(role: string): RoleProgress {
  if (typeof window === 'undefined') return { attempts: 0, bestScore: 0, lastScore: 0, passed: false, lastAttemptAt: null };
  const raw = localStorage.getItem(`quiz_progress_${role}`);
  if (!raw) return { attempts: 0, bestScore: 0, lastScore: 0, passed: false, lastAttemptAt: null };
  try { return JSON.parse(raw); } catch { return { attempts: 0, bestScore: 0, lastScore: 0, passed: false, lastAttemptAt: null }; }
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userAccess, setUserAccess] = useState<UserAccess | null>(null);
  const [loading, setLoading] = useState(true);
  const [codeInput, setCodeInput] = useState('');
  const [redeemStatus, setRedeemStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [progress, setProgress] = useState<Record<string, RoleProgress>>({});

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAccess();
      const p: Record<string, RoleProgress> = {};
      ALL_ROLES.forEach((r) => { p[r.slug] = getProgress(r.slug); });
      setProgress(p);
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  async function fetchAccess() {
    setLoading(true);
    try {
      const res = await fetch('/api/user-access');
      const data = await res.json();
      setUserAccess(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  async function handleRedeem() {
    if (!codeInput.trim()) return;
    setRedeemLoading(true);
    setRedeemStatus(null);
    try {
      const res = await fetch('/api/redeem-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setRedeemStatus({ type: 'success', msg: `✅ Kode berhasil diredeem! Akses ke ${data.role} sudah aktif.` });
        setCodeInput('');
        fetchAccess();
      } else {
        setRedeemStatus({ type: 'error', msg: `❌ ${data.error}` });
      }
    } catch {
      setRedeemStatus({ type: 'error', msg: '❌ Gagal menghubungi server. Coba lagi.' });
    } finally {
      setRedeemLoading(false);
    }
  }

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Memuat dashboard...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen bg-[#0A0E1A] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-3xl font-black mb-4">Login Dulu Ya</h1>
          <p className="text-white/60 mb-8">
            Kamu perlu login dengan Google untuk mengakses dashboard belajarmu.
          </p>
          <button
            onClick={() => signIn('google')}
            className="bg-[#F5C518] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition"
          >
            Login dengan Google
          </button>
          <div className="mt-6">
            <Link href="/belajar" className="text-white/50 hover:text-white text-sm transition">
              ← Kembali ke Belajar
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const ownedRoles = userAccess?.roles ?? [];
  const ownedRoleDetails = ALL_ROLES.filter((r) => ownedRoles.includes(r.slug));
  const unownedRoles = ALL_ROLES.filter((r) => !ownedRoles.includes(r.slug));

  return (
    <main className="min-h-screen bg-[#0A0E1A] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/belajar" className="flex items-center gap-2">
            <span className="text-[#F5C518] font-bold text-xl">Halolearn</span>
            <span className="text-white/40 text-sm">/</span>
            <span className="text-white/70 text-sm">Dashboard</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm hidden sm:block">{session?.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/belajar' })}
              className="border border-white/20 text-white/70 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-black mb-1">
            Hai, {session?.user?.name?.split(' ')[0] ?? 'Kamu'} 👋
          </h1>
          <p className="text-white/60">Selamat datang di dashboard belajarmu. Mulai dari modul belajar dulu, lalu lanjut ke quiz saat sudah siap.</p>
        </div>

        {/* Redeem Code */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-1 flex items-center gap-2"><span>🎟️</span> Redeem Kode Akses</h2>
          <p className="text-white/60 text-sm mb-4">Masukkan kode akses yang sudah kamu terima via WhatsApp.</p>
          <div className="flex gap-3">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase().trim())}
              onKeyDown={(e) => e.key === 'Enter' && handleRedeem()}
              placeholder="Contoh: AB12CD34"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded-xl font-mono tracking-widest focus:outline-none focus:border-[#F5C518] transition"
              maxLength={16}
            />
            <button
              onClick={handleRedeem}
              disabled={redeemLoading || !codeInput.trim()}
              className="bg-[#F5C518] text-[#0A0E1A] px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {redeemLoading ? '...' : 'Redeem'}
            </button>
          </div>
          {redeemStatus && (
            <p className={`mt-3 text-sm font-medium ${redeemStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {redeemStatus.msg}
            </p>
          )}
          <p className="text-white/40 text-xs mt-3">
            Belum punya kode?{' '}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Minlearn! Saya mau beli akses Platform Belajar Halolearn. Mohon info pembayarannya 🙏')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5C518] hover:underline"
            >
              Beli via WhatsApp →
            </a>
          </p>
        </div>

        {/* Owned Roles */}
        {ownedRoleDetails.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span>📚</span> Role Kamu</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ownedRoleDetails.map((role) => {
                const prog = progress[role.slug];
                const pct = prog?.bestScore ?? 0;
                const passed = prog?.passed ?? false;

                return (
                  <div
                    key={role.slug}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#F5C518]/40 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{role.icon}</div>
                      {passed && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-semibold">
                          ✓ LULUS
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold mb-1">{role.name}</h3>
                    <div className="text-white/50 text-xs mb-3">
                      {prog?.attempts ? `${prog.attempts}x latihan · Best score: ${pct}%` : 'Belum pernah latihan'}
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-white/10 rounded-full mb-4 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct >= 80 ? 'bg-green-500' : 'bg-[#F5C518]'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/belajar/${role.slug}/module`}
                        className="flex-1 bg-[#F5C518] text-[#0A0E1A] py-2.5 rounded-xl font-bold text-sm text-center hover:bg-yellow-400 transition"
                      >
                        📚 Modul
                      </Link>
                      <Link
                        href={`/belajar/quiz/${role.slug}`}
                        className="flex-1 border border-white/20 text-white py-2.5 rounded-xl font-bold text-sm text-center hover:bg-white/5 transition"
                      >
                        {prog?.attempts ? '🔄' : '▶'} Quiz
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">📭</div>
            <h3 className="font-bold text-lg mb-2">Belum Ada Akses</h3>
            <p className="text-white/60 text-sm mb-4">
              Redeem kode akses di atas, atau beli akses baru via WhatsApp.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Minlearn! Saya mau beli akses Platform Belajar Halolearn. Mohon info pembayarannya 🙏')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0A0E1A] px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition"
            >
              💬 Beli Akses via WA
            </a>
          </div>
        )}

        {/* Unowned Roles */}
        {unownedRoles.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span>🔓</span> Role Lainnya</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unownedRoles.map((role) => (
                <div
                  key={role.slug}
                  className="bg-white/3 border border-white/5 rounded-2xl p-5 opacity-70"
                >
                  <div className="text-3xl mb-3 grayscale">{role.icon}</div>
                  <h3 className="font-bold mb-1">{role.name}</h3>
                  <p className="text-white/40 text-xs mb-4">Belum punya akses</p>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Halo Minlearn! Saya mau beli akses ${role.name}. Email saya: ${session?.user?.email ?? ''}. Mohon info pembayarannya.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-white/20 text-white/70 py-2.5 rounded-xl font-semibold text-sm text-center hover:bg-white/5 transition block"
                  >
                    💬 Beli via WA — Rp75.000
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
