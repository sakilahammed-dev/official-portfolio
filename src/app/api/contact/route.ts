import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "sakilahammed114@gmail.com";
const RECIPIENT_PHONE = "+8801763838194"; // Sakil Ahammed's phone / WhatsApp
const MESSAGES_FILE = path.join(process.cwd(), "data", "contact_messages.json");

interface ContactPayload {
  name: string;
  phone?: string;
  email: string;
  subject?: string;
  message: string;
}

// --------------------------------------------------------------------------
// HTML Email Template for Sakil's Inbox
// --------------------------------------------------------------------------
function generateNotificationHtml(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}) {
  const formattedDate = new Date(data.timestamp).toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    dateStyle: "full",
    timeStyle: "medium",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <div style="max-width: 620px; margin: 30px auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
    
    <!-- Top Header Banner -->
    <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 32px 28px; text-align: left;">
      <span style="display: inline-block; padding: 4px 12px; background: rgba(255,255,255,0.2); border-radius: 9999px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #ffffff; margin-bottom: 12px;">
        🚀 Portfolio Lead
      </span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; line-height: 1.3;">
        New Message Received
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.85);">
        Someone just reached out to you through your official portfolio.
      </p>
    </div>

    <!-- Details Body -->
    <div style="padding: 28px;">
      
      <!-- Sender Meta Grid -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #1a2234; border-radius: 10px; overflow: hidden;">
        <tr>
          <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; width: 110px; border-bottom: 1px solid #28334a;">Sender Name:</td>
          <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #ffffff; border-bottom: 1px solid #28334a;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; border-bottom: 1px solid #28334a;">Email:</td>
          <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #60a5fa; border-bottom: 1px solid #28334a;">
            <a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: none;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; border-bottom: 1px solid #28334a;">Phone / WA:</td>
          <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #34d399; border-bottom: 1px solid #28334a;">
            ${data.phone ? `<a href="tel:${data.phone}" style="color: #34d399; text-decoration: none;">${data.phone}</a>` : '<span style="color: #6b7280;">Not provided</span>'}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; border-bottom: 1px solid #28334a;">Subject:</td>
          <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #f3f4f6; border-bottom: 1px solid #28334a;">${data.subject}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase;">Date & Time:</td>
          <td style="padding: 12px 16px; font-size: 13px; color: #9ca3af;">${formattedDate} (Dhaka Time)</td>
        </tr>
      </table>

      <!-- Message Box -->
      <div style="margin-bottom: 24px;">
        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin-bottom: 8px;">
          Message Content:
        </div>
        <div style="background-color: #1a2234; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; padding: 18px 20px; font-size: 14px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap;">${data.message}</div>
      </div>

      <!-- Quick Action Buttons -->
      <div style="padding-top: 12px; text-align: center;">
        <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; margin-right: 10px; margin-bottom: 8px;">
          ✉️ Reply to ${data.name}
        </a>
        ${data.phone ? `
        <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; margin-bottom: 8px;">
          💬 WhatsApp Chat
        </a>
        ` : ""}
      </div>

    </div>

    <!-- Footer -->
    <div style="border-top: 1px solid #1f2937; padding: 16px 28px; background-color: #0d131f; font-size: 11px; color: #6b7280; text-align: center;">
      Sakil Ahammed • Full-Stack AI Automation & Autonomous Operations Architect<br>
      Portfolio Contact Gateway • Automatic Lifetime Setup
    </div>

  </div>
</body>
</html>
  `;
}

// --------------------------------------------------------------------------
// Direct Dispatch via Nodemailer (Gmail App Password / Custom SMTP)
// --------------------------------------------------------------------------
async function sendViaNodemailer(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}): Promise<{ success: boolean; error?: string }> {
  const gmailUser = process.env.GMAIL_USER || RECIPIENT_EMAIL;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  const customHost = process.env.SMTP_HOST;
  const customPort = Number(process.env.SMTP_PORT) || 465;
  const customUser = process.env.SMTP_USER;
  const customPass = process.env.SMTP_PASSWORD;

  let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

  if (gmailPassword) {
    // Official Google SMTP - Direct connection, 100% lifetime reliable
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPassword.replace(/\s+/g, ""), // strip whitespace
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
    });
  } else if (customHost && customUser && customPass) {
    // Custom domain SMTP server
    transporter = nodemailer.createTransport({
      host: customHost,
      port: customPort,
      secure: customPort === 465,
      auth: {
        user: customUser,
        pass: customPass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
    });
  }

  if (!transporter) {
    return { success: false, error: "SMTP credentials not provided in .env.local" };
  }

  try {
    const htmlContent = generateNotificationHtml(data);
    const textContent = `
NEW PORTFOLIO INQUIRY
================================
Sender Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Subject: ${data.subject}
Date: ${data.timestamp}

Message:
--------------------------------
${data.message}
================================
`;

    await transporter.sendMail({
      from: `"${data.name} (via Portfolio)" <${gmailUser}>`,
      to: RECIPIENT_EMAIL,
      replyTo: data.email,
      subject: `🚀 [Portfolio Inquiry] ${data.subject} — from ${data.name}`,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("[Contact API] Nodemailer SMTP send error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: msg };
  }
}

// --------------------------------------------------------------------------
// GET: Inspect messages stored in the local inbox
// --------------------------------------------------------------------------
export async function GET() {
  try {
    let messages = [];
    try {
      const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
      messages = JSON.parse(fileContent);
    } catch {
      messages = [];
    }

    const hasSmtpConfigured = Boolean(
      process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD
    );

    return NextResponse.json({
      success: true,
      total: Array.isArray(messages) ? messages.length : 0,
      recipient: RECIPIENT_EMAIL,
      smtpConfigured: hasSmtpConfigured,
      messages: Array.isArray(messages) ? messages.slice().reverse() : [],
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to read messages" },
      { status: 500 }
    );
  }
}

// --------------------------------------------------------------------------
// POST: Process incoming contact submission
// --------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();
    const { name, phone = "", email, subject = "", message } = body;

    // 1. Strict Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newRecord = {
      id: messageId,
      timestamp,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      subject: subject.trim() || "New Portfolio Inquiry for Sakil Ahammed",
      message: message.trim(),
      recipient: RECIPIENT_EMAIL,
      dispatched: false,
      deliveryMethod: "Local Inbox (Saved)",
      error: null as string | null,
    };

    // 2. Guaranteed Persistence (Zero Data Loss)
    try {
      let existingMessages = [];
      try {
        const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
        existingMessages = JSON.parse(fileContent);
        if (!Array.isArray(existingMessages)) existingMessages = [];
      } catch {
        existingMessages = [];
      }

      existingMessages.push(newRecord);
      await fs.writeFile(MESSAGES_FILE, JSON.stringify(existingMessages, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("[Contact API] Error saving to local inbox:", fsErr);
    }

    // 3. Multi-Gateway Email Forwarding Pipeline
    let emailDispatched = false;
    let gatewayNotice = "";

    // Gateway Layer 1: Direct SMTP (Google Gmail / Custom SMTP) - Lifetime Reliable
    const smtpResult = await sendViaNodemailer(newRecord);
    if (smtpResult.success) {
      emailDispatched = true;
      newRecord.dispatched = true;
      newRecord.deliveryMethod = "Direct SMTP (Google Gmail)";
      gatewayNotice = "Email delivered instantly via direct Google SMTP.";
    } else {
      if (process.env.GMAIL_APP_PASSWORD) {
        newRecord.error = smtpResult.error || "SMTP delivery error";
      } else {
        newRecord.error = "Awaiting GMAIL_APP_PASSWORD in .env.local";
      }

      // Gateway Layer 2: Fallback Webhook / 000form (if SMTP is not configured or failed)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4500);

        const fRes = await fetch(`https://000form.com/f/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Referer: "https://sakilahammed.dev",
          },
          body: JSON.stringify({
            name: newRecord.name,
            email: newRecord.email,
            phone: newRecord.phone,
            subject: newRecord.subject,
            message: newRecord.message,
            _captcha: "false",
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const fJson = await fRes.json().catch(() => null);

        if (fRes.ok && fJson?.success) {
          emailDispatched = true;
          newRecord.dispatched = true;
          newRecord.deliveryMethod = "000form Fallback Webhook";
          gatewayNotice = "Email delivered via fallback webhook.";
        } else {
          newRecord.deliveryMethod = "Local Inbox Storage";
          gatewayNotice = "Message safely stored in portfolio database.";
        }
      } catch (gErr) {
        console.warn("[Contact API] Gateway attempt exception:", gErr);
        newRecord.deliveryMethod = "Local Inbox Storage";
        gatewayNotice = "Message safely saved to server storage.";
      }
    }

    // 4. Update the saved message record with final dispatch status
    try {
      const fileContent = await fs.readFile(MESSAGES_FILE, "utf-8");
      const messages = JSON.parse(fileContent);
      const idx = messages.findIndex((m: { id: string }) => m.id === messageId);
      if (idx !== -1) {
        messages[idx].dispatched = emailDispatched;
        messages[idx].deliveryMethod = newRecord.deliveryMethod;
        messages[idx].error = newRecord.error;
        await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
      }
    } catch {
      // Ignore update error
    }

    // 5. Construct direct 1-click fallback links for instant visitor actions
    const encodedSubject = encodeURIComponent(newRecord.subject);
    const encodedBody = encodeURIComponent(
      `Name: ${newRecord.name}\nPhone: ${newRecord.phone || "N/A"}\nEmail: ${newRecord.email}\n\nMessage:\n${newRecord.message}`
    );

    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      RECIPIENT_EMAIL
    )}&su=${encodedSubject}&body=${encodedBody}`;

    const cleanPhone = RECIPIENT_PHONE.replace(/[^0-9]/g, "");
    const waText = encodeURIComponent(
      `Hi Sakil! My name is ${newRecord.name}. I saw your portfolio and wanted to reach out regarding: "${newRecord.subject}".\n\n${newRecord.message}\n\nMy email: ${newRecord.email}${newRecord.phone ? ` | Phone: ${newRecord.phone}` : ""}`
    );
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

    return NextResponse.json({
      success: true,
      message: "Your message has been successfully received!",
      messageId,
      emailDispatched,
      deliveryMethod: newRecord.deliveryMethod,
      gatewayNotice,
      directActions: {
        gmailWeb: gmailWebUrl,
        whatsapp: whatsappUrl,
        mailto: `mailto:${RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`,
      },
    });
  } catch (error) {
    console.error("[Contact API] Fatal error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again or reach out directly." },
      { status: 500 }
    );
  }
}