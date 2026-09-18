"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F8F5EC]/95 backdrop-blur-md border-b border-[#E9E2D0]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-14 w-44 sm:w-48 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/logo.png"
                alt="AyuBazaar Logo - Tradition. Wellness. Everyday."
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className="text-sm font-semibold text-[#174A3A] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#174A3A] after:rounded-full"
            >
              Home
            </Link>
            <Link
              href="/#products"
              className="text-sm font-medium text-[#465349] hover:text-[#174A3A] transition-colors"
            >
              Our Products
            </Link>
            <Link
              href="/#why-choose"
              className="text-sm font-medium text-[#465349] hover:text-[#174A3A] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/#footer"
              className="text-sm font-medium text-[#465349] hover:text-[#174A3A] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#174A3A] text-white text-sm font-semibold shadow-md hover:bg-[#10362A] hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Leaf className="w-4 h-4 text-[#D6A83F]" />
              <span>Order Now</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-[#174A3A] hover:bg-[#EFE8D8] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F0] border-b border-[#E8E1CF] px-6 pt-4 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#174A3A] py-1 border-b border-[#E8E1CF]"
            >
              Home
            </Link>
            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#465349] hover:text-[#174A3A] py-1 border-b border-[#E8E1CF]"
            >
              Our Products
            </Link>
            <Link
              href="/#why-choose"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#465349] hover:text-[#174A3A] py-1 border-b border-[#E8E1CF]"
            >
              About Us
            </Link>
            <Link
              href="/#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#465349] hover:text-[#174A3A] py-1"
            >
              Contact
            </Link>
          </nav>
          <div className="pt-2">
            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#174A3A] text-white text-sm font-semibold shadow-md"
            >
              <Leaf className="w-4 h-4 text-[#D6A83F]" />
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
