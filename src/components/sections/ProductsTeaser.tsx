import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { products, tenreply } from "@/lib/site";

export function ProductsTeaser() {
  const live = products.filter((p) => p.status === "live");

  return (
    <Section className="border-t border-line">
      <SectionHeading
        eyebrow="Products"
        title="Software we build, run and secure ourselves."
        lede="Alongside our services practice, DefenseNet ships its own products — engineered to the same security standard we hold our clients' systems to."
      />

      <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-[1.4fr_1fr]">
        {live.map((product) => (
          <Reveal key={product.slug}>
            <div className="card relative h-full overflow-hidden p-8 lg:p-10">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-signal/[0.09] blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="chip border-emerald-signal/30 bg-emerald-signal/10 text-emerald-signal">
                    Live
                  </span>
                  <span className="chip">{product.category}</span>
                </div>

                <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink">
                  {product.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-emerald-signal">{product.tagline}</p>
                <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
                  {product.summary}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href={`/products/${product.slug}`} className="btn btn-primary">
                    Explore {product.name}
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-ghost"
                  >
                    tenreply.com
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                </div>

                <dl className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
                  {tenreply.stats.map((stat) => (
                    <div key={stat.label} className="bg-base px-4 py-4">
                      <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-muted">
                        {stat.label}
                      </dt>
                      <dd className="mt-1.5 font-display text-lg font-semibold text-ink">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Roadmap placeholder — more products coming */}
        <Reveal delay={120}>
          <div className="card flex h-full flex-col justify-between border-dashed p-8 lg:p-10">
            <div>
              <span className="chip">
                <Sparkles size={11} aria-hidden />
                In development
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">
                More products are on the way.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                We are turning capabilities our SOC uses every day into products our clients can run
                themselves — starting with detection content management and continuous exposure
                monitoring.
              </p>
            </div>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-signal focus-ring"
            >
              Ask about early access
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
