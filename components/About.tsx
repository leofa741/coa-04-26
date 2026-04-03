"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="nosotros" className="py-24 px-6 bg-dark-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="relative aspect-[4/3] bg-dark-700 rounded-2xl overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-serif italic select-none">
              COA
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-brand-500 uppercase tracking-widest text-sm font-medium">Sobre Nosotros</span>
          <h2 className="text-4xl font-serif text-white mt-3 mb-6">Excelencia en cada <span className="text-brand-300">detalle</span></h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            En <strong className="text-white">COA Revestimientos</strong> ofrecemos soluciones integrales instalando revestimientos vinílicos y PVC con estándares premium. 
            Combinamos técnica precisa, materiales de primera línea y un acabado impecable que eleva cualquier espacio.
          </p>
          <ul className="space-y-3 text-gray-400">
            {["Asesoría personalizada", "Instalación certificada", "Garantía de acabado", "Materiales de alta gama"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}