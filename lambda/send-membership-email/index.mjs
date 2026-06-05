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
