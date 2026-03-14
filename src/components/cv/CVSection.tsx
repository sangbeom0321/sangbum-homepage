"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CVSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function CVSection({
  title,
  children,
  className,
}: CVSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("mb-14", className)}
    >
      <h2 className="text-heading-lg font-bold font-display text-[var(--text-primary)] mb-6 pb-2 border-b border-[var(--border)]">
        {title}
      </h2>
      <div className="relative pl-6 border-l-2 border-[var(--border)]">
        {children}
      </div>
    </motion.section>
  );
}
