"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, ArrowLeft, ArrowRight, ExternalLink,
    MapPin, Calendar, Ruler, Maximize2, Minimize2, Info
} from "lucide-react";
import { Project } from "@/app/types/project";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    showNavigation?: boolean;
}

export default function ProjectModal({
    project,
    isOpen,
    onClose,
    onNext,
    onPrev,
    showNavigation = true,
}: ProjectModalProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Cerrar con Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (isZoomed) setIsZoomed(false);
                else if (showDetails) setShowDetails(false);
                else onClose();
            }
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, isZoomed, showDetails, onClose]);

    // Resetear estados al cambiar de proyecto
    useEffect(() => {
        if (project) {
            setShowDetails(false);
            setIsZoomed(false);
            setCurrentImageIndex(0);
        }
    }, [project]);

    // Prevenir scroll del body
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const images = project?.gallery?.length
        ? project.gallery
        : [project?.image].filter(Boolean) as string[];

    const handleNext = () => {
        if (!images.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        onNext?.();
    };

    const handlePrev = () => {
        if (!images.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        onPrev?.();
    };

    const toggleZoom = () => {
        if (images.length <= 1) setIsZoomed((prev) => !prev);
    };

    return (
        <AnimatePresence>
            {isOpen && project && (
                <>
                    {/* 🔲 BACKDROP - Click aquí cierra el modal */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}  // ✅ Click en cualquier lado = cerrar
                        className="fixed inset-0 z-50 bg-black cursor-pointer"
                    />

                    {/* 🖼️ IMAGEN - Click aquí NO cierra (zoom o nada) */}
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 pointer-events-none">
                        <motion.img
                            key={`${project.id}-${currentImageIndex}`}
                            src={images[currentImageIndex]}
                            alt={project.title}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => {
                                e.stopPropagation(); // ✅ No cerrar al click en imagen
                                toggleZoom();
                            }}
                            className={`
                                max-w-full max-h-full 
                                ${isZoomed ? 'cursor-zoom-out pointer-events-auto' : 'cursor-zoom-in pointer-events-auto'}
                                object-contain select-none
                            `}
                            draggable={false}
                        />
                    </div>

                    {/* 🎛️ UI OVERLAY - Controles que NO cierran al hacer click */}
                    <motion.div
                        initial={{
                            opacity: showDetails || isZoomed ? 0 : 1,
                            pointerEvents: showDetails || isZoomed ? "none" : "auto"
                        }}
                        animate={{
                            opacity: showDetails || isZoomed ? 0 : 1,
                            pointerEvents: showDetails || isZoomed ? "none" : "auto"
                        }}
                        className="fixed inset-0 z-[70]"
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 
                                      bg-gradient-to-b from-black/80 to-transparent
                                      opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className="max-w-4xl mx-auto flex items-center justify-between"
                                 onClick={(e) => e.stopPropagation()}> {/* ✅ No cerrar */}
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 text-xs font-medium text-black bg-brand-400 rounded-full">
                                        {project.category}
                                    </span>
                                    <h3 className="text-lg md:text-xl font-serif text-white hidden sm:block">
                                        {project.title}
                                    </h3>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); setShowDetails(true); }}
                                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                                        aria-label="Ver detalles"
                                    >
                                        <Info className="w-5 h-5 text-white" />
                                    </motion.button>
                                    
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                                            aria-label="Abrir enlace"
                                        >
                                            <ExternalLink className="w-5 h-5 text-white" />
                                        </a>
                                    )}
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                                        aria-label="Cerrar"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Flechas de navegación */}
                        {showNavigation && images.length > 1 && (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1, x: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 
                                             p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/70 
                                             backdrop-blur-sm border border-white/10 transition-all
                                             opacity-0 hover:opacity-100 group"
                                    aria-label="Anterior"
                                >
                                    <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.1, x: 2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 
                                             p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/70 
                                             backdrop-blur-sm border border-white/10 transition-all
                                             opacity-0 hover:opacity-100 group"
                                    aria-label="Siguiente"
                                >
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </motion.button>
                            </>
                        )}

                        {/* Indicadores de galería */}
                        {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
                                 onClick={(e) => e.stopPropagation()}> {/* ✅ No cerrar */}
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            index === currentImageIndex 
                                                ? "w-8 bg-brand-400" 
                                                : "w-1.5 bg-white/30 hover:bg-white/50"
                                        }`}
                                        aria-label={`Ir a imagen ${index + 1}`}
                                    />
                                ))}
                                <span className="ml-3 text-xs text-white/60 font-medium">
                                    {currentImageIndex + 1} / {images.length}
                                </span>
                            </div>
                        )}
                    </motion.div>

                    {/* 📋 PANEL DE DETALLES - Click aquí NO cierra */}
                    <AnimatePresence>
                        {showDetails && !isZoomed && (
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="fixed bottom-0 left-0 right-0 z-[80] 
                                         bg-dark-900/98 backdrop-blur-xl border-t border-white/10
                                         max-h-[85vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()} // ✅ No cerrar al click en detalles
                            >
                                {/* Handle para cerrar detalles (no el modal) */}
                                <div className="flex justify-center pt-3 pb-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowDetails(false); }}
                                        className="w-12 h-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                                        aria-label="Ocultar detalles"
                                    />
                                </div>

                                <div className="px-6 pb-8 pt-2 max-w-4xl mx-auto">
                                    <div className="mb-6">
                                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-black bg-brand-400 rounded-full mb-3">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-serif text-white">
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-300 leading-relaxed text-lg mb-8">
                                        {project.description}
                                    </p>

                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tags.map((tag) => (
                                                <span key={tag}
                                                    className="px-4 py-2 text-sm text-brand-900 font-medium bg-brand-300/20 border border-brand-500/30 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {project.details && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                                            {project.details.location && (
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-brand-500/10">
                                                        <MapPin className="w-4 h-4 text-brand-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Ubicación</p>
                                                        <p className="text-gray-200 font-medium">{project.details.location}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {project.details.year && (
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-brand-500/10">
                                                        <Calendar className="w-4 h-4 text-brand-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Año</p>
                                                        <p className="text-gray-200 font-medium">{project.details.year}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {project.details.surface && (
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 rounded-lg bg-brand-500/10">
                                                        <Ruler className="w-4 h-4 text-brand-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Superficie</p>
                                                        <p className="text-gray-200 font-medium">{project.details.surface}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-brand-400 hover:bg-brand-500 text-black font-semibold rounded-full transition-colors group">
                                            <span>Ver proyecto completo</span>
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 🔍 ZOOM OVERLAY - Click aquí sale del zoom o cierra */}
                    <AnimatePresence>
                        {isZoomed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[90] flex items-center justify-center 
                                         bg-black/95 backdrop-blur-sm"
                                onClick={onClose} // ✅ Click en zoom = cerrar modal completo
                            >
                                <div className="absolute top-6 right-6 flex items-center gap-2"
                                     onClick={(e) => e.stopPropagation()}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                                        aria-label="Salir de zoom"
                                    >
                                        <Minimize2 className="w-5 h-5 text-white" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                                        aria-label="Cerrar"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </motion.button>
                                </div>
                                
                                <motion.img
                                    src={images[currentImageIndex]}
                                    alt={project.title}
                                    className="max-w-[95vw] max-h-[95vh] object-contain cursor-zoom-out"
                                    onClick={(e) => e.stopPropagation()}
                                    draggable={false}
                                />
                                
                                <p className="absolute bottom-6 text-white/50 text-sm pointer-events-none">
                                    Click para cerrar
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
}