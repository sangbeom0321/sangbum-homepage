import { Github, Linkedin, Mail, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialData {
  github?: string;
  googleScholar?: string;
  linkedin?: string;
  email?: string;
}

interface SocialLinksProps {
  social: SocialData;
  className?: string;
  iconSize?: number;
}

export default function SocialLinks({
  social,
  className,
  iconSize = 20,
}: SocialLinksProps) {
  const links = [
    {
      label: "GitHub",
      href: social.github,
      icon: Github,
    },
    {
      label: "Google Scholar",
      href: social.googleScholar,
      icon: GraduationCap,
    },
    {
      label: "LinkedIn",
      href: social.linkedin,
      icon: Linkedin,
    },
    {
      label: "Email",
      href: social.email ? `mailto:${social.email}` : undefined,
      icon: Mail,
    },
  ].filter((link) => link.href);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={label === "Email" ? undefined : "_blank"}
          rel={label === "Email" ? undefined : "noopener noreferrer"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          aria-label={label}
        >
          <Icon style={{ width: iconSize, height: iconSize }} />
        </a>
      ))}
    </div>
  );
}
