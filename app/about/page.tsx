import { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "Nosotros | COA Revestimientos - Historia y Valores",
  description: "Conoce la historia de COA Revestimientos, nuestro equipo de profesionales y los valores que nos guían para ofrecer soluciones premium en pisos y revestimientos.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-gray-100">
      <About />
    </main>
  );
}