import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ses = new SESClient({ region: "us-east-1" });
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

const TABLE = "kopera-prospect";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const row = (label, value) =>
  value
    ? `<tr>
        <td style="padding:6px 12px;color:#555;font-weight:bold;width:220px">${label}</td>
        <td style="padding:6px 12px">${value}</td>
       </tr>`
    : "";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  try {
    const d = JSON.parse(event.body ?? "{}");

    // ── Approval email ────────────────────────────────────────────────────────
    if (d.action === "approval") {
      if (!d.email) throw new Error("email required for approval action");

      const approvalHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1a5c2e;padding:24px 32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:22px">KAFA — Kooperativ Asirans Fanmi Ayisyen</h1>
          </div>
          <div style="padding:32px;background:#fff">
            <h2 style="color:#1a5c2e;margin-top:0">Congratulations, ${d.name ?? ""}! 🎉</h2>
            <p>We are pleased to inform you that your KAFA membership application has been <strong>approved</strong>. Welcome to the KAFA family!</p>
            <div style="background:#f0faf4;border-left:4px solid #1a5c2e;padding:16px 20px;margin:24px 0;border-radius:4px">
              <p style="margin:0;font-weight:bold;color:#1a5c2e">Your Member Number</p>
              <p style="margin:8px 0 0;font-size:20px;letter-spacing:1px">${d.memberNumber ?? "—"}</p>
            </div>
            <p>You can now access your member portal to view your plan, make payments, and manage your account:</p>
            <div style="text-align:center;margin:32px 0">
              <a href="https://member.kafayiti.com"
                 style="background:#1a5c2e;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;display:inline-block">
                Access Member Portal
              </a>
            </div>
            <p>If you have any questions, feel free to reach us:</p>
            <ul style="color:#333;line-height:2">
              <li>📧 <a href="mailto:kontak@kafayiti.com" style="color:#1a5c2e">kontak@kafayiti.com</a></li>
              <li>📞 (509) 3500-0326 / (509) 4439-8595</li>
              <li>🌐 <a href="https://kafayiti.com" style="color:#1a5c2e">kafayiti.com</a></li>
            </ul>
          </div>
          <div style="background:#f0f0f0;padding:16px 32px;text-align:center;font-size:12px;color:#888">
            KAFA — 874 Rue Ste Catherine, Léogâne, Haïti
          </div>
        </div>`;

      await ses.send(
        new SendEmailCommand({
          Source: "KAFA <noreply@kafayiti.com>",
          Destination: { ToAddresses: [d.email] },
          Message: {
            Subject: { Data: "KAFA — Membership Approved! Welcome to the Family" },
            Body: { Html: { Data: approvalHtml } },
          },
        })
      );

      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ success: true }),
      };
    }

    // Write prospect to DynamoDB
    const prospectId = crypto.randomUUID();
    await dynamo.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          id: prospectId,
          createdAt: new Date().toISOString(),
          memberNumber: d.memberNumber ?? "",
          firstName: d.firstName ?? "",
          lastName: d.lastName ?? "",
          phone: d.phone ?? "",
          email: d.email ?? "",
          plan: d.plan ?? "",
          message: d.message ?? "",
          data: {
            address: d.address ?? "",
            birthDatePlace: d.birthDatePlace ?? "",
            commune: d.commune ?? "",
            gender: d.gender ?? "",
            idNumber: d.idNumber ?? "",
            idType: d.idType ?? "",
            idIssueDetails: d.idIssueDetails ?? "",
            idExpirationDate: d.idExpirationDate ?? "",
            profession: d.profession ?? "",
          },
        },
      })
    );

    // Send notification email via SES
    const html = `
      <div style="font-family:sans-serif;max-width:640px;margin:0 auto">
        <h2 style="color:#1a5c2e;border-bottom:2px solid #1a5c2e;padding-bottom:8px">
          New Membership Application
        </h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          ${row("Member Number", d.memberNumber)}
          ${row("First Name", d.firstName)}
          ${row("Last Name", d.lastName)}
          ${row("Phone", d.phone)}
          ${row("Email", d.email)}
          ${row("Plan Selected", d.plan)}
          ${row("Place of Birth", d.birthDatePlace)}
          ${row("Gender", d.gender)}
          ${row("Profession", d.profession)}
          ${row("ID Number", d.idNumber)}
          ${row("ID Type", d.idType)}
          ${row("ID Issue Details", d.idIssueDetails)}
          ${row("ID Expiration", d.idExpirationDate)}
          ${row("Address", d.address)}
          ${row("Commune", d.commune)}
          ${row("Questions or Comments", d.message)}
        </table>
        <p style="font-size:12px;color:#999;margin-top:24px">
          Submitted via kafayiti.com
        </p>
      </div>`;

    await ses.send(
      new SendEmailCommand({
        Source: "KAFA Membership <noreply@kafayiti.com>",
        Destination: { ToAddresses: ["kontak@kafayiti.com"] },
        Message: {
          Subject: {
            Data: `New Membership Application — ${d.lastName ?? ""} ${d.firstName ?? ""}`.trim(),
          },
          Body: { Html: { Data: html } },
        },
      })
    );

    // Send confirmation email to prospect (if email provided)
    if (d.email) {
      const name = `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim();
      const confirmHtml = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1a5c2e;padding:24px 32px;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:22px">KAFA — Kooperativ Asirans Fanmi Ayisyen</h1>
          </div>
          <div style="padding:32px;background:#fff">
            <p style="font-size:16px">Dear ${name},</p>
            <p>Thank you for submitting your KAFA membership application. We have received your information and a KAFA representative will contact you shortly.</p>
            <div style="background:#f5f5f5;border-left:4px solid #1a5c2e;padding:16px 20px;margin:24px 0;border-radius:4px">
              <p style="margin:0;font-weight:bold;color:#1a5c2e">Your Member Number</p>
              <p style="margin:8px 0 0;font-size:20px;letter-spacing:1px">${d.memberNumber ?? "—"}</p>
            </div>
            <p>If you have any questions in the meantime, feel free to reach us:</p>
            <ul style="color:#333;line-height:2">
              <li>📧 <a href="mailto:kontak@kafayiti.com" style="color:#1a5c2e">kontak@kafayiti.com</a></li>
              <li>📞 (509) 3500-0326 / (509) 4439-8595</li>
              <li>🌐 <a href="https://kafayiti.com" style="color:#1a5c2e">kafayiti.com</a></li>
            </ul>
          </div>
          <div style="background:#f0f0f0;padding:16px 32px;text-align:center;font-size:12px;color:#888">
            KAFA — 874 Rue Ste Catherine, Léogâne, Haïti
          </div>
        </div>`;

      await ses.send(
        new SendEmailCommand({
          Source: "KAFA <noreply@kafayiti.com>",
          Destination: { ToAddresses: [d.email] },
          Message: {
            Subject: { Data: "KAFA — Membership Application Received" },
            Body: { Html: { Data: confirmHtml } },
          },
        })
      );
    }

    // Send WhatsApp notification via Twilio
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM;
    const whatsappTo = process.env.TWILIO_WHATSAPP_TO;

    if (twilioSid && twilioToken && whatsappFrom && whatsappTo) {
      const name = `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim();
      const whatsappBody = [
        "📋 *New KAFA Membership Application*",
        `👤 Name: ${name}`,
        `📞 Phone: ${d.phone ?? ""}`,
        d.email ? `📧 Email: ${d.email}` : null,
        d.message ? `💬 Message: ${d.message}` : null,
        `🕐 ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`,
        "",
        `👉 View prospect: https://admin.kafayiti.com?prospect=${prospectId}`,
      ].filter((l) => l !== null).join("\n");

      await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: whatsappFrom,
            To: whatsappTo,
            Body: whatsappBody,
          }).toString(),
        }
      );
    }

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
