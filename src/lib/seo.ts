import type { Metadata } from "next";
import { site, fullAddress, services } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
};

export const absoluteUrl = (path = "/") =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export function pageMetadata({
  title,
  description,
  path,
  image = "/og/default.png",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

export const organizationSchema = () => ({
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/img/MainLogo.png"),
  },
  image: absoluteUrl("/img/MainLogo.png"),
  description: site.description,
  foundingDate: site.founded,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
    addressLocality: site.contact.address.locality,
    addressRegion: site.contact.address.region,
    postalCode: site.contact.address.postalCode,
    addressCountry: site.contact.address.countryCode,
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Place", name: "Gulf Cooperation Council" },
  ],
  sameAs: [site.social.linkedin, site.social.x, "https://tenreply.com"],
});

export const localBusinessSchema = () => ({
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${site.url}/#localbusiness`,
  name: site.name,
  image: absoluteUrl("/img/MainLogo.png"),
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
    addressLocality: site.contact.address.locality,
    addressRegion: site.contact.address.region,
    postalCode: site.contact.address.postalCode,
    addressCountry: site.contact.address.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.contact.geo.lat,
    longitude: site.contact.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  description: fullAddress,
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-IN",
});

export const serviceCatalogSchema = () => ({
  "@type": "OfferCatalog",
  name: "Cybersecurity Services",
  itemListElement: services.map((s, i) => ({
    "@type": "Offer",
    position: i + 1,
    itemOffered: {
      "@type": "Service",
      name: s.name,
      description: s.summary,
      url: absoluteUrl(`/services/${s.slug}/`),
      provider: { "@id": `${site.url}/#organization` },
      areaServed: ["India", "United Arab Emirates", "Saudi Arabia", "Qatar", "Oman"],
    },
  })),
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleSchema = (post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
}) => ({
  "@type": "BlogPosting",
  "@id": absoluteUrl(`/blog/${post.slug}/#article`),
  headline: post.title,
  description: post.description,
  url: absoluteUrl(`/blog/${post.slug}/`),
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  articleSection: post.category,
  keywords: post.tags.join(", "),
  wordCount: post.readingTime * 200,
  inLanguage: "en-IN",
  author: { "@type": "Organization", name: post.author, url: site.url },
  publisher: { "@id": `${site.url}/#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}/`) },
  image: absoluteUrl("/img/MainLogo.png"),
});

/** Wraps graph nodes into a single @graph document. */
export const jsonLdGraph = (nodes: object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
