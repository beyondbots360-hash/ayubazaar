import { supabaseAdmin } from "@/lib/supabase/admin";
import { PRODUCTS, ProductDetail, Benefit } from "@/data/products";

export interface DbProductRow {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  category: string | null;
  dosha: string | null;
  price: number;
  original_price: number;
  rating: number;
  review_count: number;
  badge: string | null;
  description: string;
  short_description: string;
  long_description: string | null;
  image?: string;
  image_url?: string;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export function mapDbProductToDetail(
  p: DbProductRow,
  fallbackDetail?: ProductDetail,
  relational?: {
    benefits?: Array<{ title: string; description: string; icon_name: string }>;
    ingredients?: Array<{ name: string; sanskrit_name: string; property: string }>;
    usageSteps?: Array<{ step?: number; step_order?: number; title: string; instruction: string; tip?: string }>;
    faqs?: Array<{ question: string; answer: string }>;
  }
): ProductDetail {
  const discountPercent =
    p.original_price > p.price
      ? Math.round(((p.original_price - p.price) / p.original_price) * 100)
      : 0;

  const benefits: Benefit[] = relational?.benefits?.length
    ? relational.benefits.map((b) => ({
        title: b.title,
        description: b.description,
        iconName: (b.icon_name as Benefit["iconName"]) || "Zap",
      }))
    : fallbackDetail?.benefits || [];

  const ingredients = relational?.ingredients?.length
    ? relational.ingredients.map((i) => ({
        name: i.name,
        sanskritName: i.sanskrit_name,
        property: i.property,
      }))
    : fallbackDetail?.ingredients || [];

  const usageSteps = relational?.usageSteps?.length
    ? relational.usageSteps.map((u) => ({
        step: u.step ?? u.step_order ?? 1,
        title: u.title,
        instruction: u.instruction,
        tip: u.tip,
      }))
    : fallbackDetail?.usageSteps || [];

  const faqs = relational?.faqs?.length
    ? relational.faqs.map((f) => ({
        question: f.question,
        answer: f.answer,
      }))
    : fallbackDetail?.faqs || [];

  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle || fallbackDetail?.subtitle || "",
    category: p.category || fallbackDetail?.category || "Rasayana & Vitality Tonic",
    dosha: p.dosha || fallbackDetail?.dosha || "Balances Tridosha",
    price: `₹${p.price.toLocaleString("en-IN")}`,
    originalPrice: `₹${p.original_price.toLocaleString("en-IN")}`,
    discount: discountPercent > 0 ? `Save ${discountPercent}%` : "",
    rating: Number(p.rating) || fallbackDetail?.rating || 4.9,
    reviewCount: Number(p.review_count) || fallbackDetail?.reviewCount || 100,
    image: p.image || p.image_url || fallbackDetail?.image || "/images/products/yameny-khalta-combo.jpg",
    gallery: fallbackDetail?.gallery || [p.image || p.image_url || "/images/products/yameny-khalta-combo.jpg"],
    badge: p.badge || fallbackDetail?.badge || "Authentic",
    description: p.description,
    shortDescription: p.short_description || fallbackDetail?.shortDescription || "",
    longDescription: p.long_description || fallbackDetail?.longDescription || p.description,
    benefits,
    ingredients,
    usageSteps,
    faqs,
  };
}

export async function getLiveProducts(): Promise<ProductDetail[]> {
  try {
    const { data: dbProducts, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !dbProducts || dbProducts.length === 0) {
      return PRODUCTS;
    }

    return dbProducts.map((p) => {
      const fallback = PRODUCTS.find((fp) => fp.slug === p.slug);
      return mapDbProductToDetail(p as DbProductRow, fallback);
    });
  } catch (err) {
    console.error("Error fetching live products:", err);
    return PRODUCTS;
  }
}

export async function getLiveProductBySlug(slug: string): Promise<ProductDetail | null> {
  try {
    const { data: p, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !p) {
      return PRODUCTS.find((prod) => prod.slug === slug) || null;
    }

    const [benefitsRes, ingredientsRes, usageRes, faqsRes] = await Promise.all([
      supabaseAdmin.from("product_benefits").select("*").eq("product_id", p.id),
      supabaseAdmin.from("product_ingredients").select("*").eq("product_id", p.id),
      supabaseAdmin.from("product_usage_steps").select("*").eq("product_id", p.id).order("step", { ascending: true }),
      supabaseAdmin.from("product_faqs").select("*").eq("product_id", p.id),
    ]);

    const fallback = PRODUCTS.find((prod) => prod.slug === slug);

    return mapDbProductToDetail(p as DbProductRow, fallback, {
      benefits: benefitsRes.data || [],
      ingredients: ingredientsRes.data || [],
      usageSteps: usageRes.data || [],
      faqs: faqsRes.data || [],
    });
  } catch (err) {
    console.error("Error fetching live product by slug:", err);
    return PRODUCTS.find((prod) => prod.slug === slug) || null;
  }
}
