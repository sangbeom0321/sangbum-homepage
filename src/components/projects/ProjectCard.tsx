"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectFrontmatter } from "@/lib/mdx";

interface ProjectCardProps {
  project: ProjectFrontmatter;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, subtitle, period, tags, thumbnail, slug } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${slug}`}
        className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-lg)]"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--accent)] to-blue-400">
              <span className="text-display-sm font-bold text-white/30 font-display">
                {title.charAt(0)}
              </span>
            </div>
          )}

          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-1 text-heading-sm font-semibold text-[var(--text-primary)] font-display">
            {title}
          </h3>
          {subtitle && (
            <p className="mb-2 text-body-sm text-[var(--text-secondary)]">
              {subtitle}
            </p>
          )}
          <p className="mb-3 text-caption text-[var(--text-tertiary)]">
            {period}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--accent-muted)] px-2 py-0.5 text-[0.65rem] font-medium text-[var(--accent)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
