"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Award, Sparkles } from "lucide-react";

interface ProductGalleryProps {
  image: string;
  name: string;
  badge: string;
  inStock?: boolean;
}

export default function ProductGallery({ image, name, badge, inStock = true }: ProductGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!inStock) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="space-y-4 select-none">
      {/* Single Dedicated Image Showcase with Zoom */}
      <div
        className={`relative w-full aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#FAF7F0] border border-[#E8E1CE] shadow-sm flex items-center justify-center group ${
          inStock ? "cursor-crosshair" : "cursor-default"
        }`}
        onMouseEnter={() => inStock && setIsZoomed(true)}
        onMouseLeave={() => inStock && setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Badges Row */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
          {!inStock ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-md uppercase tracking-wider">
              Out of Stock
            </span>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174A3A] text-white text-xs font-semibold shadow-sm">
              <Sparkles className="w-3 h-3 text-[#D6A83F]" />
              <span>{badge}</span>
            </div>
          )}
        </div>

        {/* Normal Image */}
        <div className={`relative w-full h-full p-6 transition-all duration-300 ${!inStock ? "opacity-60 grayscale-[30%]" : ""}`}>
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-contain p-4"
          />
        </div>

        {/* Hover Zoom Overlay */}
        {isZoomed && (
          <div
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-200 hidden md:block"
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: "220%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#FAF7F0",
            }}
          />
        )}

        {/* Zoom Hint */}
        <div className="absolute bottom-3 right-4 z-20 text-[11px] font-medium text-[#7C877E] bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#E5DFCE] hidden md:block">
          Hover to zoom
        </div>
      </div>

      {/* Quality Trust Badges */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF7F0] border border-[#E9E2D1] text-xs font-medium text-[#252A26]">
          <ShieldCheck className="w-4 h-4 text-[#3B7A57] shrink-0" />
          <span>100% Ayurvedic & Tested</span>
        </div>
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#FAF7F0] border border-[#E9E2D1] text-xs font-medium text-[#252A26]">
          <Award className="w-4 h-4 text-[#D6A83F] shrink-0" />
          <span>GMP Certified Facility</span>
        </div>
      </div>
    </div>
  );
}
