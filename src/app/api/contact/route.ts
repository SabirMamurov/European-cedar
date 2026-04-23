import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * TODO: wire up real email delivery once SMTP/Resend/Postmark credentials are provided.
 *
 * Current behaviour:
 *   - validates payload
 *   - logs structured enquiry (visible in server logs / hosting provider dashboard)
 *   - always responds { ok: true } on success
 *
 * When enabling real delivery:
 *   1. Install chosen provider SDK (e.g. `resend`, `nodemailer` + SMTP).
 *   2. Add env vars: MAIL_FROM, RESEND_API_KEY (or SMTP_*).
 *   3. Inside POST, after validation, call provider.send({ from, to: siteConfig.sales.email, subject, text, replyTo: email }).
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const notBot = body?.notBot === true;
    // Honeypot — hidden input that real users never touch. If it has a value,
    // the submission is almost certainly a bot.
    const honeypot = typeof body?.company === "string" ? body.company.trim() : "";

    if (honeypot) {
      // Silently accept to avoid tipping off the bot, but drop the payload.
      return NextResponse.json({ ok: true });
    }

    if (!notBot) {
      return NextResponse.json(
        { ok: false, error: "Bot check failed" },
        { status: 400 },
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 },
      );
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const enquiry = {
      to: siteConfig.sales.email,
      from: { name, email },
      message,
      at: new Date().toISOString(),
    };

    console.log(
      `[contact] new enquiry → ${enquiry.to} from ${name} <${email}>:\n${message}\n--- at ${enquiry.at}`,
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 },
    );
  }
}
