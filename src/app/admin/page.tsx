import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { 
  DollarSign, 
  Package, 
  ShoppingBag, 
  ArrowUpRight, 
  CheckCircle,
  Tag
} from "lucide-react";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  const [productsRes, ordersRes] = await Promise.all([
    supabaseAdmin.from("products").select("id, name, price, original_price, in_stock"),
    supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const products = productsRes.data || [];
  const orders = ordersRes.data || [];

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.in_stock).length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0);

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#174A3A]">
            Dashboard Overview
          </h1>
          <p className="text-sm text-[#78857C] mt-1">
            Real-time status of your Ayurvedic catalog, inventory, and revenue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-[#174A3A] text-white rounded-xl text-sm font-semibold hover:bg-[#11382C] transition-colors shadow-sm flex items-center gap-2"
          >
            <Tag className="w-4 h-4 text-[#D6A83F]" />
            <span>Manage Product Prices</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E9E2D1] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78857C]">Total Products</span>
            <div className="w-10 h-10 rounded-xl bg-[#F8F5EC] flex items-center justify-center text-[#174A3A]">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#174A3A]">{totalProducts}</div>
            <p className="text-xs text-emerald-700 font-medium mt-1">{inStockCount} currently in stock</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E9E2D1] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78857C]">Total Orders</span>
            <div className="w-10 h-10 rounded-xl bg-[#F8F5EC] flex items-center justify-center text-[#174A3A]">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#174A3A]">{totalOrders}</div>
            <p className="text-xs text-[#78857C] mt-1">Logged from checkout</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E9E2D1] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78857C]">Recorded Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-[#F8F5EC] flex items-center justify-center text-[#D6A83F]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[#174A3A]">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-emerald-700 font-medium mt-1">Via Razorpay Online</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E9E2D1] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78857C]">Database Status</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-800">Supabase Connected</div>
            <p className="text-xs text-[#78857C] mt-1">Project: Ayubazaar (Live)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#E9E2D1] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E9E2D1] pb-4">
          <h2 className="text-lg font-serif font-bold text-[#174A3A]">Catalog Snapshot</h2>
          <Link href="/admin/products" className="text-xs font-bold text-[#D6A83F] hover:underline flex items-center gap-1">
            <span>Edit Prices & Stock</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#E9E2D1]">
          {products.map((p) => (
            <div key={p.id} className="py-3.5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-semibold text-sm text-[#174A3A]">{p.name}</div>
                <div className="text-xs text-[#78857C]">
                  Status: {p.in_stock ? (
                    <span className="text-emerald-700 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-base font-bold text-[#174A3A]">
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-[#8C988F] line-through">
                    ₹{Number(p.original_price).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-[#E9E2D1] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#E9E2D1] pb-4">
          <h2 className="text-lg font-serif font-bold text-[#174A3A]">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs font-bold text-[#D6A83F] hover:underline flex items-center gap-1">
            <span>View All Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-sm text-[#78857C] py-6 text-center">
            No orders recorded in Supabase yet. Complete a checkout test to view it here!
          </p>
        ) : (
          <div className="divide-y divide-[#E9E2D1]">
            {orders.map((o) => (
              <div key={o.id} className="py-3.5 flex items-center justify-between flex-wrap gap-3 text-sm">
                <div>
                  <div className="font-semibold text-[#174A3A]">{o.customer_name}</div>
                  <div className="text-xs text-[#78857C]">
                    {o.product_name} × {o.quantity} • {new Date(o.created_at).toLocaleDateString("en-IN")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#174A3A]">
                    ₹{Number(o.total_amount).toLocaleString("en-IN")}
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-emerald-50 text-emerald-700">
                    {o.payment_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
