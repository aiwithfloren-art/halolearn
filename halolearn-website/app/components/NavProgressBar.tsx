'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavProgressBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setProgress(30);

    const timer1 = setTimeout(() => setProgress(60), 200);
    const timer2 = setTimeout(() => setProgress(90), 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  useEffect(() => {
    if (progress === 90) {
      const timer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => setIsVisible(false), 300);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 to-slate-700 z-50 transition-all duration-300"
      style={{
        width: isVisible ? `${progress}%` : '0%',
        opacity: isVisible && progress < 100 ? 1 : 0,
      }}
    />
  );
}
