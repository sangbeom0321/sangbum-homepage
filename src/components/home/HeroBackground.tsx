"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Constants
   ────────────────────────────────────────────── */
const POINT_COUNT = 2000;
const ACCENT_BLUE = new THREE.Color("#93B5FF");
const PASTEL_PINK = new THREE.Color("#F9A8D4");
const PASTEL_PURPLE = new THREE.Color("#C4B5FD");

/* ──────────────────────────────────────────────
   Points Cloud Component (inside Canvas)
   ────────────────────────────────────────────── */
function PointCloud({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mousePos = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();
  const hasRendered = useRef(false);

  // Build geometry once
  const { positions, colors, originalPositions } = useMemo(() => {
    const pos = new Float32Array(POINT_COUNT * 3);
    const col = new Float32Array(POINT_COUNT * 3);
    const origPos = new Float32Array(POINT_COUNT * 3);

    for (let i = 0; i < POINT_COUNT; i++) {
      const i3 = i * 3;
      // Spread points in a wide field
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      origPos[i3] = x;
      origPos[i3 + 1] = y;
      origPos[i3 + 2] = z;

      // Color distribution: 50% pastel-blue, 25% pastel-pink, 25% pastel-purple
      const rand = Math.random();
      let color: THREE.Color;
      if (rand < 0.5) {
        color = ACCENT_BLUE;
      } else if (rand < 0.75) {
        color = PASTEL_PINK;
      } else {
        color = PASTEL_PURPLE;
      }

      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, colors: col, originalPositions: origPos };
  }, []);

  // Track mouse position (normalized -1 to 1)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / size.width) * 2 - 1;
      mousePos.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  useFrame((state, delta) => {
    // For reduced motion: render one frame then stop
    if (reducedMotion) {
      if (hasRendered.current) return;
      hasRendered.current = true;
    }

    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    // Mouse world-space approximate position
    const mx = mousePos.current.x * 10;
    const my = mousePos.current.y * 6;

    for (let i = 0; i < POINT_COUNT; i++) {
      const i3 = i * 3;

      // Gentle drift animation
      arr[i3] =
        originalPositions[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.15;
      arr[i3 + 1] =
        originalPositions[i3 + 1] +
        Math.cos(time * 0.2 + i * 0.015) * 0.1;
      arr[i3 + 2] =
        originalPositions[i3 + 2] + Math.sin(time * 0.15 + i * 0.02) * 0.08;

      // Mouse repulsion (subtle)
      const dx = arr[i3] - mx;
      const dy = arr[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (1 - dist / 3) * 0.8;
        arr[i3] += (dx / dist) * force * delta * 5;
        arr[i3 + 1] += (dy / dist) * force * delta * 5;
      }
    }

    posAttr.needsUpdate = true;

    // Slow global rotation
    pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={POINT_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={POINT_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────
   Static fallback for mobile / no WebGL
   ────────────────────────────────────────────── */
function StaticFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, var(--accent-muted) 0%, transparent 70%)",
        }}
      />
      {/* Static dots */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor:
              i % 5 === 0
                ? "var(--pastel-blue)"
                : i % 7 === 0
                  ? "var(--pastel-pink)"
                  : "var(--pastel-purple)",
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Export
   ────────────────────────────────────────────── */
export default function HeroBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check mobile
    setIsMobile(window.innerWidth < 768);

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebGLAvailable(false);
    } catch {
      setWebGLAvailable(false);
    }
  }, []);

  // Mobile or no WebGL: show static fallback
  if (isMobile || !webGLAvailable) {
    return <StaticFallback />;
  }

  return (
    <div className="absolute inset-0">
      <ErrorBoundary fallback={<StaticFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <PointCloud reducedMotion={reducedMotion} />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Error Boundary for WebGL failures
   ────────────────────────────────────────────── */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
