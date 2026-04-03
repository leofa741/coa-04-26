"use client"
import Services from "@/components/Services"
import Swal from "sweetalert2"



export default function ServicesPage() {
    const services = [
        { icon: "🧱", title: "Revestimientos", desc: "Materiales de alta calidad para todo tipo de proyectos" },
        { icon: "🧱", title: "Revestimientos", desc: "Materiales de alta calidad para todo tipo de proyectos" },
        { icon: "🧱", title: "Revestimientos", desc: "Materiales de alta calidad para todo tipo de proyectos" },
        { icon: "🧱", title: "Revestimientos", desc: "Materiales de alta calidad para todo tipo de proyectos" },
        { icon: "🧱", title: "Revestimientos", desc: "Materiales de alta calidad para todo tipo de proyectos" },
        { icon: "🧱", title: "Revestimientos", desc: "Materiales de alta calidad para todo tipo de proyectos" },
        { icon: "🧱", title: "Revestimientos", desc: "Materiales de alta calidad para todo tipo de proyectos" },
        { icon: "🧱", title: "Revestimientos", desc: "Materiales de alta calidad para todo tipo de proyectos" },
    ]

    const testimonials = [
        { name: "Juan Pérez", text: "Excelente servicio, muy profesionales", role: "Cliente" },
        { name: "María González", text: "Muy buena calidad en los productos", role: "Cliente" },
        { name: "Carlos Rodríguez", text: "Excelente servicio, muy profesionales", role: "Cliente" },
        { name: "Ana Martínez", text: "Muy buena calidad en los productos", role: "Cliente" },
    ]


    const showQuoteAlert = () => {
        Swal.fire({
            title: "¿Listo para transformar tu espacio?",
            text: "Cotizá sin compromiso y descubrí por qué somos la elección de profesionales.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, quiero cotizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "¡Cotización enviada!",
                    "Pronto nos pondremos en contacto con vos.",
                    "success"
                )
            }
        })
    }


    return (
        <main className="min-h-screen bg-dark-900 pt-20">
            <Services />
        </main>
    )
}