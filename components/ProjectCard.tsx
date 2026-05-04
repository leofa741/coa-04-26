"use client";

import { motion, Variants } from "framer-motion";
import {  ExternalLink } from "lucide-react";
import { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
  onClick?: (project: Project) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.4 } },
};

export default function ProjectCard({
  project,
  index = 0,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover="hover"
      onClick={() => onClick?.(project)}
      className="group relative bg-dark-700 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-brand-500/30 transition-colors duration-300"
    >
      {/* Imagen con overlay */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          variants={imageVariants}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Badge de categoría */}
        {project.category && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium text-brand-900 bg-brand-300 rounded-full">
            {project.category}
          </span>
        )}

        {/* Icono de hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-3 rounded-full bg-brand-500/90 backdrop-blur-sm">
            <ExternalLink className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-lg font-serif text-white mb-2 group-hover:text-brand-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-gray-300 bg-white/5 rounded-md border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Efecto de borde brillante en hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-brand-500/20 transition-all duration-500 pointer-events-none" />
    </motion.article>
  );
}