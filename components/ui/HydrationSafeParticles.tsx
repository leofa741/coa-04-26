// components/ui/HydrationSafeParticles.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

export interface ParticlesProps {
  /** Cantidad de partículas */
  count?: number;
  
  /** Color de las partículas (clase Tailwind) */
  color?: string;
  
  /** Tamaño base en píxeles */
  size?: number;
  
  /** Opacidad base */
  opacity?: number;
  
  /** Duración mínima/máxima de animación */
  durationRange?: [number, number];
  
  /** Clase CSS adicional para el contenedor */
  className?: string;
  
  /** Si las partículas deben animarse en Y */
  animateY?: boolean;
  
  /** Si las partículas deben animarse en escala */
  animateScale?: boolean;
}

export default function HydrationSafeParticles({
  count = 15,
  color = "bg-yellow-400/30",
  size = 2,
  opacity = 0.3,
  durationRange = [3, 5],
  className = "",
  animateY = true,
  animateScale = true,
}: ParticlesProps) {
  const [isClient, setIsClient] = useState(false);
  
  // ✅ Memoizar partículas para no regenerar en cada render
  const particles = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]),
      delay: i * 0.2,
      sizeVar: size + Math.random() * 2,
    }));
  }, [count, size, durationRange]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${color}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.sizeVar,
            height: p.sizeVar,
            opacity,
          }}
          initial={{ opacity: opacity * 0.5, scale: 0.8 }}
          animate={{
            ...(animateY && { y: [0, -30, 0] }),
            opacity: [opacity * 0.5, opacity, opacity * 0.5],
            ...(animateScale && { scale: [0.8, 1.3, 0.8] }),
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}