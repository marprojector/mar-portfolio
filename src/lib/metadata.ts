import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'M. Ammar Arief | MARPROJECTOR',
    template: '%s | MARPROJECTOR',
  },
  description:
    'M. Ammar Arief, also known as MARPROJECTOR, builds modern web applications and experiments with frontend interaction and digital experiences.',
  keywords: [
    'M. Ammar Arief',
    'marprojector',
    'Developer',
    'Next.js',
    'React',
    'JavaScript',
    'Tailwind CSS',
    'Portfolio',
  ],
  authors: [
    {
      name: 'M. Ammar Arief',
    },
  ],
  creator: 'M. Ammar Arief',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/logo.webp',
  },
  openGraph: {
    title: 'M. Ammar Arief | MARPROJECTOR',
    description:
      'M. Ammar Arief, also known as MARPROJECTOR, builds modern web applications and experiments with frontend interaction and digital experiences.',
    siteName: 'M. Ammar Arief / MARPROJECTOR',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'M. Ammar Arief - MARPROJECTOR developer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M. Ammar Arief | MARPROJECTOR',
    description:
      'M. Ammar Arief, also known as MARPROJECTOR, builds modern web applications and experiments with frontend interaction and digital experiences.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

