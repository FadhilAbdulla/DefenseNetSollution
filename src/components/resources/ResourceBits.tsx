import Link from "next/link";
import { ArrowUpRight, CalendarDays, Flame } from "lucide-react";
import type { CveAdvisory, IncidentStudy, Resource, Severity } from "@/lib/resources";
import { formatDate } from "@/lib/markdown";

const severityTone: Record<Severity, string> = {
  Critical: "border-rose-signal/35 bg-rose-signal/10 text-rose-signal",
  High: "border-amber-signal/35 bg-amber-signal/10 text-amber-signal",
  Medium: "border-cyan-signal/35 bg-cyan-signal/10 text-cyan-signal",
  Low: "border-emerald-signal/35 bg-emerald-signal/10 text-emerald-signal",
};

export function SeverityBadge({ severity, cvss }: { severity: Severity; cvss?: number }) {
  return (
    <span className={`chip ${severityTone[severity]}`}>
      {severity}
      {cvss !== undefined ? <span className="opacity-80">· CVSS {cvss.toFixed(1)}</span> : null}
    </span>
  );
}

/** Marks a CVE listed in CISA's Known Exploited Vulnerabilities catalogue. */
export function KevBadge() {
  return (
    <span
      className="chip border-rose-signal/35 bg-rose-signal/10 text-rose-signal"
      title="Listed in CISA's Known Exploited Vulnerabilities catalogue"
    >
      <Flame size={11} aria-hidden />
      Known exploited
    </span>
  );
}

export function CveCard({ cve }: { cve: CveAdvisory }) {
  return (
    <article className="card card-hover group h-full">
      <Link href={cve.path} className="flex h-full flex-col p-6 focus-ring sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            <SeverityBadge severity={cve.severity} cvss={cve.cvss} />
            {cve.kev ? <KevBadge /> : null}
          </div>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-signal"
            aria-hidden
          />
        </div>

        <p className="mt-5 font-mono text-[0.75rem] tracking-[0.06em] text-cyan-signal">{cve.cve}</p>
        <h3 className="mt-1.5 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-cyan-signal">
          {cve.alias ?? cve.title}
        </h3>
        <p className="mt-1 text-[0.8125rem] text-ink-muted">
          {cve.vendor} · {cve.product}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {cve.description}
        </p>

        <div className="mt-6 flex items-center gap-1.5 border-t border-line pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
          <CalendarDays size={12} aria-hidden />
          Disclosed <time dateTime={cve.disclosed}>{formatDate(cve.disclosed)}</time>
        </div>
      </Link>
    </article>
  );
}

export function IncidentCard({ incident }: { incident: IncidentStudy }) {
  return (
    <article className="card card-hover group h-full">
      <Link href={incident.path} className="flex h-full flex-col p-6 focus-ring sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="chip border-amber-signal/30 bg-amber-signal/[0.08] text-amber-signal">
            {incident.attackType.split(/[—(]/)[0].trim()}
          </span>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-signal"
            aria-hidden
          />
        </div>

        <p className="mt-5 font-mono text-[0.75rem] tracking-[0.06em] text-cyan-signal">
          {new Date(incident.occurred).getFullYear()} · {incident.region}
        </p>
        <h3 className="mt-1.5 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-cyan-signal">
          {incident.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {incident.impact}
        </p>

        <div className="mt-6 border-t border-line pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
          {incident.sector.split("/")[0].trim()}
        </div>
      </Link>
    </article>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return resource.kind === "cve" ? (
    <CveCard cve={resource} />
  ) : (
    <IncidentCard incident={resource} />
  );
}

/** Compact one-line entry for dense lists (homepage, footers, sidebars). */
export function ResourceRow({ resource }: { resource: Resource }) {
  const isCve = resource.kind === "cve";
  return (
    <Link
      href={resource.path}
      className="group flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-elevated focus-ring sm:flex-row sm:items-start sm:gap-4 sm:px-6"
    >
      <span className="shrink-0 font-mono text-[0.75rem] text-cyan-signal sm:mt-0.5 sm:w-[7.5rem]">
        {isCve ? resource.cve : new Date(resource.occurred).getFullYear()}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-medium leading-snug text-ink group-hover:text-cyan-signal">
          {isCve ? (resource.alias ?? resource.title) : resource.name}
        </span>
        <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-muted">
          {isCve ? `${resource.vendor} · ${resource.product}` : resource.attackType}
        </span>
      </span>
      {isCve ? (
        <span className="hidden shrink-0 sm:block">
          <SeverityBadge severity={resource.severity} cvss={resource.cvss} />
        </span>
      ) : null}
    </Link>
  );
}
