"use client";

import { UsageStep } from "@/data/products";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

interface ProductUsageProps {
  usageSteps: UsageStep[];
}

export default function ProductUsage({ usageSteps }: ProductUsageProps) {
  return (
    <section className="py-14 sm:py-18 bg-[#FAF7F0] border-y border-[#E8E1CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Ornamental Lines */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D6A83F]" />
            <h2 className="text-2xl sm:text-3xl font-serif text-[#174A3A] tracking-tight">
              How to Consume & Use
            </h2>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D6A83F]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] text-[#78857C] uppercase">
            Traditional Ayurvedic method for maximum absorption
          </p>
        </div>

        {/* 3 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {usageSteps.map((stepItem, index) => (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#F8F5EC] border border-[#E8E1CE] shadow-xs"
            >
              <div>
                {/* Step Pill Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#174A3A] text-white flex items-center justify-center font-serif text-lg font-bold">
                    {stepItem.step}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A47128]">
                    Step 0{stepItem.step}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#174A3A] mb-2.5">
                  {stepItem.title}
                </h3>
                <p className="text-sm text-[#546056] leading-relaxed mb-6 font-normal">
                  {stepItem.instruction}
                </p>
              </div>

              {stepItem.tip && (
                <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E6DEC9] flex items-start gap-2.5 text-xs text-[#5C665F]">
                  <Info className="w-4 h-4 text-[#D6A83F] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#174A3A]">Ayur Tip:</strong> {stepItem.tip}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
