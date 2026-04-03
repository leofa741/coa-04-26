"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Sparkles, CheckCircle, Star, Phone, MessageCircle,
  ChevronLeft, ChevronRight, Play, Quote, Shield, Clock, Award, Users
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import Swal from "sweetalert2";

// ==========================================
// 🎨 ESTILOS PREMIUM (CSS-in-JS alternativo)
// ==========================================
const injectPremiumStyles = () => {
  if (typeof document === "undefined") return;

  const styleId = "coa-premium-styles";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.3); }
      50% { box-shadow: 0 0 60px rgba(251, 191, 36, 0.6); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .gradient-text {
      background: linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 4s ease infinite;
    }
    .glow-on-hover:hover {
      box-shadow: 0 0 40px rgba(251, 191, 36, 0.4);
    }
    .glass-card {
      background: linear-gradient(135deg, rgba(26,26,26,0.95), rgba(45,45,45,0.95));
      backdrop-filter: blur(20px);
      border: 1px solid rgba(251, 191, 36, 0.1);
    }
    .slider-dot-active {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
    }
    .premium-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .premium-scroll::-webkit-scrollbar-track {
      background: rgba(251, 191, 36, 0.1);
      border-radius: 3px;
    }
    .premium-scroll::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      border-radius: 3px;
    }
  `;
  document.head.appendChild(style);
};

// ==========================================
// 🖼️ DATOS DEL SLIDER PREMIUM
// ==========================================
const sliderImages = [
  {
    id: 1,
    url: "/1.jpeg",
    title: "Pisos de PVC Premium",
    subtitle: "Resistencia y elegancia para espacios comerciales",
    cta: "Ver colección",
    gradient: "from-yellow-600/90 via-black/80 to-black/90",
  },
  {
    id: 2,
    url: "/2.jpeg",
    title: "Linóleo Ecológico",
    subtitle: "Sostenibilidad sin comprometer el diseño",
    cta: "Conocer más",
    gradient: "from-amber-700/90 via-black/80 to-black/90",
  },
  {
    id: 3,
    url: "/3.jpeg",
    title: "Goma Profesional",
    subtitle: "Máxima durabilidad para alto tránsito",
    cta: "Solicitar muestra",
    gradient: "from-yellow-700/90 via-black/80 to-black/90",
  },
  {
    id: 4,
    url: "/4.jpeg",
    title: "Pisos Flotantes",
    subtitle: "Instalación rápida, acabado de lujo",
    cta: "Ver instalaciones",
    gradient: "from-amber-600/90 via-black/80 to-black/90",
  },
];

// ==========================================
// 🎭 VARIANTES DE ANIMACIÓN
// ==========================================
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  },
};

const slideInLeft: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

const slideInRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 }
  },
};

// ==========================================
// 🧩 COMPONENTE: SLIDER
// ==========================================
function PremiumSlider({ onPlayVideo }: { onPlayVideo?: () => void }) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  const sliderRef = useRef<HTMLDivElement>(null);

  // ✅ Marcar como cliente y generar partículas SOLO en cliente
  useEffect(() => {
    setIsClient(true);
    const generated = [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 4 + Math.random() * 3,
      delay: i * 0.2,
    }));
    setParticles(generated);
  }, []);

  // Auto-play con pausa al hover
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Slide variants con dirección dinámica
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <section
      ref={sliderRef}
      className="relative h-[85vh] min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ✨ Background particles - SOLO se renderizan en cliente */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 rounded-full bg-yellow-400/30"
              style={{ left: p.left, top: p.top }}
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
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
      )}

      {/* ✨ Slides - SIEMPRE se renderizan */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Imagen de fondo con overlay */}
          <div className="absolute inset-0">
            <img
              src={sliderImages[currentSlide].url}
              alt={sliderImages[currentSlide].title}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${sliderImages[currentSlide].gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          {/* Contenido del slide */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-2xl"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6"
                />

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                  {sliderImages[currentSlide].title}
                </h2>

                <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                  {sliderImages[currentSlide].subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(251, 191, 36, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-full flex items-center gap-2 shadow-lg glow-on-hover transition-all"
                    onClick={() => router.push("/services")}
                  >
                    {sliderImages[currentSlide].cta}
                    <ArrowRight size={18} />
                  </motion.button>

                  
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ✨ Controles del slider - SIEMPRE visibles */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        {/* Botones de navegación */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:border-yellow-400 transition-colors"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:border-yellow-400 transition-colors"
            aria-label="Siguiente slide"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Dots de navegación */}
        <div className="flex items-center gap-2">
          {sliderImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                  ? "slider-dot-active w-8"
                  : "bg-white/40 hover:bg-white/70"
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentSlide + 1) / sliderImages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* ✨ Badge flotante */}
      <motion.div
        className="absolute top-8 right-4 sm:right-8 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-yellow-500/30 flex items-center gap-2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={14} className="text-yellow-400" />
        <span className="text-sm text-gray-200">Nueva colección </span>
      </motion.div>
    </section>
  );
}
// ==========================================
// 🧩 COMPONENTE: STATS ANIMADOS
// ==========================================
function AnimatedStats() {
  const stats = [
    { label: "Proyectos", value: 342, suffix: "+", icon: Award },
    { label: "m² Instalados", value: 15847, suffix: "+", icon: CheckCircle },
    { label: "Clientes Felices", value: 289, suffix: "+", icon: Users },
    { label: "Años de Experiencia", value: 15, suffix: "+", icon: Shield },
  ];

  return (
    <section className="py-16 border-y border-yellow-500/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: any; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const Icon = stat.icon;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      className="glass-card rounded-2xl p-6 text-center group hover:border-yellow-500/30 transition-colors"
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 group-hover:from-yellow-500/30 group-hover:to-yellow-700/30 transition-colors">
          <Icon size={24} className="text-yellow-400" />
        </div>
      </div>
      <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-sm text-gray-400">{stat.label}</div>
    </motion.div>
  );
}

// ==========================================
// 🧩 COMPONENTE: SERVICIOS PREMIUM
// ==========================================
function ServicesSection() {
  const router = useRouter();
  const services = [
    {
      icon: "🧱",
      title: "Pisos de PVC",
      desc: "Resistentes, versátiles y de fácil mantenimiento. Ideales para espacios comerciales y residenciales de alto tránsito.",
      features: ["Hidrofóbico", "Fácil limpieza", "10+ años garantía"]
    },
    {
      icon: "🌀",
      title: "Linóleo Ecológico",
      desc: "Material 100% natural y biodegradable. Perfecto para ambientes que requieren higiene, confort y sostenibilidad.",
      features: ["Certificado ecológico", "Antibacteriano", "Bajo mantenimiento"]
    },
    {
      icon: "⬛",
      title: "Goma Profesional",
      desc: "Máxima absorción de impacto y resistencia. Solución ideal para gimnasios, playrooms y áreas deportivas.",
      features: ["Antideslizante", "Amortiguación", "Alta durabilidad"]
    },
    {
      icon: "🪵",
      title: "Pisos Flotantes",
      desc: "Estética premium con instalación rápida sin obras. Combinan belleza natural con tecnología de montaje inteligente.",
      features: ["Instalación en 24hs", "Sin pegamentos", "Acabado de lujo"]
    },
  ];

  return (
    <section id="servicios" className="py-24 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header de sección */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            ✨ Nuestros Servicios
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Soluciones <span className="gradient-text">Premium</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Cada proyecto es único. Ofrecemos asesoramiento personalizado, materiales de primera calidad
            y acabados que superan las expectativas más exigentes.
          </p>
        </motion.div>

        {/* Grid de servicios */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>

        {/* CTA secundario */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(251, 191, 36, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-full inline-flex items-center gap-3 shadow-lg glow-on-hover transition-all"
            onClick={() => router.push("/contact")}
          >
            Contactanos
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card rounded-2xl p-6 group hover:border-yellow-500/40 transition-all duration-300 cursor-pointer"
      whileHover={{ y: -8, boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6)" }}
    >
      {/* Icono flotante */}
      <motion.div
        className="text-4xl mb-5"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
      >
        {service.icon}
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
        {service.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {service.desc}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-5">
        {service.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
            <CheckCircle size={14} className="text-yellow-400 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Arrow hover */}
      <motion.div
        className="flex items-center gap-2 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        Saber más
        <ArrowRight size={14} />
      </motion.div>
    </motion.div>
  );
}

// ==========================================
// 🧩 COMPONENTE: TESTIMONIOS
// ==========================================
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Arq. Martín López",
      role: "Estudio de Arquitectura",
      text: "COA transformó nuestro proyecto con pisos de PVC que combinan diseño y funcionalidad. La instalación fue impecable y el acabado, de otro nivel. Totalmente recomendados.",
      rating: 5,
      avatar: "ML",
    },
    {
      name: "Laura Fernández",
      role: "Gerente de Facility",
      text: "Trabajamos con ellos en la renovación de nuestras oficinas. Los pisos de alfombra en baldosas fueron la solución perfecta: prácticos, elegantes y duraderos. Excelente servicio post-venta.",
      rating: 5,
      avatar: "LF",
    },
    {
      name: "Diego Ramírez",
      role: "Dueño de Gimnasio",
      text: "La goma profesional que instalaron en mi gimnasio superó todas las expectativas. Resistencia, estética y seguridad en un solo producto. Mis clientes lo notan.",
      rating: 5,
      avatar: "DR",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-4">
            💬 Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Lo que dicen <span className="gradient-text">nuestros clientes</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              className="glass-card rounded-2xl p-8 relative group hover:border-yellow-500/40 transition-colors"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-yellow-400/30 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 🧩 COMPONENTE: PROCESO / HOW IT WORKS
// ==========================================
function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "Consulta Gratuita",
      desc: "Agendamos una visita sin cargo para evaluar tu espacio y necesidades.",
      icon: Phone,
    },
    {
      step: "02",
      title: "Propuesta Personalizada",
      desc: "Te presentamos opciones de materiales, diseños y presupuestos detallados.",
      icon: CheckCircle,
    },
    {
      step: "03",
      title: "Instalación Profesional",
      desc: "Nuestro equipo certificado ejecuta el trabajo con precisión milimétrica.",
      icon: Clock,
    },
    {
      step: "04",
      title: "Garantía y Soporte",
      desc: "Disfruta de tu nuevo piso con 10 años de garantía y soporte post-venta.",
      icon: Shield,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium mb-4">
            🔄 Nuestro Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            De la idea a la <span className="gradient-text">realidad</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Línea conectora */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                className="relative text-center group"
              >
                {/* Número del paso */}
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-900/40 group-hover:shadow-yellow-800/60 transition-shadow"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  <item.icon size={28} className="text-black" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-yellow-400 flex items-center justify-center text-xs font-bold text-yellow-400">
                    {item.step}
                  </span>
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 🧩 COMPONENTE: FINAL CTA
// ==========================================
function FinalCTA() {
  const [particles, setParticles] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const generated = [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: i * 0.1,
    }));
    setParticles(generated);
  }, []);

  if (!isClient) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-yellow-400/40"
            style={{ left: p.left, top: p.top }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>
      {/* ... resto del CTA ... */}
    </section>
  );
}

// ==========================================
// 🏠 COMPONENTE PRINCIPAL: HOME
// ==========================================
export default function Home() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  // Inyectar estilos premium al montar
  useEffect(() => {
    injectPremiumStyles();

    // Welcome alert solo la primera vez
    const hasSeenWelcome = localStorage.getItem('coa_welcome_v2');
    if (!hasSeenWelcome) {
      showWelcomeAlert();
      localStorage.setItem('coa_welcome_v2', 'true');
    }
  }, []);

  const showWelcomeAlert = () => {
    Swal.fire({
      title: '<span class="gradient-text text-2xl">✨ Bienvenido a COA</span>',
      html: `
        <div class="text-center py-4">
          <div class="text-5xl mb-4">🏆</div>
          <p class="text-gray-200 mb-3">Soluciones integrales en revestimientos premium</p>
          <div class="text-sm text-gray-400 space-y-1">
            <p>✓ PVC • Linóleo • Goma • Flotantes</p>
            <p>✓ Instalación profesional certificada</p>
            <p>✓ 10 años de garantía escrita</p>
          </div>
        </div>
      `,
      background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
      color: '#fff',
      confirmButtonColor: '#fbbf24',
      confirmButtonText: 'Explorar',
      customClass: {
        popup: 'glass-card rounded-2xl border border-yellow-500/20',
        confirmButton: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold px-6 py-3 rounded-full',
      },
    });
  };

  const handleContact = () => router.push("/contacto");

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden">

      {/* Hero con Slider Premium */}
      <motion.div style={{ opacity: heroOpacity }}>
        <PremiumSlider onPlayVideo={() => setShowVideo(true)} />
      </motion.div>

      {/* Stats Animados */}
      <AnimatedStats />

      {/* Servicios */}
      <ServicesSection />

      {/* Proceso */}
      <ProcessSection />

      {/* Testimonios */}
      <TestimonialsSection />

      {/* CTA Final */}
      <FinalCTA />

      {/* CTA Flotante para Mobile */}
      <motion.div
        className="fixed bottom-6 left-4 right-4 sm:hidden z-40"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleContact}
          className="w-full py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-2xl shadow-2xl flex items-center justify-center gap-2 glow-on-hover"
        >
          <Phone size={18} />
          Presupuesto Gratis
        </motion.button>
      </motion.div>

      {/* Modal de Video (opcional) */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-yellow-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Placeholder para video - reemplazar con tu embed real */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Play size={48} className="mx-auto mb-4 text-yellow-400" />
                  <p>Video de presentación de COA Revestimientos</p>
                  <p className="text-sm mt-2">[Embed de YouTube/Vimeo aquí]</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}