"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useTransform, Variants } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ Para navegación programática
import Logo from "./ui/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const router = useRouter(); // ✅ Router de Next.js App Router

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient, mouseX, mouseY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/services", label: "Servicios" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
  ];

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -40, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const linkVariants: Variants = {
    initial: { color: "#9ca3af" },
    hover: { color: "#fbbf24", transition: { type: "spring", stiffness: 400, damping: 12 } },
  };

  const ctaVariants: Variants = {
    initial: { boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", scale: 1 },
    hover: { boxShadow: "0 8px 40px rgba(251, 191, 36, 0.35), 0 0 0 2px rgba(251, 191, 36, 0.2)", scale: 1.03, transition: { duration: 0.25, type: "spring", stiffness: 300 } },
    tap: { scale: 0.98 }
  };

  const mobileMenuVariants: Variants = {
    closed: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08, delayChildren: 0.1 } }
  };

  const menuItemVariants: Variants = {
    closed: { x: -30, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const Particles = () => {
    const [particles, setParticles] = useState<any[]>([]);
    useEffect(() => {
      const generated = [...Array(12)].map((_, i) => ({
        id: i, size: Math.random() * 2 + 1, x: Math.random() * 100,
        duration: 8 + Math.random() * 6, delay: i * 0.5, opacity: Math.random() * 0.4 + 0.1,
      }));
      setParticles(generated);
    }, []);
    if (!isClient) return null;
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full bg-gradient-to-br from-yellow-300/40 to-yellow-600/20"
            style={{ width: p.size, height: p.size, left: `${p.x}%` }}
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: ["-10%", "110%", "-10%"], opacity: [0, p.opacity, p.opacity * 0.5, 0], scale: [0.8, 1.2, 0.9, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
        ))}
      </div>
    );
  };

  // ✅ Función de navegación unificada
  const handleNavigate = useCallback((href: string) => {
    setActiveLink(href);
    if (open) setOpen(false);
    router.push(href); // ✅ Navegación programática con Next.js
  }, [open, router]);

  const particleOffset = useTransform(scrollY, [0, 300], [0, -15]);

  return (
    <>
      <motion.header variants={navVariants} initial="hidden" animate="visible"
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "py-2.5 bg-black/85 backdrop-blur-2xl border-b border-yellow-500/20 shadow-2xl shadow-black/40" : "py-4 bg-gradient-to-b from-black/95 via-black/70 to-transparent"
          }`}>

        {isClient && (
          <motion.div className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ background: `radial-gradient(500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.06), transparent 70%)` }}
            animate={{ opacity: scrolled ? 0.5 : 1 }} transition={{ duration: 0.3 }} />
        )}

        <motion.div style={{ y: particleOffset }}><Particles /></motion.div>

        <AnimatePresence>{scrolled && (
          <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }} />
        )}</AnimatePresence>

        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between relative">

          <Logo
            size="md"
            variant="default"
            withText={true}
            href="/"
            className="hidden md:flex" // Opcional: mostrar solo en desktop
          />
          {/* Versión mobile más compacta */}
          <Logo
            size="sm"
            variant="minimal"
            withText={false} // Solo ícono en mobile
            href="/"
            className="md:hidden"
          />

          {/* DESKTOP NAVIGATION - ✅ CORREGIDO SIN legacyBehavior */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer bg-transparent hover:bg-transparent ${activeLink === link.href ? "text-yellow-400" : "text-gray-400"
                  }`}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" layoutId="activeIndicator" transition={{ type: "spring", stiffness: 500, damping: 35 }} />
                )}
                <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-yellow-400/60 via-yellow-300 to-yellow-400/60"
                  initial={{ scaleX: 0, originX: 0.5 }} whileHover={{ scaleX: 1, originX: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} />
              </motion.button>
            ))}

            {/* CTA - ✅ Navegación con router */}
            <motion.button
              onClick={() => handleNavigate("/contact")}
              variants={ctaVariants} initial="initial" whileHover="hover" whileTap="tap"
              className="ml-6 px-6 py-2.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black text-sm font-semibold rounded-full relative overflow-hidden group inline-flex items-center gap-2 cursor-pointer"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ skewX: "-15deg" }} />
              <motion.div className="absolute inset-0 rounded-full bg-yellow-400/30" animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
              <Sparkles size={14} className="relative z-10" />
              <span className="relative z-10">Solicitar presupuesto</span>
              <motion.div initial={{ width: 0, opacity: 0 }} whileHover={{ width: "auto", opacity: 1 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                <ArrowRight size={14} className="relative z-10 ml-0.5" />
              </motion.div>
            </motion.button>
          </div>

          {/* MOBILE BUTTON */}
          <motion.button className="md:hidden text-white p-2.5 rounded-xl hover:bg-white/10 transition-colors relative z-20"
            onClick={() => setOpen(!open)} whileTap={{ scale: 0.92 }} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0, scale: 0.8 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.8 }} transition={{ duration: 0.25, ease: "easeOut" }}><X size={22} /></motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0, scale: 0.8 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.8 }} transition={{ duration: 0.25, ease: "easeOut" }}><Menu size={22} /></motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* MOBILE MENU - ✅ CORREGIDO */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div className="fixed inset-0 bg-black/90 backdrop-blur-md z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setOpen(false)} />
              <motion.div variants={mobileMenuVariants} initial="closed" animate="open" exit="closed"
                className="md:hidden fixed top-[72px] left-4 right-4 bg-gradient-to-b from-gray-900/98 to-black/98 z-50 p-6 rounded-3xl border border-yellow-500/25 shadow-2xl shadow-yellow-900/30 flex flex-col gap-2">
                <div className="h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2" />
                {links.map((link) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavigate(link.href)}
                    variants={menuItemVariants}
                    whileTap={{ scale: 0.98, x: -4 }}
                    className={`py-4 px-4 text-lg font-medium rounded-2xl transition-all flex items-center justify-between group cursor-pointer text-left bg-transparent hover:bg-transparent ${activeLink === link.href ? "text-yellow-400 bg-yellow-500/10" : "text-gray-200 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={18} className={`transition-transform ${activeLink === link.href ? "text-yellow-400" : "text-gray-500 group-hover:text-yellow-400 group-hover:translate-x-1"}`} />
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handleNavigate("/contact")}
                  variants={menuItemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="mt-4 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-yellow-900/30 relative overflow-hidden group cursor-pointer"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ skewX: "-15deg" }} />
                  <Sparkles size={18} className="relative z-10" />
                  <span className="relative z-10">Solicitar presupuesto</span>
                  <ArrowRight size={16} className="relative z-10 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
      <div className="h-[72px]" />
    </>
  );
}