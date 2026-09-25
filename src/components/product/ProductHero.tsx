"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductDetail } from "@/data/products";
import ProductGallery from "./ProductGallery";
import {
  Star,
  ShoppingBag,
  MessageCircle,
  Share2,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface ProductHeroProps {
  product: ProductDetail;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const shareUrl = window.location.href;
    const shareData = {
      title: `${product.name} | AyuBazaar`,
      text: product.shortDescription,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // WhatsApp prefilled message
  const whatsappMessage = encodeURIComponent(
    `Hello AyuBazaar! I would like to order *${product.name}* (Quantity: ${quantity}) at ${product.price}. Please assist with my delivery address and payment.`
  );
  const whatsappUrl = `https://wa.me/918929515262?text=${whatsappMessage}`;

  return (
    <section className="py-8 sm:py-12 bg-[#F8F5EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery
              image={product.image}
              name={product.name}
              badge={product.badge}
            />
          </div>

          {/* Right Column: Details & Ordering */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category & Dosha Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-[#174A3A] bg-[#FAF7F0] border border-[#E5DFCE] px-3 py-1 rounded-full uppercase">
                {product.category}
              </span>
              <span className="text-xs font-medium text-[#A47128] bg-[#FAF0E6] border border-[#EBD7BF] px-3 py-1 rounded-full">
                {product.dosha}
              </span>
            </div>

            {/* Product Title & Subtitle */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#174A3A] tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-base text-[#5C665F] font-medium mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Star Ratings */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-[#D6A83F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#252A26]">
                {product.rating}
              </span>
              <span className="text-xs text-[#6F7A71]">
                ({product.reviewCount} verified customers)
              </span>
            </div>

            {/* Pricing Block */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#E9E2D1] space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#174A3A]">
                  {product.price}
                </span>
                <span className="text-lg text-[#8A958D] line-through font-normal">
                  {product.originalPrice}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2EC] text-[#174A3A] font-bold text-xs">
                  {product.discount}
                </span>
              </div>
              <p className="text-xs text-[#5C665F]">
                Inclusive of all taxes. Free express shipping across India.
              </p>
            </div>

            {/* Free Gift Offer Banner for Yameny Khalta */}
            {product.slug === "yameny-khalta" && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF0E6] to-[#FAF7F0] border-2 border-[#D6A83F]/40 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D6A83F]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#D6A83F]/30">
                  <Sparkles className="w-5 h-5 text-[#A47128]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#11382C] bg-[#D6A83F]/30 px-2 py-0.5 rounded">
                      Special Combo Offer
                    </span>
                    <span className="text-xs font-bold text-[#A47128]">Save ₹1,899</span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#174A3A]">
                    Includes FREE Lava 31 Gold Vitality Oil (Full Size)
                  </h4>
                  <p className="text-xs text-[#546056] leading-relaxed">
                    Every jar of Yameny Khalta includes a complimentary full-size bottle of Lava 31 Gold Ayurvedic Men&apos;s Wellness Oil for complete internal &amp; external vigor.
                  </p>
                </div>
              </div>
            )}

            {/* Long Description */}
            <p className="text-sm sm:text-base text-[#465349] leading-relaxed">
              {product.longDescription}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-sm font-semibold text-[#252A26]">Quantity:</span>
              <div className="inline-flex items-center rounded-full border border-[#DCD5C3] bg-[#FAF7F0] p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#174A3A] hover:bg-[#EFE8D8] font-bold transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#252A26]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#174A3A] hover:bg-[#EFE8D8] font-bold transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Buy Now Button */}
              <Link
                href={`/checkout?product=${product.slug}&qty=${quantity}`}
                className="w-full inline-flex items-center justify-center gap-3 py-3.5 px-8 rounded-full bg-[#174A3A] text-white font-semibold text-base shadow-md hover:bg-[#10362A] hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5 text-[#D6A83F]" />
                <span>Buy Now • {product.price}</span>
              </Link>

              {/* Secondary Buttons Row: WhatsApp & Share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-[#25D366]/10 text-[#1E7E34] border border-[#25D366]/30 font-semibold text-sm hover:bg-[#25D366]/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#FAF7F0] border border-[#DCD5C3] text-[#252A26] font-semibold text-sm hover:bg-[#EFE8D8] transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#3B7A57]" />
                      <span className="text-[#3B7A57]">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-[#174A3A]" />
                      <span>Share Product</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Delivery & Reassurance Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E5DFCE]">
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E9E2D1]">
                <Truck className="w-5 h-5 text-[#174A3A] mb-1" />
                <span className="text-[11px] font-semibold text-[#252A26]">Free Express</span>
                <span className="text-[10px] text-[#6F7A71]">Across India</span>
              </div>
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E9E2D1]">
                <ShieldCheck className="w-5 h-5 text-[#3B7A57] mb-1" />
                <span className="text-[11px] font-semibold text-[#252A26]">100% Authentic</span>
                <span className="text-[10px] text-[#6F7A71]">Lab Certified</span>
              </div>
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E9E2D1]">
                <Sparkles className="w-5 h-5 text-[#D6A83F] mb-1" />
                <span className="text-[11px] font-semibold text-[#252A26]">Cash on Delivery</span>
                <span className="text-[10px] text-[#6F7A71]">Available</span>
              </div>
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E9E2D1]">
                <RotateCcw className="w-5 h-5 text-[#174A3A] mb-1" />
                <span className="text-[11px] font-semibold text-[#252A26]">Discreet Pack</span>
                <span className="text-[10px] text-[#6F7A71]">100% Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
