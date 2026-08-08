import { getAllPosts } from "@/lib/blog";
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

export function GET() {
  const posts = getAllPosts();
  const updated = posts[0] ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const items = posts
    .map((post) =>
      [
        "    <item>",
        `      <title>${escape(post.title)}</title>`,
        `      <link>${absoluteUrl(`/blog/${post.slug}/`)}</link>`,
        `      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}/`)}</guid>`,
        `      <description>${escape(post.description)}</description>`,
        `      <category>${escape(post.category)}</category>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n"),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Cybersecurity Insights</title>
    <link>${absoluteUrl("/blog/")}</link>
    <description>Threat briefings, detection engineering guides and compliance explainers from the ${escape(site.name)} security team.</description>
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
