import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { services, products, site, fullAddress, whatsappLink } from "@/lib/site";
import { getAllPosts, getCategories } from "@/lib/blog";

/** lucide-react dropped brand marks, so the LinkedIn glyph lives here. */
function LinkedInMark({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.77-1.96C21.6 8.75 23 11 23 14.24V21h-4v-6.02c0-1.44-.03-3.29-2.03-3.29-2.03 0-2.34 1.57-2.34 3.19V21h-4V9Z" />
    </svg>
  );
}

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "The platform", href: "/platform" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms-and-conditions" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "llms.txt", href: "/llms.txt" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const latestPosts = getAllPosts().slice(0, 3);
  const topCategories = getCategories().slice(0, 4);

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-base">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-signal/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-cyan-signal/[0.07] blur-[120px]"
        aria-hidden
      />

      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_.85fr_.85fr_1fr_1.15fr]">
          {/* Brand */}
          <div className="max-w-sm">
            {/* Logo artwork carries the wordmark — no text lockup beside it. */}
            <Link href="/" className="inline-block" aria-label={`${site.name} home`}>
              <Image
                src="/img/MainLogo.png"
                alt={site.name}
                width={1300}
                height={350}
                className="h-11 w-auto"
              />
            </Link>

            <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan-signal">
              {site.tagline}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              AI-based security for businesses across India and the Gulf. Autonomous
              detection, expert response, and security engineering that holds up under audit.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-signal opacity-70 [animation:dn-pulse-ring_2.4s_ease-out_infinite]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-signal" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-emerald-signal">
                SOC operational · 24/7
              </span>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="DefenseNet Solutions on LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-muted transition-colors hover:border-cyan-signal/40 hover:text-cyan-signal focus-ring"
              >
                <LinkedInMark />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-emerald-signal/40 hover:text-emerald-signal focus-ring"
              >
                WhatsApp us
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>
          </div>

          {/* Services */}
          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.short}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            {companyLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <li className="pt-2">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
                Products
              </span>
            </li>
            {products.map((product) => (
              <FooterLink key={product.slug} href={`/products/${product.slug}`}>
                {product.name}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Blog */}
          <div>
            <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink">Blog</h3>

            <ul className="mt-5 flex flex-col gap-3">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block text-sm leading-snug text-ink-muted transition-colors hover:text-cyan-signal focus-ring"
                  >
                    <span className="line-clamp-2">{post.title}</span>
                    <span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-muted/70">
                      {post.readingTime} min · {post.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/blog/category/${cat.slug}`}
                    className="chip px-2.5 py-1 text-[0.6rem] transition-colors hover:border-cyan-signal/40 hover:text-cyan-signal focus-ring"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/blog"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-signal focus-ring"
            >
              All articles
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          {/* Contact */}
          <FooterColumn title="Get in touch">
            <li className="flex gap-2.5 text-sm text-ink-muted">
              <MapPin size={15} className="mt-0.5 shrink-0 text-cyan-signal" aria-hidden />
              <span className="leading-relaxed">{fullAddress}</span>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2.5 text-sm text-ink-muted transition-colors hover:text-cyan-signal focus-ring"
              >
                <Mail size={15} className="shrink-0 text-cyan-signal" aria-hidden />
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="flex items-center gap-2.5 text-sm text-ink-muted transition-colors hover:text-cyan-signal focus-ring"
              >
                <Phone size={15} className="shrink-0 text-cyan-signal" aria-hidden />
                {site.contact.phone}
              </a>
            </li>
            <li className="pt-3">
              <div className="rounded-lg border border-rose-signal/25 bg-rose-signal/[0.06] p-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-rose-signal">
                  Active incident?
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  Call{" "}
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="font-medium text-ink underline underline-offset-2"
                  >
                    {site.contact.phone}
                  </a>{" "}
                  — answered 24/7.
                </p>
              </div>
            </li>
          </FooterColumn>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col gap-4 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved. · Kozhikode, Kerala, India
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-cyan-signal focus-ring">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-ink-muted transition-colors hover:text-cyan-signal focus-ring"
      >
        {children}
      </Link>
    </li>
  );
}
