"use client";

import { Leaf, Award, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Leaf,
    title: "Pure & Natural",
    description: "Made from traditional herbal ingredients",
  },
  {
    icon: Award,
    title: "Rooted in Indian Tradition",
    description: "Inspired by centuries of Ayurveda",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Authentic",
    description: "Quality you can rely on",
  },
  {
    icon: Truck,
    title: "Easy Ordering",
    description: "Simple and secure payment process",
  },
];

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-16 sm:py-20 bg-[#F8F5EC] relative overflow-hidden">
      {/* Background Subtle Leaf Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 w-48 h-48 pointer-events-none opacity-30 mix-blend-multiply">
        <svg viewBox="0 0 160 160" className="w-full h-full fill-[#5C8A63]/25">
          <path d="M20,80 Q60,10 140,20 Q120,90 20,80 Z" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 w-48 h-48 pointer-events-none opacity-30 mix-blend-multiply">
        <svg viewBox="0 0 160 160" className="w-full h-full fill-[#5C8A63]/25">
          <path d="M140,80 Q100,10 20,20 Q40,90 140,80 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading with Ornamental Lines */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D6A83F]" />
            <h2 className="text-3xl sm:text-4xl font-serif text-[#174A3A] tracking-tight">
              Why Choose AyuBazaar
            </h2>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D6A83F]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#78857C] uppercase">
            More Than Products. A Healthier Tomorrow.
          </p>
        </div>

        {/* 4 Feature Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center flex flex-col items-center group"
              >
                {/* Circular Icon Container */}
                <div className="w-20 h-20 rounded-full bg-[#EBE4D5]/60 border border-[#DDD5C0] flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#E5DFCE] group-hover:border-[#D6A83F]/50 transition-all duration-300 shadow-xs">
                  <IconComponent className="w-8 h-8 text-[#174A3A] group-hover:text-[#D6A83F] transition-colors duration-300" />
                </div>

                {/* Feature Title */}
                <h3 className="text-lg font-serif font-bold text-[#174A3A] mb-2 tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#546056] leading-relaxed max-w-xs font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
