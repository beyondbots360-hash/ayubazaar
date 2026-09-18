"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5EC] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle Background Botanical Leaves */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-40 mix-blend-multiply -translate-x-12 -translate-y-12">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-[#5C8A63]/20">
          <path d="M40,120 Q80,20 160,30 Q140,110 40,120 Z" />
          <path d="M45,115 Q95,65 155,35" stroke="#3A6340" strokeWidth="2" fill="none" opacity="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.25em] text-[#174A3A] uppercase">
                Pure. Natural. Indian.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.12]">
              <span className="text-[#174A3A] block font-normal">
                Traditional Wellness.
              </span>
              <span className="text-[#A47128] block font-normal mt-1">
                Everyday Care.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#4A544C] leading-relaxed max-w-lg font-normal">
              Carefully selected Ayurvedic and herbal products to support a
              healthier, happier you.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="#products"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#174A3A] text-white text-base font-semibold shadow-md hover:bg-[#10362A] hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4 text-[#D6A83F] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F0] border border-[#E2D9C5] shadow-xs text-xs font-medium text-[#2E3C32]">
                <Leaf className="w-3.5 h-3.5 text-[#3B7A57]" />
                <span>100% Natural</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F0] border border-[#E2D9C5] shadow-xs text-xs font-medium text-[#2E3C32]">
                <Sparkles className="w-3.5 h-3.5 text-[#D6A83F]" />
                <span>Trusted Ingredients</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F0] border border-[#E2D9C5] shadow-xs text-xs font-medium text-[#2E3C32]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B7A57]" />
                <span>Authentic & Safe</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            {/* Script Tag Calligraphy Accent */}
            <div className="absolute -top-6 sm:-top-8 right-4 sm:right-10 z-20 text-right pointer-events-none">
              <span className="font-serif italic text-xl sm:text-2xl text-[#174A3A] tracking-wide block drop-shadow-xs">
                Goodness
              </span>
              <span className="font-serif italic text-base sm:text-lg text-[#617466] -mt-1 block">
                of Ayurveda
              </span>
              <span className="font-serif italic text-base sm:text-lg text-[#A47128] -mt-1 block">
                in Every Home
              </span>
            </div>

            {/* Main Product Showcase Card */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-xl border border-[#EAE2D1] bg-white/70 backdrop-blur-xs group">
              <Image
                src="/images/hero/hero-products.png"
                alt="AyuBazaar Flagship Ayurvedic Collection - Yameny Khalta, Lava 31 Gold, Shivshakti Churna"
                fill
                priority
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              {/* Subtle ambient light gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#174A3A]/5 via-transparent to-[#D6A83F]/10 pointer-events-none" />
            </div>

            {/* Floating Botanical Leaf Accent */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 pointer-events-none z-20"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF7F0] shadow-md border border-[#E3DAC8] flex items-center justify-center">
                <Leaf className="w-6 h-6 text-[#3B7A57]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
