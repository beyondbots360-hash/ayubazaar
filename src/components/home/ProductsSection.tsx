"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D6A83F]" />
            <h2 className="text-3xl sm:text-4xl font-serif text-[#174A3A] tracking-tight">
              Our Products
            </h2>
            <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D6A83F]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#78857C] uppercase">
            Three Special Products for a Healthier You
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group bg-[#FAF7F0] rounded-3xl p-5 border border-[#E9E2D1] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden bg-white/90 border border-[#EBE4D5] mb-6 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="text-center px-2">
                  <h3 className="text-xl font-serif font-bold text-[#174A3A] tracking-tight mb-2.5">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#546056] leading-relaxed line-clamp-3 mb-6 font-normal">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 pb-2">
                <Link
                  href={`/products/${product.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-[#DCD5C3] text-[#174A3A] text-xs font-bold hover:bg-[#EFE8D8] transition-all duration-300"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A83F]" />
                </Link>

                <Link
                  href={`/checkout?product=${product.slug}&qty=1`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#174A3A] text-white text-xs font-bold shadow-xs hover:bg-[#10362A] hover:shadow-md transition-all duration-300 group/btn"
                >
                  <span>Buy Now • {product.price}</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
