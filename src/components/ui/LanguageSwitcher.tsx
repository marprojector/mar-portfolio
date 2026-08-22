'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { locales, Locale } from '@/lib/i18n/config';

const LABELS: Record<Locale, string> = {
  en: 'EN',
  id: 'ID',
};

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] p-0.5 text-xs font-mono uppercase tracking-widest ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => {
        const active = mounted && locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 transition-colors duration-300 focus:outline-none ${
              active ? 'bg-accent text-ink' : 'text-cream/70 hover:text-cream'
            }`}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
