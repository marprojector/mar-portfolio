import { NextResponse } from 'next/server';
import { getProjectBySlug } from '@/lib/projects';

const repositoryUrl = 'https://api.github.com/repos/marprojector/MARkassar-Info';
const languagesUrl = `${repositoryUrl}/languages`;
const PROJECT_SLUG = 'markassar-info';
const REVALIDATE_SECONDS = 21600;

function fallbackProject() {
  const project = getProjectBySlug(PROJECT_SLUG);
  if (!project) return null;
  return { ...project, stars: 0, forks: 0 };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'MARPROJECTOR-Portfolio',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const [repositoryResponse, languagesResponse] = await Promise.all([
      fetch(repositoryUrl, { headers, next: { revalidate: REVALIDATE_SECONDS } }),
      fetch(languagesUrl, { headers, next: { revalidate: REVALIDATE_SECONDS } }),
    ]);

    if (!repositoryResponse.ok) {
      console.error('GitHub repository request failed:', repositoryResponse.status, {
        authenticated: Boolean(token),
      });
      const fallback = fallbackProject();
      if (fallback) {
        return NextResponse.json(fallback);
      }
      return NextResponse.json(
        { error: 'GitHub project data is temporarily unavailable.' },
        { status: 503 },
      );
    }

    const repository = await repositoryResponse.json();
    if (!repository || typeof repository !== 'object') {
      throw new Error('GitHub repository response was invalid');
    }
    const languages = languagesResponse.ok ? await languagesResponse.json() : {};
    const languageNames = Object.keys(languages);

    return NextResponse.json({
      id: repository.id,
      slug: PROJECT_SLUG,
      title: repository.name,
      year: repository.created_at?.slice(0, 4) || '2026',
      tech: languageNames.length ? languageNames : [repository.language || 'TypeScript'],
      description: repository.description || 'A MARPROJECTOR project published on GitHub.',
      myRole: [],
      images: [],
      hoverImage: '/markassar-info-preview.png',
      github: repository.html_url,
      liveUrl: repository.homepage || '',
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    });
  } catch (error) {
    console.error('GitHub project request error:', error);
    const fallback = fallbackProject();
    if (fallback) {
      return NextResponse.json(fallback);
    }
    return NextResponse.json(
      { error: 'GitHub project data is temporarily unavailable.' },
      { status: 503 },
    );
  }
}
