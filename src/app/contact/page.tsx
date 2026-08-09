import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, TriangleAlert } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { site, fullAddress, whatsappLink } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Talk to a Security Engineer in Kerala",
  description:
    "Contact DefenseNet Solutions at HiLITE Business Park, Kozhikode, Kerala. Call +91 86603 71224 for 24/7 incident response, or send an enquiry for SOC, VAPT, cloud security and compliance work.",
  path: "/contact/",
});

const channels = [
  {
    icon: Phone,
    label: "Call us",
    value: site.contact.phone,
    href: `tel:${site.contact.phoneHref}`,
    note: "Incident line answered 24/7",
  },
  {
    icon: Mail,
    label: "Email us",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    note: "Reply within one business day",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message us directly",
    href: whatsappLink,
    note: "Fastest for quick questions",
  },
];

const mapQuery = encodeURIComponent(
  "HiLITE Business Park, Poovangal, Pantheeramkavu, Kozhikode, Kerala 673014",
);

export default function ContactPage() {
  return (
    <>
      <JsonLd
        nodes={[
          localBusinessSchema(),
          {
            "@type": "ContactPage",
            name: "Contact DefenseNet Solutions",
            url: `${site.url}/contact/`,
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact/" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Start with a conversation, not a sales process."
        lede="Tell us what prompted the enquiry and we will tell you honestly what we would do first. No pitch decks, no discovery gauntlet."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ]}
      />

      {/* Emergency banner */}
      <Section className="!pb-0 !pt-12">
        <Reveal>
          <div className="flex flex-col gap-4 rounded-xl border border-rose-signal/30 bg-rose-signal/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-3.5">
              <TriangleAlert size={20} className="mt-0.5 shrink-0 text-rose-signal" aria-hidden />
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  Dealing with a live incident right now?
                </p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-muted">
                  Do not wipe or rebuild affected machines — that destroys the evidence needed to
                  understand what was taken. Isolate them from the network and call us.
                </p>
              </div>
            </div>
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="btn btn-primary shrink-0 font-mono text-xs"
            >
              <Phone size={14} aria-hidden />
              {site.contact.phone}
            </a>
          </div>
        </Reveal>
      </Section>

      {/* Channels */}
      <Section className="!pb-0">
        <div className="grid gap-5 md:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 80}>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="card card-hover flex h-full flex-col p-7 focus-ring"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-signal/25 bg-cyan-signal/10 text-cyan-signal">
                  <channel.icon size={17} aria-hidden />
                </span>
                <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-muted">
                  {channel.label}
                </p>
                <p className="mt-2 break-words text-[0.9375rem] font-medium text-ink">
                  {channel.value}
                </p>
                <p className="mt-auto pt-4 text-[0.75rem] text-ink-muted">{channel.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Form + details */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              Send us a message
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
              The more context you give us, the more useful our first reply will be.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={140} className="flex flex-col gap-5">
            <div className="card p-7">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-elevated text-cyan-signal">
                <MapPin size={17} aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-ink">
                Our office
              </h3>
              <address className="mt-3 text-[0.875rem] not-italic leading-relaxed text-ink-muted">
                {fullAddress}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-block text-sm text-cyan-signal hover:underline focus-ring"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="card p-7">
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                Business hours
              </h3>
              <dl className="mt-5 flex flex-col gap-4">
                {site.contact.hours.map((slot) => (
                  <div key={slot.label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-muted">
                      {slot.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.875rem] text-ink">{slot.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card overflow-hidden">
              <iframe
                title="DefenseNet Solutions office location at HiLITE Business Park, Kozhikode, Kerala"
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 grayscale-[0.6] contrast-[1.1]"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
