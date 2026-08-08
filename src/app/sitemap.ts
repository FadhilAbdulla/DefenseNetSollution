import type { MetadataRoute } from "next";
import { site, services, products } from "@/lib/site";
import { getAllPosts, getCategories } from "@/lib/blog";

// Required for `output: export` — generated once at build time.
export const dynamic = "force-static";

const url = (path: string) => `${site.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();
  const categories = getCategories();

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/platform/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/services/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/products/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/industries/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/about/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/contact/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/blog/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/privacy-policy/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    {
      url: url("/terms-and-conditions/"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`/services/${s.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/products/${p.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: url(`/blog/category/${c.slug}/`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: url(`/blog/${p.slug}/`),
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "yearly",
    priority: p.featured ? 0.75 : 0.7,
  }));

  return [...staticPages, ...servicePages, ...productPages, ...categoryPages, ...postPages];
}
