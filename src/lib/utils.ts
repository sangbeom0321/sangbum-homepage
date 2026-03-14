import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a human-readable format
 * Supports both "YYYY-MM" and "YYYY-MM-DD" formats
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  // Handle "YYYY-MM" format by appending day
  const normalizedDate =
    dateString.length === 7 ? `${dateString}-01` : dateString;
  const date = new Date(normalizedDate);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", options);
}

/**
 * Calculate reading time for a given text
 * Korean: ~500 characters per minute
 * English: ~200 words per minute
 */
export function calculateReadingTime(text: string): number {
  // Strip markdown/HTML
  const cleaned = text
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`[^`]*`/g, "") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1") // links -> text
    .replace(/<[^>]*>/g, "") // HTML tags
    .replace(/[#*_~>|-]/g, "") // markdown symbols
    .trim();

  // Detect Korean characters
  const koreanChars = (cleaned.match(/[\uAC00-\uD7AF]/g) || []).length;
  const nonKoreanText = cleaned.replace(/[\uAC00-\uD7AF]/g, "").trim();
  const englishWords = nonKoreanText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Korean: 500 chars/min, English: 200 words/min
  const koreanMinutes = koreanChars / 500;
  const englishMinutes = englishWords / 200;

  const totalMinutes = koreanMinutes + englishMinutes;
  return Math.max(1, Math.ceil(totalMinutes));
}

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_]+/g, "-") // spaces/underscores to hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Check if the current environment is the browser
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}
