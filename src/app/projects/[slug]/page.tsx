import ProjectDetails from '@/components/project/ProjectDetails';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  const projectImage = project.hoverImage || project.images[0];
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} - MARPROJECTOR`,
      description: project.description,
      images: projectImage ? [{ url: projectImage, width: 1200, height: 630, alt: project.title }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - MARPROJECTOR`,
      description: project.description,
      images: projectImage ? [projectImage] : undefined,
    },
  };
}
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetails key={project.slug} project={project} />;
}

