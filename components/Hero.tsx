"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,180,131,0.15),transparent_60%)]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif leading-tight text-white mb-6"
        >
          Revestimientos que <br />
          <span className="text-brand-300 italic">transforman espacios</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Soluciones integrales en instalación de pisos vinílicos, PVC y más. 
          Acabados premium, precisión milimétrica y diseño sin límites.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#servicios" className="px-8 py-3 bg-brand-500 hover:bg-brand-700 text-white rounded-full transition-all font-medium">
            Ver Catálogo
          </a>
          <a href="#contacto" className="px-8 py-3 border border-white/20 hover:border-brand-300 hover:text-brand-300 text-white rounded-full transition-all font-medium">
            Solicitar Cotización
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}