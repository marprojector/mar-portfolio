'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { locales, Locale } from '@/lib/i18n/config';
import { useReducedMotion } from '@/lib/useReducedMotion';

const NAMES: Record<Locale, string> = {
  en: 'English',
  id: 'Indonesia',
};

export default function LanguagePopup({ className = '' }: { className?: string }) {
  const { locale, setLocale, dict } = useLanguage();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-widest text-cream transition-colors duration-300 hover:border-accent hover:text-accent focus:outline-none"
      >
        <span aria-hidden="true">🌐</span>
        <span>{dict.nav.language}</span>
        <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            role="menu"
            className="absolute right-0 bottom-full mb-3 w-48 overflow-hidden rounded-2xl border border-border-subtler bg-surface-mid/95 p-2 shadow-2xl backdrop-blur-md"
          >
            {locales.map((l) => {
              const active = locale === l;
              return (
                <button
                  key={l}
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-mono text-sm uppercase tracking-widest transition-colors duration-200 ${
                    active ? 'bg-accent text-ink' : 'text-cream/80 hover:bg-white/5 hover:text-cream'
                  }`}
                >
                  <span>{NAMES[l]}</span>
                  <span className="text-[10px] opacity-70">{l.toUpperCase()}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
