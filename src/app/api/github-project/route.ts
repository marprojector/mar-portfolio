import { NextResponse } from 'next/server';

const repositoryUrl = 'https://api.github.com/repos/marprojector/MARkassar-Info';
const languagesUrl = `${repositoryUrl}/languages`;

export async function GET() {
  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'MARPROJECTOR-Portfolio',
    };
    const [repositoryResponse, languagesResponse] = await Promise.all([
      fetch(repositoryUrl, { headers, next: { revalidate: 3600 } }),
      fetch(languagesUrl, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!repositoryResponse.ok) {
      console.error('GitHub repository request failed:', repositoryResponse.status);
      throw new Error('GitHub repository request failed');
    }
    const repository = await repositoryResponse.json();
    if (!repository || typeof repository !== 'object') {
      throw new Error('GitHub repository response was invalid');
    }
    const languages = languagesResponse.ok ? await languagesResponse.json() : {};
    const languageNames = Object.keys(languages);

    return NextResponse.json({
      id: repository.id,
      slug: 'markassar-info',
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
    return NextResponse.json(
      { error: 'GitHub project data is temporarily unavailable.' },
      { status: 503 },
    );
  }
}
