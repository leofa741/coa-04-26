"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-24 px-6 bg-dark-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-brand-500 uppercase tracking-widest text-sm font-medium">Contacto</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-3 mb-4">Transformemos tu <span className="text-brand-300 italic">espacio</span></h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Solicita una visita técnica sin costo. Te asesoramos en materiales, diseño y presupuesto.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 mb-12">
          {[{ icon: Phone, text: "+54 9 11 1234-5678" }, { icon: Mail, text: "info@coarevestimientos.com" }, { icon: MapPin, text: "Buenos Aires, Argentina" }].map((c, i) => (
            <div key={i} className="p-6 bg-dark-900 border border-white/5 rounded-xl hover:border-brand-500/30 transition-all">
              <c.icon className="w-6 h-6 text-brand-300 mx-auto mb-3" />
              <p className="text-white font-medium">{c.text}</p>
            </div>
          ))}
        </motion.div>

        <a href="https://wa.me/5491112345678" target="_blank" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-700 text-white rounded-full transition-all font-medium shadow-[0_0_30px_-5px_rgba(184,134,11,0.4)]">
          💬 Escribinos por WhatsApp
        </a>
      </div>
    </section>
  );
}