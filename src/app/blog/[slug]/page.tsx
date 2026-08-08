import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { GridBackdrop, Glow } from "@/components/ui/BackgroundFX";
import {
  getPost,
  getPostSlugs,
  getRelatedPosts,
  formatDate,
  slugify,
} from "@/lib/blog";
import { pageMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    authors: [post.author],
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const categorySlug = slugify(post.category);

  return (
    <>
      <JsonLd
        nodes={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog/" },
            { name: post.category, path: `/blog/category/${categorySlug}/` },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
        ]}
      />

      {/* Article header */}
      <header className="relative overflow-hidden border-b border-line pb-14 pt-[calc(var(--nav-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--nav-h)+5rem)]">
        <GridBackdrop />
        <Glow className="-top-32 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2" />

        <div className="shell relative max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-cyan-signal focus-ring"
          >
            <ArrowLeft size={12} aria-hidden />
            All insights
          </Link>

          <Link
            href={`/blog/category/${categorySlug}`}
            className="chip mt-7 border-cyan-signal/30 bg-cyan-signal/10 text-cyan-signal transition-colors hover:border-cyan-signal/60 focus-ring"
          >
            {post.category}
          </Link>

          <h1 className="anim-rise mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-balance">
            {post.title}
          </h1>

          <p className="anim-rise mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted text-pretty">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-cyan-signal" aria-hidden />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-cyan-signal" aria-hidden />
              {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={12} className="text-cyan-signal" aria-hidden />
              {post.author}
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <Section className="!pt-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <article className="prose-dn min-w-0" dangerouslySetInnerHTML={{ __html: post.html }} />

          <aside className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:h-fit">
            {post.headings.length > 2 ? (
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-muted">
                  On this page
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 border-l border-line pl-4">
                  {post.headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                      <a
                        href={`#${h.id}`}
                        className="block text-[0.78rem] leading-snug text-ink-muted transition-colors hover:text-cyan-signal focus-ring"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <div className="card mt-8 p-6 lg:mt-10">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan-signal">
                Need help with this?
              </p>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-muted">
                Our analysts deal with this class of problem daily. A short call will tell you
                whether it applies to your environment.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5 w-full text-xs">
                Talk to an analyst
                <ArrowRight size={13} aria-hidden />
              </Link>
            </div>

            {post.tags.length ? (
              <div className="mt-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-muted">
                  Tags
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>

      {/* Related */}
      {related.length ? (
        <Section className="border-t border-line">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Related reading
            </h2>
            <Link href="/blog" className="btn btn-ghost text-xs">
              All insights
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <PostCard post={r} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
