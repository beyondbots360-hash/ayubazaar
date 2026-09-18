import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { getProductBySlug } from "@/data/products";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productSlug, quantity } = body;

    if (!productSlug || !quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Invalid product or quantity" },
        { status: 400 }
      );
    }

    // Always fetch trusted price from server dataset
    const product = getProductBySlug(productSlug);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Extract numerical price from string e.g. "₹1,499" -> 1499
    const unitPriceNumber = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
    const totalAmountInRupees = unitPriceNumber * quantity;
    const amountInPaise = totalAmountInRupees * 100;

    const receiptId = `rcpt_${Date.now().toString().slice(-8)}`;

    // If real keys are not provided or default placeholder is used, generate mock order ID for testing
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
    const isMock = !keyId || keyId === "rzp_test_placeholder";

    let orderId = `order_mock_${Date.now()}`;

    if (!isMock) {
      try {
        const order = await razorpay.orders.create({
          amount: amountInPaise,
          currency: "INR",
          receipt: receiptId,
          notes: {
            productName: product.name,
            quantity: quantity.toString(),
          },
        });
        orderId = order.id;
      } catch (razorpayErr: unknown) {
        console.error("Razorpay API Error:", razorpayErr);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to create Razorpay order with provided credentials.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountInPaise,
      currency: "INR",
      keyId: isMock ? "rzp_test_mock" : keyId,
      isMock,
    });
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
