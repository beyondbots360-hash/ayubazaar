import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { getLiveProductBySlug, getLiveProducts } from "@/lib/supabase/products";
import ProductHero from "@/components/product/ProductHero";
import ProductBenefits from "@/components/product/ProductBenefits";
import ProductIngredients from "@/components/product/ProductIngredients";
import ProductUsage from "@/components/product/ProductUsage";
import ProductFaq from "@/components/product/ProductFaq";
import ProductDisclaimer from "@/components/product/ProductDisclaimer";
import StickyMobileCta from "@/components/product/StickyMobileCta";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 0;

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug === "lava31-gold") {
    return {
      title: "Lava 31 Gold (Included Free with Yameny Khalta) | AyuBazaar",
    };
  }

  const product = await getLiveProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | AyuBazaar",
    };
  }

  return {
    title: `${product.name} | AyuBazaar - Traditional Ayurvedic Wellness`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | AyuBazaar`,
      description: product.shortDescription,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Gracefully redirect old standalone Lava 31 Gold URL to the Yameny Khalta combo page
  if (slug === "lava31-gold") {
    redirect("/products/yameny-khalta");
  }

  const [product, allProducts] = await Promise.all([
    getLiveProductBySlug(slug),
    getLiveProducts(),
  ]);

  if (!product) {
    notFound();
  }

  // Filter out self and any legacy slugs to show the other core formulation
  const otherProducts = allProducts.filter(
    (p) => p.slug !== product.slug && p.slug !== "lava31-gold"
  );

  return (
    <div className="min-h-screen bg-[#F8F5EC] pb-20 md:pb-0">
      <div className="bg-[#FAF7F0] border-b border-[#E8E1CF] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between text-xs font-medium text-[#6F7A71]">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="hover:text-[#174A3A] transition-colors flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#A5B0A7]" />
              <Link
                href="/#products"
                className="hover:text-[#174A3A] transition-colors"
              >
                Our Formulations
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#A5B0A7]" />
              <span className="text-[#174A3A] font-semibold truncate max-w-[180px] sm:max-w-none">
                {product.name}
              </span>
            </div>

            <Link
              href="/#products"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-[#174A3A] hover:underline font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Formulations</span>
            </Link>
          </nav>
        </div>
      </div>

      <ProductHero product={product} />
      <ProductBenefits benefits={product.benefits} />
      <ProductIngredients ingredients={product.ingredients} />
      <ProductUsage usageSteps={product.usageSteps} />
      <ProductFaq faqs={product.faqs} />
      <ProductDisclaimer />

      {/* Explore Other Core Formulation */}
      {otherProducts.length > 0 && (
        <section className="py-14 bg-[#FAF7F0] border-t border-[#E8E1CF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif text-[#174A3A] tracking-tight">
                Explore More AyuBazaar Formulations
              </h3>
              <p className="text-xs sm:text-sm text-[#6E7A71] mt-1">
                Time-honored Ayurvedic wellness for your everyday vitality and balance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {otherProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group p-5 rounded-3xl bg-[#F8F5EC] border border-[#E7DFC8] shadow-xs hover:shadow-lg transition-all duration-300 flex items-center gap-5"
                >
                  <div className="relative w-20 h-20 rounded-2xl bg-white border border-[#E9E2D1] shrink-0 overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1.5 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <span className="text-[11px] font-bold text-[#A47128] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#174A3A] group-hover:text-[#10362A] transition-colors truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#546056] line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="font-serif font-bold text-[#174A3A] text-sm">
                        {item.price}
                      </span>
                      <span className="text-xs text-[#8B968E] line-through">
                        {item.originalPrice}
                      </span>
                      <span className="text-[11px] font-semibold text-[#3B7A57]">
                        {item.discount}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <StickyMobileCta product={product} />
    </div>
  );
}
