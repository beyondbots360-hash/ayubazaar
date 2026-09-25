"use client";

import Image from "next/image";
import { ProductDetail } from "@/data/products";
import { ShieldCheck, Truck, Lock, Loader2, Sparkles } from "lucide-react";

interface OrderSummaryCardProps {
  product: ProductDetail;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onProceedToPay: () => void;
  isLoading: boolean;
}

export default function OrderSummaryCard({
  product,
  quantity,
  onQuantityChange,
  onProceedToPay,
  isLoading,
}: OrderSummaryCardProps) {
  const unitPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
  const total = unitPrice * quantity;

  return (
    <div className="bg-[#FAF7F0] p-6 sm:p-7 rounded-3xl border border-[#E8E1CE] shadow-md space-y-6 sticky top-28">
      <h2 className="text-lg font-serif font-bold text-[#174A3A] border-b border-[#E5DFCE] pb-3.5">
        Order Summary
      </h2>

      {/* Product Snapshot */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-2xl bg-white border border-[#E8E1CE] shrink-0 p-2 overflow-hidden flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-1.5"
          />
        </div>

        <div className="min-w-0 flex-grow">
          <h3 className="font-serif font-bold text-base text-[#174A3A] truncate">
            {product.name}
          </h3>
          <p className="text-xs text-[#5C665F] truncate">{product.subtitle}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-serif font-bold text-sm text-[#174A3A]">
              {product.price}
            </span>
            <span className="text-xs text-[#8A958D] line-through">
              {product.originalPrice}
            </span>
            <span className="text-[10px] font-bold text-[#3B7A57] bg-[#EBF2EC] px-2 py-0.5 rounded-full">
              {product.discount}
            </span>
          </div>
        </div>
      </div>

      {/* Included Free Gift Line Item for Yameny Khalta */}
      {product.slug === "yameny-khalta" && (
        <div className="p-3 rounded-2xl bg-[#D6A83F]/10 border border-[#D6A83F]/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-lg bg-white border border-[#D6A83F]/30 overflow-hidden shrink-0">
              <Image
                src="/images/products/lava-31-gold.png"
                alt="Free Lava 31 Gold"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#11382C] bg-[#D6A83F]/30 px-1.5 py-0.2 rounded">
                  Included Free
                </span>
              </div>
              <span className="text-xs font-serif font-bold text-[#174A3A] block">
                Lava 31 Gold Oil ({quantity} {quantity > 1 ? "Bottles" : "Bottle"})
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-bold text-[#2E6B47]">FREE</span>
            <span className="text-[10px] text-[#8A958D] line-through block">₹{1899 * quantity}</span>
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center justify-between py-3 border-y border-[#E8E1CE] text-sm">
        <span className="font-semibold text-[#252A26]">Quantity</span>
        <div className="inline-flex items-center rounded-full border border-[#DCD5C3] bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1 || isLoading}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#174A3A] hover:bg-[#EFE8D8] font-bold transition-colors disabled:opacity-40"
          >
            -
          </button>
          <span className="w-8 text-center font-bold text-sm text-[#252A26]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(quantity + 1)}
            disabled={isLoading}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#174A3A] hover:bg-[#EFE8D8] font-bold transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Price Calculations */}
      <div className="space-y-2.5 text-xs text-[#5C665F]">
        <div className="flex justify-between">
          <span>Subtotal ({quantity} item{quantity > 1 ? "s" : ""})</span>
          <span className="font-semibold text-[#252A26]">₹{total.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#3B7A57]" />
            <span>Express Delivery Across India</span>
          </span>
          <span className="font-bold text-[#3B7A57] uppercase tracking-wider">FREE</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & GST (Included)</span>
          <span className="font-semibold text-[#252A26]">₹0</span>
        </div>
      </div>

      {/* Total Amount Box */}
      <div className="p-4 rounded-2xl bg-[#174A3A] text-white flex items-center justify-between">
        <div>
          <p className="text-xs text-[#C7D4CA]">Total Payable</p>
          <p className="text-2xl font-serif font-bold text-[#D6A83F]">
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="text-right text-[11px] text-[#A6C0AF]">
          <span>All taxes included</span>
        </div>
      </div>

      {/* Pay with Razorpay Button */}
      <div>
        <button
          type="button"
          onClick={onProceedToPay}
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-full bg-[#174A3A] hover:bg-[#10362A] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#D6A83F]" />
              <span>Initiating Secure Payment...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-[#D6A83F]" />
              <span>Pay via Razorpay • ₹{total.toLocaleString("en-IN")}</span>
            </>
          )}
        </button>
      </div>

      {/* Payment Security Badges */}
      <div className="space-y-2 pt-1 border-t border-[#E8E1CE] text-[11px] text-[#6E7A70]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#3B7A57] shrink-0" />
          <span>256-Bit SSL Encrypted & Razorpay Verified Gateway</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D6A83F] shrink-0" />
          <span>Instant UPI (GPay, PhonePe, Paytm), Cards, NetBanking</span>
        </div>
      </div>
    </div>
  );
}
