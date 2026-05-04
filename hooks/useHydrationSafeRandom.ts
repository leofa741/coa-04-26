// hooks/useHydrationSafeRandom.ts
"use client";

import { useState, useEffect } from "react";

export interface RandomValue {
  id: number;
  [key: string]: any; // Permite propiedades dinámicas
}

export interface UseHydrationSafeRandomOptions {
  count: number; // Cantidad de valores a generar
  generator: (i: number) => Record<string, any>; // Función para generar cada valor
  delay?: number; // Delay opcional antes de generar (ms)
}

export function useHydrationSafeRandom({
  count,
  generator,
  delay = 0,
}: UseHydrationSafeRandomOptions) {
  const [isClient, setIsClient] = useState(false);
  const [values, setValues] = useState<RandomValue[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
      const generated = [...Array(count)].map((_, i) => ({
        id: i,
        ...generator(i),
      }));
      setValues(generated);
    }, delay);

    return () => clearTimeout(timer);
  }, [count, generator, delay]);

  return { isClient, values };
  
}