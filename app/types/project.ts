// types/project.ts

// types/project.ts
export interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category: string; // Requerido para el filtro
  link?: string;
  tags?: string[];
  gallery?: string[]; // Imágenes adicionales para el modal
  details?: {
    location?: string;
    year?: string;
    surface?: string;
    materials?: string[];
  };
}