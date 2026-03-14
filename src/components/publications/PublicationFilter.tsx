"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PublicationFrontmatter } from "@/lib/mdx";
import PublicationCard from "./PublicationCard";
import { cn } from "@/lib/utils";

interface PublicationFilterProps {
  publications: PublicationFrontmatter[];
}

export default function PublicationFilter({
  publications,
}: PublicationFilterProps) {
  const [activeTag, setActiveTag] = useState("All");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    publications.forEach((pub) => {
      pub.tags.forEach((tag) => tagSet.add(tag));
    });
    return ["All", ...Array.from(tagSet).sort()];
  }, [publications]);

  const filtered = useMemo(() => {
    if (activeTag === "All") return publications;
    return publications.filter((pub) => pub.tags.includes(activeTag));
  }, [publications, activeTag]);

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-caption font-medium transition-colors",
              activeTag === tag
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Publication list */}
      <motion.div layout className="flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((pub) => (
            <motion.div
              key={pub.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <PublicationCard publication={pub} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-body-md text-[var(--text-tertiary)]">
            No publications found for this filter.
          </p>
        )}
      </motion.div>
    </div>
  );
}
