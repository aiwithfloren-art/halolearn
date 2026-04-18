'use client';

import { useEffect, useState } from 'react';

export default function PromoCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      let deadline = localStorage.getItem('halolearn_promo_deadline');

      // If no deadline in localStorage, set it to 3 days from now
      if (!deadline) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        deadline = futureDate.getTime().toString();
        localStorage.setItem('halolearn_promo_deadline', deadline);
      }

      const deadlineTime = parseInt(deadline);
      const difference = deadlineTime - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          hours: String(hours).padStart(2, '0') as any,
          minutes: String(minutes).padStart(2, '0') as any,
          seconds: String(seconds).padStart(2, '0') as any,
        });
      } else {
        // Reset to 3 days from now
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 3);
        localStorage.setItem(
          'halolearn_promo_deadline',
          futureDate.getTime().toString()
        );
        calculateTimeLeft();
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 border-b border-amber-400 py-3 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <span className="text-sm font-semibold text-slate-900">
            ⏰ Promo <span className="font-bold text-amber-700">H4LO5</span> berakhir dalam:
          </span>
          <div className="flex gap-2 items-center justify-center">
            <div className="bg-white/80 px-3 py-1 rounded-lg shadow-sm">
              <span className="font-bold text-lg text-amber-700">{timeLeft.hours}</span>
              <span className="text-xs text-slate-600 ml-1">jam</span>
            </div>
            <span className="text-slate-900 font-bold">:</span>
            <div className="bg-white/80 px-3 py-1 rounded-lg shadow-sm">
              <span className="font-bold text-lg text-amber-700">{timeLeft.minutes}</span>
              <span className="text-xs text-slate-600 ml-1">menit</span>
            </div>
            <span className="text-slate-900 font-bold">:</span>
            <div className="bg-white/80 px-3 py-1 rounded-lg shadow-sm">
              <span className="font-bold text-lg text-amber-700">{timeLeft.seconds}</span>
              <span className="text-xs text-slate-600 ml-1">detik</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
