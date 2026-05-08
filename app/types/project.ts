// app/types/project.ts
export interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;              // Imagen principal (thumbnail)
  category: string;           // Requerido para filtro
  orientation?:  string; 

  // 👇 NUEVO: Galería de imágenes para el modal
  gallery?: string[];         // Array de URLs de imágenes adicionales

  // 👇 Opcionales
  link?: string;
  tags?: string[];
  details?: {
    location?: string;
    year?: string;
    surface?: string;
    materials?: string[];
  };
}