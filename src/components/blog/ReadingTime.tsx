import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadingTimeProps {
  minutes: number;
  className?: string;
}

export default function ReadingTime({ minutes, className }: ReadingTimeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-caption text-[var(--text-tertiary)]",
        className
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      <span>{minutes} min read</span>
    </span>
  );
}
