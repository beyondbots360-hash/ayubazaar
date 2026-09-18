"use client";

import Link from "next/link";
import { ProductDetail } from "@/data/products";
import { MessageCircle, ShoppingBag } from "lucide-react";

interface StickyMobileCtaProps {
  product: ProductDetail;
}

export default function StickyMobileCta({ product }: StickyMobileCtaProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello AyuBazaar! I would like to order *${product.name}* at ${product.price}. Please confirm my order.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-t border-[#E5DFCE] px-4 py-3 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        {/* Price & Name */}
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#5C665F] truncate">
            {product.name}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-serif font-bold text-[#174A3A]">
              {product.price}
            </span>
            <span className="text-xs text-[#8A958D] line-through">
              {product.originalPrice}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#1E7E34] hover:bg-[#25D366]/25 transition-colors"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
          </a>

          <Link
            href={`/checkout?product=${product.slug}&qty=1`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#174A3A] text-white text-xs font-bold shadow-md hover:bg-[#10362A]"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D6A83F]" />
            <span>Buy Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
