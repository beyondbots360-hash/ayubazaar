import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
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
    const isMock = keySecret === "rzp_secret_placeholder" || razorpay_order_id.startsWith("order_mock_");

    if (!isMock) {
      // Validate Razorpay cryptographic HMAC SHA-256 signature
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

    // Resolve product details
    const product = getProductBySlug(productSlug);
    const unitPriceNumber = product ? parseInt(product.price.replace(/[^0-9]/g, ""), 10) : 0;
    const totalAmount = unitPriceNumber * quantity;

    // Dispatch automated email alert to admin
    await sendOrderAlertEmail({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
      customer,
      product: {
        name: product ? product.name : productSlug,
        quantity,
        price: product ? product.price : "₹0",
        totalAmount,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
    });
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during verification" },
      { status: 500 }
    );
  }
}
