import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTimeOf, extractHeadings, renderMarkdown, type Heading } from "./markdown";

/**
 * Resources: CVE advisories and incident case studies, stored as markdown in
 * content/resources/<kind>/. Structured facts live in frontmatter so index
 * pages, JSON-LD, the sitemap and llms.txt can all read them without parsing
 * prose.
 */

const RESOURCES_DIR = path.join(process.cwd(), "content", "resources");

export type ResourceKind = "cve" | "incidents";

export type Reference = { label: string; url: string };

type CommonFrontmatter = {
  title: string;
  description: string;
  /** Date the page was published on this site. */
  date: string;
  updated?: string;
  tags: string[];
  /** Service slugs that help with this issue. */
  services?: string[];
  /** Other resources, as "cve/<slug>" or "incidents/<slug>". */
  related?: string[];
  references?: Reference[];
  featured?: boolean;
};

export type Severity = "Critical" | "High" | "Medium" | "Low";

export type CveFrontmatter = CommonFrontmatter & {
  cve: string;
  alias?: string;
  vendor: string;
  product: string;
  cvss: number;
  severity: Severity;
  /** Date the vulnerability was publicly disclosed. */
  disclosed: string;
  /** Listed in CISA's Known Exploited Vulnerabilities catalogue. */
  kev: boolean;
  exploited: boolean;
  affected: string;
  fixed: string;
  cwe?: string;
};

export type IncidentFrontmatter = CommonFrontmatter & {
  /** Short display name, e.g. "Colonial Pipeline ransomware". */
  name: string;
  organisation: string;
  /** Date the incident began or was disclosed (used for sorting). */
  occurred: string;
  period: string;
  sector: string;
  region: string;
  attackType: string;
  actor?: string;
  impact: string;
  /** CVE IDs involved, linked to advisories when one exists. */
  cves?: string[];
};

type Base = { slug: string; kind: ResourceKind; path: string; readingTime: number; headings: Heading[] };

export type CveAdvisory = CveFrontmatter & Base & { kind: "cve" };
export type IncidentStudy = IncidentFrontmatter & Base & { kind: "incidents" };
export type Resource = CveAdvisory | IncidentStudy;

/* ------------------------------------------------------------------ */

export const resourcePath = (kind: ResourceKind, slug: string) => `/resources/${kind}/${slug}/`;

export const resourceKinds = {
  cve: {
    label: "CVE advisories",
    singular: "CVE advisory",
    path: "/resources/cve/",
    description:
      "Plain-English analysis of the vulnerabilities that mattered most — who is affected, how attackers used them, how to detect exploitation and exactly how to mitigate.",
  },
  incidents: {
    label: "Incident case studies",
    singular: "Incident case study",
    path: "/resources/incidents/",
    description:
      "Landmark breaches and outages, reconstructed: what happened, how the attackers got in, what it cost, and the controls that would have changed the outcome.",
  },
} as const;

type Loaded = Resource & { raw: string };

const cache: Partial<Record<ResourceKind, Loaded[]>> = {};

function load(kind: ResourceKind): Loaded[] {
  const cached = cache[kind];
  if (cached) return cached;

  const dir = path.join(RESOURCES_DIR, kind);
  if (!fs.existsSync(dir)) return (cache[kind] = []);

  const items = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        ...(data as CveFrontmatter & IncidentFrontmatter),
        tags: (data.tags as string[] | undefined) ?? [],
        slug,
        kind,
        path: resourcePath(kind, slug),
        readingTime: readingTimeOf(content),
        headings: extractHeadings(content),
        raw: content,
      } as Loaded;
    })
    .sort((a, b) => +new Date(eventDate(b)) - +new Date(eventDate(a)));

  return (cache[kind] = items);
}

const strip = ({ raw: _raw, ...rest }: Loaded): Resource => rest as unknown as Resource;

/** The date the vulnerability or incident itself happened — used for ordering. */
export const eventDate = (r: Resource | Loaded) =>
  r.kind === "cve" ? (r as CveAdvisory).disclosed : (r as IncidentStudy).occurred;

export const getCves = () => load("cve").map(strip) as CveAdvisory[];
export const getIncidents = () => load("incidents").map(strip) as IncidentStudy[];

export const getAllResources = (): Resource[] =>
  [...getCves(), ...getIncidents()].sort(
    (a, b) => +new Date(b.updated ?? b.date) - +new Date(a.updated ?? a.date) ||
      +new Date(eventDate(b)) - +new Date(eventDate(a)),
  );

export const getResource = (kind: ResourceKind, slug: string) =>
  (kind === "cve" ? getCves() : getIncidents()).find((r) => r.slug === slug);

export async function getResourceWithBody(kind: ResourceKind, slug: string) {
  const entry = load(kind).find((r) => r.slug === slug);
  if (!entry) return null;
  return { resource: strip(entry), html: await renderMarkdown(entry.raw) };
}

/** Raw markdown bodies, for the llms-full.txt export. */
export const getRawResources = () =>
  [...load("cve"), ...load("incidents")].map((r) => ({ path: r.path, raw: r.raw }));

/** Finds an advisory for a CVE ID, if we have published one. */
export const findCveAdvisory = (cveId: string) =>
  getCves().find((c) => c.cve.toUpperCase() === cveId.toUpperCase());

/**
 * Related resources: explicit `related` links first, then CVE ↔ incident
 * links in either direction, then same-kind items sharing tags.
 */
export function getRelatedResources(resource: Resource, limit = 4): Resource[] {
  const all = [...getCves(), ...getIncidents()];
  const key = (r: Resource) => `${r.kind}/${r.slug}`;
  const picked = new Map<string, Resource>();

  for (const ref of resource.related ?? []) {
    const hit = all.find((r) => key(r) === ref);
    if (hit) picked.set(ref, hit);
  }

  if (resource.kind === "incidents") {
    for (const id of resource.cves ?? []) {
      const advisory = findCveAdvisory(id);
      if (advisory) picked.set(key(advisory), advisory);
    }
  } else {
    for (const incident of getIncidents()) {
      if (incident.cves?.some((id) => id.toUpperCase() === resource.cve.toUpperCase())) {
        picked.set(key(incident), incident);
      }
    }
  }

  const byTags = all
    .filter((r) => key(r) !== key(resource) && !picked.has(key(r)))
    .map((r) => ({ r, score: r.tags.filter((t) => resource.tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  for (const { r } of byTags) picked.set(key(r), r);

  picked.delete(key(resource));
  return [...picked.values()].slice(0, limit);
}
