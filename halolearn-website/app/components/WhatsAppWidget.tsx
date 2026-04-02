'use client';

import { useEffect, useState } from 'react';

const whatsappLink = 'https://wa.me/6285260421274?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20Halolearn';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show on admin pages
    if (window.location.pathname.startsWith('/belajar/admin')) return;
    // Check if user already dismissed
    const wasDismissed = localStorage.getItem('wa-widget-dismissed');
    if (wasDismissed) return;
    // Show bubble after 5 seconds
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setShowBubble(false);
    setIsOpen(false);
    // Remember for this session
    localStorage.setItem('wa-widget-dismissed', '1');
  };

  if (dismissed) return null;

  return (
    <>
      {/* Chat Bubble - appears automatically after 5s */}
      {showBubble && !isOpen && (
        <div className="fixed bottom-24 right-6 animate-slide-up z-40">
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-xs border border-slate-200 relative">
            {/* X button to dismiss bubble */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-slate-500 hover:bg-slate-700 text-white rounded-full text-xs flex items-center justify-center shadow transition"
              aria-label="Tutup"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                HL
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Tim Halolearn</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                  Online sekarang
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-700 mb-4">
              Halo! Ada yang bisa kami bantu? Balas dalam &lt;5 menit 👋
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-green-600 text-white text-center rounded-lg py-2 text-sm font-medium hover:bg-green-700 transition"
            >
              Mulai Chat
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-green-600 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center text-white text-2xl"
          aria-label="WhatsApp Chat"
        >
          💬
        </button>

        {/* Expanded chat on click */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-xl p-4 w-80 border border-slate-200 animate-slide-up">
            {/* X to close + dismiss */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 w-7 h-7 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full text-sm flex items-center justify-center transition"
              aria-label="Tutup"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                HL
              </div>
              <div>
                <p className="font-semibold text-slate-900">Tim Halolearn</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                  Online sekarang
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-700 mb-6">
              Halo! Ada yang bisa kami bantu? Balas dalam &lt;5 menit 👋
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-green-600 text-white text-center rounded-lg py-3 text-sm font-medium hover:bg-green-700 transition font-semibold"
            >
              Mulai Chat
            </a>
          </div>
        )}
      </div>
    </>
  );
}
