import Script from 'next/script';

interface JsonLdProps {
  data: object | object[];
}

/**
 * Component to render JSON-LD structured data for SEO
 * Usage: <JsonLd data={generateOrganizationSchema()} />
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonLd = Array.isArray(data) ? data : [data];
  
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd),
      }}
      strategy="beforeInteractive"
    />
  );
}

export default JsonLd;
