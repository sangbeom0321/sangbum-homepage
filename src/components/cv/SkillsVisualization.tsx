"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type Skill,
  getSkillsByPipelineStage,
  getSkillsByCategory,
} from "../../../content/data/skills";

// ---------------------------------------------------------------------------
// Pipeline stage configuration
// ---------------------------------------------------------------------------

const pipelineStages = [
  {
    key: "perception",
    label: "Perception",
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    dotColor: "bg-blue-500",
  },
  {
    key: "planning",
    label: "Planning",
    color: "from-violet-500 to-purple-500",
    bgLight: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    dotColor: "bg-violet-500",
  },
  {
    key: "control",
    label: "Control",
    color: "from-emerald-500 to-green-500",
    bgLight: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    dotColor: "bg-emerald-500",
  },
] as const;

// ---------------------------------------------------------------------------
// Category configuration
// ---------------------------------------------------------------------------

const categoryConfig: Record<string, { label: string; color: string }> = {
  language: { label: "Languages", color: "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400" },
  framework: { label: "Frameworks & Libraries", color: "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400" },
  tool: { label: "Tools & Infrastructure", color: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400" },
  domain: { label: "Domain Knowledge", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" },
};

// ---------------------------------------------------------------------------
// Proficiency tooltip mapping
// ---------------------------------------------------------------------------

const proficiencyLabel: Record<string, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
};

const proficiencyDots: Record<string, number> = {
  expert: 3,
  advanced: 2,
  intermediate: 1,
};

// ---------------------------------------------------------------------------
// Skill pill with hover tooltip
// ---------------------------------------------------------------------------

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span className="group relative inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-caption font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]">
      {skill.name}
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[var(--text-primary)] px-2.5 py-1 text-caption text-[var(--bg-primary)] opacity-0 transition-opacity group-hover:opacity-100 z-20">
        {proficiencyLabel[skill.proficiency]}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[var(--text-primary)]" />
      </span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function SkillsVisualization() {
  const byStage = getSkillsByPipelineStage();
  const byCategory = getSkillsByCategory();

  return (
    <div>
      {/* Pipeline Diagram */}
      <div className="mb-12">
        <h3 className="text-heading-sm font-semibold font-display text-[var(--text-primary)] mb-6">
          Autonomous Driving Pipeline
        </h3>

        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
          {pipelineStages.map((stage, idx) => (
            <div key={stage.key} className="flex items-stretch flex-1">
              {/* Stage block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "flex-1 rounded-xl border p-5",
                  stage.bgLight,
                  stage.borderColor
                )}
              >
                {/* Stage header */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      stage.dotColor
                    )}
                  />
                  <span className="text-body-sm font-semibold text-[var(--text-primary)]">
                    {stage.label}
                  </span>
                </div>

                {/* Skills in this stage */}
                <div className="flex flex-wrap gap-1.5">
                  {(byStage[stage.key] || []).map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1 rounded-md bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 text-caption text-[var(--text-secondary)]"
                    >
                      {/* Proficiency dots */}
                      <span className="flex gap-0.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              i < proficiencyDots[skill.proficiency]
                                ? stage.dotColor
                                : "bg-[var(--border)]"
                            )}
                          />
                        ))}
                      </span>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Arrow between stages */}
              {idx < pipelineStages.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-2 text-[var(--text-tertiary)]">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills grouped by category */}
      <div>
        <h3 className="text-heading-sm font-semibold font-display text-[var(--text-primary)] mb-6">
          Skills by Category
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(categoryConfig).map(([key, config]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className="text-body-sm font-semibold text-[var(--text-primary)] mb-3">
                {config.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(byCategory[key] || []).map((skill) => (
                  <SkillPill key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
