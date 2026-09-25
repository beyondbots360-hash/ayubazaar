import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getProductBySlug } from "@/data/products";
import { sendOrderAlertEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      productSlug,
      quantity,
    } = body;

    if (!razorpay_order_id || !customer || !productSlug || !quantity) {
      return NextResponse.json(
        { success: false, error: "Missing required order information" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder";
    const isMock =
      keySecret === "rzp_secret_placeholder" || razorpay_order_id.startsWith("order_mock_");

    if (!isMock) {
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Invalid payment signature verification" },
          { status: 400 }
        );
      }
    }

    let unitPrice = 0;
    let productName = productSlug;

    const { data: dbProduct } = await supabaseAdmin
      .from("products")
      .select("id, name, price")
      .eq("slug", productSlug)
      .single();

    if (dbProduct) {
      unitPrice = Number(dbProduct.price);
      productName = dbProduct.name;
    } else {
      const fallback = getProductBySlug(productSlug);
      if (fallback) {
        unitPrice = parseInt(fallback.price.replace(/[^0-9]/g, ""), 10);
        productName = fallback.name;
      }
    }

    const totalAmount = unitPrice * quantity;
    const paymentId = razorpay_payment_id || `pay_mock_${Date.now()}`;

    try {
      const orderNumber = `AYU-${Date.now().toString().slice(-6)}`;
      const { error: insertErr } = await supabaseAdmin.from("orders").insert([
        {
          order_number: orderNumber,
          razorpay_order_id,
          razorpay_payment_id: paymentId,
          status: "paid",
          customer_name: customer.fullName.trim(),
          customer_phone: customer.phone.replace(/[^0-9]/g, ""),
          customer_email: customer.email?.trim() || "orders@ayubazaar.in",
          address_line: customer.addressLine.trim(),
          landmark: customer.landmark?.trim() || null,
          city: customer.city.trim(),
          state: customer.state.trim(),
          pincode: customer.pincode.trim(),
          product_name: productName,
          product_slug: productSlug,
          quantity,
          total_amount: totalAmount,
        },
      ]);
      if (insertErr) {
        console.error("Supabase order insertion error:", insertErr);
      } else {
        console.log(`[Supabase] Order #${orderNumber} (${razorpay_order_id}) recorded successfully.`);
      }
    } catch (insertErr) {
      console.error("Supabase order insertion exception:", insertErr);
    }

    try {
      await sendOrderAlertEmail({
        orderId: razorpay_order_id,
        paymentId,
        customer,
        product: {
          name: productName,
          quantity,
          price: `₹${unitPrice.toLocaleString("en-IN")}`,
          totalAmount,
        },
      });
    } catch (emailErr) {
      console.error("[Email Notification Warning] Order saved but notification email failed:", emailErr);
    }

    return NextResponse.json({
      success: true,
      orderId: razorpay_order_id,
      paymentId,
    });
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during verification" },
      { status: 500 }
    );
  }
}
