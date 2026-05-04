"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {/* Botón "Todos" */}
      <motion.button
        onClick={() => onCategoryChange(null)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          activeCategory === null
            ? "bg-brand-500 text-brand-900"
            : "bg-dark-700 text-gray-300 hover:bg-dark-600 border border-white/5"
        }`}
      >
        Todos
      </motion.button>

      {/* Categorías dinámicas */}
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === cat
              ? "bg-brand-500 text-brand-900"
              : "bg-dark-700 text-gray-300 hover:bg-dark-600 border border-white/5"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}