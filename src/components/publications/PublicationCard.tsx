"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Video } from "lucide-react";
import type { PublicationFrontmatter } from "@/lib/mdx";
import Badge from "@/components/ui/Badge";
import BibtexButton from "./BibtexButton";

interface PublicationCardProps {
  publication: PublicationFrontmatter;
}

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "info" }> = {
  published: { label: "Published", variant: "success" },
  "under-review": { label: "Under Review", variant: "warning" },
  preprint: { label: "Preprint", variant: "info" },
};

export default function PublicationCard({ publication }: PublicationCardProps) {
  const {
    title,
    authors,
    venue,
    venueType,
    year,
    status,
    links,
    bibtex,
  } = publication;

  const statusInfo = statusConfig[status] ?? {
    label: status,
    variant: "info" as const,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-lg)]"
    >
      {/* Badges row */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        {venueType && <Badge>{venueType}</Badge>}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-heading-sm font-semibold leading-snug text-[var(--text-primary)] font-display">
        {title}
      </h3>

      {/* Authors */}
      <p className="mb-1 text-body-sm text-[var(--text-secondary)]">
        {authors.map((author, idx) => (
          <span key={idx}>
            {idx > 0 && ", "}
            {author.me ? (
              <span className="font-semibold text-[var(--text-primary)]">
                {author.name}
              </span>
            ) : (
              author.name
            )}
          </span>
        ))}
      </p>

      {/* Venue + year */}
      <p className="mb-4 text-body-sm text-[var(--text-tertiary)]">
        {venue} &middot; {year}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {links.paper && (
          <a
            href={links.paper}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-caption font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Paper
          </a>
        )}
        {links.code && (
          <a
            href={links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-caption font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            <Code2 className="h-3.5 w-3.5" />
            Code
          </a>
        )}
        {links.video && (
          <a
            href={links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-caption font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            <Video className="h-3.5 w-3.5" />
            Video
          </a>
        )}
        {bibtex && <BibtexButton bibtex={bibtex} />}
      </div>
    </motion.div>
  );
}
