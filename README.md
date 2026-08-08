# DefenseNet Solutions — defensenetsolutions.com

Marketing site for DefenseNet Solutions, a cybersecurity company in Thalassery, Kannur, Kerala.

Built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS v4**, statically
exported so it deploys to GitHub Pages exactly as the previous site did — and to Vercel,
Netlify or any CDN without changes.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run typecheck
```

## Project structure

```
content/blog/          Markdown articles — one file per post, frontmatter-driven
public/                Static assets, CNAME, .nojekyll, images
scripts/postbuild.mjs  Publishes the OG image and verifies required output files
src/
  app/                 Routes (App Router)
    llms.txt/          Route handler → /llms.txt
    llms-full.txt/     Route handler → /llms-full.txt (full article corpus)
    rss.xml/           Route handler → /rss.xml
    sitemap.ts         → /sitemap.xml
    robots.ts          → /robots.txt
    opengraph-image.tsx  Generated 1200×630 OG card
  components/
    layout/            Navbar, Footer
    sections/          Home-page and reusable page sections
    blog/              Post cards
    contact/           Contact form (client component)
    ui/                Primitives: Section, Reveal, PageHero, JsonLd, BackgroundFX
  lib/
    site.ts            Single source of truth for all site content
    blog.ts            Markdown pipeline, categories, related posts
    seo.ts             Metadata helper + schema.org builders
    llms.ts            llms.txt / llms-full.txt generators
    accent.ts          Accent → Tailwind class map
```

## Editing content

**Everything except blog posts lives in [`src/lib/site.ts`](src/lib/site.ts)** — services,
products, industries, navigation, contact details, testimonials, metrics, values and
timeline. Pages, the sitemap, the footer and `llms.txt` all read from it, so a change there
propagates everywhere.

### Adding a blog post

Create a markdown file in `content/blog/`. The filename becomes the URL slug.

```markdown
---
title: "Your Post Title"
description: "One or two sentences — used for SEO, cards and llms.txt."
date: "2026-08-01"
category: "Security Operations"
tags: ["SIEM", "Detection"]
featured: false
---

Body in standard markdown. `##` and `###` headings feed the table of contents.
```

Categories generate their own index page automatically at `/blog/category/<slug>/`.
Nothing else needs updating — sitemap, RSS, related posts and `llms.txt` all pick it up
at build time.

### Adding a service or product

Append to the `services` or `products` array in `src/lib/site.ts`. A service automatically
gets a detail page at `/services/<slug>/`, a footer link, a nav dropdown entry, a sitemap
entry and schema.org markup.

## Design system

Tokens are defined in [`src/app/globals.css`](src/app/globals.css) under `@theme`:

- **Surfaces** — `void`, `base`, `surface`, `elevated`, `line`
- **Text** — `ink`, `ink-muted`, `ink-dim`
- **Signals** — `cyan-signal`, `violet-signal`, `emerald-signal`, `amber-signal`, `rose-signal`
- **Type** — `font-display` (Space Grotesk), `font-sans` (Inter), `font-mono` (JetBrains Mono)

Custom utilities: `shell`, `band`, `eyebrow`, `glass`, `text-gradient-signal`,
`grid-backdrop`, `focus-ring`. Component classes: `btn`, `btn-primary`, `btn-ghost`,
`card`, `card-hover`, `chip`, `hairline`, `prose-dn`.

All motion respects `prefers-reduced-motion`.

## SEO

| Artefact | Source |
| --- | --- |
| `sitemap.xml` | `src/app/sitemap.ts` — every page, service, product, post and category |
| `robots.txt` | `src/app/robots.ts` — explicitly allows AI crawlers |
| `llms.txt` | `src/lib/llms.ts` — site map for language models (llmstxt.org) |
| `llms-full.txt` | Full text of every article |
| `rss.xml` | `src/app/rss.xml/route.ts` |
| OG image | `src/app/opengraph-image.tsx` → copied to `/og/default.png` at postbuild |
| JSON-LD | `src/lib/seo.ts` — Organization, LocalBusiness, WebSite, Service, BlogPosting, FAQPage, BreadcrumbList |

## Contact form

The site is statically exported, so there is no server route. Set
`NEXT_PUBLIC_FORM_ENDPOINT` to any service that accepts a JSON `POST` (Formspree,
Web3Forms, Basin, a Cloudflare Worker). See [`.env.example`](.env.example).

If it is unset, the form falls back to composing a pre-filled email in the visitor's mail
client, so enquiries are never lost silently. A honeypot field filters basic bots.

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes `out/`
to GitHub Pages on every push to `main`.

**One-time setup:** in **Settings → Pages**, set **Source** to **GitHub Actions**
(the repo was previously serving from the `main` branch root). The custom domain in
`public/CNAME` is preserved in the build output, and `.nojekyll` stops GitHub Pages from
stripping the `_next` directory.

To use the form endpoint in CI, add `NEXT_PUBLIC_FORM_ENDPOINT` as a repository secret.

## Legacy site

The previous Bootstrap site is preserved in [`legacy/`](legacy/) for reference. It is
excluded from the build and can be deleted once the new site is verified in production.
