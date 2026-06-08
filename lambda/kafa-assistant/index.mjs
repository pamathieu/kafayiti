import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { createHash } from "crypto";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));
const CHAT_TABLE = "kopera-chat";
const DAILY_LIMIT = 5;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are a helpful assistant for KAFA (Kooperativ Asirans Fanmi Ayisyen — Cooperative Insurance Force of Haiti). Answer questions using ONLY the knowledge base below. Be concise and friendly. Respond in whatever language the user writes in (Haitian Creole, French, English, Spanish, or Portuguese). Do not use HTML tags in your responses.

## GREETING BEHAVIOR
The chat UI has already displayed a welcome message asking the prospect for their full name and phone number. If the user's first message looks like contact information (a name, phone number, or both), acknowledge them warmly by name and offer to help. If they skip the contact info and ask a question directly, answer helpfully without blocking them.

---
KNOWLEDGE BASE
---

## WHAT IS KAFA?
KAFA (Cooperative Insurance Force of Haiti) is a cooperative insurance owned by its members. Its mission is to protect members against life's major challenges: death, illness, accidents, and other situations that can devastate a family's finances. KAFA acts in the best collective interest of its members, not in the interest of a single person.

Principles: Solidarity (each member helps protect others), Democracy (each member has one vote regardless of shares owned), Risk Mutualization (all members' risks are pooled together).

## WHY CHOOSE KAFA?
- 100% guaranteed payment of all valid claims according to the contract
- Affordable premiums: plans from 250,000 to 500,000 Gourdes coverage
- National coverage across all departments of Haiti
- Fast claims processing (3–14 business days)
- No medical exam required for most plans
- As a member, you are also a co-owner of the cooperative

## MEMBERSHIP — WHO CAN JOIN?
Any Haitian, regardless of where they live (Haiti or abroad), can become a KAFA member by:
1. Filling out the membership form (paper or online at kafayiti.com)
2. Paying the 500 Gdes membership fee
3. Buying at least 1 "social share" worth 5,000 Gdes
4. Agreeing to respect the cooperative's rules and statutes

## WHAT IS A "SOCIAL SHARE"?
A Social Share is your stake in the cooperative — the capital you invest as a member.
- Minimum price: 5,000 Gdes
- Makes you a co-owner of the cooperative
- Gives you the right to vote, participate, and receive year-end benefits if any
- It is a capital investment that confirms your status as member and co-owner.

## KAFA MEMBER vs INSURANCE SUBSCRIBER
- KAFA Member: person who owns social shares, has voting rights, and is a co-owner of the cooperative
- Insurance Subscriber: person who buys a funeral plan (not necessarily a member)
- You can have both roles if you subscribe to a plan AND become a member.

## FUNERAL INSURANCE PLANS
KAFA offers 3 main funeral insurance plans. All plans: no medical exam required, age acceptance 0–80.

**Basic Plan** — entry-level coverage
**Standard Plan** — mid-level coverage (most popular)
**Premium Plan** — highest coverage

All plans include:
- Fixed payment (100% guaranteed)
- Immediate protection (after 3 days)
- Flexible payment process
- National coverage

There is also a **Savings Plan** with unlimited savings and continuous deposit flexibility, open to ALL ages.

Payment frequency options: monthly, quarterly (3 months), or annually.
Accepted payment: cash, checks, bank transfers, mobile money (MonCash), online (Visa/Mastercard — coming soon).

## COMPENSATION TERMS (POLICY)
- After 2 years from contract issue: beneficiary receives 80% of the death benefit
- From year 3: beneficiary receives 90%
- From year 4: 100% fully covered
- If insured dies before 2 years of membership: 85% of premiums received by KAFA are refunded to the beneficiary

Grace period: 30 days after a missed premium — the insured can still pay without losing coverage or penalties.
Non-payment: coverage suspended 30 days after formal notice; contract terminated if not paid.

## EXCLUSIONS
Deaths due to acts of war, natural disasters, disappearance, pandemic, or suicide are not covered.

## HOW TO SUBMIT A CLAIM
Required documents:
- Death certificate
- ID of the person submitting the claim
- Contract/Policy number
- Information about the deceased (name, date & place of death)
- Any other proof requested by KAFA administration

Steps:
1. Log into the Member Portal
2. Go to the "Claims" section
3. Fill out the form and upload documents
4. Submit the file
5. KAFA administration verifies and contacts you

Processing time: 3 to 10 business days depending on document completeness.
Compensation paid to beneficiary within 7 to 14 business days.

## BENEFICIARIES
- You can name multiple beneficiaries who will receive the insurance money
- You can change beneficiaries at any time in your member account (online or at KAFA office)
- Must be done while you are alive and you are the contract owner

## MISSED PAYMENTS
KAFA does not revoke members immediately. There is a grace period to settle the delay without penalty, depending on plan type. Members always have privileges subject to cooperative regulations.

## HOW TO BECOME A KAFA MEMBER (4 steps)
1. Fill out the membership form (online at kafayiti.com or on paper)
2. Pay the membership fee (500 Gdes)
3. Buy 1 social share (5,000 Gdes minimum)
4. Receive your Member Number (ID)

The online membership form only requires first name, last name, and phone number as mandatory fields.

## MOBILE APP
The mobile app will be available very soon. For now, all services are available on the official website and Member Portal at kafayiti.com.

## CONTACT INFORMATION
- Address: 874 Rue Ste Catherine, Léogâne, Haiti
- Phone: (509) 3500-0326 / (509) 4439-8595 / (850) 321-4670
- Email: info@kafayiti.com / kontak@kafayiti.com
- Website: www.kafayiti.com
- Social media: Facebook, Instagram, TikTok, LinkedIn
- Contact options: phone, WhatsApp, email, contact form on website

---
If a question cannot be answered from the above knowledge base, say so honestly and direct the user to contact info@kafayiti.com or call (509) 3500-0326.`;

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseUserAgent(ua = "") {
  const browser = /Edg\//.test(ua) ? "Edge"
    : /Chrome\//.test(ua) ? "Chrome"
    : /Firefox\//.test(ua) ? "Firefox"
    : /Safari\//.test(ua) && !/Chrome/.test(ua) ? "Safari"
    : /MSIE|Trident/.test(ua) ? "IE" : "Unknown";

  const os = /iPhone|iPad/.test(ua) ? "iOS"
    : /Android/.test(ua) ? "Android"
    : /Windows/.test(ua) ? "Windows"
    : /Mac OS X/.test(ua) ? "macOS"
    : /Linux/.test(ua) ? "Linux" : "Unknown";

  const device = /Mobile|iPhone/.test(ua) ? "Mobile"
    : /iPad|Tablet/.test(ua) ? "Tablet" : "Desktop";

  return { browser, os, device };
}

function hashQuestion(q = "") {
  const normalized = q.toLowerCase().trim().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  return createHash("md5").update(normalized).digest("hex").substring(0, 16);
}

async function getIpLocation(ip) {
  try {
    if (!ip || ip === "127.0.0.1" || /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip)) {
      return "Local";
    }
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=city,regionName,country`);
    if (!res.ok) return "Unknown";
    const d = await res.json();
    return [d.city, d.regionName, d.country].filter(Boolean).join(", ") || "Unknown";
  } catch {
    return "Unknown";
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

    const {
      messages,
      sessionId,
      conversationType = "landing_page",
      memberName    = "",
      memberId      = "",
      prospectName  = "",
      prospectPhone = "",
    } = JSON.parse(event.body ?? "{}");
    if (!messages?.length) throw new Error("No messages provided");

    // ── Agent info ────────────────────────────────────────────────────────────
    const rawIp   = (event.headers?.["X-Forwarded-For"] ?? event.headers?.["x-forwarded-for"] ?? "Unknown");
    const ipAddress = rawIp.split(",")[0].trim();
    const userAgent = event.headers?.["User-Agent"] ?? event.headers?.["user-agent"] ?? "";
    const { browser, os, device } = parseUserAgent(userAgent);
    const today     = new Date().toISOString().split("T")[0];
    const fiveMinBucket = Math.floor(Date.now() / (5 * 60 * 1000));
    const ipDate    = `${ipAddress}#${fiveMinBucket}`;
    const timestamp = new Date().toISOString();
    const userMessage = messages[messages.length - 1]?.content ?? "";
    const qHash     = hashQuestion(userMessage);

    // ── Rate limit ────────────────────────────────────────────────────────────
    try {
      const rateResult = await dynamo.send(new QueryCommand({
        TableName: CHAT_TABLE,
        IndexName: "ip-rate-limit-index",
        KeyConditionExpression: "ipDate = :ipDate",
        ExpressionAttributeValues: { ":ipDate": ipDate },
        Select: "COUNT",
      }));

      if ((rateResult.Count ?? 0) >= DAILY_LIMIT) {
        return {
          statusCode: 429,
          headers: CORS,
          body: JSON.stringify({ limitReached: true }),
        };
      }
    } catch (e) {
      console.warn("Rate limit check unavailable:", e.message);
    }

    // ── Question cache ────────────────────────────────────────────────────────
    let reply;
    let fromCache = false;

    try {
      const cacheResult = await dynamo.send(new QueryCommand({
        TableName: CHAT_TABLE,
        IndexName: "question-cache-index",
        KeyConditionExpression: "questionHash = :qHash",
        ExpressionAttributeValues: { ":qHash": qHash },
        Limit: 1,
      }));

      if (cacheResult.Items?.length > 0) {
        reply     = cacheResult.Items[0].assistantResponse;
        fromCache = true;
      }
    } catch (e) {
      console.warn("Cache check unavailable:", e.message);
    }

    if (!reply) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages,
        }),
      });
      if (!res.ok) throw new Error(`Anthropic API error: ${await res.text()}`);
      reply = (await res.json()).content?.[0]?.text ?? "";
    }

    // ── Persist exchange ──────────────────────────────────────────────────────
    const location = await getIpLocation(ipAddress);

    dynamo.send(new PutCommand({
      TableName: CHAT_TABLE,
      Item: {
        sessionId:         sessionId ?? "anonymous",
        timestamp,
        ipDate,
        ipAddress,
        date:              today,
        userAgent,
        browser,
        os,
        deviceType:        device,
        location,
        conversationType,
        memberName,
        memberId,
        prospectName,
        prospectPhone,
        userMessage,
        assistantResponse: reply,
        questionHash:      qHash,
        fromCache,
      },
    })).catch((err) => console.error("DynamoDB write error:", err));

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ reply, fromCache }),
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
