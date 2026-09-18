"use client";

import { Benefit } from "@/data/products";
import {
  Zap,
  ShieldCheck,
  Heart,
  Sparkles,
  Leaf,
  Flame,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP = {
  Zap,
  ShieldCheck,
  Heart,
  Sparkles,
  Leaf,
  Flame,
  Activity,
  CheckCircle2,
};

interface ProductBenefitsProps {
  benefits: Benefit[];
}

export default function ProductBenefits({ benefits }: ProductBenefitsProps) {
  return (
    <section className="py-14 sm:py-18 bg-[#FAF7F0] border-y border-[#E8E1CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Ornamental Lines */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D6A83F]" />
            <h2 className="text-2xl sm:text-3xl font-serif text-[#174A3A] tracking-tight">
              Key Ayurvedic Benefits
            </h2>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D6A83F]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] text-[#78857C] uppercase">
            Formulated for holistic mind & body balance
          </p>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = ICON_MAP[benefit.iconName] || Sparkles;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-[#F8F5EC] border border-[#E8E1CE] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8EFE9] border border-[#D5E2D7] flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6 text-[#174A3A]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#174A3A] mb-2 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#546056] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
