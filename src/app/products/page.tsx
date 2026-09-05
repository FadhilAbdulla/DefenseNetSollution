import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { products } from "@/lib/site";
import { accentClasses } from "@/lib/accent";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products — Software Built by DefenseNet Solutions",
  description:
    "Products engineered by DefenseNet Solutions: Guardian for scheduled automated penetration testing, Red-Vault for corporate password and secrets management, and Tenreply for WhatsApp Business API messaging.",
  path: "/products/",
});

const roadmap = [
  {
    name: "Detection Content Manager",
    body: "Version-controlled detection rules with ATT&CK mapping, automated testing and one-click deployment across Sentinel, Splunk and Elastic.",
  },
  {
    name: "Exposure Monitor",
    body: "Always-on external attack surface discovery — new subdomains, forgotten services and credential leaks, checked daily and fed straight into Guardian for testing.",
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
        <div className="grid gap-5">
          {products.map((product, i) => {
            const accent = accentClasses[product.accent];
            return (
              <Reveal key={product.slug} delay={i * 80}>
                <div className="card card-hover relative overflow-hidden p-8 lg:p-12">
                  <div
                    className={`pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full ${accent.bg} blur-3xl`}
                    aria-hidden
                  />
                  <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className={`grid h-11 w-11 place-items-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}
                        >
                          <ServiceIcon name={product.icon} size={19} />
                        </span>
                        <span className={`chip ${accent.border} ${accent.bg} ${accent.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} aria-hidden />
                          {product.status === "live" ? "Live" : "Coming soon"}
                        </span>
                        <span className="chip">{product.category}</span>
                      </div>

                      <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink">
                        {product.name}
                      </h2>
                      <p className={`mt-3 text-lg ${accent.text}`}>{product.tagline}</p>
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
                            Visit {product.url.replace("https://", "")}
                            <ArrowUpRight size={14} aria-hidden />
                          </a>
                        ) : (
                          <Link href="/contact" className="btn btn-ghost">
                            Request a demo
                          </Link>
                        )}
                      </div>
                    </div>

                    <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line">
                      {product.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex items-center justify-between gap-4 bg-base px-5 py-4"
                        >
                          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted">
                            {stat.label}
                          </dt>
                          <dd className={`text-right text-[0.8125rem] font-semibold ${accent.text}`}>
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </Reveal>
            );
          })}
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
