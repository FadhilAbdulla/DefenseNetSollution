import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { GridBackdrop, Glow } from "./BackgroundFX";

export type Crumb = { name: string; path: string };

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-16 pt-[calc(var(--nav-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--nav-h)+5.5rem)]">
      <GridBackdrop />
      <Glow className="-top-32 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2" />

      <div className="shell relative">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
              {crumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight size={11} className="opacity-50" aria-hidden /> : null}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-cyan-signal">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-ink focus-ring">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="eyebrow anim-fade">
              <span className="h-px w-6 bg-cyan-signal/60" aria-hidden />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="anim-rise mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance">
            {title}
          </h1>
          {lede ? (
            <p
              className="anim-rise mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty"
              style={{ animationDelay: "120ms" }}
            >
              {lede}
            </p>
          ) : null}
          {children ? (
            <div className="anim-rise mt-9" style={{ animationDelay: "220ms" }}>
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
