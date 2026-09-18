"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Invalid administrator credentials");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected network error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#11382C] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D6A83F_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-md w-full relative z-10 bg-[#FAF7F0] rounded-3xl shadow-2xl p-8 sm:p-10 border border-[#D6A83F]/30">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#174A3A] shadow-md mb-4 border border-[#D6A83F]/40">
            <span className="text-3xl font-serif font-bold text-[#D6A83F]">A</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#174A3A]">
            AyuBazaar Admin
          </h1>
          <p className="text-sm text-[#78857C] mt-1 font-medium">
            Ayurvedic Store Management & Price Control
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#174A3A] mb-2">
              Admin Access Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-[#E9E2D1] text-[#174A3A] text-sm focus:outline-none focus:ring-2 focus:ring-[#D6A83F] focus:border-transparent transition-all shadow-sm"
              />
              <Lock className="w-5 h-5 text-[#8C988F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#174A3A] to-[#1e5d49] hover:from-[#11382C] hover:to-[#174A3A] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 border border-[#D6A83F]/30"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#D6A83F] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Enter Admin Panel</span>
                <ArrowRight className="w-4 h-4 text-[#D6A83F]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E9E2D1] flex items-center justify-center gap-2 text-xs text-[#8C988F]">
          <ShieldCheck className="w-4 h-4 text-[#174A3A]" />
          <span>Protected Area • Authorized Personnel Only</span>
        </div>
      </div>
    </div>
  );
}
