import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Calendar, Tag } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ReadingTime from "@/components/blog/ReadingTime";
import TableOfContents from "@/components/blog/TableOfContents";
import GiscusComments from "./GiscusComments";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { frontmatter } = await getPostBySlug(params.slug);
  return {
    title: frontmatter.title,
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { content, frontmatter } = await getPostBySlug(params.slug);

  // Read raw MDX for reading time
  const filePath = path.join(
    process.cwd(),
    "content",
    "blog",
    `${params.slug}.mdx`
  );
  let readingTime = 1;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    readingTime = calculateReadingTime(raw);
  } catch {
    // fallback
  }

  return (
    <section className="section-container py-16 sm:py-24">
      <div className="relative flex gap-12">
        {/* Main content */}
        <article className="min-w-0 flex-1 max-w-3xl">
          {/* Post header */}
          <header className="mb-10">
            <h1 className="text-display-sm sm:text-display-md font-bold font-display tracking-tight text-[var(--text-primary)]">
              {frontmatter.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-body-sm text-[var(--text-tertiary)]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(frontmatter.date)}
              </span>
              <span className="text-[var(--border)]">|</span>
              <ReadingTime minutes={readingTime} />
            </div>

            {/* Tags */}
            {frontmatter.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-[var(--text-tertiary)]" />
                {frontmatter.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}
          </header>

          {/* MDX content */}
          <div className="prose-custom">{content}</div>

          {/* Divider */}
          <hr className="my-12 border-[var(--border)]" />

          {/* Comments */}
          <GiscusComments />
        </article>

        {/* Sidebar: Table of Contents */}
        {frontmatter.toc !== false && (
          <aside className="hidden xl:block w-56 flex-shrink-0">
            <TableOfContents />
          </aside>
        )}
      </div>
    </section>
  );
}
