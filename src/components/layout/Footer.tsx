import { Github, Linkedin, Mail, GraduationCap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const socialLinks = [
  {
    label: "GitHub",
    href: SITE_CONFIG.social.github,
    icon: Github,
  },
  {
    label: "Google Scholar",
    href: SITE_CONFIG.social.googleScholar,
    icon: GraduationCap,
  },
  {
    label: "LinkedIn",
    href: SITE_CONFIG.social.linkedin,
    icon: Linkedin,
  },
  {
    label: "Email",
    href: `mailto:${SITE_CONFIG.social.email}`,
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="section-container py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Copyright */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p className="text-body-sm text-[var(--text-secondary)]">
              &copy; 2026 Sangbum Woo
            </p>
            <p className="text-caption text-[var(--text-tertiary)]">
              Built with Next.js &middot; Deployed on GitHub Pages
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                aria-label={label}
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
