// components/Contact.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { 
  Phone, Mail, MapPin,  ArrowRight, Sparkles, 
  CheckCircle, Clock, Shield, MessageCircle as WhatsApp 
} from "lucide-react";
import { useRouter } from "next/navigation";

// ==========================================
// 🎨 INYECTAR ESTILOS PREMIUM
// ==========================================
const injectContactStyles = () => {
  if (typeof document === "undefined") return;
  const styleId = "coa-contact-styles";
  if (document.getElementById(styleId)) return;
  
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 25px rgba(251, 191, 36, 0.3); }
      50% { box-shadow: 0 0 50px rgba(251, 191, 36, 0.5); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .gradient-text {
      background: linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 4s ease infinite;
    }
    .glass-card {
      background: linear-gradient(135deg, rgba(26,26,26,0.95), rgba(45,45,45,0.95));
      backdrop-filter: blur(20px);
      border: 1px solid rgba(251, 191, 36, 0.1);
    }
    .glow-on-hover:hover {
      box-shadow: 0 0 40px rgba(251, 191, 36, 0.4);
    }
    .contact-card:hover {
      border-color: rgba(251, 191, 36, 0.4);
      transform: translateY(-4px);
    }
  `;
  document.head.appendChild(style);
};

// ==========================================
// 🧩 COMPONENTE: PARTÍCULAS (Hydration-Safe)
// ==========================================
function ContactParticles({ count = 20 }: { count?: number }) {
  const [isClient, setIsClient] = useState(false);
  const particles = useRef(
    [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: 4 + Math.random() * 3,
      delay: i * 0.25,
    }))
  ).current;

  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-yellow-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.8, 1.2, 0.8],
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

// ==========================================
// 🧩 COMPONENTE: CONTACT CARD REUTILIZABLE
// ==========================================
interface ContactCardProps {
  icon: React.ElementType;
  title: string;
  items: string[];
  hrefPrefix?: string;
  gradient: string;
  delay?: number;
}

function ContactCard({ icon: Icon, title, items, hrefPrefix, gradient, delay = 0 }: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card rounded-2xl p-6 contact-card transition-all duration-300 group"
    >
      {/* Icono con gradiente */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}>
        <Icon size={24} className="text-black" />
      </div>
      
      {/* Título */}
      <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
      
      {/* Items clickeables */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const href = hrefPrefix ? `${hrefPrefix}${item.replace(/[^0-9@.]/g, '')}` : undefined;
          const isEmail = item.includes('@');
          const isPhone = !isEmail && /^\d/.test(item);
          
          return (
            <motion.a
              key={index}
              href={href}
              target={isEmail || isPhone ? undefined : "_blank"}
              rel={isEmail || isPhone ? undefined : "noopener noreferrer"}
              whileHover={{ x: 4, color: "#fbbf24" }}
              className="block text-gray-400 text-sm hover:text-yellow-400 transition-colors cursor-pointer"
            >
              {item}
              {/* Arrow indicator on hover */}
              <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400">→</span>
            </motion.a>
          );
        })}
      </div>
      
      {/* Decorative glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

// ==========================================
// 🧩 COMPONENTE: TRUST BADGES
// ==========================================
function TrustBadges() {
  const badges = [
    { icon: Clock, text: "Respuesta en 24hs" },
    { icon: Shield, text: "Sin costo inicial" },
    { icon: CheckCircle, text: "Asesoramiento experto" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.text}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + index * 0.1 }}
          className="flex items-center gap-2 text-sm text-gray-400"
        >
          <badge.icon size={16} className="text-yellow-400" />
          {badge.text}
        </motion.div>
      ))}
    </div>
  );
}

// ==========================================
// 🧩 COMPONENTE: WHATSAPP FLOATING CTA
// ==========================================
function WhatsAppFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.a
      href="https://wa.me/5491133138900"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0, 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-green-900/40 transition-shadow group"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsApp size={22} className="group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline">Consultar</span>
      
      {/* Pulse animation */}
      <motion.span
        className="absolute inset-0 rounded-full bg-green-400/30"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.a>
  );
}

// ==========================================
// 🏠 COMPONENTE PRINCIPAL: CONTACT
// ==========================================
export default function Contact() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const sectionOpacity = useTransform(scrollY, [0, 200], [0.8, 1]);
  
  useEffect(() => { injectContactStyles(); }, []);

  // Datos de contacto reales de COA
  const contactData = {
    phones: ["11-3313-8900", "11-3324-9832", "11-6235-0978"],
    email: "cubas_beto@hotmail.com",
    location: "San Vicente, Bs As, Argentina",
    whatsapp: "5491133138900",
  };

  // Variants para animaciones
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <>
      <section id="contacto" className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
        
        {/* ✨ Background effects */}
        <motion.div style={{ opacity: sectionOpacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(251,191,36,0.08)_0%,_transparent_60%)]" />
          <ContactParticles count={25} />
        </motion.div>

        {/* ✨ Decorative gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* ==========================================
              HEADER SECTION
          ========================================== */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              Contacto
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
            >
              Transformemos tu <br className="hidden sm:block" />
              <span className="gradient-text italic">espacio</span> juntos
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Solicita una visita técnica sin costo. Te asesoramos en materiales, 
              diseño y presupuesto personalizado en menos de 24 horas.
            </motion.p>
            
            <TrustBadges />
          </motion.div>

          {/* ==========================================
              CONTACT CARDS GRID
          ========================================== */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {/* 📞 Teléfonos */}
            <ContactCard
              icon={Phone}
              title="Llámanos"
              items={contactData.phones}
              hrefPrefix="tel:"
              gradient="from-yellow-400 via-yellow-500 to-yellow-600"
              delay={0}
            />
            
            {/* ✉️ Email */}
            <ContactCard
              icon={Mail}
              title="Escríbenos"
              items={[contactData.email]}
              hrefPrefix="mailto:"
              gradient="from-amber-400 via-amber-500 to-amber-600"
              delay={0.15}
            />
            
            {/* 📍 Ubicación */}
            <ContactCard
              icon={MapPin}
              title="Visítanos"
              items={[contactData.location]}
              hrefPrefix="https://maps.google.com/?q="
              gradient="from-orange-400 via-orange-500 to-orange-600"
              delay={0.3}
            />
          </motion.div>

          {/* ==========================================
              PRIMARY CTA SECTION
          ========================================== */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            {/* WhatsApp CTA Principal */}
            <motion.a
              href={`https://wa.me/${contactData.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 60px rgba(22, 163, 74, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white font-bold rounded-full text-lg shadow-xl glow-on-hover transition-all group"
            >
              <WhatsApp size={22} className="group-hover:scale-110 transition-transform" />
              <span>💬 Escribinos por WhatsApp</span>
              <ArrowRight size={18} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </motion.a>
            
            {/* Secondary CTA */}
            <motion.div variants={itemVariants} className="mt-6">
              <button
                onClick={() => router.push("/services")}
                className="text-gray-400 hover:text-yellow-400 text-sm font-medium inline-flex items-center gap-2 transition-colors group"
              >
                Ver nuestros servicios
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* ==========================================
              OPTIONAL: QUICK FORM (Descomentar si se necesita)
          ========================================== */}
          {/*
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-white font-bold text-xl mb-6 text-center">O déjanos tus datos</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Tu nombre" className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none transition-colors" />
                <input type="tel" placeholder="Tu teléfono" className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none transition-colors" />
                <textarea placeholder="¿En qué podemos ayudarte?" rows={4} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-yellow-500/50 focus:outline-none transition-colors resize-none" />
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center justify-center gap-2">
                  Enviar consulta <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.div>
          */}

        </div>
      </section>

      {/* ✨ Floating WhatsApp Button */}
      <WhatsAppFloatingCTA />
    </>
  );
}