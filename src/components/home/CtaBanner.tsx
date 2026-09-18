"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, Heart, Leaf, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8F5EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden border border-[#E1D8C5] shadow-lg flex flex-col lg:flex-row bg-[#174A3A]"
        >
          {/* Main Dark Green Section with Botanical Foil & Headline */}
          <div className="relative flex-grow p-8 sm:p-10 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Left Leaf Pattern Asset */}
            <div className="relative flex items-center gap-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 hidden sm:block border border-white/10 shadow-inner">
                <Image
                  src="/images/banner-leaves.png"
                  alt="AyuBazaar Botanical Leaves"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Block */}
              <div className="space-y-2">
                <p className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#D6A83F] uppercase">
                  Ready to Start Your Wellness Journey?
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                  Explore Our Products
                </h2>
                <p className="text-sm text-[#C8D6CA] font-normal">
                  Traditional care. Modern convenience.
                </p>
              </div>
            </div>

            {/* Middle Golden Action Button */}
            <div className="shrink-0">
              <Link
                href="#products"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D6A83F] text-[#174A3A] text-sm font-bold shadow-md hover:bg-[#E5BE5E] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <Eye className="w-4 h-4 text-[#174A3A]" />
                <span>View Our Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Ivory Pillar Checklist */}
          <div className="bg-[#FAF7F0] lg:w-72 p-8 lg:p-10 flex flex-col justify-center gap-4 border-t lg:border-t-0 lg:border-l border-[#E2D9C5]">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#EBF2EC] flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4 text-[#174A3A]" />
              </div>
              <span className="text-sm font-semibold text-[#252A26]">
                Natural Products
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF0E6] flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-[#A47128]" />
              </div>
              <span className="text-sm font-semibold text-[#252A26]">
                A Healthier You
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#EBF2EC] flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4 text-[#3B7A57]" />
              </div>
              <span className="text-sm font-semibold text-[#252A26]">
                A Better Tomorrow
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
