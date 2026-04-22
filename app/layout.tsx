import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import { Analytics } from "@vercel/analytics/next"

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

export const metadata: Metadata = {
  title: "COA Revestimientos | Soluciones Premium en Pisos",
  description: "Instalación profesional de revestimientos vinílicos, PVC, linóleo y más. Acabados de lujo con garantía de excelencia en Buenos Aires.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
     <body className="min-h-screen flex flex-col bg-black text-gray-100 w-full">
        <Navbar />
      
        <CustomCursor />

        {/* ✅ Layout limpio: sin contenedores anidados */}
        <main className="flex-1 pt-[72px] w-full">
          {children}
        </main>
        <Analytics />

        

        <Footer />
      </body>
    </html>
  );
}