"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, ProductDetail, getProductBySlug } from "@/data/products";
import ShippingForm, { ShippingData } from "@/components/checkout/ShippingForm";
import OrderSummaryCard from "@/components/checkout/OrderSummaryCard";
import { ArrowLeft, ChevronRight, ShieldCheck, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface RawDbProduct {
  slug: string;
  price: number;
  original_price: number;
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

  const [product, setProduct] = useState<ProductDetail>(
    getProductBySlug(productSlugParam) || PRODUCTS[0]
  );
  const [quantity, setQuantity] = useState(isNaN(qtyParam) || qtyParam < 1 ? 1 : qtyParam);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.products)) {
          const dbItem = data.products.find((p: RawDbProduct) => p.slug === productSlugParam);
          if (dbItem) {
            const discount =
              dbItem.original_price > dbItem.price
                ? `Save ${Math.round(((dbItem.original_price - dbItem.price) / dbItem.original_price) * 100)}%`
                : "";
            setProduct((prev) => ({
              ...prev,
              price: `₹${Number(dbItem.price).toLocaleString("en-IN")}`,
              originalPrice: `₹${Number(dbItem.original_price).toLocaleString("en-IN")}`,
              discount,
              inStock: dbItem.in_stock !== undefined ? Boolean(dbItem.in_stock) : prev.inStock,
            }));
          }
        }
      })
      .catch((err) => console.error(err));
  }, [productSlugParam]);

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

    if (product.inStock === false) {
      setServerError("This formulation is currently out of stock and cannot be purchased.");
      return;
    }

    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    try {
      const createRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          quantity,
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok || !createData.success) {
        throw new Error(createData.error || "Failed to initialize order payment session.");
      }

      const { orderId, amount, currency, keyId, isMock } = createData;

      if (isMock) {
        const verifyRes = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderId,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: "mock_signature_bypass",
            customer: shippingData,
            productSlug: product.slug,
            quantity,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          router.push(
            `/order-success?orderId=${orderId}&paymentId=${verifyData.paymentId}&product=${product.slug}&qty=${quantity}`
          );
          return;
        } else {
          throw new Error(verifyData.error || "Verification failed during simulated flow.");
        }
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay payment gateway. Please check your connection.");
      }

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "AyuBazaar",
        description: `${product.name} (Qty: ${quantity})`,
        order_id: orderId,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
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
            if (verifyRes.ok && verifyData.success) {
              router.push(
                `/order-success?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&product=${product.slug}&qty=${quantity}`
              );
            } else {
              setServerError(verifyData.error || "Payment verification failed. Please contact support.");
              setIsLoading(false);
            }
          } catch {
            setServerError("Payment completed but verification failed. Please contact us.");
            setIsLoading(false);
          }
        },
        prefill: {
          name: shippingData.fullName.trim(),
          email: shippingData.email?.trim() || "",
          contact: shippingData.phone.replace(/[^0-9]/g, ""),
        },
        theme: {
          color: "#174A3A",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: { error: { description: string } }) {
        setServerError(response.error.description || "Payment failed. Please try another method.");
        setIsLoading(false);
      });
      rzp.open();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred while processing checkout.";
      setServerError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EC] pb-20">
      <div className="bg-[#FAF7F0] border-b border-[#E7DFC8] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between text-xs font-semibold text-[#6C776E]">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-[#174A3A] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B5BFB7]" />
              <Link href={`/products/${product.slug}`} className="hover:text-[#174A3A] transition-colors">
                {product.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B5BFB7]" />
              <span className="text-[#174A3A] font-bold">Secure Checkout</span>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1.5 text-[#174A3A] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Product</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="text-center sm:text-left mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#E5DFCE] text-[#A47128] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#174A3A] tracking-tight">
            Complete Your Ayurvedic Order
          </h1>
          <p className="text-xs sm:text-sm text-[#556157] mt-1">
            Fill in your delivery address and pay securely via Razorpay. Need help? Call or WhatsApp us at{" "}
            <a href="tel:+918929515262" className="font-bold text-[#174A3A] hover:underline">
              +91 89295 15262
            </a>
            .
          </p>
        </div>

        {serverError && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-900">Payment Notice</p>
              <p className="mt-0.5 text-xs text-red-700 leading-relaxed">{serverError}</p>
            </div>
          </div>
        )}

        {product.inStock === false && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-3.5 text-amber-900 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Product Currently Out of Stock</p>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                <strong>{product.name}</strong> is currently unavailable for order due to high demand. Please explore other available formulations.
              </p>
              <div className="mt-2.5">
                <Link href="/#products" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174A3A] underline hover:text-[#10362A]">
                  ← Browse Available Formulations
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <ShippingForm
              data={shippingData}
              onChange={handleFieldChange}
              errors={errors}
            />
          </div>

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
          <div className="w-8 h-8 border-3 border-[#174A3A] border-t-[#D6A83F] rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
