import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F5EC] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EBF2EC] flex items-center justify-center mx-auto shadow-xs">
          <Leaf className="w-8 h-8 text-[#174A3A]" />
        </div>
        <h1 className="text-4xl font-serif text-[#174A3A]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#5C665F] leading-relaxed">
          The Ayurvedic product or page you are looking for does not exist or has been moved.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#174A3A] text-white text-sm font-semibold shadow-md hover:bg-[#10362A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to AyuBazaar Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
