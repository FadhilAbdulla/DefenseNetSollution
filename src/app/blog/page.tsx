import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAllPosts, getCategories, formatDate } from "@/lib/blog";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cybersecurity Insights — Threat Briefings & Practical Guidance",
  description:
    "Threat analysis, detection engineering guides, incident response playbooks and India-specific compliance explainers from the DefenseNet Solutions security team.",
  path: "/blog/",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "Blog",
            "@id": absoluteUrl("/blog/#blog"),
            name: `${site.name} — Cybersecurity Insights`,
            url: absoluteUrl("/blog/"),
            description:
              "Threat briefings, detection engineering guides and compliance explainers from DefenseNet Solutions.",
            publisher: { "@id": `${site.url}/#organization` },
            blogPost: posts.slice(0, 20).map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}/`),
              datePublished: p.date,
              description: p.description,
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Insights"
        title="Field notes from people who defend systems for a living."
        lede="Threat briefings, detection engineering walkthroughs, response playbooks and plain-English explanations of the regulations Indian businesses actually have to satisfy."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog/" },
        ]}
      >
        <ul className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/blog/category/${cat.slug}`}
                className="chip px-3 py-1.5 transition-colors hover:border-cyan-signal/40 hover:text-cyan-signal focus-ring"
              >
                {cat.name}
                <span className="text-ink-muted/60">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      {lead ? (
        <Section className="!pb-0">
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="card card-hover group grid gap-8 overflow-hidden p-8 focus-ring lg:grid-cols-[1.35fr_0.65fr] lg:p-12"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="chip border-cyan-signal/30 bg-cyan-signal/10 text-cyan-signal">
                    Latest
                  </span>
                  <span className="chip">{lead.category}</span>
                </div>
                <h2 className="mt-6 font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-cyan-signal text-balance">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
                  {lead.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-signal">
                  Read the briefing
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>

              <div className="flex flex-col justify-end gap-4 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-muted">
                    Published
                  </p>
                  <p className="mt-1.5 text-sm text-ink">
                    <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-muted">
                    Read time
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink">
                    <Clock size={13} className="text-cyan-signal" aria-hidden />
                    {lead.readingTime} minutes
                  </p>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {lead.tags.slice(0, 4).map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </Reveal>
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 70}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>

        {!posts.length ? (
          <p className="text-ink-muted">Articles are being published shortly.</p>
        ) : null}
      </Section>

      <CtaBand
        title="Reading about a risk you think applies to you?"
        lede="We will tell you whether it does. A short call with an analyst beats another week of research."
      />
    </>
  );
}
