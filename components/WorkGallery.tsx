"use client";

import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Project } from "@/app/types/project";
import ProjectCard from "./ProjectCard";
import CategoryFilter from "./CategoryFilter";
import ProjectModal from "./ProjectModal";

interface WorkGalleryProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  sectionId?: string;
  columns?: { mobile?: 1; tablet?: 2; desktop?: 3 | 4 };
  enableFilter?: boolean;
  enableModal?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function WorkGallery({
  projects,
  title = "Trabajos Realizados",
  subtitle = "Proyectos que destacan por calidad y diseño",
  sectionId = "trabajos",
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  enableFilter = true,
  enableModal = true,
}: WorkGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Extraer categorías únicas
  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))).filter(Boolean),
    [projects]
  );

  // Filtrar proyectos
  const filteredProjects = useMemo(() => {
    if (!activeCategory) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id={sectionId} className="py-24 px-6 bg-dark-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-brand-500 uppercase tracking-widest text-sm font-medium">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-3 text-white">{title}</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{subtitle}</p>
          <div className="w-16 h-px bg-brand-500 mx-auto mt-6" />
        </motion.div>

        {/* Filtro por categoría */}
        {enableFilter && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {/* Grid de proyectos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`grid gap-6 ${
            columns.mobile === 1 ? "grid-cols-1" : "grid-cols-2"
          } ${
            columns.tablet === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
          } ${
            columns.desktop === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={enableModal ? setSelectedProject : undefined}
            />
          ))}
        </motion.div>

        {/* Estado vacío */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No hay proyectos en esta categoría.</p>
            <button
              onClick={() => setActiveCategory(null)}
              className="mt-4 text-brand-300 hover:text-brand-400 text-sm font-medium"
            >
              Ver todos los proyectos
            </button>
          </div>
        )}
      </div>

      {/* Modal - 👇 Sin onNext/onPrev, la navegación es interna */}
      {enableModal && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          // ✅ Eliminamos onNext, onPrev y showNavigation
          // El modal decide internamente si mostrar flechas según images.length
        />
      )}
    </section>
  );
}