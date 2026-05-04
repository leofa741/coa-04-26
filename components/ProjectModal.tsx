"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ArrowLeft, ArrowRight, ExternalLink, MapPin, Calendar, Ruler } from "lucide-react";

import { Project } from "@/app/types/project";

/* -------------------------------------
   TYPES
------------------------------------- */

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    showNavigation?: boolean;
}

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

export default function ProjectModal({
    project,
    isOpen,
    onClose,
    onNext,
    onPrev,
    showNavigation = true,
}: ProjectModalProps) {
    // Cerrar con Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    const images = project?.gallery?.length ? project.gallery : [project?.image].filter(Boolean) as string[];

    return (
        <AnimatePresence>
            {isOpen && project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-dark-900/95 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`fixed z-50 flex flex-col bg-dark-800 rounded-3xl border border-white/10 overflow-hidden shadow-2xl ${project?.orientation === 'vertical'
                                ? 'inset-4 md:inset-y-8 md:left-1/2 md:-translate-x-1/2 md:w-[90vw] md:max-w-2xl' // 👈 Más angosto para vertical
                                : 'inset-4 md:inset-10' // 👈 Original para horizontal
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/5">
                            <div>
                                <span className="text-brand-500 text-xs font-medium uppercase tracking-wider">
                                    {project.category}
                                </span>
                                <h3 className="text-xl md:text-2xl font-serif text-white mt-1">{project.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full hover:bg-white/5 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-5 h-5 text-gray-400 hover:text-brand-300" />
                                    </a>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                                    aria-label="Cerrar"
                                >
                                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Contenido scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Galería de imágenes */}
                            <div className="relative aspect-video md:aspect-[21/9] bg-dark-900">
                                <motion.img
                                    key={images[0]}
                                    src={images[0]}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Navegación de galería */}
                                {showNavigation && images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-900/80 hover:bg-dark-900 border border-white/10 transition-colors"
                                            aria-label="Anterior"
                                        >
                                            <ArrowLeft className="w-5 h-5 text-white" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onNext?.(); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-900/80 hover:bg-dark-900 border border-white/10 transition-colors"
                                            aria-label="Siguiente"
                                        >
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </button>
                                    </>
                                )}

                                {/* Indicadores de imagen */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, i) => (
                                            <span
                                                key={i}
                                                className={`w-2 h-2 rounded-full transition-all ${i === 0 ? "bg-brand-500 w-4" : "bg-white/30"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Detalles */}
                            <div className="p-6 md:p-8 space-y-6">
                                <p className="text-gray-300 leading-relaxed">{project.description}</p>

                                {/* Tags */}
                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs text-brand-900 bg-brand-300/20 border border-brand-500/30 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Metadatos */}
                                {project.details && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                                        {project.details.location && (
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <MapPin className="w-4 h-4 text-brand-500" />
                                                <span>{project.details.location}</span>
                                            </div>
                                        )}
                                        {project.details.year && (
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Calendar className="w-4 h-4 text-brand-500" />
                                                <span>{project.details.year}</span>
                                            </div>
                                        )}
                                        {project.details.surface && (
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Ruler className="w-4 h-4 text-brand-500" />
                                                <span>{project.details.surface}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}