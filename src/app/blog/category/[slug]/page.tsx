import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { getCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/blog";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return pageMetadata({
    title: `${category.name} — Cybersecurity Insights`,
    description: `${category.count} article${category.count === 1 ? "" : "s"} on ${category.name.toLowerCase()} from the DefenseNet Solutions security team.`,
    path: `/blog/category/${category.slug}/`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  const categories = getCategories();

  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "CollectionPage",
            name: category.name,
            url: absoluteUrl(`/blog/category/${category.slug}/`),
            hasPart: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}/`),
              datePublished: p.date,
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog/" },
            { name: category.name, path: `/blog/category/${category.slug}/` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`${category.count} article${category.count === 1 ? "" : "s"}`}
        title={category.name}
        lede={`Everything we have published on ${category.name.toLowerCase()} — written by the analysts and engineers doing the work.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog/" },
          { name: category.name, path: `/blog/category/${category.slug}/` },
        ]}
      >
        <ul className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/blog/category/${c.slug}`}
                aria-current={c.slug === category.slug ? "page" : undefined}
                className={`chip px-3 py-1.5 transition-colors focus-ring ${
                  c.slug === category.slug
                    ? "border-cyan-signal/40 bg-cyan-signal/10 text-cyan-signal"
                    : "hover:border-cyan-signal/40 hover:text-cyan-signal"
                }`}
              >
                {c.name}
                <span className="text-ink-muted/60">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 70}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
