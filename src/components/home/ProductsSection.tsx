"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { PRODUCTS, ProductDetail } from "@/data/products";
import { motion } from "framer-motion";

interface RawDbProduct {
  slug: string;
  price: number;
  original_price: number;
  description: string;
  in_stock: boolean;
}

export default function ProductsSection() {
  const [products, setProducts] = useState<ProductDetail[]>(PRODUCTS);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.products)) {
          setProducts((prev) =>
            prev.map((staticItem) => {
              const dbItem = data.products.find((p: RawDbProduct) => p.slug === staticItem.slug);
              if (dbItem) {
                const discount =
                  dbItem.original_price > dbItem.price
                    ? `Save ${Math.round(((dbItem.original_price - dbItem.price) / dbItem.original_price) * 100)}%`
                    : "";
                return {
                  ...staticItem,
                  price: `₹${Number(dbItem.price).toLocaleString("en-IN")}`,
                  originalPrice: `₹${Number(dbItem.original_price).toLocaleString("en-IN")}`,
                  discount,
                  description: dbItem.description || staticItem.description,
                  inStock: dbItem.in_stock !== undefined ? Boolean(dbItem.in_stock) : staticItem.inStock,
                };
              }
              return staticItem;
            })
          );
        }
      })
      .catch((err) => console.error("Failed to fetch live products:", err));
  }, []);

  return (
    <section id="products" className="py-16 sm:py-20 bg-[#F8F5EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D6A83F]" />
            <h2 className="text-3xl sm:text-4xl font-serif text-[#174A3A] tracking-tight">
              Our Formulations
            </h2>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D6A83F]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#78857C] uppercase">
            Three Pure Ayurvedic Systems for Vitality, Digestion & Metabolic Wellness
          </p>
        </div>

        {/* 3 Core Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => {
            const isYameny = product.slug === "yameny-khalta";
            const isOutOfStock = product.inStock === false;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={isOutOfStock ? {} : { y: -6 }}
                className={`group bg-[#FAF7F0] rounded-3xl p-6 sm:p-7 border border-[#E9E2D1] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isOutOfStock ? "border-amber-200/80" : ""
                }`}
              >
                {/* Out of Stock Badge */}
                {isOutOfStock && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold shadow-sm uppercase tracking-wider">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Special Combo Badge for Yameny Khalta */}
                {isYameny && !isOutOfStock && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#D6A83F] to-[#C2932E] text-[#11382C] text-[11px] font-bold shadow-sm uppercase tracking-wider">
                      <Gift className="w-3.5 h-3.5" />
                      <span>FREE Lava 31 Gold</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Image Container with Subtle Combo Display */}
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-white/95 border border-[#EBE4D5] mb-6 flex items-center justify-center p-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-contain p-1 transition-transform duration-500 ${
                        isOutOfStock ? "opacity-60 grayscale-[30%]" : "group-hover:scale-105"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center px-2">
                    <div className="mb-1 flex items-center justify-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#A47128]">
                        {product.category}
                      </span>
                      {isOutOfStock && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-[#174A3A] tracking-tight mb-2">
                      {product.name}
                    </h3>

                    {isYameny && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#2E3C32] font-semibold bg-[#FAF0E6] px-3 py-1 rounded-full border border-[#E8D7C2] mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[#D6A83F]" />
                        <span>Includes Full-Size Lava 31 Gold Oil (Worth ₹1,899) FREE</span>
                      </div>
                    )}

                    <p className="text-sm text-[#546056] leading-relaxed line-clamp-3 mb-6 font-normal">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-2 border-t border-[#EBE4D5]/80">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <div>
                      <span className="text-xs text-[#78857C] block font-medium">Segment Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-serif font-bold text-[#174A3A]">
                          {product.price}
                        </span>
                        <span className="text-xs text-[#8C988F] line-through">
                          {product.originalPrice}
                        </span>
                      </div>
                    </div>
                    {product.discount && !isOutOfStock && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF2EC] text-[#2E6B47] border border-[#D5E3D7]">
                        {product.discount}
                      </span>
                    )}
                    {isOutOfStock && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-300">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full sm:w-1/2 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-white border border-[#DCD5C3] text-[#174A3A] text-xs font-bold hover:bg-[#EFE8D8] transition-all duration-300"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D6A83F]" />
                    </Link>

                    {isOutOfStock ? (
                      <button
                        type="button"
                        disabled
                        className="w-full sm:w-1/2 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-[#E5DFCE] text-[#7A857D] text-xs font-bold cursor-not-allowed border border-[#DCD5C3]"
                      >
                        <span>Out of Stock</span>
                      </button>
                    ) : (
                      <Link
                        href={`/checkout?product=${product.slug}&qty=1`}
                        className="w-full sm:w-1/2 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-[#174A3A] text-white text-xs font-bold shadow-sm hover:bg-[#10362A] hover:shadow-md transition-all duration-300 group/btn"
                      >
                        <span>Buy Now • {product.price}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
