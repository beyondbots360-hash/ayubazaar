import nodemailer from "nodemailer";

export interface OrderEmailPayload {
  orderId: string;
  paymentId: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    addressLine: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  product: {
    name: string;
    quantity: number;
    price: string;
    totalAmount: number; // in INR
  };
}

export async function sendOrderAlertEmail(payload: OrderEmailPayload): Promise<boolean> {
  const { orderId, paymentId, customer, product } = payload;
  const adminEmail = process.env.ADMIN_EMAIL || "info@ayubazaar.in";

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New AyuBazaar Order #${orderId}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F8F5EC; color: #252A26; margin: 0; padding: 20px; }
          .card { background-color: #FAF7F0; border: 1px solid #E8E1CE; border-radius: 16px; max-width: 600px; margin: 0 auto; padding: 30px; }
          .header { text-align: center; border-bottom: 2px solid #174A3A; padding-bottom: 20px; margin-bottom: 25px; }
          .header h1 { color: #174A3A; margin: 0; font-size: 26px; }
          .badge { display: inline-block; background-color: #3B7A57; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 8px; }
          .section-title { font-size: 16px; font-weight: bold; color: #174A3A; border-bottom: 1px solid #E5DFCE; padding-bottom: 6px; margin-top: 20px; margin-bottom: 12px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 14px; }
          .table td { padding: 8px 4px; vertical-align: top; }
          .table td.label { color: #5C665F; width: 35%; font-weight: 500; }
          .table td.value { color: #252A26; font-weight: 600; }
          .total-box { background-color: #174A3A; color: white; border-radius: 12px; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
          .total-box h3 { margin: 0; font-size: 18px; }
          .total-box .price { font-size: 22px; font-weight: bold; color: #D6A83F; }
          .footer { text-align: center; color: #8A958D; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>🌿 AyuBazaar</h1>
            <p style="margin: 4px 0 0 0; color: #5C665F; font-size: 13px;">Tradition. Wellness. Everyday.</p>
            <div class="badge">PAID VIA RAZORPAY • DISPATCH REQUIRED</div>
          </div>

          <p style="font-size: 15px; line-height: 1.5;">A new prepaid order has been placed and verified successfully!</p>

          <div class="section-title">Order & Payment Overview</div>
          <table class="table">
            <tr>
              <td class="label">Razorpay Order ID:</td>
              <td class="value">${orderId}</td>
            </tr>
            <tr>
              <td class="label">Razorpay Payment ID:</td>
              <td class="value">${paymentId}</td>
            </tr>
            <tr>
              <td class="label">Order Date & Time:</td>
              <td class="value">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
            </tr>
          </table>

          <div class="section-title">Product Details</div>
          <table class="table">
            <tr>
              <td class="label">Product Name:</td>
              <td class="value">${product.name}</td>
            </tr>
            <tr>
              <td class="label">Quantity:</td>
              <td class="value">${product.quantity}</td>
            </tr>
            <tr>
              <td class="label">Unit Price:</td>
              <td class="value">${product.price}</td>
            </tr>
          </table>

          <div class="total-box">
            <div>Total Paid (Inclusive of Taxes)</div>
            <div class="price">₹${product.totalAmount.toLocaleString("en-IN")}</div>
          </div>

          <div class="section-title">Customer Contact & Shipping Address</div>
          <table class="table">
            <tr>
              <td class="label">Customer Name:</td>
              <td class="value">${customer.fullName}</td>
            </tr>
            <tr>
              <td class="label">Mobile Number:</td>
              <td class="value"><a href="tel:${customer.phone}" style="color: #174A3A; text-decoration: none;">+91 ${customer.phone}</a></td>
            </tr>
            <tr>
              <td class="label">Email Address:</td>
              <td class="value"><a href="mailto:${customer.email}" style="color: #174A3A; text-decoration: none;">${customer.email}</a></td>
            </tr>
            <tr>
              <td class="label">Delivery Address:</td>
              <td class="value">
                ${customer.addressLine}<br />
                ${customer.landmark ? `Landmark: ${customer.landmark}<br />` : ""}
                ${customer.city}, ${customer.state} - <strong>${customer.pincode}</strong><br />
                India
              </td>
            </tr>
          </table>

          <div class="footer">
            <p>© ${new Date().getFullYear()} AyuBazaar • Automated Fulfillment Dispatch Notification</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // If SMTP environment variables are configured, send real email
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const port = Number(process.env.SMTP_PORT) || 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ayubazaar.in",
        port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          // Allows connection even if cPanel uses a shared server SSL certificate
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"AyuBazaar Orders" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `🌿 New Paid Order #${orderId} - ${product.name} (₹${product.totalAmount})`,
        html: emailHtml,
      });

      console.log(`[AyuBazaar Email] Order alert sent to ${adminEmail} for #${orderId}`);
      return true;
    } catch (err) {
      console.error("[AyuBazaar Email Error] Failed to send email via SMTP:", err);
      return false;
    }
  } else {
    // Development / test fallback logging
    console.log("==================================================");
    console.log(`[AyuBazaar EMAIL ALERT (Dev Mode)] New Paid Order!`);
    console.log(`To: ${adminEmail}`);
    console.log(`Order: #${orderId} | Payment: ${paymentId}`);
    console.log(`Item: ${product.name} x ${product.quantity} = ₹${product.totalAmount}`);
    console.log(`Customer: ${customer.fullName} (+91 ${customer.phone}, ${customer.email})`);
    console.log(`Address: ${customer.addressLine}, ${customer.city}, ${customer.state} - ${customer.pincode}`);
    console.log("==================================================");
    return true;
  }
}
