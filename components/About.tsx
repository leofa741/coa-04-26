"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import { 
  Award, Target, Heart, Users, Clock, Shield, CheckCircle, 
  ArrowRight, Sparkles, Quote, Star, MapPin, Phone, Mail 
} from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

// ==========================================
// 🎨 INYECTAR ESTILOS PREMIUM
// ==========================================
const injectAboutStyles = () => {
  if (typeof document === "undefined") return;
  const styleId = "coa-about-styles";
  if (document.getElementById(styleId)) return;
  
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 25px rgba(251, 191, 36, 0.3); }
      50% { box-shadow: 0 0 50px rgba(251, 191, 36, 0.5); }
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
    .timeline-line::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, transparent, #fbbf24, transparent);
      transform: translateX(-50%);
    }
    @media (max-width: 768px) {
      .timeline-line::before {
        left: 20px;
      }
    }
    .glow-on-hover:hover {
      box-shadow: 0 0 40px rgba(251, 191, 36, 0.4);
    }
  `;
  document.head.appendChild(style);
};

// ==========================================
// 🎭 VARIANTES DE ANIMACIÓN
// ==========================================
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 25 } },
};

// ==========================================
// 🧩 COMPONENTE: HERO SECTION
// ==========================================
function AboutHero() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.85]);
  const heroY = useTransform(scrollY, [0, 400], [0, 50]);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background con gradiente y partículas */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.08)_0%,_transparent_70%)]" />
        
        {/* Partículas decorativas */}
        <Particles count={25} color="bg-yellow-400/20" size={2} />
      </motion.div>

      {/* Contenido */}
      <motion.div style={{ y: heroY }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-6"
        >
          <Sparkles size={14} />
          Nuestra Historia
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
        >
          Transformando espacios con <br className="hidden sm:block" />
          <span className="gradient-text">pasión y excelencia</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Desde nuestros inicios, nos hemos dedicado a ofrecer soluciones integrales en revestimientos 
          que combinan calidad, innovación y un compromiso inquebrantable con la satisfacción del cliente.
        </motion.p>

        {/* Stats rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {[
            { value: "10+", label: "Años de experiencia" },
            { value: "340+", label: "Proyectos completados" },
            { value: "98%", label: "Clientes satisfechos" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-yellow-400/50 flex items-start justify-center p-2">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-yellow-400" animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 🧩 COMPONENTE: STORY / TIMELINE
// ==========================================
function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const milestones = [
    {
      year: "2014",
      title: "Nuestros Inicios",
      desc: "Comenzamos como un pequeño taller especializado en instalación de pisos de PVC, con la visión de ofrecer calidad premium a precios accesibles.",
      icon: Sparkles,
    },
    {
      year: "2017",
      title: "Expansión de Servicios",
      desc: "Incorporamos linóleo ecológico y pisos de goma profesional, respondiendo a la demanda de soluciones sostenibles y de alto rendimiento.",
      icon: Target,
    },
    {
      year: "2020",
      title: "Certificación de Calidad",
      desc: "Obtuvimos certificaciones internacionales que respaldan nuestros procesos de instalación y la calidad de nuestros materiales.",
      icon: Award,
    },
    {
      year: "2024",
      title: "Líderes en la Región",
      desc: "Hoy somos referencia en revestimientos premium en Buenos Aires, con un equipo de especialistas y más de 340 proyectos exitosos.",
      icon: Shield,
    },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-4">
            📅 Nuestra Trayectoria
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            De la <span className="gradient-text">idea</span> a la <span className="gradient-text">excelencia</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cada año ha sido un paso más hacia nuestra misión: transformar espacios con soluciones 
            que perduran en el tiempo y superan expectativas.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative timeline-line">
          <motion.div 
            className="space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {milestones.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} isEven={index % 2 === 0} isInView={isInView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, isEven, isInView }: { item: any; index: number; isEven: boolean; isInView: boolean }) {
  const Icon = item.icon;
  
  return (
    <motion.div 
      variants={fadeInUp}
      className={`relative flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'} md:flex-row`}
    >
      {/* Contenido */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
        <motion.div
          className="glass-card rounded-2xl p-6 sm:p-8 inline-block max-w-md"
          whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Icon size={20} className="text-black" />
            </div>
            <span className="text-yellow-400 font-bold text-lg">{item.year}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      </div>

      {/* Punto central */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-900/40"
          animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <Icon size={16} className="text-yellow-400" />
          </div>
        </motion.div>
      </div>

      {/* Espacio para el otro lado */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

// ==========================================
// 🧩 COMPONENTE: VALORES / MISIÓN
// ==========================================
function ValuesSection() {
  const values = [
    {
      icon: Target,
      title: "Nuestra Misión",
      desc: "Ofrecer soluciones en revestimientos que transformen espacios, combinando calidad premium, innovación técnica y un servicio personalizado que supere las expectativas de cada cliente.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "Nuestros Valores",
      desc: "Integridad, excelencia y compromiso son los pilares que guían cada decisión. Creemos en relaciones a largo plazo basadas en la confianza y resultados tangibles.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Nuestro Equipo",
      desc: "Profesionales certificados con años de experiencia, capacitados continuamente en las últimas técnicas de instalación y materiales del mercado.",
      color: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-4">
            💡 Lo que nos Define
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Más que una <span className="gradient-text">empresa</span>, un compromiso
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ValueCard({ value, index }: { value: any; index: number }) {
  const Icon = value.icon;
  
  return (
    <motion.div
      variants={scaleIn}
      className="glass-card rounded-2xl p-8 group hover:border-yellow-500/40 transition-all duration-300"
      whileHover={{ y: -8 }}
    >
      {/* Icono con gradiente */}
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
        <Icon size={28} className="text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
        {value.title}
      </h3>
      
      <p className="text-gray-400 leading-relaxed">
        {value.desc}
      </p>
      
      {/* Decorative corner */}
      <div className="absolute top-4 right-4 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${value.color} blur-2xl`} />
      </div>
    </motion.div>
  );
}

// ==========================================
// 🧩 COMPONENTE: GARANTÍAS / DIFERENCIALES
// ==========================================
function GuaranteesSection() {
  const guarantees = [
    { icon: Shield, title: "10 Años de Garantía", desc: "Respaldamos nuestra instalación con garantía escrita en todos nuestros servicios." },
    { icon: Clock, title: "Puntualidad Comprometida", desc: "Respetamos los tiempos acordados. Tu proyecto avanza según lo planificado." },
    { icon: Award, title: "Materiales Premium", desc: "Trabajamos exclusivamente con marcas certificadas y de reconocido prestigio." },
    { icon: CheckCircle, title: "Acabado Impecable", desc: "Cada detalle es revisado. Entregamos espacios listos para disfrutar." },
    { icon: Users, title: "Asesoramiento Personalizado", desc: "Te acompañamos desde la elección del material hasta la instalación final." },
    { icon: Phone, title: "Soporte Post-Venta", desc: "Estamos disponibles para resolver cualquier consulta después de la entrega." },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900/50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-4">
            ✅ Por qué Elegirnos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Garantías que <span className="gradient-text">tranquilizan</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cada uno de estos compromisos está respaldado por años de experiencia 
            y cientos de clientes satisfechos.
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {guarantees.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="glass-card rounded-2xl p-6 flex items-start gap-4 group hover:border-yellow-500/40 transition-colors"
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                <item.icon size={22} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 🧩 COMPONENTE: CTA FINAL
// ==========================================
function AboutCTA() {
  const router = useRouter();
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-black to-gray-900" />
      <Particles count={30} color="bg-yellow-400/30" size={1.5} className="opacity-50" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Sparkles size={48} className="text-yellow-400 mx-auto" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            ¿Listo para comenzar <br className="hidden sm:block" />
            tu próximo <span className="gradient-text">proyecto</span>?
          </h2>
          
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Agenda una consulta sin cargo. Evaluaremos tu espacio, te asesoraremos 
            sobre las mejores opciones y te entregaremos un presupuesto detallado en 24hs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 50px rgba(251, 191, 36, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-full text-lg flex items-center justify-center gap-3 shadow-xl glow-on-hover transition-all"
              onClick={() => router.push("/contact")}
            >
              Solicitar Presupuesto Gratis
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.a
              href="https://wa.me/5491133138900"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-lg border border-white/30 backdrop-blur-sm flex items-center justify-center gap-3 transition-all"
            >
              <Phone size={20} />
              Hablar por WhatsApp
            </motion.a>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-yellow-400" />
              Sin costo inicial
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-yellow-400" />
              Respuesta en 24hs
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              98% de satisfacción
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 🧩 COMPONENTE: PARTÍCULAS REUTILIZABLE (Hydration-Safe)
// ==========================================
function Particles({ count = 15, color = "bg-yellow-400/30", size = 2, className = "" }: { count?: number; color?: string; size?: number; className?: string }) {
  const [isClient, setIsClient] = useState(false);
  const particles = useRef(
    [...Array(count)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 3,
      delay: i * 0.2,
      sizeVar: size + Math.random() * 1.5,
    }))
  ).current;

  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${color}`}
          style={{ left: p.left, top: p.top, width: p.sizeVar, height: p.sizeVar }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ==========================================
// 🏠 COMPONENTE PRINCIPAL: ABOUT
// ==========================================
export default function About() {
  useEffect(() => { injectAboutStyles(); }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <GuaranteesSection />
      <AboutCTA />
    </div>
  );
}