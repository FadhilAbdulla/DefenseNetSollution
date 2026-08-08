import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { GridBackdrop, Glow } from "@/components/ui/BackgroundFX";

const suggestions = [
  { label: "Cybersecurity services", href: "/services" },
  { label: "The DefenseNet platform", href: "/platform" },
  { label: "Insights & threat briefings", href: "/blog" },
  { label: "Tenreply — WhatsApp API", href: "/products/tenreply" },
  { label: "Contact us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-24">
      <GridBackdrop />
      <Glow className="-top-20 left-1/2 h-[26rem] w-[40rem] -translate-x-1/2" />

      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-cyan-signal">
            Error 404 · Route not found
          </p>
          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,6rem)] font-semibold leading-none tracking-[-0.04em] text-gradient-signal">
            404
          </h1>
          <p className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
            This page has no detections against it.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
            The page you asked for does not exist, has moved, or was never published. Here is where
            most people were heading.
          </p>

          <ul className="mt-9 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="chip px-3.5 py-2 text-[0.72rem] normal-case tracking-normal transition-colors hover:border-cyan-signal/40 hover:text-cyan-signal focus-ring"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary">
              <Home size={15} aria-hidden />
              Back to home
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Talk to us
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
