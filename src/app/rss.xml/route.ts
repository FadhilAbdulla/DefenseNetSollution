import { getAllPosts } from "@/lib/blog";
import { getCves, getIncidents } from "@/lib/resources";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

type FeedItem = { title: string; path: string; description: string; category: string; date: string };

export function GET() {
  // Blog posts, CVE advisories and incident case studies in one feed, newest first.
  const feed: FeedItem[] = [
    ...getAllPosts().map((post) => ({
      title: post.title,
      path: `/blog/${post.slug}/`,
      description: post.description,
      category: post.category,
      date: post.updated ?? post.date,
    })),
    ...getCves().map((cve) => ({
      title: cve.title,
      path: cve.path,
      description: cve.description,
      category: "CVE advisories",
      date: cve.updated ?? cve.date,
    })),
    ...getIncidents().map((incident) => ({
      title: incident.title,
      path: incident.path,
      description: incident.description,
      category: "Incident case studies",
      date: incident.updated ?? incident.date,
    })),
  ].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const updated = feed[0] ? new Date(feed[0].date).toUTCString() : new Date().toUTCString();

  const items = feed
    .map((item) =>
      [
        "    <item>",
        `      <title>${escape(item.title)}</title>`,
        `      <link>${absoluteUrl(item.path)}</link>`,
        `      <guid isPermaLink="true">${absoluteUrl(item.path)}</guid>`,
        `      <description>${escape(item.description)}</description>`,
        `      <category>${escape(item.category)}</category>`,
        `      <pubDate>${new Date(item.date).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n"),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Cybersecurity Insights &amp; Advisories</title>
    <link>${absoluteUrl("/resources/")}</link>
    <description>CVE advisories, incident case studies, threat briefings and detection engineering guides from the ${escape(site.name)} security team.</description>
    <language>en-in</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
