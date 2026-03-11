import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: {
      Allow: "POST",
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: Number(import.meta.env.SMTP_PORT),
      secure: false, // 587 uses TLS
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: import.meta.env.CONTACT_FROM_EMAIL || import.meta.env.SMTP_USER,
      to: import.meta.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry from ${name} (Portfolio)`,
      html: `
        <div style="font-family: sans-serif; background-color: #0b1220; padding: 30px; color: #ffffff; border-radius: 12px; border: 1px solid #c7a76c;">
          <h2 style="color: #e6d3aa; margin-top: 0;">New Message Received</h2>
          <hr style="border-color: #c7a76c; opacity: 0.3;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; line-height: 1.6;">${message}</p>
          </div>
          <p style="font-size: 11px; color: #64748b; margin-top: 25px;">
            Sent from your portfolio backend • ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error("SMTP Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
};
