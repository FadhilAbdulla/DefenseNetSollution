/**
 * Post-export housekeeping for the static build.
 *
 * 1. Next writes the generated Open Graph image as an extensionless file
 *    (`out/opengraph-image`). Static hosts serve that without a usable
 *    content type, so we copy it to `out/og/default.png` — the path every
 *    page's metadata points at.
 * 2. Verifies the files the deployment depends on actually exist.
 */

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");

if (!existsSync(OUT)) {
  console.error("postbuild: out/ not found — run `next build` first.");
  process.exit(1);
}

// 1. Publish the OG image at a stable, extension-bearing path.
const generated = join(OUT, "opengraph-image");
if (existsSync(generated)) {
  mkdirSync(join(OUT, "og"), { recursive: true });
  copyFileSync(generated, join(OUT, "og", "default.png"));
  console.log("postbuild: wrote out/og/default.png");
} else {
  console.warn("postbuild: no generated opengraph-image found — skipping OG copy.");
}

// 2. Fail loudly if anything the deployment relies on is missing.
const required = [
  "index.html",
  "404.html",
  "CNAME",
  ".nojekyll",
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
  "llms-full.txt",
  "rss.xml",
  "og/default.png",
];

const missing = required.filter((file) => !existsSync(join(OUT, file)));

if (missing.length) {
  console.error(`postbuild: missing expected output files: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`postbuild: verified ${required.length} required files.`);
