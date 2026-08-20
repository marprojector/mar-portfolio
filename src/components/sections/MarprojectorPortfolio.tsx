'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

const stackGroups = [
  {
    title: 'Frontend',
    technologies: [
      { name: 'TypeScript', icon: '' },
      { name: 'JavaScript', icon: '/Services/js.png' },
      { name: 'React', icon: '/Services/react.png' },
      { name: 'Next.js', icon: '/Services/next.webp' },
      { name: 'Tailwind CSS', icon: '/Services/tailwind.png' },
    ],
  },
  {
    title: 'Backend',
    technologies: [
      { name: 'Node.js', icon: '/Services/node.png' },
      { name: 'tRPC', icon: '' },
    ],
  },
  {
    title: 'Workflow',
    technologies: [
      { name: 'Git', icon: '/Services/git.png' },
      { name: 'GitHub', icon: '' },
    ],
  },
];

const projects = [
  { title: 'Project placeholder 01', description: 'Add a project description here when this work is ready to share.', descriptionId: 'Tambahkan deskripsi project saat karya ini siap dibagikan.', technologies: ['Next.js', 'TypeScript'], year: '2026' },
  { title: 'Project placeholder 02', description: 'A considered space for an experiment, product, or open-source build.', descriptionId: 'Ruang untuk eksperimen, produk, atau karya open-source.', technologies: ['React', 'Node.js'], year: '2026' },
  { title: 'Project placeholder 03', description: 'Replace this entry with a project you want visitors to explore.', descriptionId: 'Ganti dengan project yang ingin kamu bagikan.', technologies: ['Tailwind CSS', 'tRPC'], year: '2026' },
];

const copy = {
  en: {
    nav: ['about', 'work', 'stack', 'contact'],
    status: 'available for experiments',
    craft: <>Digital craft<br />from the browser</>,
    kicker: 'M. Ammar Arief · marprojector',
    hero: <>Building interfaces,<br />experiences, and things<br />for the web.</>,
    scroll: 'Scroll to explore',
    aboutLabel: 'About the maker',
    aboutLead: <>I like the space where <em>engineering</em> meets a feeling.</>,
    aboutBody: <>I&apos;m M. Ammar Arief, the developer behind MARPROJECTOR. This is a personal playground for building modern web applications and experimenting with frontend interactions, motion, and detail.</>,
    stackLabel: 'Tools of the trade',
    stackTitle: 'My tech stack',
    stackBody: 'A focused toolkit for building modern web applications and experimenting with thoughtful interactions.',
    workLabel: 'Selected work',
    workTitle: <>Nothing made up.<br /><em>Not yet.</em></>,
    workBody: 'Projects will live here as they become ready to share. The structure is waiting for real work, not filler.',
    githubBody: 'GitHub activity for the MARPROJECTOR username will appear here once the public profile is connected.',
    contactKicker: 'Have an idea?',
    contactTitle: <>Let&apos;s build<br /><em>something.</em></>,
    notConnected: 'not connected',
    footer: 'Made with curiosity',
  },
  id: {
    nav: ['tentang', 'karya', 'stack', 'kontak'],
    status: 'terbuka untuk eksperimen',
    craft: <>Karya digital<br />dari browser</>,
    kicker: 'M. Ammar Arief · marprojector',
    hero: <>Membangun interface,<br />pengalaman, dan berbagai hal<br />untuk web.</>,
    scroll: 'Jelajahi karya',
    aboutLabel: 'Tentang pembuat',
    aboutLead: <>Saya suka ruang ketika <em>engineering</em> bertemu rasa.</>,
    aboutBody: <>Saya M. Ammar Arief, developer di balik MARPROJECTOR. Ini adalah ruang personal untuk membangun aplikasi web modern dan bereksperimen dengan interaksi, motion, dan detail frontend.</>,
    stackLabel: 'Perangkat kerja',
    stackTitle: 'Tech stack saya',
    stackBody: 'Toolkit terarah untuk membangun aplikasi web modern dan bereksperimen dengan interaksi yang thoughtful.',
    workLabel: 'Karya pilihan',
    workTitle: <>Tidak mengarang.<br /><em>Belum.</em></>,
    workBody: 'Project akan hadir saat sudah siap dibagikan. Struktur ini menunggu karya nyata, bukan filler.',
    githubBody: 'Aktivitas GitHub untuk username MARPROJECTOR akan muncul setelah profile publik terhubung.',
    contactKicker: 'Punya ide?',
    contactTitle: <>Mari bangun<br /><em>sesuatu.</em></>,
    notConnected: 'belum terhubung',
    footer: 'Dibuat dengan rasa ingin tahu',
  },
} as const;

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(ref.current, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } });
    return () => {
      tween.kill();
    };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

function StackItem({ name, icon }: { name: string; icon: string }) {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      className="mp-stack-item"
      onMouseEnter={() => {
        if (icon && itemRef.current) gsap.to(itemRef.current.querySelector('img'), { rotation: 360, scale: 1.12, duration: 0.6, ease: 'power2.out' });
      }}
      onMouseLeave={() => {
        if (icon && itemRef.current) gsap.to(itemRef.current.querySelector('img'), { rotation: 0, scale: 1, duration: 0.5, ease: 'power2.inOut' });
      }}
    >
      <span className="mp-stack-icon">
        {icon ? <Image src={icon} alt="" width={38} height={38} /> : <span className="mp-stack-mark">✳</span>}
      </span>
      <span>{name}</span>
    </div>
  );
}

export default function MarprojectorPortfolio() {
  const heroRef = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<'en' | 'id'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const text = copy[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('mp-language');
    const savedTheme = window.localStorage.getItem('mp-theme');
    if (savedLanguage === 'en' || savedLanguage === 'id') setLanguage(savedLanguage);
    if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('mp-language', language);
    window.localStorage.setItem('mp-theme', theme);
  }, [language, theme]);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.mp-hero-line', { yPercent: 110, opacity: 0, duration: 1, stagger: 0.08, ease: 'power4.out', delay: 0.25 });
      gsap.from('.mp-hero-meta', { y: 20, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.7 });
      gsap.to('.mp-hero-word', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    }, hero);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`mp-site ${theme === 'light' ? 'mp-light' : ''}`}>
      <header className="mp-nav"><a href="#top" className="mp-brand" aria-label="M. Ammar Arief home">MAR<span>/</span>PROJECTOR</a><nav aria-label="Primary navigation">{text.nav.map((item, index) => <a key={item} href={`#${copy.en.nav[index]}`}>{item}</a>)}</nav><div className="mp-controls"><span className="mp-status"><i /> {text.status}</span><button type="button" className="mp-control" onClick={() => setLanguage(language === 'en' ? 'id' : 'en')} aria-label={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}>{language === 'en' ? 'ID' : 'EN'}</button><button type="button" className="mp-control mp-theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>{theme === 'dark' ? '☼' : '◐'}</button></div></header>
      <main>
        <section ref={heroRef} id="top" className="mp-hero"><div className="mp-hero-grid" aria-hidden="true" /><div className="mp-hero-top mp-hero-meta"><span>01 / 04</span><span>{text.craft}</span></div><div className="mp-hero-word"><p className="mp-kicker mp-hero-meta">{text.kicker}</p><h1><span className="mp-hero-line">M. AMMAR</span><span className="mp-hero-line mp-outline">ARIEF</span></h1></div><div className="mp-hero-bottom mp-hero-meta"><p>{text.hero}</p><a className="mp-circle-link" href="#work">{text.scroll} <b>↓</b></a></div></section>
        <section id="about" className="mp-section mp-about"><Reveal className="mp-section-label"><span>02</span><span>{text.aboutLabel}</span></Reveal><Reveal className="mp-about-copy"><p className="mp-display">{text.aboutLead}</p><p className="mp-muted">{text.aboutBody}</p></Reveal></section>
        <section id="stack" className="mp-stack-section"><div className="mp-stack-inner"><Reveal className="mp-section-label"><span>03</span><span>{text.stackLabel}</span></Reveal><Reveal className="mp-stack-intro"><h2>{text.stackTitle}</h2><p>{text.stackBody}</p></Reveal><div className="mp-stack-groups">{stackGroups.map((group) => <Reveal key={group.title} className="mp-stack-group"><h3>{group.title}</h3><div className="mp-stack-items">{group.technologies.map((technology) => <StackItem key={technology.name} {...technology} />)}</div></Reveal>)}</div></div></section>
        <section id="work" className="mp-section mp-work"><Reveal className="mp-section-label"><span>04</span><span>{text.workLabel}</span></Reveal><div className="mp-work-heading"><h2>{text.workTitle}</h2><p>{text.workBody}</p></div><div className="mp-project-list">{projects.map((project, index) => <Reveal key={project.title} className="mp-project"><span className="mp-project-number">0{index + 1}</span><div><h3>{project.title}</h3><p>{language === 'id' ? project.descriptionId : project.description}</p><div className="mp-tags">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div><span className="mp-year">{project.year}</span></Reveal>)}</div></section>
        <section className="mp-github"><Reveal><p className="mp-kicker">Open source / GitHub</p><h2>Follow the<br /><em>source.</em></h2><p className="mp-muted">{text.githubBody}</p><a className="mp-text-link" href="https://github.com/marprojector" target="_blank" rel="noreferrer">github.com/marprojector ↗</a></Reveal></section>
        <section id="contact" className="mp-contact"><Reveal><p className="mp-kicker">{text.contactKicker}</p><h2>{text.contactTitle}</h2><a className="mp-contact-link" href="mailto:marmdhn28@gmail.com">marmdhn28@gmail.com ↗</a><div className="mp-contact-links"><span>LinkedIn / {text.notConnected}</span><span>GitHub / marprojector</span></div></Reveal></section>
      </main>
      <footer className="mp-footer"><span>M. AMMAR ARIEF / MARPROJECTOR © 2026</span><span>{text.footer} / <a href="#top">{language === 'id' ? 'Kembali ke atas ↑' : 'Back to top ↑'}</a></span></footer>
    </div>
  );
}