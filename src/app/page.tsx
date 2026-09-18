import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Our Flagship Products Section */}
      <ProductsSection />

      {/* 3. Why Choose AyuBazaar Section */}
      <WhyChooseSection />

      {/* 4. Ready to Start Your Wellness Journey Banner */}
      <CtaBanner />
    </div>
  );
}
