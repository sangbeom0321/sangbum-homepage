"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ReadingTime from "./ReadingTime";
import { formatDate } from "@/lib/utils";

interface BlogPostCardProps {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readingTime: number;
}

export default function BlogPostCard({
  slug,
  title,
  summary,
  date,
  tags,
  readingTime,
}: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${slug}`} className="group block">
        <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-lg)]">
          {/* Date and reading time */}
          <div className="mb-3 flex items-center gap-3 text-caption text-[var(--text-tertiary)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(date)}
            </span>
            <span className="text-[var(--border)]">|</span>
            <ReadingTime minutes={readingTime} />
          </div>

          {/* Title */}
          <h3 className="text-heading-sm font-semibold text-[var(--text-primary)] font-display transition-colors group-hover:text-[var(--accent)]">
            {title}
          </h3>

          {/* Summary */}
          <p className="mt-2 text-body-sm text-[var(--text-secondary)] line-clamp-2">
            {summary}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
        </article>
      </Link>
    </motion.div>
  );
}
