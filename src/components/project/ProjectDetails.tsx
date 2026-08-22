'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Link } from 'next-transition-router';
import { motion, useScroll, useSpring } from 'framer-motion';
import { gsap, useGSAP } from '@/lib/gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import ScrollWordReveal from '@/components/ui/ScrollWordReveal';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { FaArrowUp, FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { Project, getAllProjects } from '@/lib/projects';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function ProjectDetails({ project }: { project: Project }) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const reduced = useReducedMotion();
  const { dict, locale } = useLanguage();

  const localized = dict.projectsData[project.slug];
  const description = localized?.description?.[locale] ?? project.description;
  const localRole = localized?.myRole?.[locale];
  const myRole = localRole && localRole.length ? localRole : project.myRole;

  const coverRef = useRef<HTMLDivElement>(null);
  const coverImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useGSAP(
    () => {
      if (reduced || !coverRef.current || !coverImgRef.current) return;
      gsap.to(coverImgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: coverRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: coverRef, dependencies: [reduced] },
  );

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const coverImage = project.hoverImage || project.images[0] || '';
  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects.length > 1 ? allProjects[(currentIndex + 1) % allProjects.length] : null;

  return (
    <section className="min-h-screen bg-[#080807] text-white px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20 relative">
      {!reduced && (
        <motion.div
          style={{ scaleX: progress }}
          className="fixed top-0 left-0 right-0 h-1 origin-left z-[9999] bg-accent"
          aria-hidden="true"
        />
      )}

        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-muted hover:text-white transition-all duration-300 group"
            >
              <span className="text-base md:text-xl transform group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest">{dict.project.back}</span>
            </Link>
          </div>

        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="flex-1 w-full text-center md:text-left">
              <AnimatedHeading
                text={project.title}
                className="text-[clamp(1.75rem,5vw,3.8rem)] font-black tracking-tight leading-[1.15] uppercase text-white text-center md:text-left"
                containerClassName="mb-0 text-center md:text-left"
                showLine={false}
              />
            </div>

            {(project.liveUrl || project.github) && (
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-4 pt-2 md:pt-0 w-full md:w-auto">
                {project.liveUrl && (
                  <AnimatedButton
                    as="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    topText={
                      <span className="flex items-center gap-2">
                        <span>{dict.project.liveDemo}</span>
                        <FaExternalLinkAlt className="text-[11px]" />
                      </span>
                    }
                    bottomText={
                      <span className="flex items-center gap-2">
                        <span>{dict.project.exploreSite}</span>
                        <span className="text-xs">↗</span>
                      </span>
                    }
                    variant="primary"
                  />
                )}
                {project.github && (
                  <AnimatedButton
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    topText={
                      <span className="flex items-center gap-2">
                        <FaGithub className="text-sm" />
                        <span>{dict.project.sourceCode}</span>
                      </span>
                    }
                    bottomText={
                      <span className="flex items-center gap-2">
                        <FaGithub className="text-sm" />
                        <span>{dict.project.viewGithub}</span>
                      </span>
                    }
                    variant="dark"
                    className="!border !border-white/15 hover:!border-white/40"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {coverImage && (
          <div
            ref={coverRef}
            className="relative w-full h-[42vh] md:h-[58vh] overflow-hidden rounded-2xl mb-12 md:mb-16"
          >
            <div ref={coverImgRef} className="absolute inset-x-0 -top-[12%] h-[124%] will-change-transform">
              <Image
                src={coverImage}
                alt={`${project.title} cover`}
                fill
                sizes="100vw"
                priority
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-[#080807]/20 to-transparent pointer-events-none" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-4 space-y-6 md:sticky md:top-24 self-start">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-warm block mb-3">
                {dict.project.year}
              </span>
              <p className="text-light/80 font-sans text-sm sm:text-base">{project.year}</p>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-warm block mb-3">
                {dict.project.techStack}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg bg-surface-mid border border-white/[0.08] text-cream"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-warm block mb-2">
                {dict.project.descriptionLabel}
              </span>
              <ScrollWordReveal
                text={description}
                offset={['start 0.95', 'end 0.65']}
                className="text-sm sm:text-base md:text-lg text-light/80 font-sans leading-relaxed"
              />
            </div>

            {project.myRole?.length > 0 && (
              <div className="pt-4">
                <span className="font-mono text-xs uppercase tracking-widest text-warm block mb-3">
                  {dict.project.roleLabel}
                </span>
                <ul className="space-y-3">
                  {myRole?.map((role, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm sm:text-base text-light/80 font-sans leading-relaxed"
                    >
                      <span className="text-accent mt-1.5 text-xs flex-shrink-0">◆</span>
                      <ScrollWordReveal
                        text={role}
                        offset={['start 0.95', 'end 0.7']}
                        className="inline-flex flex-wrap flex-1"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-12 mb-16">
          {project.images?.map((img, i) => {
            const isLoaded = loadedImages[i];
            return (
              <div
                key={`${project.slug}-img-${i}`}
                className="overflow-hidden rounded-xl bg-[#121211] border border-[#1f1f1d] relative aspect-[16/10] max-h-[750px] w-full"
              >
                {!isLoaded && (
                  <div className="absolute inset-0 bg-[#121211] flex flex-col items-center justify-center gap-3 z-0 animate-pulse">
                    <div className="w-3 h-3 rounded-full bg-[#C45D3E] shadow-[0_0_12px_rgba(196,93,62,0.6)]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/30">
                      {dict.project.loadingMedia}
                    </span>
                  </div>
                )}

                <a
                  href={img}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative z-10"
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={i === 0}
                    onLoad={() => handleImageLoad(i)}
                    className={`object-contain w-full h-full transition-opacity duration-500 ease-out ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMTkxNyIvPjwvc3ZnPg=="
                  />
                </a>
              </div>
            );
          })}
        </div>

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block mb-16 rounded-2xl border border-white/[0.08] bg-surface-mid p-8 md:p-12 hover:border-accent/40 transition-colors duration-300"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-warm block mb-3">
              {dict.project.nextProject}
            </span>
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display font-black uppercase leading-none text-white text-2xl sm:text-3xl md:text-4xl group-hover:text-accent transition-colors duration-300">
                {nextProject.title}
              </h3>
              <span className="text-2xl md:text-3xl text-accent transform group-hover:translate-x-2 transition-transform duration-300">
                <FaArrowRight />
              </span>
            </div>
          </Link>
        )}

        <div className="relative flex justify-center py-8">
          <div className="text-center flex flex-col items-center">
            <ScrollWordReveal
              text={dict.project.haveProject}
              offset={['start 0.95', 'end 0.75']}
              className="text-muted text-lg justify-center mb-1"
            />
            <a
              href="mailto:marmdhn28@gmail.com"
              className="text-xl font-semibold text-[#bab6b3] hover:text-[#d4d2d0] transition"
            >
              marmdhn28@gmail.com
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="absolute right-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 group focus:outline-none"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
