import type { Metadata } from "next";
import { ExternalLink, Award as AwardIcon, FileText, Newspaper, Video } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import CVSection from "@/components/cv/CVSection";
import SkillsVisualization from "@/components/cv/SkillsVisualization";
import { education } from "../../../content/data/education";
import { experience } from "../../../content/data/experience";
import { awards } from "../../../content/data/awards";
import { patents } from "../../../content/data/patents";
import { media } from "../../../content/data/media";

export const metadata: Metadata = {
  title: "CV",
};

// ---------------------------------------------------------------------------
// Status badge variant helper
// ---------------------------------------------------------------------------

function statusVariant(
  status: string
): "success" | "warning" | "info" | "default" {
  switch (status) {
    case "current":
    case "upcoming":
      return "success";
    case "completed":
      return "default";
    default:
      return "default";
  }
}

function experienceTypeVariant(
  type: string
): "info" | "success" | "warning" | "default" {
  switch (type) {
    case "research":
      return "info";
    case "work":
      return "success";
    case "club":
      return "warning";
    default:
      return "default";
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CVPage() {
  return (
    <section className="section-container py-16 sm:py-24">
      <SectionHeading
        title="Curriculum Vitae"
        subtitle="Education, experience, skills, and achievements."
      />

      {/* ---- Education ---- */}
      <CVSection title="Education">
        {education.map((edu, idx) => (
          <div key={idx} className="relative mb-8 last:mb-0">
            {/* Timeline dot */}
            <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)]" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="text-body-md font-semibold text-[var(--text-primary)]">
                  {edu.url ? (
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                    >
                      {edu.institutionShort || edu.institution}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    edu.institutionShort || edu.institution
                  )}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)]">
                  {edu.degree} &mdash; {edu.department}
                </p>
                {edu.gpa && (
                  <p className="text-caption text-[var(--text-tertiary)] mt-0.5">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-caption text-[var(--text-tertiary)] whitespace-nowrap">
                  {edu.period}
                </span>
                <Badge variant={statusVariant(edu.status)}>
                  {edu.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CVSection>

      {/* ---- Experience ---- */}
      <CVSection title="Experience">
        {experience.map((exp, idx) => (
          <div key={idx} className="relative mb-8 last:mb-0">
            <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)]" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="text-body-md font-semibold text-[var(--text-primary)]">
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                    >
                      {exp.organization}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    exp.organization
                  )}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)]">
                  {exp.role}
                </p>
                <p className="text-body-sm text-[var(--text-tertiary)] mt-1">
                  {exp.description}
                </p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-caption text-[var(--text-secondary)] flex items-start gap-1.5"
                      >
                        <span className="text-[var(--accent)] mt-1 flex-shrink-0">
                          &bull;
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-caption text-[var(--text-tertiary)] whitespace-nowrap">
                  {exp.period}
                </span>
                <Badge variant={experienceTypeVariant(exp.type)}>
                  {exp.type}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CVSection>

      {/* ---- Skills ---- */}
      <CVSection title="Skills">
        <SkillsVisualization />
      </CVSection>

      {/* ---- Awards ---- */}
      <CVSection title="Awards">
        {awards.map((award, idx) => (
          <div key={idx} className="relative mb-6 last:mb-0">
            <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)]" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="text-body-md font-semibold text-[var(--text-primary)] inline-flex items-center gap-1.5">
                  <AwardIcon className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  {award.title}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)]">
                  {award.organization} &mdash;{" "}
                  <span className="font-medium text-[var(--accent)]">
                    {award.prize}
                  </span>
                </p>
                <div className="flex items-center gap-3 mt-1">
                  {award.url && (
                    <a
                      href={award.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1 transition-colors"
                    >
                      Details <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {award.videoUrl && (
                    <a
                      href={award.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-caption text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1 transition-colors"
                    >
                      Video <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
              <span className="text-caption text-[var(--text-tertiary)] whitespace-nowrap flex-shrink-0">
                {award.year}
              </span>
            </div>
          </div>
        ))}
      </CVSection>

      {/* ---- Patents ---- */}
      <CVSection title="Patents">
        {patents.map((patent, idx) => (
          <div key={idx} className="relative mb-6 last:mb-0">
            <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)]" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="text-body-md font-semibold text-[var(--text-primary)] inline-flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-[var(--text-tertiary)] flex-shrink-0" />
                  {patent.url ? (
                    <a
                      href={patent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                    >
                      {patent.title}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    patent.title
                  )}
                </h3>
              </div>
              <Badge
                variant={patent.status === "registered" ? "success" : "warning"}
              >
                {patent.status}
              </Badge>
            </div>
          </div>
        ))}
      </CVSection>

      {/* ---- Media ---- */}
      <CVSection title="Media Coverage">
        {media.map((item, idx) => (
          <div key={idx} className="relative mb-5 last:mb-0">
            <span className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-primary)]" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="text-body-sm font-semibold text-[var(--text-primary)] inline-flex items-center gap-1.5">
                  {item.type === "video" ? (
                    <Video className="h-4 w-4 text-red-500 flex-shrink-0" />
                  ) : (
                    <Newspaper className="h-4 w-4 text-[var(--text-tertiary)] flex-shrink-0" />
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                  >
                    {item.title}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </h3>
                <p className="text-caption text-[var(--text-tertiary)]">
                  {item.source}
                </p>
              </div>
              <span className="text-caption text-[var(--text-tertiary)] whitespace-nowrap flex-shrink-0">
                {item.year}
              </span>
            </div>
          </div>
        ))}
      </CVSection>
    </section>
  );
}
