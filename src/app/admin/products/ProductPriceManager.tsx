"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, AlertCircle, Save, ExternalLink, RefreshCw } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  original_price: number;
  in_stock: boolean;
  image_url: string;
  category: string;
}

export default function ProductPriceManager({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; msg: string; type: "success" | "error" } | null>(null);

  const handlePriceChange = (id: string, field: "price" | "original_price", value: string) => {
    const num = parseFloat(value) || 0;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: num } : p))
    );
  };

  const handleStockToggle = (id: string, current: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, in_stock: !current } : p))
    );
  };

  const saveChanges = async (product: Product) => {
    setSavingId(product.id);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          price: product.price,
          original_price: product.original_price,
          in_stock: product.in_stock,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFeedback({ id: product.id, msg: data.error || "Save failed", type: "error" });
      } else {
        setFeedback({ id: product.id, msg: "Saved to Supabase!", type: "success" });
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch {
      setFeedback({ id: product.id, msg: "Network error occurred", type: "error" });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => {
          const discount =
            product.original_price > product.price
              ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
              : 0;

          const isSaving = savingId === product.id;
          const currentFeedback = feedback?.id === product.id ? feedback : null;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E9E2D1] p-6 shadow-sm hover:border-[#D6A83F]/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#FAF7F0] border border-[#E9E2D1] overflow-hidden shrink-0 flex items-center justify-center">
                    <Image
                      src={product.image_url || "/products/khalta.png"}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg text-[#174A3A]">
                        {product.name}
                      </h3>
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="text-[#8C988F] hover:text-[#174A3A]"
                        title="View product page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                    <p className="text-xs text-[#78857C] mt-0.5">{product.category}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#FAF7F0] text-[#174A3A] border border-[#E9E2D1]">
                        Slug: /{product.slug}
                      </span>
                      {discount > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded font-bold bg-[#D6A83F]/15 text-[#174A3A]">
                          {discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#174A3A] mb-1.5">
                      Selling Price (₹)
                    </label>
                    <div className="relative w-36">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C988F]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={product.price}
                        onChange={(e) => handlePriceChange(product.id, "price", e.target.value)}
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#F8F5EC] border border-[#E9E2D1] text-[#174A3A] font-bold text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D6A83F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#78857C] mb-1.5">
                      Original Price (₹)
                    </label>
                    <div className="relative w-36">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C988F]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={product.original_price}
                        onChange={(e) => handlePriceChange(product.id, "original_price", e.target.value)}
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#F8F5EC] border border-[#E9E2D1] text-[#78857C] font-semibold text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D6A83F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#174A3A] mb-1.5">
                      Stock Status
                    </label>
                    <button
                      type="button"
                      onClick={() => handleStockToggle(product.id, product.in_stock)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors border ${
                        product.in_stock
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-red-50 text-red-700 border-red-300"
                      }`}
                    >
                      {product.in_stock ? "✓ In Stock" : "✕ Out of Stock"}
                    </button>
                  </div>

                  <div className="pt-5 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => saveChanges(product)}
                      disabled={isSaving}
                      className="px-5 py-2.5 rounded-xl bg-[#174A3A] hover:bg-[#11382C] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                    >
                      {isSaving ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-[#D6A83F]" />
                      ) : (
                        <Save className="w-4 h-4 text-[#D6A83F]" />
                      )}
                      <span>Update Price</span>
                    </button>

                    {currentFeedback && (
                      <span
                        className={`text-xs font-semibold flex items-center gap-1 ${
                          currentFeedback.type === "success" ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {currentFeedback.type === "success" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        {currentFeedback.msg}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
