import { Locale } from './config';

export interface Dict {
  nav: { home: string; about: string; services: string; work: string; contact: string; language: string };
  menu: { navigation: string; getInTouch: string; sourceCode: string };
  hero: {
    tagline: string;
    roles: string[];
    ctaProjects: string;
    ctaViewWork: string;
    ctaContact: string;
    ctaGetInTouch: string;
  };
  about: {
    heading: string;
    description: string;
    bio: string;
    statBuildingSince: string;
    statTechnologies: string;
    statExperiments: string;
  };
  services: {
    heading: string;
    description: string;
    items: { title: string; description: string; points: string[] }[];
  };
  tech: {
    heading: string;
    description: string;
    groups: { frontend: string; backend: string; tools: string };
  };
  education: {
    heading: string;
    journey: string;
    level: string;
    major: string;
    location: string;
  };
  projects: { heading: string; viewProject: string };
  contact: {
    heading: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    errName: string;
    errEmail: string;
    errEmailInvalid: string;
    errMessage: string;
    errMessageLen: string;
    ctaSend: string;
    ctaProceed: string;
    ctaWait: string;
    ctaProcessing: string;
    directContact: string;
    clickCopy: string;
    copied: string;
    errorGeneric: string;
  };
  project: {
    back: string;
    liveDemo: string;
    exploreSite: string;
    sourceCode: string;
    viewGithub: string;
    nextProject: string;
    haveProject: string;
    year: string;
    techStack: string;
    descriptionLabel: string;
    roleLabel: string;
    loadingMedia: string;
  };
  footer: { menu: string; socials: string; localTime: string; loadingTime: string };
  marquee: { items: string[] };
  projectsData: Record<
    string,
    { description: { en: string; id: string }; myRole: { en: string[]; id: string[] } }
  >;
}

export const dictionaries: Record<Locale, Dict> = {
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', work: 'Work', contact: 'Contact', language: 'Language' },
    menu: { navigation: 'Navigation', getInTouch: 'Get in Touch', sourceCode: 'Source Code' },
    hero: {
      tagline:
        'Building interfaces, experiences, and things for the web. I enjoy modern web applications, frontend interactions, and animation with purpose.',
      roles: ['Frontend Developer', 'Full-Stack Developer', 'Interface Experimenter', 'MARPROJECTOR'],
      ctaProjects: 'PROJECTS',
      ctaViewWork: 'VIEW WORK →',
      ctaContact: 'CONTACT',
      ctaGetInTouch: 'GET IN TOUCH →',
    },
    about: {
      heading: 'About',
      description:
        'I am M. Ammar Arief, the developer behind MARPROJECTOR. I build modern web applications and experiment with frontend interactions.',
      bio: 'MARPROJECTOR is a personal playground for building thoughtful digital experiences. I care about the space where engineering meets a feeling.\n\nMy toolkit includes TypeScript, JavaScript, React, Next.js, Tailwind CSS, Node.js, tRPC, Git, and GitHub.\n\nThe work is still unfolding. Projects, experiments, and open-source work will be added here as they become ready to share.',
      statBuildingSince: 'Building since',
      statTechnologies: 'Technologies',
      statExperiments: 'Experiments',
    },
    services: {
      heading: 'What I Build',
      description:
        'I build modern web applications and experiment with frontend interactions, animation, and thoughtful digital experiences.',
      items: [
        {
          title: 'Web Applications',
          description:
            'Building clear, responsive, and maintainable web applications from interface to backend systems.',
          points: [
            'React & Next.js interfaces',
            'Node.js APIs & integrations',
            'TypeScript-first development',
          ],
        },
        {
          title: 'Frontend Interactions',
          description:
            'Exploring motion, interaction, and visual systems that make the web feel intentional without sacrificing usability.',
          points: [
            'React, Next.js & Tailwind CSS',
            'GSAP animation experiments',
            'Responsive interface systems',
          ],
        },
        {
          title: 'Tools & Workflow',
          description:
            'A practical workflow for turning ideas into polished, testable, and shareable digital work.',
          points: [
            'Git & GitHub collaboration',
            'tRPC and type-safe systems',
            'Iteration with curiosity',
          ],
        },
      ],
    },
    tech: {
      heading: 'My Tech Stack',
      description:
        'A selection of technologies I use to design, build, and deploy full-stack web applications.',
      groups: {
        frontend: 'FRONTEND',
        backend: 'BACKEND',
        tools: 'TOOLS & PACKAGE MANAGERS',
      },
    },
    education: {
      heading: 'Education',
      journey: 'My educational journey.',
      level: 'Senior High School — Vocational',
      major: 'Rekayasa Perangkat Lunak',
      location: 'Makassar, Indonesia',
    },
    projects: { heading: 'PROJECTS', viewProject: 'View Project' },
    contact: {
      heading: 'Contact',
      description: 'Have an idea or want to build something for the web? Reach out to MARPROJECTOR.',
      nameLabel: 'Your Name',
      emailLabel: 'Your Email',
      messageLabel: 'Message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'Write your message here...',
      errName: 'Name is required',
      errEmail: 'Email is required',
      errEmailInvalid: 'Please enter a valid email address',
      errMessage: 'Message is required',
      errMessageLen: 'Please enter a meaningful message (at least 30 characters, 5 words)',
      ctaSend: 'SEND MESSAGE',
      ctaProceed: 'PROCEED →',
      ctaWait: 'PLEASE WAIT...',
      ctaProcessing: 'PROCESSING',
      directContact: 'Direct Contact',
      clickCopy: 'Click to copy email address',
      copied: 'Copied to clipboard',
      errorGeneric: 'Something went wrong. Please try again later.',
    },
    project: {
      back: 'Back to Projects',
      liveDemo: 'LIVE DEMO',
      exploreSite: 'EXPLORE SITE',
      sourceCode: 'SOURCE CODE',
      viewGithub: 'VIEW GITHUB ↗',
      nextProject: 'Next Project',
      haveProject: 'Have a project in mind?',
      year: 'Year',
      techStack: 'Tech Stack',
      descriptionLabel: 'Description',
      roleLabel: 'Key Contributions & Role',
      loadingMedia: 'Loading Media...',
    },
    footer: {
      menu: 'Menu',
      socials: 'Socials',
      localTime: 'Local Time',
      loadingTime: 'Loading local time...',
    },
    marquee: {
      items: ['Available for Work', 'Open to Opportunities', "Let's Build", 'MERN Stack'],
    },
    projectsData: {
      'markassar-info': {
        description: {
          en: 'A MARPROJECTOR project published on GitHub.',
          id: 'Sebuah proyek MARPROJECTOR yang dipublikasikan di GitHub.',
        },
        myRole: { en: [], id: [] },
      },
    },
  },
  id: {
    nav: { home: 'Beranda', about: 'Tentang', services: 'Layanan', work: 'Karya', contact: 'Kontak', language: 'Bahasa' },
    menu: { navigation: 'Navigasi', getInTouch: 'Hubungi Saya', sourceCode: 'Kode Sumber' },
    hero: {
      tagline:
        'Membangun antarmuka, pengalaman, dan hal-hal untuk web. Saya menikmati aplikasi web modern, interaksi frontend, dan animasi yang bermakna.',
      roles: ['Pengembang Frontend', 'Pengembang Full-Stack', 'Eksperimenter Antarmuka', 'MARPROJECTOR'],
      ctaProjects: 'PROYEK',
      ctaViewWork: 'LIHAT KARYA →',
      ctaContact: 'KONTAK',
      ctaGetInTouch: 'HUBUNGI SAYA →',
    },
    about: {
      heading: 'Tentang',
      description:
        'Saya M. Ammar Arief, pengembang di balik MARPROJECTOR. Saya membangun aplikasi web modern dan bereksperimen dengan interaksi frontend.',
      bio: 'MARPROJECTOR adalah ruang bermain pribadi untuk membangun pengalaman digital yang penuh pertimbangan. Saya peduli pada titik di mana rekayasa bertemu perasaan.\n\nPerangkat saya meliputi TypeScript, JavaScript, React, Next.js, Tailwind CSS, Node.js, tRPC, Git, dan GitHub.\n\nKarya ini masih terus berkembang. Proyek, eksperimen, dan karya open-source akan ditambahkan di sini seiring kesiapannya untuk dibagikan.',
      statBuildingSince: 'Membangun sejak',
      statTechnologies: 'Teknologi',
      statExperiments: 'Eksperimen',
    },
    services: {
      heading: 'Yang Saya Bangun',
      description:
        'Saya membangun aplikasi web modern dan bereksperimen dengan interaksi frontend, animasi, dan pengalaman digital yang penuh pertimbangan.',
      items: [
        {
          title: 'Aplikasi Web',
          description:
            'Membangun aplikasi web yang jelas, responsif, dan mudah dirawat dari antarmuka hingga sistem backend.',
          points: [
            'Antarmuka React & Next.js',
            'API & integrasi Node.js',
            'Pengembangan TypeScript-first',
          ],
        },
        {
          title: 'Interaksi Frontend',
          description:
            'Menjelajahi gerak, interaksi, dan sistem visual yang membuat web terasa disengaja tanpa mengorbankan kegunaan.',
          points: [
            'React, Next.js & Tailwind CSS',
            'Eksperimen animasi GSAP',
            'Sistem antarmuka responsif',
          ],
        },
        {
          title: 'Alat & Alur Kerja',
          description:
            'Alur kerja praktis untuk mengubah ide menjadi karya digital yang rapi, teruji, dan dapat dibagikan.',
          points: [
            'Kolaborasi Git & GitHub',
            'tRPC dan sistem type-safe',
            'Iterasi dengan rasa ingin tahu',
          ],
        },
      ],
    },
    tech: {
      heading: 'Tumpukan Teknologi Saya',
      description:
        'Kumpulan teknologi yang saya gunakan untuk merancang, membangun, dan men-deploy aplikasi web full-stack.',
      groups: {
        frontend: 'FRONTEND',
        backend: 'BACKEND',
        tools: 'ALAT & PENGELOLA PAKET',
      },
    },
    education: {
      heading: 'Pendidikan',
      journey: 'Perjalanan pendidikan saya.',
      level: 'Sekolah Menengah Kejuruan',
      major: 'Rekayasa Perangkat Lunak',
      location: 'Makassar, Indonesia',
    },
    projects: { heading: 'PROYEK', viewProject: 'Lihat Proyek' },
    contact: {
      heading: 'Kontak',
      description: 'Punya ide atau ingin membangun sesuatu untuk web? Hubungi MARPROJECTOR.',
      nameLabel: 'Nama Anda',
      emailLabel: 'Email Anda',
      messageLabel: 'Pesan',
      namePlaceholder: 'Nama Anda',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'Tulis pesan Anda di sini...',
      errName: 'Nama wajib diisi',
      errEmail: 'Email wajib diisi',
      errEmailInvalid: 'Masukkan alamat email yang valid',
      errMessage: 'Pesan wajib diisi',
      errMessageLen: 'Masukkan pesan yang bermakna (minimal 30 karakter, 5 kata)',
      ctaSend: 'KIRIM PESAN',
      ctaProceed: 'LANJUT →',
      ctaWait: 'MOHON TUNGGU...',
      ctaProcessing: 'MEMPROSES',
      directContact: 'Kontak Langsung',
      clickCopy: 'Klik untuk menyalin alamat email',
      copied: 'Tersalin ke clipboard',
      errorGeneric: 'Terjadi kesalahan. Silakan coba lagi nanti.',
    },
    project: {
      back: 'Kembali ke Proyek',
      liveDemo: 'DEMO LANGSUNG',
      exploreSite: 'JELAJAHI SITUS',
      sourceCode: 'KODE SUMBER',
      viewGithub: 'LIHAT GITHUB ↗',
      nextProject: 'Proyek Selanjutnya',
      haveProject: 'Punya ide proyek?',
      year: 'Tahun',
      techStack: 'Tumpukan Teknologi',
      descriptionLabel: 'Deskripsi',
      roleLabel: 'Kontribusi & Peran Utama',
      loadingMedia: 'Memuat Media...',
    },
    footer: {
      menu: 'Menu',
      socials: 'Sosial',
      localTime: 'Waktu Lokal',
      loadingTime: 'Memuat waktu lokal...',
    },
    marquee: {
      items: ['Tersedia untuk Bekerja', 'Terbuka pada Peluang', 'Ayo Bangun', 'MERN Stack'],
    },
    projectsData: {
      'markassar-info': {
        description: {
          en: 'A MARPROJECTOR project published on GitHub.',
          id: 'Sebuah proyek MARPROJECTOR yang dipublikasikan di GitHub.',
        },
        myRole: { en: [], id: [] },
      },
    },
  },
};
