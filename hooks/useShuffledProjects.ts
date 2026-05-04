// hooks/useShuffledProjects.ts
"use client";

import { useHydrationSafeRandom } from "./useHydrationSafeRandom";
import { Project } from "@/app/types/project";

export function useShuffledProjects(projects: Project[], shuffle: boolean = true) {
  const { isClient, values } = useHydrationSafeRandom({
    count: projects.length,
    generator: (i) => ({ originalIndex: i }),
    delay: shuffle ? 0 : 1, // Sin delay si no hay shuffle
  });

  if (!shuffle || !isClient) return projects;

  // Fisher-Yates shuffle usando los valores generados como seed
  const shuffled = [...projects];
  values.forEach((val, i) => {
    const j = (val.originalIndex + i) % shuffled.length;
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  });

  return shuffled;
}