'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function LoginGate() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in - if yes, don't show popup
    if (session) {
      setIsDismissed(true);
      return;
    }

    // Check localStorage for dismiss flag
    const checkDismissal = () => {
      const dismissed = localStorage.getItem('hl_dismissed');
      if (dismissed) {
        const dismissedTime = parseInt(dismissed);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (now - dismissedTime < twentyFourHours) {
          setIsDismissed(true);
          return true;
        } else {
          // 24 hours passed, remove the flag
          localStorage.removeItem('hl_dismissed');
        }
      }
      return false;
    };

    if (checkDismissal()) {
      return;
    }

    // Trigger 1: Show after 30 seconds
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 30000);

    // Trigger 2: Show on 50% scroll
    const handleScroll = () => {
      if (isDismissed || isVisible) return;

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercent = (scrolled / scrollHeight) * 100;

      if (scrollPercent >= 50) {
        setIsVisible(true);
        setIsAnimating(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [session, isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('hl_dismissed', Date.now().toString());
      setIsDismissed(true);
    }, 300);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('google', { redirect: false });

      if (result?.ok) {
        // Track the sign-in event
        try {
          await fetch('/api/track-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: session?.user?.name || 'Unknown',
              email: session?.user?.email || '',
              page: 'Homepage Popup',
            }),
          });
        } catch (trackError) {
          console.error('Failed to track user:', trackError);
        }

        handleDismiss();
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        backgroundColor: isAnimating ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: isAnimating ? 'blur(4px)' : 'blur(0px)',
      }}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 ${
          isAnimating ? 'scale-100' : 'scale-90'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="text-4xl font-bold text-slate-900">halolearn</div>
        </div>

        {/* Headline */}
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Daftar Sekarang — Akses CV Analyzer & LinkedIn Score!
        </h2>

        {/* Benefits List */}
        <div className="mb-8 space-y-3">
          {[
            'CV Analyzer — tau skor ATS CV kamu',
            'LinkedIn Score — cek kekuatan profil LinkedIn',
            'Interview Prep — 500+ contoh pertanyaan interview',
            'Tips karir eksklusif langsung ke email kamu',
          ].map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <span className="mt-0.5 text-lg text-emerald-500">✓</span>
              <span className="text-sm text-slate-700">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="mb-4 w-full rounded-lg bg-slate-900 px-6 py-3.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sedang login...
            </>
          ) : (
            <>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Daftar dengan Google
            </>
          )}
        </button>

        {/* Stats Text */}
        <p className="mb-4 text-center text-xs text-slate-500">
          Sudah 10.000+ kandidat bergabung
        </p>

        {/* "Tidak Sekarang" Link */}
        <div className="text-center">
          <button
            onClick={handleDismiss}
            className="text-xs text-slate-500 hover:text-slate-700 transition font-medium"
          >
            Tidak sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
