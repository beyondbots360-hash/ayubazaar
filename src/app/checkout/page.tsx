"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import ShippingForm, { ShippingData } from "@/components/checkout/ShippingForm";
import OrderSummaryCard from "@/components/checkout/OrderSummaryCard";
import { ArrowLeft, ChevronRight, ShieldCheck, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productSlugParam = searchParams.get("product") || "yameny-khalta";
  const qtyParam = parseInt(searchParams.get("qty") || "1", 10);

  const product = getProductBySlug(productSlugParam) || PRODUCTS[0];
  const [quantity, setQuantity] = useState(isNaN(qtyParam) || qtyParam < 1 ? 1 : qtyParam);

  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: "",
    phone: "",
    email: "",
    addressLine: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof ShippingData, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingData, string>> = {};

    if (!shippingData.fullName.trim() || shippingData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!/^[6-9]\d{9}$/.test(shippingData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!shippingData.addressLine.trim() || shippingData.addressLine.trim().length < 5) {
      newErrors.addressLine = "Please provide your detailed house/street address.";
    }

    if (!/^\d{6}$/.test(shippingData.pincode.trim())) {
      newErrors.pincode = "Please enter a valid 6-digit PIN code.";
    }

    if (!shippingData.city.trim() || shippingData.city.trim().length < 2) {
      newErrors.city = "Please enter your city/town.";
    }

    if (!shippingData.state) {
      newErrors.state = "Please select your state.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPay = async () => {
    setServerError(null);
    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create order on server
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          quantity,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to initialize order.");
      }

      // 2. Handle Mock Order (if testing without live keys)
      if (orderData.isMock) {
        const verifyRes = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: "mock_signature",
            customer: shippingData,
            productSlug: product.slug,
            quantity,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          router.push(
            `/order-success?orderId=${verifyData.orderId}&paymentId=${verifyData.paymentId}&product=${product.slug}&qty=${quantity}`
          );
          return;
        } else {
          throw new Error(verifyData.error || "Payment verification failed.");
        }
      }

      // 3. Ensure Razorpay SDK is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay SDK could not be loaded. Please check your internet connection.");
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AyuBazaar",
        description: `${product.name} (Qty: ${quantity})`,
        image: "/images/logo.png",
        order_id: orderData.orderId,
        prefill: {
          name: shippingData.fullName,
          email: shippingData.email,
          contact: shippingData.phone,
        },
        theme: {
          color: "#174A3A",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer: shippingData,
                productSlug: product.slug,
                quantity,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              router.push(
                `/order-success?orderId=${verifyData.orderId}&paymentId=${verifyData.paymentId}&product=${product.slug}&qty=${quantity}`
              );
            } else {
              setServerError("Payment signature validation failed. Please contact support.");
              setIsLoading(false);
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            setServerError("An error occurred while verifying payment.");
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.open();
    } catch (err: unknown) {
      console.error("Checkout error:", err);
      setServerError(err instanceof Error ? err.message : "Something went wrong during checkout.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E8E1CE]">
          <nav className="flex items-center gap-2 text-xs font-medium text-[#6F7A71]">
            <Link href="/" className="hover:text-[#174A3A]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A5B0A7]" />
            <Link href={`/products/${product.slug}`} className="hover:text-[#174A3A]">
              {product.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A5B0A7]" />
            <span className="text-[#174A3A] font-bold">Secure Checkout</span>
          </nav>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174A3A] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Product</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#174A3A] tracking-tight">
            Express Checkout
          </h1>
          <p className="text-sm text-[#5C665F] mt-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3B7A57]" />
            <span>Safe, encrypted payment & express delivery across India</span>
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{serverError}</p>
          </div>
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Shipping Form */}
          <div className="lg:col-span-7">
            <ShippingForm
              data={shippingData}
              onChange={handleFieldChange}
              errors={errors}
            />
          </div>

          {/* Right Column: Order Summary & Pay */}
          <div className="lg:col-span-5">
            <OrderSummaryCard
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onProceedToPay={handleProceedToPay}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F5EC] flex items-center justify-center">
          <p className="text-sm text-[#5C665F] font-serif">Loading secure checkout...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
