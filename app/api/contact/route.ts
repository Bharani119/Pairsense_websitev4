import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const name = data.get("name")?.toString() ?? "";
  const email = data.get("email")?.toString() ?? "";
  const company = data.get("company")?.toString() ?? "";
  const market = data.get("market")?.toString() ?? "";
  const application = data.get("application")?.toString() ?? "";
  const message = data.get("message")?.toString() ?? "";
  const budget = data.get("budget")?.toString() ?? "";
  const window = data.get("window")?.toString() ?? "";

  if (!name || !email || !company || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.SMTP_TO,
    subject: `New brief from ${name} — ${company}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Market: ${market}`,
      `Application: ${application}`,
      `Budget: ${budget}`,
      `Launch Window: ${window}`,
      ``,
      `Brief:`,
      message,
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
