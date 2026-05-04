"use client";
import { motion, Variants } from "framer-motion";
import { HardHat, Layers, Grid3X3, Blocks, ArrowUpRight } from "lucide-react";
import WorkGallery from "@/components/WorkGallery";
import { Project } from "@/app/types/project";

const projects: Project[] = [
  {
    id: "pvc-001",
    title: "Lab. 9 de Julio",
    description: "Instalación de pisos de PVC y vinílicos en Lab. 9 de Julio",
    image: "/projects/1.jpeg",
    category: "Pisos Vinílicos",
    tags: ["Comercial", "9 de Julio", "Pisos Vinílicos"],
    orientation: "vertical", // 👈 Definido manualmente
    details: {
      location: "Belgrano, CABA",
      year: "2024",
      surface: "85 m²",
    },

  },
  {
    id: "goma-003",
    title: "Gimnasio Central",
    description: "Piso de goma antideslizante de alta densidad para zona de pesas.",
    image: "/projects/1.jpeg",
    category: "Goma",
    tags: ["Comercial", "Seguridad"],
    orientation: "vertical", // 👈 Definido manualmente
    details: {
      location: "Belgrano, CABA",
      year: "2024",
      surface: "85 m²",
    },

  },
  {
    id: "techo-001",
    title: "Techos",
    description: "Paneles acústicos y decorativos para techos.",
    image: "/projects/1.jpeg",
    category: "Techos",
    tags: ["Comercial", "Seguridad"],
    orientation: "vertical", // 👈 Definido manualmente
    details: {
      location: "Belgrano, CABA",
      year: "2024",
      surface: "85 m²",
    },
  },
  // ... más proyectos
];

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Services() {

  const handleProjectClick = (project: Project) => {
    // Abrir modal, redirigir, etc.
    console.log("Proyecto seleccionado:", project.title);
  };

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