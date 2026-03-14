"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("mb-10", className)}
    >
      <h2 className="text-display-sm font-bold tracking-tight text-[var(--text-primary)] font-display">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-body-lg text-[var(--text-secondary)]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
