"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // ✅ Estado para desktop
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // ✅ Todos los hooks al nivel superior del componente
  useEffect(() => {
    // Marcar como cliente
    setIsClient(true);
    
    // Detectar desktop (solo una vez al montar)
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    // Trackear posición del mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Detectar hover en elementos interactivos
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor='pointer'], [role='button']")) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    // Agregar listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    
    // Ocultar cursor nativo solo en desktop
    if (window.innerWidth >= 1024) {
      document.body.style.cursor = "none";
    }

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", checkDesktop);
      document.body.style.cursor = "auto";
    };
  }, [mouseX, mouseY]); // ✅ Dependencies correctas

  // ✅ No renderizar nada en SSR o en mobile
  if (!isClient || !isDesktop) return null;

  return (
    <>
      {/* Cursor principal - anillo dorado */}
      <motion.div
        className="fixed rounded-full border-2 border-yellow-400/50 pointer-events-none z-[100] mix-blend-difference"
        style={{ 
          x: mouseX, 
          y: mouseY,
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
        }}
        animate={{ 
          scale: isHoveringLink ? 1.8 : 1,
          borderColor: isHoveringLink ? "rgba(251, 191, 36, 0.9)" : "rgba(251, 191, 36, 0.5)"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.1 }}
      />
      
      {/* Punto central - se oculta al hover */}
      <motion.div
        className="fixed rounded-full bg-yellow-400 pointer-events-none z-[100]"
        style={{ 
          x: mouseX, 
          y: mouseY,
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
        }}
        animate={{ 
          scale: isHoveringLink ? 0 : 1,
          opacity: isHoveringLink ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}