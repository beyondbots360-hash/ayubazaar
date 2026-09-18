import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import ProductPriceManager from "./ProductPriceManager";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  const { data: products } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#174A3A]">
          Products & Price Management
        </h1>
        <p className="text-sm text-[#78857C] mt-1">
          Adjust selling prices, crossed-out original prices, and stock availability in real time.
        </p>
      </div>

      <ProductPriceManager initialProducts={products || []} />
    </div>
  );
}
