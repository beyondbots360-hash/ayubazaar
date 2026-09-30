import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";
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

    let unitPrice = 0;
    let productName = productSlug;

    const { data: dbProduct } = await supabaseAdmin
      .from("products")
      .select("id, name, price, in_stock")
      .eq("slug", productSlug)
      .single();

    if (dbProduct) {
      if (!dbProduct.in_stock) {
        return NextResponse.json(
          { success: false, error: "Sorry, this product is currently out of stock." },
          { status: 400 }
        );
      }
      unitPrice = Number(dbProduct.price);
      productName = dbProduct.name;
    } else {
      const staticProduct = getProductBySlug(productSlug);
      if (!staticProduct) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      if (staticProduct.inStock === false) {
        return NextResponse.json(
          { success: false, error: "Sorry, this product is currently out of stock." },
          { status: 400 }
        );
      }
      unitPrice = parseInt(staticProduct.price.replace(/[^0-9]/g, ""), 10);
      productName = staticProduct.name;
    }

    const totalAmountInRupees = unitPrice * quantity;
    const amountInPaise = totalAmountInRupees * 100;
    const receiptId = `rcpt_${Date.now().toString().slice(-8)}`;

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
            productName,
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
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
