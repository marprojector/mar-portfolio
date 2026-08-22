'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Image from 'next/image';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

const About = () => {
  const { dict } = useLanguage();
  const headingText = dict.about.heading;
  const descriptionText = dict.about.description;
  const aboutMeText = dict.about.bio;

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about-image-wrapper',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
      gsap.fromTo(
        '.about-label',
        { opacity: 0, letterSpacing: '0.45em' },
        {
          opacity: 1,
          letterSpacing: '0.3em',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-label',
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <div className="bg-cream">
      <section
        ref={sectionRef}
        id="about"
        className="min-h-screen bg-ink text-light py-24 md:py-32 rounded-t-4xl overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="mb-10 md:mb-20">
            <AnimatedHeading
              text={headingText}
              className="text-[clamp(2.5rem,7vw,6.5rem)] font-black tracking-tight leading-none uppercase mb-4"
            />
            <ScrollWordReveal
              text={descriptionText}
              offset={['start 0.95', 'end 0.7']}
              className="text-base sm:text-lg md:text-xl text-gray-soft font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8 pb-20 items-center">
            <div className="col-span-12 md:col-span-5 lg:col-span-5 flex items-center justify-center">
              <div
                ref={containerRef}
                className="about-image-wrapper relative group w-full max-w-[350px] md:max-w-[380px] h-[360px] md:h-[480px] bg-elevated-dark rounded-2xl overflow-hidden border border-border-subtler shadow-2xl [will-change:transform,opacity]"
              >
                <Image
                  src="/ammar-profile.jpg"
                  alt="M. Ammar Arief at sunset"
                  fill
                  sizes="(max-width: 768px) 350px, 380px"
                  className="object-cover object-[center_58%] scale-x-[-1] transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 lg:col-span-6 md:col-start-6 lg:col-start-7 flex flex-col justify-center space-y-8">
              <span className="about-label text-sm sm:text-base md:text-base text-warm uppercase tracking-[0.3em] font-medium text-center md:text-left inline-block">
                (M. Ammar Arief / MARPROJECTOR)
              </span>
              <div className="space-y-6">
                {aboutMeText.split('\n\n').map((p, i) => (
                  <ScrollWordReveal
                    key={i}
                    text={p}
                    offset={['start 0.92', 'end 0.65']}
                    className="text-base sm:text-lg md:text-lg leading-relaxed font-sans"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border-subtler">
            {[
              { value: '2024', label: dict.about.statBuildingSince },
              { value: '15+', label: dict.about.statTechnologies },
              { value: '∞', label: dict.about.statExperiments },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left py-2">
                <p className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-accent leading-none">
                  {stat.value}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-warm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

