"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, PackageCheck, Truck, MessageCircle, Home, Printer } from "lucide-react";
import { getProductBySlug } from "@/data/products";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || `ord_${Date.now().toString().slice(-6)}`;
  const paymentId = searchParams.get("paymentId") || `pay_${Date.now().toString().slice(-6)}`;
  const productSlug = searchParams.get("product") || "yameny-khalta";
  const qty = parseInt(searchParams.get("qty") || "1", 10);

  const product = getProductBySlug(productSlug);
  const unitPrice = product ? parseInt(product.price.replace(/[^0-9]/g, ""), 10) : 0;
  const totalAmount = unitPrice * qty;

  const whatsappMessage = encodeURIComponent(
    `Hello AyuBazaar! I have placed order *#${orderId}* for ${product ? product.name : "Ayurvedic product"}. Could you please share the tracking details once dispatched?`
  );
  const whatsappUrl = `https://wa.me/918929515262?text=${whatsappMessage}`;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EC] py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Success Container */}
        <div className="bg-[#FAF7F0] rounded-3xl border border-[#E8E1CE] shadow-lg p-6 sm:p-10 text-center space-y-8">
          {/* Green Checkmark Header */}
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#EBF2EC] border border-[#D3E4D7] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-[#3B7A57]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3B7A57]">
                Payment Verified • Order Confirmed
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#174A3A]">
                Thank You for Your Order!
              </h1>
              <p className="text-sm text-[#5C665F] max-w-md mx-auto leading-relaxed pt-1">
                We have received your payment via Razorpay. Your freshly compounded Ayurvedic formulation is now being prepared for express dispatch.
              </p>
            </div>
          </div>

          {/* Key Order Specs Pill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left text-xs bg-white p-4 rounded-2xl border border-[#E8E1CE]">
            <div>
              <span className="text-[#7D8A80] block">Order ID</span>
              <span className="font-bold text-[#174A3A] font-mono text-sm">{orderId}</span>
            </div>
            <div>
              <span className="text-[#7D8A80] block">Razorpay Payment ID</span>
              <span className="font-bold text-[#174A3A] font-mono text-sm">{paymentId}</span>
            </div>
          </div>

          {/* Product Receipt Card */}
          {product && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E1CE] text-left space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl bg-[#FAF7F0] border border-[#E8E1CE] shrink-0 p-1">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-grow">
                  <h3 className="font-serif font-bold text-base text-[#174A3A]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#5C665F]">Quantity: {qty} unit{qty > 1 ? "s" : ""}</p>
                  <p className="text-xs font-semibold text-[#174A3A] mt-0.5">{product.price} each</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#7D8A80] block">Total Paid</span>
                  <span className="text-lg font-serif font-bold text-[#174A3A]">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Delivery Timeline Pill */}
              <div className="pt-4 border-t border-[#EAE2D1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5C665F]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#3B7A57]" />
                  <span>Estimated Delivery: <strong>3 to 5 Business Days</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#D6A83F]" />
                  <span>Discreet & Tamper-Proof Pack</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-md hover:bg-[#20BA5A] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Track on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-[#DCD5C3] text-[#252A26] font-semibold text-sm hover:bg-[#EFE8D8] transition-all"
            >
              <Printer className="w-4 h-4 text-[#174A3A]" />
              <span>Print Receipt</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#174A3A] text-white font-semibold text-sm hover:bg-[#10362A] transition-all"
            >
              <Home className="w-4 h-4 text-[#D6A83F]" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F5EC] flex items-center justify-center">
          <p className="text-sm text-[#5C665F] font-serif">Loading order confirmation...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
