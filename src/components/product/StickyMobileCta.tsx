"use client";

import Link from "next/link";
import { ProductDetail } from "@/data/products";
import { MessageCircle, ShoppingBag } from "lucide-react";

interface StickyMobileCtaProps {
  product: ProductDetail;
}

export default function StickyMobileCta({ product }: StickyMobileCtaProps) {
  const isOutOfStock = product.inStock === false;

  const whatsappOrderMessage = encodeURIComponent(
    `Hello AyuBazaar! I would like to order *${product.name}* at ${product.price}. Please confirm my order.`
  );
  const whatsappNotifyMessage = encodeURIComponent(
    `Hello AyuBazaar! Please notify me when *${product.name}* is back in stock.`
  );
  const whatsappUrl = `https://wa.me/918929515262?text=${isOutOfStock ? whatsappNotifyMessage : whatsappOrderMessage}`;

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
            {isOutOfStock && (
              <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#1E7E34] text-xs font-bold hover:bg-[#25D366]/25 transition-colors"
            aria-label={isOutOfStock ? "Notify on WhatsApp" : "Order on WhatsApp"}
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>{isOutOfStock ? "Notify Me" : "WhatsApp"}</span>
          </a>

          {isOutOfStock ? (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full bg-[#E5DFCE] text-[#78857C] text-xs font-bold cursor-not-allowed border border-[#DCD5C3]"
            >
              <span>Out of Stock</span>
            </button>
          ) : (
            <Link
              href={`/checkout?product=${product.slug}&qty=1`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#174A3A] text-white text-xs font-bold shadow-md hover:bg-[#10362A]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D6A83F]" />
              <span>Buy Now</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
