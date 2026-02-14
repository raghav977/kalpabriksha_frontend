import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Blog',
  description: 'Read the latest insights, news, and articles about hydropower, renewable energy, and engineering solutions from KES experts.',
  keywords: ['blog', 'hydropower news', 'renewable energy articles', 'engineering insights', 'Nepal energy'],
  canonicalUrl: 'https://consultkes.com/blog',
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
