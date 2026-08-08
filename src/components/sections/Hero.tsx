import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { GridBackdrop, Glow } from "@/components/ui/BackgroundFX";
import { metrics } from "@/lib/site";

const pipeline = [
  {
    time: "04:12:07",
    label: "Impossible travel — finance@",
    verdict: "contained",
    tone: "rose",
    detail: "Session revoked · MFA reset",
  },
  {
    time: "04:12:41",
    label: "LSASS access — WKS-2213",
    verdict: "escalated",
    tone: "amber",
    detail: "Analyst review · T1003.001",
  },
  {
    time: "04:13:02",
    label: "S3 bucket policy changed",
    verdict: "reverted",
    tone: "cyan",
    detail: "IaC drift · auto-rollback",
  },
  {
    time: "04:13:55",
    label: "Beaconing to 45.13.x.211",
    verdict: "blocked",
    tone: "rose",
    detail: "Egress filter applied",
  },
  {
    time: "04:14:30",
    label: "Bulk mailbox export",
    verdict: "benign",
    tone: "emerald",
    detail: "Approved DSAR · closed by AI",
  },
] as const;

const toneMap = {
  rose: { dot: "bg-rose-signal", text: "text-rose-signal", bg: "bg-rose-signal/10" },
  amber: { dot: "bg-amber-signal", text: "text-amber-signal", bg: "bg-amber-signal/10" },
  cyan: { dot: "bg-cyan-signal", text: "text-cyan-signal", bg: "bg-cyan-signal/10" },
  emerald: { dot: "bg-emerald-signal", text: "text-emerald-signal", bg: "bg-emerald-signal/10" },
} as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-[calc(var(--nav-h)+3rem)] md:pb-28 md:pt-[calc(var(--nav-h)+5rem)]">
      <GridBackdrop />
      <Glow className="-top-40 left-[8%] h-[34rem] w-[38rem]" />
      <Glow className="-top-20 right-[2%] h-[30rem] w-[34rem]" color="violet" />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Copy */}
          <div>
            <div className="anim-fade inline-flex items-center gap-2 rounded-full border border-cyan-signal/25 bg-cyan-signal/[0.07] px-3.5 py-1.5">
              <Sparkles size={13} className="text-cyan-signal" aria-hidden />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cyan-signal">
                AI-assisted SOC · Live in India & the Gulf
              </span>
            </div>

            <h1 className="anim-rise mt-6 font-display text-[clamp(2.4rem,6.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
              Cyber defence that
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient-signal">thinks at machine speed.</span>
            </h1>

            <p
              className="anim-rise mt-7 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty"
              style={{ animationDelay: "120ms" }}
            >
              DefenseNet Solutions runs an AI-triaged security operations centre for businesses
              across India and the Gulf. Machine learning clears the noise in seconds; certified
              analysts own every decision that reaches you.
            </p>

            <div
              className="anim-rise mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "220ms" }}
            >
              <Link href="/contact" className="btn btn-primary">
                Book a posture review
                <ArrowRight size={15} aria-hidden />
              </Link>
              <Link href="/platform" className="btn btn-ghost">
                See how the platform works
              </Link>
            </div>

            <div
              className="anim-rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
              style={{ animationDelay: "320ms" }}
            >
              {["OSCP", "CISSP", "CEH", "ISO 27001", "PCI-DSS"].map((cert) => (
                <span
                  key={cert}
                  className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted"
                >
                  <ShieldCheck size={13} className="text-cyan-signal/70" aria-hidden />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Live console */}
          <div className="anim-rise relative" style={{ animationDelay: "260ms" }}>
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-cyan-signal/[0.06] blur-3xl"
              aria-hidden
            />

            <div className="glass relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
              {/* Console chrome */}
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2" aria-hidden>
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-signal opacity-70 [animation:dn-pulse-ring_2.4s_ease-out_infinite]" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-signal" />
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink">
                    DefenseNet SOC · live
                  </span>
                </div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-muted">
                  IST 04:14
                </span>
              </div>

              {/* Event stream */}
              <ul className="divide-y divide-line/70">
                {pipeline.map((event, i) => {
                  const tone = toneMap[event.tone];
                  return (
                    <li
                      key={event.time}
                      className="anim-fade flex items-start gap-3.5 px-5 py-3.5"
                      style={{ animationDelay: `${420 + i * 130}ms` }}
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="truncate text-[0.8125rem] font-medium text-ink">
                            {event.label}
                          </p>
                          <span className="shrink-0 font-mono text-[0.6rem] text-ink-muted">
                            {event.time}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate font-mono text-[0.66rem] text-ink-muted">
                          {event.detail}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-md px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${tone.bg} ${tone.text}`}
                      >
                        {event.verdict}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Console footer */}
              <div className="grid grid-cols-3 divide-x divide-line border-t border-line bg-void/40">
                {[
                  { k: "Alerts / 24h", v: "18,204" },
                  { k: "Auto-resolved", v: "91.4%" },
                  { k: "Median triage", v: "11m 42s" },
                ].map((stat) => (
                  <div key={stat.k} className="px-4 py-3.5">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-muted">
                      {stat.k}
                    </p>
                    <p className="mt-1 font-display text-base font-semibold text-ink">{stat.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics strip */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-24 md:grid-cols-4">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="anim-fade bg-base px-5 py-7 text-center md:px-6"
              style={{ animationDelay: `${600 + i * 90}ms` }}
            >
              <p className="font-display text-[clamp(1.6rem,3.4vw,2.25rem)] font-semibold tracking-tight text-gradient-signal">
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink">{metric.label}</p>
              <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
