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
    await dynamo.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          firstName: d.firstName ?? "",
          lastName: d.lastName ?? "",
          phone: d.phone ?? "",
          email: d.email ?? "",
          memberNumber: d.memberNumber ?? "",
          birthDatePlace: d.birthDatePlace ?? "",
          gender: d.gender ?? "",
          profession: d.profession ?? "",
          idNumber: d.idNumber ?? "",
          idType: d.idType ?? "",
          idIssueDetails: d.idIssueDetails ?? "",
          idExpirationDate: d.idExpirationDate ?? "",
          address: d.address ?? "",
          commune: d.commune ?? "",
          message: d.message ?? "",
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
