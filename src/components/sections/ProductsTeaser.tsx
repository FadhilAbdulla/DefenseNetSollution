import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { accentClasses } from "@/lib/accent";
import { products } from "@/lib/site";

export function ProductsTeaser() {
  return (
    <Section className="border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Products"
          title="Software we build, run and secure ourselves."
          lede="Alongside our services practice, DefenseNet ships its own products — engineered to the same security standard we hold our clients' systems to."
        />
        <Reveal delay={120}>
          <Link href="/products" className="btn btn-ghost">
            All products
            <ArrowRight size={15} aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, i) => {
          const accent = accentClasses[product.accent];
          return (
            <Reveal key={product.slug} delay={i * 90}>
              <Link
                href={`/products/${product.slug}`}
                className="card card-hover group relative flex h-full flex-col overflow-hidden p-8 focus-ring"
              >
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full ${accent.bg} blur-3xl`}
                  aria-hidden
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}
                  >
                    <ServiceIcon name={product.icon} size={21} />
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="mt-1 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-signal"
                    aria-hidden
                  />
                </div>

                <div className="relative mt-6 flex flex-wrap items-center gap-2">
                  <span className={`chip ${accent.border} ${accent.bg} ${accent.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} aria-hidden />
                    {product.status === "live" ? "Live" : "Coming soon"}
                  </span>
                </div>

                <h3 className="relative mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
                  {product.name}
                </h3>
                <p className={`relative mt-1.5 text-[0.8125rem] ${accent.text}`}>
                  {product.category}
                </p>
                <p className="relative mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink-muted">
                  {product.summary}
                </p>

                <dl className="relative mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
                  {product.stats.map((stat) => (
                    <div key={stat.label} className="bg-void/40 px-3 py-3.5 text-center">
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className={`font-display text-sm font-semibold ${accent.text}`}>
                        {stat.value}
                      </dd>
                      <p className="mt-1 font-mono text-[0.52rem] uppercase leading-tight tracking-[0.1em] text-ink-muted">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </dl>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
