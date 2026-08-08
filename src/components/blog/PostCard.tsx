import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate, type Post } from "@/lib/blog";

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <article className="card card-hover group h-full">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col p-6 focus-ring sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="chip border-cyan-signal/25 bg-cyan-signal/[0.07] text-cyan-signal">
            {post.category}
          </span>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-signal"
            aria-hidden
          />
        </div>

        <h3
          className={`mt-5 font-display font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-cyan-signal ${
            compact ? "text-[0.9375rem]" : "text-[1.0625rem]"
          }`}
        >
          {post.title}
        </h3>

        {!compact ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
            {post.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <div className="mt-6 flex items-center gap-3 border-t border-line pt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="h-1 w-1 rounded-full bg-line" aria-hidden />
          <span className="flex items-center gap-1.5">
            <Clock size={11} aria-hidden />
            {post.readingTime} min read
          </span>
        </div>
      </Link>
    </article>
  );
}
