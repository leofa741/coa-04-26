// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ArrowUp, ChevronRight, Sparkles, MessageCircle as WhatsApp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  
  // ✅ Generar partículas SOLO en cliente para evitar hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const generated = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: i * 0.2,
    }));
    setParticles(generated);
  }, []);
  
  const contactInfo = {
    location: "San Vicente, Bs As, Argentina",
    phones: ["11-3313-8900", "11-3324-9832", "11-6235-0978"],
    email: "cubas_beto@hotmail.com",
  };

  const quickLinks = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/services" },
    { label: "Nosotros", href: "/about" },
    { label: "Contacto", href: "/contact" },
  ];

 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900/95 to-black border-t border-yellow-500/20 overflow-hidden">
      
      {/* ✨ Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-900/10 to-transparent" />
      </div>

      {/* ✨ Partículas decorativas - SOLO se renderizan en cliente */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-0.5 h-0.5 rounded-full bg-yellow-400/30"
              style={{ left: p.left, top: p.top }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.3, 0.8],
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
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* ==========================================
            GRID PRINCIPAL
        ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* 🏷️ Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-900/40">
                <span className="text-black font-black text-base">
                   <Image src="/logo-removebg.png" alt="Logo" width={50} height={50} />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-base">COA</span>
                <span className="text-yellow-400/90 text-xs -mt-0.5">Revestimientos</span>
              </div>
            </motion.div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Soluciones integrales en revestimientos premium. 
              Calidad, precisión y garantía en cada proyecto.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: WhatsApp, href: "https://wa.me/5491133138900", label: "WhatsApp" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-500/50 transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 📍 Location & Contact */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-400" />
                Estamos En...
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* 🗺️ Ubicación */}
                <div className="space-y-4">
                  <motion.a
                    href="https://maps.google.com/?q=San+Vicente,Buenos+Aires,Argentina"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                      <MapPin size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm font-medium group-hover:text-yellow-400 transition-colors">
                        {contactInfo.location}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">Ver en Google Maps →</p>
                    </div>
                  </motion.a>
                </div>

                {/* 📞 Teléfonos */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={16} className="text-yellow-400" />
                    <span className="text-gray-300 text-sm font-medium">Llámanos</span>
                  </div>
                  {contactInfo.phones.map((phone) => (
                    <motion.a
                      key={phone}
                      href={`tel:${phone.replace(/-/g, '')}`}
                      whileHover={{ x: 4, color: "#fbbf24" }}
                      className="block text-gray-400 text-sm hover:text-yellow-400 transition-colors"
                    >
                      {phone}
                    </motion.a>
                  ))}
                </div>

                {/* ✉️ Email */}
                <div className="sm:col-span-2">
                  <motion.a
                    href={`mailto:${contactInfo.email}`}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                      <Mail size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm font-medium group-hover:text-yellow-400 transition-colors">
                        {contactInfo.email}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">Respondemos en menos de 24hs</p>
                    </div>
                  </motion.a>
                </div>

              </div>
            </motion.div>
          </div>

          {/* 🔗 Quick Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-white font-bold text-lg mb-6">Navegación</h3>
              
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                ))}
              </nav>

            
            </motion.div>
          </div>

        </div>

        {/* ==========================================
            BOTTOM BAR
        ========================================== */}
        <div className="relative mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © {currentYear} COA Revestimientos. Todos los derechos reservados.
            </p>

            {/* Scroll to Top + Made with */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-500 hover:text-yellow-400 text-sm transition-colors group"
                aria-label="Volver arriba"
              >
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                <span className="hidden sm:inline">Arriba</span>
              </motion.button>
              
              <span className="text-gray-600">•</span>
              
              <span className="text-gray-500 text-sm flex items-center gap-1">
                  <a href="https://tumarca.ar" target="_blank" rel="noopener noreferrer">
                  Hecho por <Sparkles size={12} className="text-yellow-400" /> Tumarca.ar 
                </a>
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* ✨ CTA Flotante para Mobile */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden z-40 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <motion.a
            href={`https://wa.me/5491133138900`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="pointer-events-auto flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-2xl shadow-2xl"
          >
            <WhatsApp size={20} />
            Consultar por WhatsApp
          </motion.a>
        </div>
      </div>

    </footer>
  );
}