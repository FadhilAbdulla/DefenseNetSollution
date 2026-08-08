import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PostCard } from "@/components/blog/PostCard";
import { getFeaturedPosts } from "@/lib/blog";

export function LatestInsights() {
  const posts = getFeaturedPosts(3);
  if (!posts.length) return null;

  return (
    <Section className="border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Insights"
          title="Threat briefings and practical guidance."
          lede="Written by the analysts and testers doing the work — no vendor marketing, no recycled press releases."
        />
        <Reveal delay={120}>
          <Link href="/blog" className="btn btn-ghost">
            All articles
            <ArrowRight size={15} aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 90}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
