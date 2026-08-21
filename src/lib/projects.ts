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
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
