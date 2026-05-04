// types/project.ts
export interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
  tags?: string[];
  gallery?: string[];
  details?: {
    location?: string;
    year?: string;
    surface?: string;
    materials?: string[];
  };
  // 👇 NUEVO: orientación de la imagen principal
  orientation?: 'horizontal' | 'vertical' | 'square';
}