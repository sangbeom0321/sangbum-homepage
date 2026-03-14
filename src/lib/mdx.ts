import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  category: string;
  math?: boolean;
  toc?: boolean;
  draft?: boolean;
  summary: string;
  slug: string;
}

export interface PublicationFrontmatter {
  title: string;
  authors: { name: string; me?: boolean }[];
  venue: string;
  venueType: string;
  year: number;
  status: string;
  tags: string[];
  links: {
    paper: string;
    code: string;
    video: string;
    projectPage: string;
  };
  bibtex: string;
  featured?: boolean;
  slug: string;
}

export interface ProjectFrontmatter {
  title: string;
  subtitle?: string;
  period: string;
  tags: string[];
  links: {
    code: string;
    demo: string;
    paper: string;
    video: string;
  };
  thumbnail: string;
  featured?: boolean;
  order: number;
  slug: string;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const CONTENT_ROOT = path.join(process.cwd(), 'content');

const mdxOptions = {
  remarkPlugins: [remarkMath, remarkGfm],
  rehypePlugins: [
    rehypeKatex,
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' as const }],
    [rehypePrismPlus, { ignoreMissing: true }],
  ],
};

/**
 * Read all .mdx files in a directory and return their frontmatter + slug.
 */
function readDirectory<T>(dir: string): (T & { slug: string })[] {
  const fullPath = path.join(CONTENT_ROOT, dir);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith('.mdx'));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(fullPath, filename), 'utf-8');
    const { data } = matter(raw);
    return { ...(data as T), slug };
  });
}

/**
 * Read a single .mdx file, compile it via next-mdx-remote/rsc, and return
 * both the rendered React element and the parsed frontmatter.
 */
async function compilePost<T>(dir: string, slug: string) {
  const filePath = path.join(CONTENT_ROOT, dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');

  const { content, frontmatter } = await compileMDX<T>({
    source: raw,
    options: {
      parseFrontmatter: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mdxOptions: mdxOptions as any,
    },
  });

  return {
    content,
    frontmatter: { ...frontmatter, slug } as T & { slug: string },
  };
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

/**
 * Return all blog posts sorted by date (newest first).
 * Only frontmatter + slug is returned; MDX is NOT compiled.
 */
export function getAllPosts(): BlogFrontmatter[] {
  const posts = readDirectory<BlogFrontmatter>('blog');

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Read and compile a single blog post by slug.
 */
export async function getPostBySlug(slug: string) {
  return compilePost<BlogFrontmatter>('blog', slug);
}

// ---------------------------------------------------------------------------
// Publications
// ---------------------------------------------------------------------------

/**
 * Return all publications sorted by year (newest first).
 */
export function getAllPublications(): PublicationFrontmatter[] {
  const pubs = readDirectory<PublicationFrontmatter>('publications');

  return pubs.sort((a, b) => b.year - a.year);
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

/**
 * Return all projects sorted by order (ascending).
 */
export function getAllProjects(): ProjectFrontmatter[] {
  const projects = readDirectory<ProjectFrontmatter>('projects');

  return projects.sort((a, b) => a.order - b.order);
}

/**
 * Read and compile a single project by slug.
 */
export async function getProjectBySlug(slug: string) {
  return compilePost<ProjectFrontmatter>('projects', slug);
}
