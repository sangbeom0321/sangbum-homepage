import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { frontmatter } = await getProjectBySlug(slug);
  return { title: frontmatter.title };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { content, frontmatter } = await getProjectBySlug(slug);

  return (
    <article className="section-container py-20">
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1.5 text-body-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      {/* Frontmatter header */}
      <header className="mb-10">
        <h1 className="mb-2 text-display-sm font-bold tracking-tight text-[var(--text-primary)] font-display">
          {frontmatter.title}
        </h1>
        {frontmatter.subtitle && (
          <p className="mb-3 text-body-lg text-[var(--text-secondary)]">
            {frontmatter.subtitle}
          </p>
        )}
        <p className="mb-4 text-body-sm text-[var(--text-tertiary)]">
          {frontmatter.period}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--accent-muted)] px-2.5 py-0.5 text-caption font-medium text-[var(--accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* MDX content */}
      <div className="prose-custom">{content}</div>
    </article>
  );
}
