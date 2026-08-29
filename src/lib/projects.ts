export interface Project {
  id: number;
  slug: string;
  title: string;
  year: string;
  tech: string[];
  description: string;
  myRole: string[];
  images: string[];
  hoverImage: string;
  github: string;
  liveUrl: string;
}

export const projects: Project[] = [
  {
    id: 3,
    slug: 'mardocs-ai',
    title: 'MarDocs AI',
    year: '2026',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Auth.js', 'Vercel AI SDK', 'Vercel Blob', 'RAG'],
    description: 'AI-powered document chat platform that allows users to upload, manage, and interact with documents using AI.',
    myRole: ['Full-Stack Developer'],
    images: ['/mardocs-ai.preview.png'],
    hoverImage: '/mardocs-ai.preview.png',
    github: 'https://github.com/marprojector/MarDocs-AI',
    liveUrl: 'https://mardocs-ai.vercel.app/',
  },
  {
    id: 1,
    slug: 'markassar-info',
    title: 'MARkassar-Info',
    year: '2026',
    tech: ['TypeScript'],
    description: 'A MARPROJECTOR project published on GitHub.',
    myRole: [],
    images: [],
    hoverImage: '/markassar-info-preview.png',
    github: 'https://github.com/marprojector/MARkassar-Info',
    liveUrl: 'https://markassar-info.vercel.app/',
  },
  {
    id: 2,
    slug: 'marlynk',
    title: 'MarLynk',
    year: '2026',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'PostgreSQL', 'Vercel'],
    description: 'A modern URL shortener and QR code generator for creating and sharing short links with ease.',
    myRole: ['Full-Stack Developer'],
    images: [],
    hoverImage: '/marlynk-preview.png',
    github: 'https://github.com/marprojector/MarLynk',
    liveUrl: 'https://marlynk.vercel.app',
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
