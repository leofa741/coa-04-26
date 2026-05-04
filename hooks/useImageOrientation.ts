// hooks/useImageOrientation.ts
"use client";

import { useState, useEffect } from "react";

export function useImageOrientation(src: string | undefined) {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical' | 'square' | 'loading'>('loading');

  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio > 1.1) setOrientation('horizontal');
      else if (ratio < 0.9) setOrientation('vertical');
      else setOrientation('square');
    };
    img.onerror = () => setOrientation('horizontal'); // fallback
    img.src = src;
    
    return () => { img.onload = null; img.onerror = null; };
  }, [src]);

  return orientation;
}