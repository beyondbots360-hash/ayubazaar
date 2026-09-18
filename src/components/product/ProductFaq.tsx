"use client";

import { useState } from "react";
import { FaqItem } from "@/data/products";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFaqProps {
  faqs: FaqItem[];
}

export default function ProductFaq({ faqs }: ProductFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-14 sm:py-18 bg-[#F8F5EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Ornamental Lines */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D6A83F]" />
            <h2 className="text-2xl sm:text-3xl font-serif text-[#174A3A] tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D6A83F]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] text-[#78857C] uppercase">
            Clear answers to your wellness queries
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E9E2D1] bg-[#FAF7F0] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#F3ECE0]/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-serif font-bold text-[#174A3A] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#EFE8D8] text-[#174A3A] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#174A3A] text-white" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-[#546056] leading-relaxed border-t border-[#EAE2D1]/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
