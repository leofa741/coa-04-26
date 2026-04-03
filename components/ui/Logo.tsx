"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

export interface LogoProps {
    /** Tamaño del logo: sm, md, lg, xl */
    size?: "sm" | "md" | "lg" | "xl";

    /** Mostrar texto junto al ícono */
    withText?: boolean;

    /** Variante de estilo: default, minimal, glow */
    variant?: "default" | "minimal" | "glow";

    /** Navegar al hacer click (por defecto: true) */
    clickable?: boolean;

    /** Ruta de navegación (por defecto: "/") */
    href?: string;

    /** Callback personalizado al hacer click */
    onClick?: () => void;

    /** Clase CSS adicional para el contenedor */
    className?: string;
}

const sizeConfig = {
    sm: { icon: "w-8 h-8", text: "text-sm", gap: "gap-2" },
    md: { icon: "w-10 h-10", text: "text-base", gap: "gap-3" },
    lg: { icon: "w-12 h-12", text: "text-lg", gap: "gap-3" },
    xl: { icon: "w-16 h-16", text: "text-xl", gap: "gap-4" },
};

const variantConfig = {
    default: {
        gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
        shadow: "shadow-yellow-900/40",
        hoverShadow: "shadow-yellow-800/60",
        textAccent: "text-yellow-400/90",
    },
    minimal: {
        gradient: "from-yellow-300 to-yellow-500",
        shadow: "shadow-yellow-900/20",
        hoverShadow: "shadow-yellow-700/40",
        textAccent: "text-yellow-300",
    },
    glow: {
        gradient: "from-yellow-300 via-yellow-400 to-amber-500",
        shadow: "shadow-yellow-500/60",
        hoverShadow: "shadow-yellow-400/80",
        textAccent: "text-yellow-300",
    },
};

// ✨ Partículas flotantes para el logo
const LogoParticles = () => {
    const particles = [...Array(6)].map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: i * 0.3,
    }));

    return (
        <>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-yellow-200/60"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        y: [0, -15, 5, -8, 0],
                        opacity: [0, 0.8, 0.4, 0.6, 0],
                        scale: [0, 1.2, 0.8, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </>
    );
};

export default function Logo({
    size = "md",
    withText = true,
    variant = "default",
    clickable = true,
    href = "/",
    onClick,
    className = "",
}: LogoProps) {
    const router = useRouter();
    const sizes = sizeConfig[size];
    const variantStyles = variantConfig[variant];

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        } else if (clickable) {
            router.push(href);
        }
    }, [onClick, clickable, href, router]);

    // Variants para animaciones del contenedor
    const containerVariants: Variants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.04,
            transition: { type: "spring", stiffness: 400, damping: 12 }
        },
        tap: { scale: 0.98 },
    };

    // Variants para el ícono
    const iconVariants: Variants = {
        initial: { rotate: 0 },
        hover: {
            rotate: [0, 2, -2, 1, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
        },
    };

    // Variants para el texto
    const textVariants: Variants = {
        initial: { x: 0 },
        hover: { x: 2, transition: { duration: 0.2 } },
    };

    const LogoContent = (
        <>
            {/* ✨ Contenedor del ícono con efectos premium */}
            <div className={`relative ${sizes.icon} rounded-xl bg-gradient-to-br ${variantStyles.gradient} flex items-center justify-center shadow-lg ${variantStyles.shadow} group-hover:${variantStyles.hoverShadow} transition-shadow duration-300 overflow-hidden`}>

                {/* ✨ Brillo radial que sigue al hover */}
                <motion.div
                    className="absolute inset-0 rounded-xl bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                />

                {/* ✨ Partículas flotantes (solo en variant glow) */}
                {variant === "glow" && <LogoParticles />}

                {/* ✨ Letra "C" animada */}
                <motion.span
                    className="text-black font-black"
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                    style={{ fontSize: size === "xl" ? "1.5rem" : size === "lg" ? "1.25rem" : "1rem" }}
                >
                    <Image src="/logo-removebg.png" alt="Logo" width={50} height={50} />
                </motion.span>

                {/* ✨ Shine effect diagonal */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    style={{ skewX: "-20deg" }}
                />

                {/* ✨ Glow pulse para variant glow */}
                {variant === "glow" && (
                    <motion.div
                        className="absolute -inset-1 rounded-xl bg-yellow-400/20 blur"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}
            </div>

            {/* ✨ Texto opcional */}
            {withText && (
                <motion.div
                    className={`flex flex-col leading-tight ${sizes.gap}`}
                    variants={textVariants}
                    initial="initial"
                    whileHover="hover"
                >
                    {/* ✨ Texto COA con efecto metálico premium */}
                    <motion.span
                        className={`relative font-black ${sizes.text} tracking-tight overflow-hidden`}
                        variants={textVariants}
                        initial="initial"
                        whileHover="hover"
                    >
                        {/* Capa base */}
                        <span className="relative z-10 text-white">COA</span>

                        {/* Overlay metálico animado */}
                        <motion.span
                            className="absolute inset-0 z-20 bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-100"
                            style={{ backgroundSize: "200% 100%" }}
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            COA
                        </motion.span>

                        {/* Glow sutil */}
                        <span className="absolute inset-0 blur-md opacity-20 bg-gradient-to-r from-yellow-400/30 via-yellow-200/40 to-yellow-400/30 -z-10" />
                    </motion.span>
                    <span className={`${variantStyles.textAccent} text-xs font-medium -mt-3 ml-2`}>
                        Revestimientos
                    </span>

                </motion.div>
            )}
        </>
    );

    // Wrapper según si es clickable o no
    if (clickable) {
        return (
            <motion.button
                onClick={handleClick}
                variants={containerVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className={`flex items-center group cursor-pointer bg-transparent hover:bg-transparent p-0 border-none outline-none ${className}`}
                aria-label="Ir al inicio - COA Revestimientos"
            >
                {LogoContent}
            </motion.button>
        );
    }

    return (
        <div className={`flex items-center ${className}`}>
            {LogoContent}
        </div>
    );
}