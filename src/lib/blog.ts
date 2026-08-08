import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  author?: string;
  featured?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  author: string;
  readingTime: number;
  headings: { id: string; text: string; level: 2 | 3 }[];
};

export type PostWithBody = Post & { html: string };

/* ------------------------------------------------------------------ */

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const readingTimeOf = (markdown: string) => {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

/** Pulls h2/h3 out of the raw markdown for the article's table of contents. */
const extractHeadings = (markdown: string) => {
  const headings: { id: string; text: string; level: 2 | 3 }[] = [];
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

const parseFile = (fileName: string): Post & { raw: string } => {
  const slug = fileName.replace(/\.mdx?$/, "");
  const source = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(source);
  const fm = data as PostFrontmatter;

  return {
    ...fm,
    slug,
    tags: fm.tags ?? [],
    author: fm.author ?? "DefenseNet Solutions",
    readingTime: readingTimeOf(content),
    headings: extractHeadings(content),
    raw: content,
  };
};

/* ------------------------------------------------------------------ */

let cache: (Post & { raw: string })[] | null = null;

function loadAll() {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) return (cache = []);

  cache = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parseFile)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return cache;
}

const strip = ({ raw: _raw, ...post }: Post & { raw: string }): Post => post;

export const getAllPosts = (): Post[] => loadAll().map(strip);

export const getPostSlugs = () => loadAll().map((p) => p.slug);

/** Raw markdown bodies, used to build the full-text export for LLM crawlers. */
export const getRawPosts = () => loadAll().map(({ slug, raw }) => ({ slug, raw }));

export const getFeaturedPosts = (limit = 3): Post[] => {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  return [...featured, ...all.filter((p) => !p.featured)].slice(0, limit);
};

export const getCategories = () => {
  const counts = new Map<string, number>();
  for (const post of loadAll()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

export const getCategoryBySlug = (slug: string) =>
  getCategories().find((c) => c.slug === slug);

export const getPostsByCategory = (slug: string) =>
  getAllPosts().filter((p) => slugify(p.category) === slug);

export const getAllTags = () => {
  const counts = new Map<string, number>();
  for (const post of loadAll()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Related posts: same category first, then shared-tag overlap, newest first.
 */
export const getRelatedPosts = (slug: string, limit = 3): Post[] => {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);

  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      const score = (p.category === current.category ? 5 : 0) + sharedTags;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score || +new Date(b.post.date) - +new Date(a.post.date));

  return scored.slice(0, limit).map((s) => s.post);
};

export async function getPost(slug: string): Promise<PostWithBody | null> {
  const entry = loadAll().find((p) => p.slug === slug);
  if (!entry) return null;

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
    .process(entry.raw);

  return { ...strip(entry), html: String(file) };
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export { slugify };
