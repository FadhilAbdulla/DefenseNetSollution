import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { accentClasses } from "@/lib/accent";
import { products, getProduct, site } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, faqSchema, absoluteUrl } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return pageMetadata({
    title: `${product.name} — ${product.category} by DefenseNet Solutions`,
    description: product.summary,
    path: `/products/${product.slug}/`,
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const accent = accentClasses[product.accent];
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "SoftwareApplication",
            "@id": absoluteUrl(`/products/${product.slug}/#software`),
            name: product.name,
            applicationCategory: "BusinessApplication",
            applicationSubCategory: product.category,
            operatingSystem: "Web",
            url: product.url ?? absoluteUrl(`/products/${product.slug}/`),
            description: product.summary,
            publisher: { "@id": `${site.url}/#organization` },
            offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
          },
          faqSchema(product.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products/" },
            { name: product.name, path: `/products/${product.slug}/` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Product by DefenseNet Solutions"
        title={
          <>
            {product.name} — <span className="text-gradient-signal">{product.tagline}</span>
          </>
        }
        lede={product.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          { name: product.name, path: `/products/${product.slug}/` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          {product.url ? (
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary"
            >
              Visit {product.url.replace("https://", "")}
              <ArrowUpRight size={15} aria-hidden />
            </a>
          ) : (
            <Link href="/contact" className="btn btn-primary">
              Request a demo
              <ArrowRight size={15} aria-hidden />
            </Link>
          )}
          <Link href={product.url ? "/contact" : "/products"} className="btn btn-ghost">
            {product.url ? "Request a demo" : "All products"}
          </Link>
        </div>
      </PageHero>

      {/* What is it + identity panel */}
      <Section className="!pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
              What is {product.name}?
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-tight tracking-tight text-balance">
              {product.category}, built and run by a security company.
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-ink-muted">
              {product.intro.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card p-8">
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}
                >
                  <ServiceIcon name={product.icon} size={19} />
                </span>
                <p className={`font-mono text-[0.62rem] uppercase tracking-[0.2em] ${accent.text}`}>
                  Product identity
                </p>
              </div>

              <dl className="mt-6 flex flex-col divide-y divide-line">
                {[...product.identity, { k: "Contact", v: site.contact.email }].map((row) => (
                  <div key={row.k} className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0">
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-muted">
                      {row.k}
                    </dt>
                    <dd className="break-words text-[0.875rem] font-medium text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
                {product.stats.map((stat) => (
                  <div key={stat.label} className="bg-void/40 px-3 py-4 text-center">
                    <p className={`font-display text-base font-semibold ${accent.text}`}>
                      {stat.value}
                    </p>
                    <p className="mt-1 font-mono text-[0.55rem] uppercase leading-tight tracking-[0.1em] text-ink-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Features */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Features" title={`What ${product.name} does`} />
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {product.features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 80}>
              <article className="card card-hover h-full p-7">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-lg border ${accent.border} ${accent.bg} font-mono text-[0.7rem] font-semibold ${accent.text}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug tracking-tight text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">
                  {feature.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Getting started"
          title={`Live in ${product.steps.length} steps.`}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {product.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className="bg-base p-7">
              <span className={`font-mono text-2xl font-semibold ${accent.text} opacity-40`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Audiences */}
      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
              Who uses {product.name}
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold leading-tight tracking-tight text-balance">
              Built for teams that cannot afford to get this wrong.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              {product.name} is used across regulated and fast-moving sectors alike, in India and
              the Gulf. If your situation is not listed, it is still worth a conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Request a demo
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
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {product.audiences.map((audience) => (
                <li key={audience} className="flex items-center gap-3 bg-base px-6 py-5">
                  <Check size={14} className={`shrink-0 ${accent.text}`} aria-hidden />
                  <span className="text-[0.9375rem] text-ink">{audience}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Questions" title={`About ${product.name}`} />
        <div className="mt-12 divide-y divide-line overflow-hidden rounded-xl border border-line md:mt-14">
          {product.faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 70}>
              <details className="group bg-base">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-7 py-6 focus-ring">
                  <h3 className="font-display text-[0.9375rem] font-medium text-ink">{faq.q}</h3>
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line text-ink-muted transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="px-7 pb-6 text-[0.9375rem] leading-relaxed text-ink-muted">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Other products */}
      {others.length ? (
        <Section className="border-t border-line">
          <SectionHeading eyebrow="Also from DefenseNet" title="Our other products" />
          <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
            {others.map((other, i) => {
              const otherAccent = accentClasses[other.accent];
              return (
                <Reveal key={other.slug} delay={i * 80}>
                  <Link
                    href={`/products/${other.slug}`}
                    className="card card-hover group flex h-full flex-col p-7 focus-ring"
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-lg border ${otherAccent.border} ${otherAccent.bg} ${otherAccent.text}`}
                    >
                      <ServiceIcon name={other.icon} size={17} />
                    </span>
                    <h3 className="mt-5 font-display text-[1.0625rem] font-semibold tracking-tight text-ink group-hover:text-cyan-signal">
                      {other.name}
                    </h3>
                    <p className={`mt-1.5 text-[0.8125rem] ${otherAccent.text}`}>{other.category}</p>
                    <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-muted">
                      {other.summary}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Section>
      ) : null}

      <CtaBand
        title={`See ${product.name} against your own environment.`}
        lede={`Book a walkthrough with the team that built it. We will show you exactly what ${product.name} does, what it does not do, and whether it is the right thing for you to spend on first.`}
        primaryLabel="Request a demo"
      />
    </>
  );
}
