import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const defaultSEO = {
  title: "Arran Miller-Strange | Full-stack Developer & Web Designer",
  description:
    "Indie web developer with a background in design and hospitality, crafting original, beautiful applications. Currently designing VISOR — a platform for film sims and presets.",
  keywords:
    "full-stack developer, web designer, React, TypeScript, Cardiff, UK, VISOR, film sims, web applications",
  image: "/og-image.png",
  url: "https://arranmillerstrange.com",
  type: "website" as const,
  author: "Arran Miller-Strange",
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
}: SEOProps) {
  const seo = {
    title: title ? `${title} | Arran Miller-Strange` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    type: type || defaultSEO.type,
    author: author || defaultSEO.author,
    publishedTime,
    modifiedTime,
    section,
    tags,
  };

  // Structured data for Person
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arran Miller-Strange",
    alternateName: "Arran Oxley Strange",
    jobTitle: "Full-stack Developer & Web Designer",
    description: seo.description,
    url: seo.url,
    sameAs: [
      "https://github.com/arranmillerstrange",
      "https://linkedin.com/in/arranmillerstrange",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cardiff",
      addressCountry: "UK",
    },
    knowsAbout: [
      "Web Development",
      "React",
      "TypeScript",
      "Full-stack Development",
      "Web Design",
      "UI/UX Design",
      "Film Photography",
      "VISOR Platform",
    ],
  };

  // Structured data for WebSite
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Arran Miller-Strange Portfolio",
    description: seo.description,
    url: seo.url,
    author: {
      "@type": "Person",
      name: seo.author,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${seo.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en-GB" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:site_name" content="Arran Miller-Strange Portfolio" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Arran Miller-Strange - Full-stack Developer & Web Designer"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content="@arranmillerstrange" />
      <meta name="twitter:site" content="@arranmillerstrange" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>

      {/* Article specific structured data */}
      {type === "article" && publishedTime && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: seo.title,
            description: seo.description,
            image: seo.image,
            author: {
              "@type": "Person",
              name: seo.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Arran Miller-Strange Portfolio",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": seo.url,
            },
            ...(section && { articleSection: section }),
            ...(tags && { keywords: tags.join(", ") }),
          })}
        </script>
      )}

      {/* CreativeWork structured data for projects */}
      {type === "article" && section === "project" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: seo.title,
            description: seo.description,
            author: {
              "@type": "Person",
              name: seo.author,
            },
            dateCreated: publishedTime,
            dateModified: modifiedTime || publishedTime,
            ...(tags && { keywords: tags.join(", ") }),
          })}
        </script>
      )}
    </Helmet>
  );
}
