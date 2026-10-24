import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

/**
 * Markdown helpers shared by every content collection (blog, CVE advisories,
 * incident case studies) so they render, slug and time identically.
 */

export type Heading = { id: string; text: string; level: 2 | 3 };

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const readingTimeOf = (markdown: string) => {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

/** Pulls h2/h3 out of the raw markdown for the article's table of contents. */
export const extractHeadings = (markdown: string): Heading[] => {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, "");
    headings.push({
      id: slugify(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }
  return headings;
};

export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
      content: { type: "text", value: "#" },
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
