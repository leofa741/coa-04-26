"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, ArrowLeft, ArrowRight, ExternalLink,
    MapPin, Calendar, Ruler, Info
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
    const [imageLoaded, setImageLoaded] = useState(false);

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
            setImageLoaded(false);
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
        setImageLoaded(false);
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        onNext?.();
    };

    const handlePrev = () => {
        if (!images.length) return;
        setImageLoaded(false);
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
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black cursor-pointer"
                    />

                    {/* 🖼️ ÁREA DE IMAGEN - Tamaño consistente con "safe zone" para controles */}
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
                        {/* Contenedor con tamaño máximo garantizado */}
                        <div className={`
                            relative flex items-center justify-center
                            ${isZoomed 
                                ? 'w-[95vw] h-[95vh]'  // Zoom: casi fullscreen
                                : 'w-full h-full max-w-[90vw] max-h-[85vh]'  // Normal: deja espacio para controles
                            }
                        `}>
                            {/* Imagen con tamaño consistente */}
                            <motion.img
                                key={`${project.id}-${currentImageIndex}`}
                                src={images[currentImageIndex]}
                                alt={project.title}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: isZoomed ? 1.5 : 1,
                                    // Transición suave al cargar
                                    transition: { duration: imageLoaded ? 0.3 : 0.4 }
                                }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                onLoad={() => setImageLoaded(true)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleZoom();
                                }}
                                className={`
                                    w-full h-full 
                                    object-contain 
                                    select-none
                                    ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}
                                    ${!imageLoaded ? 'opacity-50' : 'opacity-100'}
                                `}
                                draggable={false}
                                style={{
                                    // Filtro suave mientras carga
                                    filter: !imageLoaded ? 'blur(8px)' : 'blur(0)',
                                    transition: 'filter 0.3s ease'
                                }}
                            />

                            {/* Loader mientras carga la imagen */}
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 🎛️ UI OVERLAY - Controles en "safe zone" externa */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: showDetails || isZoomed ? 0 : 1,
                            pointerEvents: showDetails || isZoomed ? "none" : "auto"
                        }}
                        className="fixed inset-0 z-[70] pointer-events-none"
                    >
                        {/* Header - Siempre visible en zona superior segura */}
                        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 
                                      bg-gradient-to-b from-black/90 to-transparent
                                      pointer-events-auto">
                            <div className="max-w-6xl mx-auto flex items-center justify-between"
                                 onClick={(e) => e.stopPropagation()}>
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

                        {/* Flechas de navegación - Posicionadas en zona lateral segura */}
                        {showNavigation && images.length > 1 && (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1, x: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 
                                             p-2 md:p-3 rounded-full bg-black/70 hover:bg-black/90 
                                             backdrop-blur-sm border border-white/10 transition-all
                                             pointer-events-auto z-[75]
                                             shadow-lg shadow-black/50"
                                    aria-label="Imagen anterior"
                                >
                                    <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.1, x: 2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 
                                             p-2 md:p-3 rounded-full bg-black/70 hover:bg-black/90 
                                             backdrop-blur-sm border border-white/10 transition-all
                                             pointer-events-auto z-[75]
                                             shadow-lg shadow-black/50"
                                    aria-label="Siguiente imagen"
                                >
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </motion.button>
                            </>
                        )}

                        {/* Indicadores de galería - Zona inferior segura */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 
                                          flex items-center gap-2 pointer-events-auto z-[75]
                                          px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full
                                          border border-white/10"
                                 onClick={(e) => e.stopPropagation()}>
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            index === currentImageIndex 
                                                ? "w-6 bg-brand-400" 
                                                : "w-1.5 bg-white/40 hover:bg-white/60"
                                        }`}
                                        aria-label={`Ir a imagen ${index + 1}`}
                                    />
                                ))}
                                <span className="ml-3 text-xs text-white/70 font-medium tabular-nums">
                                    {currentImageIndex + 1}<span className="text-white/40">/</span>{images.length}
                                </span>
                            </div>
                        )}
                    </motion.div>

                    {/* 📋 PANEL DE DETALLES - Slide-up con overlay propio */}
                    <AnimatePresence>
                        {showDetails && !isZoomed && (
                            <>
                                {/* Overlay oscuro para el panel */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[79] bg-black/60 backdrop-blur-sm"
                                    onClick={(e) => { e.stopPropagation(); setShowDetails(false); }}
                                />
                                
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="fixed bottom-0 left-0 right-0 z-[80] 
                                             bg-dark-900/98 backdrop-blur-xl border-t border-white/10
                                             max-h-[85vh] overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Handle para cerrar */}
                                    <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-dark-900/98 backdrop-blur-xl z-10">
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
                            </>
                        )}
                    </AnimatePresence>

                    {/* 🔍 ZOOM OVERLAY - Click aquí cierra */}
                    <AnimatePresence>
                        {isZoomed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[90] flex items-center justify-center 
                                         bg-black/95 backdrop-blur-sm"
                                onClick={onClose}
                            >
                                <div className="absolute top-4 right-4 flex items-center gap-2"
                                     onClick={(e) => e.stopPropagation()}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                                        aria-label="Salir de zoom"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </motion.button>
                                </div>
                                
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