import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 👇 Colores personalizados
      colors: {
        // Variables CSS originales (para modo claro/oscuro dinámico)
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // 👇 Paleta DARK para fondos premium
        dark: {
          900: "#0a0a0f", // Fondo principal menú mobile / secciones oscuras
          800: "#121218", // Cards, hover states
          700: "#1a1a24", // Bordes, elementos secundarios
        },
        
        // 👇 Paleta BRAND (amarillo/dorado) para acentos
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",  // Hover, detalles sutiles
          400: "#fbbf24",  // ✅ Color principal de acento (botones, indicadores)
          500: "#f59e0b",  // Hover de botones, estados activos
          600: "#d97706",  // Active, pressed states
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        
        // 👇 Grays optimizados para modo oscuro
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",  // Texto secundario sobre oscuro
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      
      // 👇 Fuentes (manteniendo tus variables CSS)
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"], // Títulos, serif premium
        inter: ["var(--font-inter)", "sans-serif"],   // Cuerpo, sans legible
      },
      
      // 👇 Extras opcionales para animaciones premium
      boxShadow: {
        "brand-glow": "0 0 20px rgba(251, 191, 36, 0.3)",
        "brand-glow-lg": "0 0 40px rgba(251, 191, 36, 0.25)",
      },
      
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.22, 1, 0.36, 1)", // La misma que usás en framer-motion
      },
    },
  },
  plugins: [],
};
export default config;