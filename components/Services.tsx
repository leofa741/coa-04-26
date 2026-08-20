"use client";
import { motion, Variants } from "framer-motion";
import { HardHat, Layers, Grid3X3, Blocks, ArrowUpRight } from "lucide-react";
import { projects } from "@/app/lib/projects";
import WorkGallery from "@/components/WorkGallery";
import VerticalVideoCard from "./VerticalVideoCard";




const services = [
  { title: "Pisos de PVC", icon: Layers },
  { title: "Pisos de Linóleo", icon: Grid3X3 },
  { title: "Pisos de Goma en Baldosas", icon: Blocks },
  { title: "Pisos de Goma", icon: HardHat },
  { title: "Pisos de Listones", icon: ArrowUpRight },
  { title: "Pisos Flotantes", icon: Layers },
  { title: "Pisos Encastrables", icon: Grid3X3 },
  { title: "Pisos de Alfombra en Baldosas", icon: Blocks },
];


const videoShowcase = [
  {
    key: 1,
    src: "/lujan/1.mp4", // Ruta a tu video vertical
    poster: "/lujan/1.jpeg",        // Imagen de portada (opcional pero recomendada)
    title: "Piso & Paredes",
    description: "Acabado perfecto en área comercial de alto tráfico.",
  },
  {
    key: 2,
    src: "/lujan/2.mp4", // Ruta a tu video vertical
    poster: "/lujan/1.jpeg",        // Imagen de portada (opcional pero recomendada)
    title: "Piso & Paredes",
    description: "Acabado perfecto en área comercial de alto tráfico.",
  },
 
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Services() {


  return (
    <section id="servicios" className="py-24 px-6 bg-dark-800">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-brand-500 uppercase tracking-widest text-sm font-medium">Nuestros Servicios</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-3 text-white">Revestimientos de <span className="text-brand-300">alto standing</span></h2>
          <div className="w-16 h-px bg-brand-500 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className="group relative p-6 bg-dark-700 border border-white/5 rounded-2xl hover:border-brand-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(212,180,131,0.15)]"
              >
                <div className="w-12 h-12 rounded-full bg-brand-900/30 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors">
                  <Icon className="w-5 h-5 text-brand-300 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-serif text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Instalación profesional con acabados impecables y máxima durabilidad.</p>
              </motion.div>
            );
          })}
        </div>
      </div>

        {/* --- NUEVA SECCIÓN DE VIDEOS VERTICALES --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <span className="text-brand-500 uppercase tracking-widest text-sm font-medium">En Acción</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-3 text-white">Nuestros <span className="text-brand-300">Reels</span></h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Pasa el mouse sobre los videos para ver la magia de nuestra instalación en tiempo real.</p>
          <div className="w-16 h-px bg-brand-500 mx-auto mt-6" />
        </motion.div>

        {/* Grid para videos verticales (9:16) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {videoShowcase.map((video, i) => (
            <VerticalVideoCard
              key={video.key}
              src={video.src}
              poster={video.poster}
              title={video.title}
              description={video.description}
              index={i}
            />
          ))}
        </div>

      <WorkGallery
        projects={projects}
        title="Nuestros Trabajos"
        subtitle="Cada proyecto es una promesa cumplida con excelencia"
        enableFilter={true}
        enableModal={true}
        columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      />


    </section>
  );
}