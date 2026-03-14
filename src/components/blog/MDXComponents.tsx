"use client";

import { useState, useRef, type ComponentPropsWithoutRef } from "react";
import {
  ExternalLink,
  Copy,
  Check,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Heading components with anchor links
// ---------------------------------------------------------------------------

function HeadingLink({
  id,
  level,
  children,
  className,
}: {
  id?: string;
  level: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}) {
  const Tag = `h${level}` as const;
  const sizes = {
    1: "text-display-sm font-bold mt-12 mb-6",
    2: "text-heading-lg font-semibold mt-10 mb-4",
    3: "text-heading-md font-semibold mt-8 mb-3",
  };

  return (
    <Tag
      id={id}
      className={cn(sizes[level], "font-display group scroll-mt-24", className)}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-2 text-[var(--text-tertiary)] opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={`Link to ${typeof children === "string" ? children : "section"}`}
        >
          #
        </a>
      )}
    </Tag>
  );
}

function H1(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <HeadingLink id={props.id} level={1}>
      {props.children}
    </HeadingLink>
  );
}

function H2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <HeadingLink id={props.id} level={2}>
      {props.children}
    </HeadingLink>
  );
}

function H3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <HeadingLink id={props.id} level={3}>
      {props.children}
    </HeadingLink>
  );
}

// ---------------------------------------------------------------------------
// Link with external indicator
// ---------------------------------------------------------------------------

function Anchor({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isExternal =
    href && (href.startsWith("http://") || href.startsWith("https://"));

  return (
    <a
      href={href}
      className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
      {isExternal && <ExternalLink className="inline h-3.5 w-3.5 ml-0.5" />}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Pre / Code block with copy button and language label
// ---------------------------------------------------------------------------

function Pre({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // Extract the language from the className of the nested <code>
  const codeChild = Array.isArray(children)
    ? children[0]
    : children;
  const codeProps = (codeChild as React.ReactElement)?.props;
  const className = codeProps?.className || "";
  const languageMatch = className.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1] : "";

  const handleCopy = async () => {
    const text = preRef.current?.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className="relative group my-6">
      {/* Language label */}
      {language && (
        <div className="absolute top-0 left-4 -translate-y-1/2 rounded-md bg-[var(--accent)] px-2 py-0.5 text-caption text-white font-mono font-medium z-10">
          {language}
        </div>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-tertiary)] opacity-0 transition-all group-hover:opacity-100 hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      <pre
        ref={preRef}
        className={cn(
          "bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-4 pt-6 overflow-x-auto text-body-sm font-mono",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Image with lazy loading + caption
// ---------------------------------------------------------------------------

function Img(props: ComponentPropsWithoutRef<"img">) {
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        loading="lazy"
        className="rounded-xl w-full"
        alt={props.alt || ""}
      />
      {props.alt && (
        <figcaption className="mt-2 text-center text-caption text-[var(--text-tertiary)]">
          {props.alt}
        </figcaption>
      )}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Blockquote with styled left border
// ---------------------------------------------------------------------------

function Blockquote({
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="border-l-4 border-[var(--accent)] bg-[var(--accent-muted)] rounded-r-lg pl-4 pr-4 py-3 italic text-[var(--text-secondary)] my-6"
      {...props}
    >
      {children}
    </blockquote>
  );
}

// ---------------------------------------------------------------------------
// Table with responsive scroll wrapper
// ---------------------------------------------------------------------------

function Table({
  children,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  );
}

function Th(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="text-left p-3 border-b-2 border-[var(--border)] bg-[var(--bg-secondary)] font-semibold text-body-sm text-[var(--text-primary)]"
      {...props}
    />
  );
}

function Td(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className="p-3 border-b border-[var(--border)] text-body-sm text-[var(--text-secondary)]"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Custom components: Callout
// ---------------------------------------------------------------------------

type CalloutVariant = "tip" | "warning" | "info";

const calloutConfig: Record<
  CalloutVariant,
  { icon: typeof Info; bg: string; border: string; iconColor: string }
> = {
  tip: {
    icon: Lightbulb,
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    iconColor: "text-amber-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    iconColor: "text-blue-500",
  },
};

function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const config = calloutConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-xl border p-4",
        config.bg,
        config.border
      )}
    >
      <div className="flex gap-3">
        <Icon
          className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconColor)}
        />
        <div className="min-w-0">
          {title && (
            <p className="font-semibold text-body-sm text-[var(--text-primary)] mb-1">
              {title}
            </p>
          )}
          <div className="text-body-sm text-[var(--text-secondary)] [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom components: YouTube embed
// ---------------------------------------------------------------------------

function YouTube({ id }: { id: string }) {
  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-xl border border-[var(--border)]">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
        loading="lazy"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Export all components
// ---------------------------------------------------------------------------

const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  a: Anchor,
  pre: Pre,
  img: Img,
  blockquote: Blockquote,
  table: Table,
  th: Th,
  td: Td,
  Callout,
  YouTube,
};

export default MDXComponents;
