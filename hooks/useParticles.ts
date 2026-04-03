// hooks/useParticles.ts
"use client";

import { useState, useEffect, useMemo } from "react";

export interface ParticleConfig {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  [key: string]: any;
}

export interface UseParticlesOptions {
  count: number;
  customGenerator?: (i: number) => Partial<ParticleConfig>;
}

export function useParticles({ count, customGenerator }: UseParticlesOptions) {
  const [isClient, setIsClient] = useState(false);

  const particles = useMemo(() => {
    return [...Array(count)].map((_, i) => {
      const base = {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 3,
        delay: i * 0.2,
      };
      return { ...base, ...customGenerator?.(i) };
    });
  }, [count, customGenerator]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { isClient, particles };
}