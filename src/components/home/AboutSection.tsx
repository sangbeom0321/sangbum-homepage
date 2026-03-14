"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, GraduationCap, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { profile as profileType } from "../../../content/data/profile";

type ProfileData = typeof profileType;

interface AboutSectionProps {
  profile: ProfileData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function AboutSection({ profile }: AboutSectionProps) {
  const socialLinks = [
    {
      label: "GitHub",
      href: profile.social.github,
      icon: Github,
    },
    {
      label: "Google Scholar",
      href: profile.social.scholar,
      icon: GraduationCap,
    },
    {
      label: "LinkedIn",
      href: profile.social.linkedin,
      icon: Linkedin,
    },
    {
      label: "Email",
      href: `mailto:${profile.social.email}`,
      icon: Mail,
    },
  ].filter((link) => link.href);

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading title="About" subtitle="Who I am and what I do" />

        {/* Profile row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row gap-10 md:gap-14 items-start"
        >
          {/* Left: Profile image */}
          <motion.div variants={fadeUp} className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden border-2 border-[var(--accent)] shadow-[var(--shadow-lg)]">
              <Image
                src={profile.profileImage}
                alt={profile.name.en}
                fill
                className="object-cover"
                sizes="200px"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Info */}
          <div className="flex-1 min-w-0">
            {/* Name & Title */}
            <motion.div variants={fadeUp}>
              <h3 className="text-heading-lg font-bold font-display text-[var(--text-primary)]">
                {profile.name.en}
                <span className="ml-3 text-body-lg text-[var(--text-tertiary)] font-normal">
                  {profile.name.ko}
                </span>
              </h3>
              <p className="mt-1 text-body-md text-[var(--accent)] font-medium">
                {profile.title}
              </p>
            </motion.div>

            {/* Affiliation */}
            <motion.div variants={fadeUp} className="mt-4">
              <a
                href={profile.affiliation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-body-md text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                {profile.affiliation.lab}, {profile.affiliation.university}
                <ExternalLink size={14} className="opacity-50" />
              </a>
              <p className="text-body-sm text-[var(--text-tertiary)]">
                {profile.affiliation.department}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.div variants={fadeUp} className="mt-6">
              <p className="text-body-md text-[var(--text-secondary)] leading-relaxed">
                {profile.bio.short}
              </p>
              <p className="mt-3 text-body-sm text-[var(--text-tertiary)] leading-relaxed whitespace-pre-line">
                {profile.bio.long}
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noopener noreferrer"}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-tertiary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Research Interests */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mt-16"
        >
          <motion.h3
            variants={fadeUp}
            className="text-heading-sm font-semibold font-display text-[var(--text-primary)] mb-6"
          >
            Research Interests
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.researchInterests.map((interest, index) => (
              <motion.div
                key={interest}
                variants={fadeUp}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-lg)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-muted)] text-[var(--accent)] text-body-sm font-bold font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body-md font-medium text-[var(--text-primary)]">
                    {interest}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
