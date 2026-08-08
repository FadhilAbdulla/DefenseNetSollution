import { buildLlmsFullTxt } from "@/lib/llms";
import { getRawPosts } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(getRawPosts()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
