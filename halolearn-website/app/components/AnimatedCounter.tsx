'use client';

import { useEffect, useState } from 'react';

interface CounterProps {
  target: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ target, label, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let startTime: number;
    let animationFrameId: number;

    const delay = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Easing function: easeOutQuad
        const easeProgress = 1 - Math.pow(1 - progress, 2);
        setCount(Math.floor(easeProgress * target));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, mounted]);

  return (
    <div>
      <div className="text-4xl font-bold text-slate-900">
        {count.toLocaleString('id-ID')}{suffix}
      </div>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
    </div>
  );
}
