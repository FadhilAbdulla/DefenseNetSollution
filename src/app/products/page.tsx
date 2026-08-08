import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { products, site } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products — Software Built by DefenseNet Solutions",
  description:
    "Products engineered by DefenseNet Solutions, starting with Tenreply — an official WhatsApp Business API platform for automated messaging, broadcasts and two-way support.",
  path: "/products/",
});

const roadmap = [
  {
    name: "Detection Content Manager",
    body: "Version-controlled detection rules with ATT&CK mapping, automated testing and one-click deployment across Sentinel, Splunk and Elastic.",
  },
  {
    name: "Continuous Exposure Monitor",
    body: "Always-on external attack surface discovery for Indian SMEs — new subdomains, exposed services and credential leaks, checked daily.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "ItemList",
            name: "DefenseNet Solutions products",
            itemListElement: products.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/products/${p.slug}/`),
              name: p.name,
            })),
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Products"
        title="Software we build, run and secure ourselves."
        lede="DefenseNet is a services company that ships product. Everything here is engineered to the standard we hold our clients' systems to — because we operate it too."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
        ]}
      />

      <Section>
        <div className="flex flex-col gap-5">
          {products.map((product) => (
            <Reveal key={product.slug}>
              <div className="card relative overflow-hidden p-8 lg:p-12">
                <div
                  className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-signal/[0.08] blur-3xl"
                  aria-hidden
                />
                <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="chip border-emerald-signal/30 bg-emerald-signal/10 text-emerald-signal">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-signal" aria-hidden />
                        Live
                      </span>
                      <span className="chip">{product.category}</span>
                    </div>

                    <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink">
                      {product.name}
                    </h2>
                    <p className="mt-3 text-lg text-emerald-signal">{product.tagline}</p>
                    <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-muted">
                      {product.summary}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link href={`/products/${product.slug}`} className="btn btn-primary">
                        Product details
                        <ArrowRight size={15} aria-hidden />
                      </Link>
                      {product.url ? (
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="btn btn-ghost"
                        >
                          Visit tenreply.com
                          <ArrowUpRight size={14} aria-hidden />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line">
                    {[
                      { k: "Operated by", v: site.name },
                      { k: "Platform", v: "Meta WhatsApp Business API" },
                      { k: "Website", v: "tenreply.com" },
                      { k: "Availability", v: "India & the Gulf" },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="flex items-center justify-between gap-4 bg-base px-5 py-4"
                      >
                        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted">
                          {row.k}
                        </dt>
                        <dd className="text-right text-[0.8125rem] font-medium text-ink">
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
            Roadmap
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-tight tracking-tight text-balance">
            Next: turning our own SOC tooling into products.
          </h2>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted">
            The tools our analysts rely on daily are being productised so clients can run them
            directly. Ask about early access if either of these solves a problem you have now.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {roadmap.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <article className="card h-full border-dashed p-8">
                <span className="chip">
                  <Sparkles size={11} aria-hidden />
                  In development
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                  {item.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want early access to what we ship next?"
        lede="Tell us which problem you would want solved first. Early-access clients help shape what we build, and get it before general release."
        primaryLabel="Request early access"
      />
    </>
  );
}
