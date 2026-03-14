"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
});

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6"
      >
        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-display-xl sm:text-[5.5rem] md:text-[7rem] font-bold font-display tracking-tighter text-[var(--text-primary)]"
        >
          Sangbum Woo
        </motion.h1>

        {/* Korean Name */}
        <motion.p
          variants={fadeUp}
          className="mt-2 text-heading-lg sm:text-display-sm font-display text-[var(--text-tertiary)] tracking-wide"
        >
          우상범
        </motion.p>

        {/* Title */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-body-lg sm:text-heading-sm text-[var(--text-secondary)] font-medium"
        >
          Autonomous Driving Researcher &amp; Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="mt-4 text-heading-sm sm:text-heading-md gradient-text font-display font-semibold italic"
        >
          Dreaming of Cartopia
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-caption text-[var(--text-tertiary)] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            className="text-[var(--text-tertiary)]"
            size={24}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
