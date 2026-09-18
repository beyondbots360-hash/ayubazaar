"use client";

import { Ingredient } from "@/data/products";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface ProductIngredientsProps {
  ingredients: Ingredient[];
}

export default function ProductIngredients({ ingredients }: ProductIngredientsProps) {
  return (
    <section className="py-14 sm:py-18 bg-[#F8F5EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Ornamental Lines */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D6A83F]" />
            <h2 className="text-2xl sm:text-3xl font-serif text-[#174A3A] tracking-tight">
              Botanical Ingredients
            </h2>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D6A83F]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] text-[#78857C] uppercase">
            Hand-selected, standardized Ayurvedic herbs & minerals
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ingredients.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#E9E2D1] hover:border-[#D6A83F]/60 transition-all duration-300 flex items-start gap-4 shadow-xs"
            >
              <div className="w-10 h-10 rounded-full bg-[#EBF2EC] flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="w-5 h-5 text-[#3B7A57]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-serif font-bold text-[#174A3A]">
                  {item.name}
                </h3>
                <p className="text-xs font-serif italic text-[#A47128]">
                  {item.sanskritName}
                </p>
                <p className="text-xs text-[#546056] leading-relaxed pt-1">
                  {item.property}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
