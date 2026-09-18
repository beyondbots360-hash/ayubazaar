import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import OrdersTable from "./OrdersTable";

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#174A3A]">
          Customer Orders
        </h1>
        <p className="text-sm text-[#78857C] mt-1">
          Review paid customer orders, shipping addresses, payment tracking, and status.
        </p>
      </div>

      <OrdersTable initialOrders={orders || []} />
    </div>
  );
}
