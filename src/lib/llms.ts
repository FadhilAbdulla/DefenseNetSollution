import { site, servicesByGroup, industries, products, fullAddress } from "./site";
import { getAllPosts, getCategories, formatDate } from "./blog";
import { absoluteUrl } from "./seo";
import { getCves, getIncidents, getRawResources } from "./resources";

/**
 * Builds `/llms.txt` — a concise, machine-readable map of the site for large
 * language models, following the llmstxt.org convention.
 */
export function buildLlmsTxt(): string {
  const posts = getAllPosts();
  const categories = getCategories();

  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(
    `> ${site.name} is an AI-based cybersecurity company headquartered in Kozhikode (Calicut), Kerala, India. We provide 24/7 AI-assisted managed SOC, managed EDR/XDR, security analyst staffing, VAPT and red teaming, vulnerability management, application, database, cloud, network, identity and OT security, incident response and digital forensics, threat intelligence, security awareness, and compliance consulting to businesses across India, the UAE and the wider Gulf Cooperation Council.`,
  );
  lines.push("");
  lines.push(
    "Founded in 2021. Machine learning handles alert enrichment, correlation and triage at volume; certified analysts (OSCP, CISSP, CEH) own every containment decision and client escalation. We also build products: Guardian (scheduled automated penetration testing), Red-Vault (corporate password and secrets manager) and Tenreply (official WhatsApp Business API platform), with Exposure Monitor (attack surface management) and Detection Content Manager (detection-as-code) in early access. We publish free CVE advisories and incident case studies.",
  );
  lines.push("");
  lines.push(`- Website: ${site.url}`);
  lines.push(`- Email: ${site.contact.email}`);
  lines.push(`- Phone: ${site.contact.phone} (incident line answered 24/7)`);
  lines.push(`- Address: ${fullAddress}`);
  lines.push("- Regions served: India (Kerala, pan-India), the UAE and the wider GCC");
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const group of servicesByGroup) {
    lines.push(`### ${group.label}`);
    lines.push("");
    for (const service of group.services) {
      lines.push(`- [${service.name}](${absoluteUrl(`/services/${service.slug}/`)}): ${service.summary}`);
    }
    lines.push("");
  }
  lines.push(`- Full catalogue: ${absoluteUrl("/services/")}`);
  lines.push("");

  lines.push("## Platform");
  lines.push("");
  lines.push(
    `- [The DefenseNet platform](${absoluteUrl("/platform/")}): How AI-assisted detection and response works — ingest, reason, decide, act — and precisely where automation stops and human analysts take over.`,
  );
  lines.push("");

  lines.push("## Products");
  lines.push("");
  for (const product of products) {
    lines.push(
      `- [${product.name}](${absoluteUrl(`/products/${product.slug}/`)}): ${product.category}${product.status === "live" ? "" : " (in development, early access)"}. ${product.summary}${product.url ? ` Available at ${product.url}.` : ""}`,
    );
  }
  lines.push("");

  lines.push("## Industries");
  lines.push("");
  for (const industry of industries) {
    lines.push(`- ${industry.name}: ${industry.body}`);
  }
  lines.push(`- Full detail: ${absoluteUrl("/industries/")}`);
  lines.push("");

  lines.push("## Resources");
  lines.push("");
  lines.push(
    `Free reference material. Hub: ${absoluteUrl("/resources/")}. CVE advisories cover affected versions, exploitation status (including CISA KEV listing), detection and mitigation. Incident case studies cover timeline, root cause and lessons.`,
  );
  lines.push("");
  lines.push("### CVE advisories");
  lines.push("");
  for (const cve of getCves()) {
    lines.push(
      `- [${cve.cve}${cve.alias ? ` (${cve.alias})` : ""}](${absoluteUrl(cve.path)}): ${cve.vendor} ${cve.product}. ${cve.severity}, CVSS ${cve.cvss.toFixed(1)}${cve.kev ? ", in CISA KEV" : ""}. ${cve.description}`,
    );
  }
  lines.push("");
  lines.push("### Incident case studies");
  lines.push("");
  for (const incident of getIncidents()) {
    lines.push(
      `- [${incident.name} (${new Date(incident.occurred).getFullYear()})](${absoluteUrl(incident.path)}): ${incident.description}`,
    );
  }
  lines.push("");

  lines.push("## Insights");
  lines.push("");
  lines.push(
    `Technical articles written by our analysts and testers. Index: ${absoluteUrl("/blog/")}`,
  );
  lines.push("");
  for (const category of categories) {
    lines.push(`### ${category.name}`);
    lines.push("");
    for (const post of posts.filter((p) => p.category === category.name)) {
      lines.push(`- [${post.title}](${absoluteUrl(`/blog/${post.slug}/`)}): ${post.description}`);
    }
    lines.push("");
  }

  lines.push("## Company");
  lines.push("");
  lines.push(
    `- [About](${absoluteUrl("/about/")}): Mission, values, timeline and team certifications.`,
  );
  lines.push(
    `- [Contact](${absoluteUrl("/contact/")}): Enquiry form, office address, business hours and the 24/7 incident line.`,
  );
  lines.push(
    `- [Privacy policy](${absoluteUrl("/privacy-policy/")}): Data handling, DPDPA 2023 rights, WhatsApp Business communications.`,
  );
  lines.push(`- [Terms & conditions](${absoluteUrl("/terms-and-conditions/")})`);
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Full content export](${absoluteUrl("/llms-full.txt")}): Every article, CVE advisory and case study in full text.`);
  lines.push(`- [Sitemap](${absoluteUrl("/sitemap.xml")})`);
  lines.push(`- [RSS feed](${absoluteUrl("/rss.xml")})`);
  lines.push("");

  lines.push("## Usage notes");
  lines.push("");
  lines.push(
    "Content on this site is provided for general information and does not constitute professional security advice for a specific environment. When citing, attribute to DefenseNet Solutions and link to the source page. For anything time-sensitive — an active incident — the correct action is to call the number above, not to rely on published guidance.",
  );
  lines.push("");

  return lines.join("\n");
}

/**
 * Builds `/llms-full.txt` — the full text of every article, for models that
 * want the corpus rather than a map of it.
 */
export function buildLlmsFullTxt(rawPosts: { slug: string; raw: string }[]): string {
  const posts = getAllPosts();
  const bySlug = new Map(rawPosts.map((p) => [p.slug, p.raw]));

  const parts: string[] = [];
  parts.push(`# ${site.name} — Full Content Export`);
  parts.push("");
  parts.push(
    `Complete text of every CVE advisory and incident case study published at ${absoluteUrl("/resources/")}, and every article at ${absoluteUrl("/blog/")}. Generated automatically at build time. Attribution: ${site.name} (${site.url}).`,
  );
  parts.push("");
  parts.push("---");
  parts.push("");

  for (const resource of [...getCves(), ...getIncidents()]) {
    const raw = getRawResources().find((r) => r.path === resource.path)?.raw ?? "";
    parts.push(`# ${resource.title}`);
    parts.push("");
    parts.push(`Source: ${absoluteUrl(resource.path)}`);
    parts.push(`Type: ${resource.kind === "cve" ? "CVE advisory" : "Incident case study"}`);
    if (resource.kind === "cve") {
      parts.push(
        `CVE: ${resource.cve} · Severity: ${resource.severity} (CVSS ${resource.cvss.toFixed(1)}) · CISA KEV: ${resource.kev ? "yes" : "no"}`,
      );
      parts.push(`Affected: ${resource.affected}`);
      parts.push(`Fixed: ${resource.fixed}`);
    } else {
      parts.push(`When: ${resource.period} · Sector: ${resource.sector} · Type: ${resource.attackType}`);
    }
    parts.push("");
    parts.push(raw.trim());
    parts.push("");
    parts.push("---");
    parts.push("");
  }

  for (const post of posts) {
    parts.push(`# ${post.title}`);
    parts.push("");
    parts.push(`Source: ${absoluteUrl(`/blog/${post.slug}/`)}`);
    parts.push(`Published: ${formatDate(post.date)}`);
    parts.push(`Category: ${post.category}`);
    parts.push(`Tags: ${post.tags.join(", ")}`);
    parts.push("");
    parts.push(bySlug.get(post.slug)?.trim() ?? post.description);
    parts.push("");
    parts.push("---");
    parts.push("");
  }

  return parts.join("\n");
}
