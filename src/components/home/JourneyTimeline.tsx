"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { JourneyStep } from "../../../content/data/journey";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

interface JourneyTimelineProps {
  journey: JourneyStep[];
}

/* ──────────────────────────────────────────────
   Road SVG path generation
   ────────────────────────────────────────────── */
function generateRoadPath(
  stepCount: number,
  isMobile: boolean
): string {
  if (isMobile) {
    // Vertical straight line for mobile
    const totalHeight = stepCount * 280 + 200;
    return `M 24 0 L 24 ${totalHeight}`;
  }

  // Desktop: winding bezier road
  const segments: string[] = [];
  const amplitude = 140; // how far the road sways left-right
  const segmentHeight = 300;
  const startX = 400;

  segments.push(`M ${startX} 0`);

  for (let i = 0; i < stepCount; i++) {
    const direction = i % 2 === 0 ? 1 : -1;
    const y1 = i * segmentHeight + segmentHeight * 0.33;
    const y2 = i * segmentHeight + segmentHeight * 0.66;
    const yEnd = (i + 1) * segmentHeight;
    const cx = startX + amplitude * direction;

    segments.push(
      `C ${cx} ${y1}, ${cx} ${y2}, ${startX} ${yEnd}`
    );
  }

  // Extend road toward "horizon"
  const lastY = stepCount * segmentHeight;
  segments.push(`L ${startX} ${lastY + 200}`);

  return segments.join(" ");
}

/* ──────────────────────────────────────────────
   Car SVG Icon
   ────────────────────────────────────────────── */
function CarIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Car body */}
      <path
        d="M5 17h14v-5l-2-4H7L5 12v5z"
        fill="var(--accent)"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Windshield */}
      <path
        d="M8 8l-1.5 4h11L16 8H8z"
        fill="var(--bg-primary)"
        opacity="0.6"
      />
      {/* Wheels */}
      <circle cx="7.5" cy="17" r="1.5" fill="var(--text-primary)" />
      <circle cx="16.5" cy="17" r="1.5" fill="var(--text-primary)" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Milestone Card
   ────────────────────────────────────────────── */
function MilestoneCard({
  step,
  isLast,
}: {
  step: JourneyStep;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-md)] transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-lg)]"
    >
      {/* Year badge */}
      <span className="inline-block rounded-full bg-[var(--accent-muted)] px-3 py-1 text-caption font-bold text-[var(--accent)] font-mono mb-3">
        {step.year}
      </span>

      <h4 className="text-heading-sm font-bold font-display text-[var(--text-primary)]">
        {step.title}
      </h4>

      <p className="mt-2 text-body-sm text-[var(--text-secondary)] leading-relaxed">
        {step.description}
      </p>

      {/* Insight quote */}
      <blockquote className="mt-4 border-l-2 border-[var(--accent)] pl-3 text-body-sm italic text-[var(--text-tertiary)]">
        {step.insight}
      </blockquote>

      {/* Tags */}
      {step.tags && step.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-2.5 py-0.5 text-caption text-[var(--text-tertiary)] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Last step: Cartopia horizon */}
      {isLast && (
        <p className="mt-5 text-body-md font-semibold gradient-text font-display">
          Cartopia&#xB97C; &#xD5A5;&#xD574;
        </p>
      )}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main JourneyTimeline Component
   ────────────────────────────────────────────── */
export function JourneyTimeline({ journey }: JourneyTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP scroll animation
  useEffect(() => {
    if (!roadRef.current || !sectionRef.current) return;

    const road = roadRef.current;
    const pathLength = road.getTotalLength();

    // Set up road stroke-dasharray/offset
    gsap.set(road, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      // Road draw animation
      gsap.to(road, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // Car movement along path
      if (carRef.current) {
        const motionPath = {
          path: road,
          align: road,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        };

        gsap.to(carRef.current, {
          motionPath,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, journey.length]);

  const roadPath = generateRoadPath(journey.length, isMobile);
  const totalHeight = isMobile
    ? journey.length * 280 + 200
    : journey.length * 300 + 200;
  const svgWidth = isMobile ? 48 : 800;

  return (
    <section id="journey" className="py-24 sm:py-32 overflow-hidden">
      <div className="section-container">
        <SectionHeading
          title="Journey"
          subtitle="The road that brought me here"
        />
      </div>

      <div
        ref={sectionRef}
        className="relative section-container"
        style={{ minHeight: totalHeight }}
      >
        {/* SVG Road */}
        <svg
          className={`absolute ${isMobile ? "left-4 sm:left-8" : "left-1/2 -translate-x-1/2"} top-0`}
          width={svgWidth}
          height={totalHeight}
          viewBox={`0 0 ${svgWidth} ${totalHeight}`}
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Road shadow */}
          <path
            d={roadPath}
            stroke="var(--border)"
            strokeWidth={isMobile ? 4 : 6}
            fill="none"
            strokeLinecap="round"
            opacity={0.4}
          />
          {/* Animated road */}
          <path
            ref={roadRef}
            d={roadPath}
            stroke="var(--accent)"
            strokeWidth={isMobile ? 3 : 4}
            fill="none"
            strokeLinecap="round"
          />
          {/* Road dashes */}
          <path
            d={roadPath}
            stroke="var(--bg-primary)"
            strokeWidth={1}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="8 16"
            opacity={0.5}
          />
        </svg>

        {/* Car icon following the path */}
        {!isMobile && (
          <div
            ref={carRef}
            className="absolute z-20"
            style={{ top: 0, left: 0 }}
          >
            <CarIcon />
          </div>
        )}

        {/* Milestone cards */}
        <div className="relative z-10">
          {journey.map((step, index) => {
            const isLast = index === journey.length - 1;

            if (isMobile) {
              // Mobile: single column, left-aligned
              return (
                <div
                  key={step.year}
                  className="ml-14 sm:ml-16 mb-8"
                  style={{ paddingTop: index === 0 ? 20 : 0 }}
                >
                  <MilestoneCard
                    step={step}

                    isLast={isLast}
                  />
                </div>
              );
            }

            // Desktop: alternate left/right
            const isLeft = index % 2 === 0;
            const topOffset = index * 300 + 40;

            return (
              <div
                key={step.year}
                className="absolute w-[calc(50%-60px)]"
                style={{
                  top: topOffset,
                  ...(isLeft ? { left: 0 } : { right: 0 }),
                }}
              >
                <MilestoneCard
                  step={step}
                  isLast={isLast}
                />
              </div>
            );
          })}
        </div>

        {/* Horizon text at the end (desktop) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-8"
          >
            <p className="text-heading-md font-bold gradient-text font-display">
              Cartopia&#xB97C; &#xD5A5;&#xD574;
            </p>
            <p className="text-body-sm text-[var(--text-tertiary)] mt-2">
              The road continues...
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
