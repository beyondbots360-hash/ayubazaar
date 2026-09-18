"use client";

import { useState } from "react";
import { MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

interface Order {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address: string;
  landmark: string | null;
  city: string;
  state: string;
  pincode: string;
  payment_status: string;
  fulfillment_status: string;
  created_at: string;
}

export default function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, fulfillment_status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, fulfillment_status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const openWhatsApp = (phone: string, customerName: string, orderId: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
    const text = encodeURIComponent(
      `Namaste ${customerName}, your AyuBazaar order #${orderId.slice(-6)} is confirmed! We are preparing your botanical order for dispatch.`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E9E2D1] p-12 text-center">
        <Clock className="w-12 h-12 text-[#8C988F] mx-auto mb-3" />
        <h3 className="font-serif font-bold text-lg text-[#174A3A]">No Orders Yet</h3>
        <p className="text-sm text-[#78857C] mt-1">
          When customers make purchases on AyuBazaar, orders and addresses will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-2xl border border-[#E9E2D1] p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-[#174A3A]">
                  {order.customer_name}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {order.payment_status}
                </span>
                <span className="text-xs text-[#8C988F]">
                  {new Date(order.created_at).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="text-sm">
                <span className="font-semibold text-[#174A3A]">{order.product_name}</span>
                <span className="text-[#78857C]"> × {order.quantity} units</span>
                <span className="ml-2 font-bold text-[#174A3A]">
                  (Total: ₹{Number(order.total_amount).toLocaleString("en-IN")})
                </span>
              </div>

              <div className="text-xs text-[#546056] space-y-1 bg-[#FAF7F0] p-3 rounded-xl border border-[#E9E2D1]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A83F] shrink-0 mt-0.5" />
                  <span>
                    {order.shipping_address}
                    {order.landmark ? `, Landmark: ${order.landmark}` : ""},{" "}
                    {order.city}, {order.state} - {order.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[#78857C] pt-1">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#174A3A]" />
                    {order.customer_phone}
                  </span>
                  {order.customer_email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#174A3A]" />
                      {order.customer_email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(order.customer_phone, order.customer_name, order.razorpay_order_id)
                }
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </button>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <span className="text-xs font-semibold text-[#78857C]">Status:</span>
                <select
                  value={order.fulfillment_status}
                  disabled={updatingId === order.id}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#F8F5EC] border border-[#E9E2D1] text-xs font-bold text-[#174A3A] focus:outline-none focus:ring-2 focus:ring-[#D6A83F]"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="text-[11px] text-[#8C988F] text-right font-mono">
                Order: {order.razorpay_order_id}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
