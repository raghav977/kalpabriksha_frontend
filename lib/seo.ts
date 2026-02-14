import { Metadata } from 'next';
import { siteConfig } from '@/config/siteConfig';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://consultkes.com';

/**
 * Generate metadata for pages with SEO best practices
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  noIndex = false,
  canonicalUrl,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
}: SEOConfig): Metadata {
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : `${siteConfig.name} | ${siteConfig.motto}`;
  
  const metaDescription = description || siteConfig.description;
  const defaultKeywords = ['engineering consulting', 'hydropower', 'renewable energy', 'Nepal', 'KES'];
  const allKeywords = [...defaultKeywords, ...keywords];
  
  const ogImageUrl = ogImage || `${BASE_URL}/og-image.jpg`;
  const canonical = canonicalUrl || BASE_URL;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords: allKeywords.join(', '),
    authors: [{ name: author || siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type,
      locale: 'en_US',
      url: canonical,
      title: fullTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [ogImageUrl],
      creator: '@consultkes',
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
    other: {
      'geo.region': 'NP',
      'geo.placename': 'Kathmandu, Nepal',
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: 'KES',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.jpg`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.split(',')[0],
      addressLocality: 'Kathmandu',
      addressCountry: 'Nepal',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phones[0],
      contactType: 'customer service',
      email: siteConfig.contact.email,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
    ].filter(Boolean),
  };
}

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || `${BASE_URL}/og-image.jpg`,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.jpg`,
      },
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${article.slug}`,
    },
  };
}

/**
 * Generate JSON-LD structured data for a project
 */
export function generateProjectSchema(project: {
  name: string;
  description?: string;
  image?: string;
  location?: string;
  status: string;
  client: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.name,
    description: project.description,
    image: project.image,
    location: project.location,
    status: project.status,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    sponsor: {
      '@type': 'Organization',
      name: project.client,
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate service structured data
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nepal',
    },
    url: `${BASE_URL}${service.url}`,
  };
}
