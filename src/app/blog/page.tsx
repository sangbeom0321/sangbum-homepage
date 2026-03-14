import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/mdx";
import { calculateReadingTime } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogPostCard from "@/components/blog/BlogPostCard";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  // Read raw MDX for each post to calculate reading time
  const postsWithReadingTime = posts.map((post) => {
    const filePath = path.join(
      process.cwd(),
      "content",
      "blog",
      `${post.slug}.mdx`
    );
    let readingTime = 1;
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      readingTime = calculateReadingTime(raw);
    } catch {
      // fallback to 1 min
    }
    return { ...post, readingTime };
  });

  return (
    <section className="section-container py-16 sm:py-24">
      <SectionHeading
        title="Blog"
        subtitle="Thoughts on autonomous driving, deep learning, and engineering."
      />

      {postsWithReadingTime.length === 0 ? (
        <p className="text-body-md text-[var(--text-tertiary)] mt-8">
          No posts yet. Stay tuned!
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-5">
          {postsWithReadingTime.map((post) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              summary={post.summary}
              date={post.date}
              tags={post.tags}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      )}
    </section>
  );
}
