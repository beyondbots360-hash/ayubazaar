"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingContact() {
  const whatsappUrl =
    "https://wa.me/918929515262?text=" +
    encodeURIComponent("Hello AyuBazaar! I would like to inquire about your Ayurvedic formulations.");

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center group">
      {/* Tooltip / Badge for Desktop */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-full bg-[#174A3A] text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-[#D6A83F]/30">
        Chat with Us: +91 89295 15262
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact AyuBazaar on WhatsApp at 8929515262"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:bg-[#20BA5A] hover:scale-108 active:scale-95 transition-all duration-300 border-2 border-white focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
      </a>
    </div>
  );
}
