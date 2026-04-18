import React from 'react';

interface DarkHeroProps {
  subtitle?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  cta?: {
    text: string;
    href: string;
  };
}

export default function DarkHero({
  subtitle,
  title,
  description,
  children,
  cta,
}: DarkHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-24 md:py-36">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="orb absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: '#3b82f6' }}
        />
        <div
          className="orb orb-2 absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: '#8b5cf6' }}
        />
        <div
          className="orb orb-3 absolute -bottom-40 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: '#f59e0b' }}
        />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-5" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {subtitle && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20">
            <span className="text-sm font-medium text-white">{subtitle}</span>
          </div>
        )}

        <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
          {description}
        </p>

        {children && <div className="mb-8">{children}</div>}

        {cta && (
          <a
            href={cta.href}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-medium text-slate-900 hover:bg-slate-100 transition shadow-lg"
          >
            {cta.text}
          </a>
        )}
      </div>
    </section>
  );
}
