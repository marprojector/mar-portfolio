'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/lib/gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

const education = [
  {
    school: 'SMK Telkom Makassar',
    level: 'Senior High School — Vocational',
    major: 'Rekayasa Perangkat Lunak',
    period: '2023 — 2026',
    location: 'Makassar, Indonesia',
    logo: '/smk-telkom-makassar-logo.png',
  },
];

const Education = () => {
  const { dict } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.edu-row',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="education"
      className="bg-ink text-light py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-10 md:mb-20">
          <AnimatedHeading
            text={dict.education.heading}
            className="text-[clamp(2.5rem,7vw,6.5rem)] font-black tracking-tight leading-none uppercase mb-4"
          />
          <ScrollWordReveal
            text={dict.education.journey}
            offset={['start 0.95', 'end 0.7']}
            className="text-base sm:text-lg md:text-xl text-gray-soft font-sans leading-relaxed"
          />
        </div>

        <div className="space-y-0">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="edu-row grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 border-t border-border-subtle pt-8 pb-10"
            >
              <div className="md:col-span-3 font-mono text-sm md:text-base text-accent-light">
                {edu.period}
              </div>
              <div className="md:col-span-9">
                <div className="flex items-start gap-4">
                  {edu.logo && (
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border-subtler bg-elevated-dark md:h-20 md:w-20">
                      <Image
                        src={edu.logo}
                        alt={`${edu.school} logo`}
                        fill
                        sizes="(max-width: 768px) 56px, 80px"
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-light leading-tight">
                      {edu.school}
                    </h3>
                    <p className="text-gray-soft mt-2 font-sans text-sm sm:text-base md:text-lg">
                      {dict.education.level} · {edu.major}
                    </p>
                    <p className="text-warm text-sm mt-1 font-mono uppercase tracking-widest">
                      📍 {dict.education.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
