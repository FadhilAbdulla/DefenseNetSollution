import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { tenreply, site } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, faqSchema, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tenreply — WhatsApp Business API Platform by DefenseNet Solutions",
  description:
    "Tenreply is an official WhatsApp Business API platform by DefenseNet Solutions. Automate notifications and OTPs, run broadcasts, and manage two-way support from a unified inbox.",
  path: "/products/tenreply/",
});

const faqs = [
  {
    q: "Who operates Tenreply?",
    a: "Tenreply is developed and operated by DefenseNet Solutions, a cybersecurity company headquartered at Phase 2, 2nd Floor, HiLITE Business Park, Poovangal, Pantheeramkavu, Kozhikode, Kerala 673014, India. The product is available at tenreply.com.",
  },
  {
    q: "Is Tenreply an official WhatsApp Business API provider?",
    a: "Yes. Tenreply is built on Meta's official WhatsApp Business Platform, which means verified sender identity, enterprise message throughput and full compliance with the WhatsApp Business Policy.",
  },
  {
    q: "What can businesses send through Tenreply?",
    a: "Transactional messages such as order confirmations, delivery updates, appointment reminders and OTPs, plus template-approved marketing broadcasts to customers who have opted in — and two-way support conversations through a shared team inbox.",
  },
  {
    q: "Can Tenreply integrate with our existing systems?",
    a: "Yes. Tenreply exposes a REST API and webhooks, so it integrates with CRMs, ERPs and e-commerce platforms. Messages can be triggered directly from your own business events with no manual sending.",
  },
];

export default function TenreplyPage() {
  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "SoftwareApplication",
            "@id": absoluteUrl("/products/tenreply/#software"),
            name: "Tenreply",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: "https://tenreply.com",
            description: tenreply.summary,
            publisher: { "@id": `${site.url}/#organization` },
            offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
          },
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products/" },
            { name: "Tenreply", path: "/products/tenreply/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Product by DefenseNet Solutions"
        title={
          <>
            Tenreply — business messaging{" "}
            <span className="text-gradient-signal">on WhatsApp, at scale.</span>
          </>
        }
        lede={tenreply.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          { name: "Tenreply", path: "/products/tenreply/" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="https://tenreply.com"
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-primary"
          >
            Visit tenreply.com
            <ArrowUpRight size={15} aria-hidden />
          </a>
          <Link href="/contact" className="btn btn-ghost">
            Request a demo
          </Link>
        </div>
      </PageHero>

      {/* Identity panel — supports Meta display-name verification */}
      <Section className="!pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
              What is Tenreply?
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-tight tracking-tight text-balance">
              An official WhatsApp Business API platform, operated by a security company.
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-ink-muted">
              <p>
                Tenreply is a WhatsApp Business API platform developed and operated by{" "}
                <strong className="text-ink">DefenseNet Solutions</strong>, a cybersecurity company
                headquartered in Kozhikode, Kerala, India. The product is available at{" "}
                <a
                  href="https://tenreply.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-cyan-signal hover:underline"
                >
                  tenreply.com
                </a>
                .
              </p>
              <p>
                Businesses use Tenreply to reach customers on WhatsApp at scale — order updates,
                appointment reminders, OTPs and promotional broadcasts — and to manage the
                conversations that come back through a single shared inbox.
              </p>
              <p>
                It is built on Meta&apos;s official WhatsApp Business Platform, with the same
                engineering and security standards we apply to every client environment we defend.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card p-8">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-signal">
                Business identity
              </p>
              <dl className="mt-6 flex flex-col divide-y divide-line">
                {[
                  { k: "Business name", v: "Tenreply" },
                  { k: "Parent company", v: "DefenseNet Solutions" },
                  { k: "Product website", v: "tenreply.com" },
                  { k: "Category", v: "WhatsApp Business API platform" },
                  { k: "Registered address", v: "HiLITE Business Park, Kozhikode, Kerala 673014, India" },
                  { k: "Contact", v: site.contact.email },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0">
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-muted">
                      {row.k}
                    </dt>
                    <dd className="break-words text-[0.875rem] font-medium text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
                {tenreply.stats.map((stat) => (
                  <div key={stat.label} className="bg-void/40 px-3 py-4 text-center">
                    <p className="font-display text-base font-semibold text-emerald-signal">
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
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to run WhatsApp as a business channel."
        />
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {tenreply.features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 80}>
              <article className="card card-hover h-full p-7">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-emerald-signal/25 bg-emerald-signal/10 font-mono text-[0.7rem] font-semibold text-emerald-signal">
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
        <SectionHeading eyebrow="Getting started" title="Live in four steps." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {tenreply.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className="bg-base p-7">
              <span className="font-mono text-2xl font-semibold text-emerald-signal/40">
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
              Who uses Tenreply
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold leading-tight tracking-tight text-balance">
              Any business where a customer expects a reply on WhatsApp.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
              In India and the Gulf, WhatsApp is where customers already are. Tenreply makes that
              channel work like the rest of your stack: automated, measurable and auditable.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://tenreply.com"
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary"
              >
                Get started
                <ArrowUpRight size={15} aria-hidden />
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Talk to us first
              </Link>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {tenreply.audiences.map((audience) => (
                <li key={audience} className="flex items-center gap-3 bg-base px-6 py-5">
                  <Check size={14} className="shrink-0 text-emerald-signal" aria-hidden />
                  <span className="text-[0.9375rem] text-ink">{audience}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Questions" title="About Tenreply" />
        <div className="mt-12 divide-y divide-line overflow-hidden rounded-xl border border-line md:mt-14">
          {faqs.map((faq, i) => (
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

      <CtaBand
        title="Ready to start messaging on WhatsApp?"
        lede="Visit tenreply.com to sign up, or talk to the DefenseNet team for a walkthrough tailored to how your business communicates."
        primaryLabel="Request a demo"
      />
    </>
  );
}
