"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useTransform, Variants } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight, ChevronRight, Phone, Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Logo from "./ui/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const router = useRouter();
  const pathname = usePathname();

  // Sync active link with current route
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Cerrar menú al cambiar de ruta o hacer scroll
  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
    closed: { opacity: 0 },
    open: { 
      opacity: 1, 
      transition: { 
        duration: 0.35, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.07,
        delayChildren: 0.15
      } 
    }
  };

  const menuItemVariants: Variants = {
    closed: { opacity: 0, x: -30 },
    open: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };

  const Particles = () => {
    const [particles, setParticles] = useState<any[]>([]);
    useEffect(() => {
      const generated = [...Array(12)].map((_, i) => ({
        id: i, 
        size: Math.random() * 2 + 1, 
        x: Math.random() * 100,
        duration: 8 + Math.random() * 6, 
        delay: i * 0.5, 
        opacity: Math.random() * 0.4 + 0.1,
      }));
      setParticles(generated);
    }, []);
    if (!isClient) return null;
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div 
            key={p.id} 
            className="absolute rounded-full bg-gradient-to-br from-yellow-300/40 to-yellow-600/20"
            style={{ width: p.size, height: p.size, left: `${p.x}%` }}
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ 
              y: ["-10%", "110%", "-10%"], 
              opacity: [0, p.opacity, p.opacity * 0.5, 0], 
              scale: [0.8, 1.2, 0.9, 1] 
            }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} 
          />
        ))}
      </div>
    );
  };

  const handleNavigate = useCallback((href: string) => {
    if (open) setOpen(false);
    router.push(href);
  }, [open, router]);

  const particleOffset = useTransform(scrollY, [0, 300], [0, -15]);

  return (
    <>
      <motion.header 
        variants={navVariants} 
        initial="hidden" 
        animate="visible"
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled 
            ? "py-2.5 bg-black/85 backdrop-blur-2xl border-b border-yellow-500/20 shadow-2xl shadow-black/40" 
            : "py-4 bg-gradient-to-b from-black/95 via-black/70 to-transparent"
        }`}
      >
        {/* Mouse follow glow */}
        {isClient && (
          <motion.div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ 
              background: `radial-gradient(500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 191, 36, 0.06), transparent 70%)` 
            }}
            animate={{ opacity: scrolled ? 0.5 : 1 }} 
            transition={{ duration: 0.3 }} 
          />
        )}

        {/* Floating particles */}
        <motion.div style={{ y: particleOffset }}>
          <Particles />
        </motion.div>

        {/* Scroll indicator line */}
        <AnimatePresence>
          {scrolled && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }} 
              animate={{ scaleX: 1, opacity: 1 }} 
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }} 
            />
          )}
        </AnimatePresence>

        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between relative">
          {/* Logo Desktop */}
          <Logo
            size="md"
            variant="default"
            withText={true}
            href="/"
            className="hidden md:flex"
          />
          
          {/* Logo Mobile */}
          <Logo
            size="sm"
            variant="minimal"
            withText={false}
            href="/"
            className="md:hidden"
          />

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleNavigate(link.href)}
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer bg-transparent hover:bg-transparent ${
                  pathname === link.href ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" 
                    layoutId="activeIndicator" 
                    transition={{ type: "spring", stiffness: 500, damping: 35 }} 
                  />
                )}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-yellow-400/60 via-yellow-300 to-yellow-400/60"
                  initial={{ scaleX: 0, originX: 0.5 }} 
                  whileHover={{ scaleX: 1, originX: 0 }} 
                  transition={{ duration: 0.3, ease: "easeOut" }} 
                />
              </motion.button>
            ))}

            {/* CTA Button */}
            <motion.button
              onClick={() => handleNavigate("/contact")}
              variants={ctaVariants} 
              initial="initial" 
              whileHover="hover" 
              whileTap="tap"
              className="ml-6 px-6 py-2.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black text-sm font-semibold rounded-full relative overflow-hidden group inline-flex items-center gap-2 cursor-pointer"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" 
                style={{ skewX: "-15deg" }} 
              />
              <motion.div 
                className="absolute inset-0 rounded-full bg-yellow-400/30" 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
              />
              <Sparkles size={14} className="relative z-10" />
              <span className="relative z-10">Solicitar presupuesto</span>
              <motion.div 
                initial={{ width: 0, opacity: 0 }} 
                whileHover={{ width: "auto", opacity: 1 }} 
                transition={{ duration: 0.2 }} 
                className="overflow-hidden"
              >
                <ArrowRight size={14} className="relative z-10 ml-0.5" />
              </motion.div>
            </motion.button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <motion.button 
            className="md:hidden text-white p-2.5 rounded-xl hover:bg-white/10 transition-colors relative z-20"
            onClick={() => setOpen(!open)} 
            whileTap={{ scale: 0.92 }} 
            aria-label={open ? "Cerrar menú" : "Abrir menú"} 
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div 
                  key="close" 
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }} 
                  animate={{ rotate: 0, opacity: 1, scale: 1 }} 
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }} 
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div 
                  key="menu" 
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }} 
                  animate={{ rotate: 0, opacity: 1, scale: 1 }} 
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }} 
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* 📱 MOBILE MENU - FULL SCREEN OVERLAY */}
        <AnimatePresence>
          {open && (
            <motion.div 
              className="md:hidden fixed inset-0 z-50 bg-dark-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header con Logo y Cerrar */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Logo 
                  size="md" 
                  variant="default" 
                  withText={true} 
                  href="/" 
                  onClick={() => setOpen(false)} 
                />
                <motion.button 
                  onClick={() => setOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-6 h-6 text-gray-300 hover:text-white" />
                </motion.button>
              </div>

              {/* Links de navegación */}
              <div className="px-6 py-8 flex flex-col gap-2">
                {links.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavigate(link.href)}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                    whileTap={{ scale: 0.98 }}
                    className={`py-5 px-4 text-2xl font-serif font-medium rounded-2xl 
                               flex items-center justify-between transition-all text-left
                               ${pathname === link.href 
                                 ? "text-white bg-yellow-500/20 border-l-4 border-yellow-400 pl-3" 
                                 : "text-gray-100 hover:text-white hover:bg-white/5"
                               }`}
                  >
                    <span>{link.label}</span>
                    {pathname === link.href && (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="w-2 h-2 rounded-full bg-yellow-400" 
                      />
                    )}
                  </motion.button>
                ))}

                {/* Separador decorativo */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                {/* CTA Principal */}
                <motion.button
                  onClick={() => handleNavigate("/contact")}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  custom={links.length}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
                             text-black font-semibold rounded-2xl flex items-center justify-center gap-3 
                             shadow-lg shadow-yellow-900/40"
                >
                  <Sparkles size={20} />
                  <span>Solicitar presupuesto</span>
                  <ArrowRight size={18} />
                </motion.button>

                {/* Info de contacto rápida */}
                <div className="mt-10 pt-6 border-t border-white/10">
                  <p className="text-gray-400 text-sm text-center mb-4">
                    ¿Tenés consultas?
                  </p>
                  <div className="flex flex-col gap-3">
                    <a 
                      href="tel:+541141461312" 
                      className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors py-2"
                      onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                    >
                      <Phone size={16} />
                      <span>11-4146-1312</span>
                    </a>
                    <a 
                      href="mailto:hola@tumarca.ar" 
                      className="flex items-center justify-center gap-2 text-gray-300 hover:text-white font-medium transition-colors py-2"
                      onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                    >
                      <Mail size={16} />
                      <span>hola@tumarca.ar</span>
                    </a>
                  </div>
                </div>

                {/* Redes sociales (opcional) */}
                <div className="mt-6 flex justify-center gap-4">
                  {["instagram", "whatsapp", "linkedin"].map((social) => (
                    <motion.a
                      key={social}
                      href={`https://${social}.com/tumarca`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Seguir en ${social}`}
                    >
                      <span className="text-xs text-gray-400 uppercase">{social[0]}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Partículas decorativas de fondo */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-yellow-400/20"
                    style={{ 
                      left: `${Math.random() * 100}%`,
                      top: `${20 + Math.random() * 60}%`
                    }}
                    animate={{ 
                      y: [0, -40, 0],
                      opacity: [0.15, 0.4, 0.15],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      duration: 4 + Math.random() * 3, 
                      repeat: Infinity, 
                      delay: i * 0.5,
                      ease: "easeInOut" 
                    }}
                  />
                ))}
              </div>

              {/* Decoración de esquina */}
              <div className="absolute top-20 right-6 w-20 h-20 border border-yellow-500/20 rounded-full" />
              <div className="absolute bottom-32 left-6 w-12 h-12 border border-yellow-500/10 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Spacer para evitar que el contenido quede debajo del navbar */}
      <div className="h-[72px]" />
    </>
  );
}