// lib/projects.ts
import projectsData from '@/public/data/projects.json';
import { Project } from '../types/project';


// Tipar los datos importados
export const projects : Project[] = projectsData.projects;

// Función útil para filtrar
export function getProjectsByCategory(category: string | null): Project[] {
  if (!category) return projects;
  return projects.filter(p => p.category === category);
}

// Función para buscar un proyecto por ID
export function getProjectById(id: string | number): Project | undefined {
  return projects.find(p => p.id === id);
}