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
    let productId: string | null = null;

    const { data: dbProduct } = await supabaseAdmin
      .from("products")
      .select("id, name, price")
      .eq("slug", productSlug)
      .single();

    if (dbProduct) {
      productId = dbProduct.id;
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
      await supabaseAdmin.from("orders").insert([
        {
          razorpay_order_id,
          razorpay_payment_id: paymentId,
          product_id: productId,
          product_name: productName,
          quantity,
          unit_price: unitPrice,
          total_amount: totalAmount,
          customer_name: customer.fullName,
          customer_phone: customer.phone,
          customer_email: customer.email || null,
          shipping_address: customer.addressLine,
          landmark: customer.landmark || null,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
          payment_status: "paid",
          fulfillment_status: "pending",
        },
      ]);
    } catch (insertErr) {
      console.error("Supabase order insertion exception:", insertErr);
    }

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
