import { Resend } from "resend";

export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("❌ RESEND_API_KEY is missing");
    return; // or throw new Error("Email service disabled");
  }

  const resend = new Resend(apiKey);

  try {
    const response = await resend.emails.send({
      from: "Wardrobe Manager <no-reply@webdevprahlad.site>",
      to,
      subject,
      html,
    });
    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email");
  }
}
