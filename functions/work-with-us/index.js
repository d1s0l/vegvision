const dns = require("node:dns");
const https = require("node:https");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 3500;
const TELEGRAM_ATTEMPTS = 1;
const TELEGRAM_TIMEOUT_MS = 9000;

const json = (statusCode, payload) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
  body: JSON.stringify(payload),
});

const getTextValue = (value) => (typeof value === "string" ? value.trim() : "");

const validatePayload = (payload) => {
  const name = getTextValue(payload.name);
  const company = getTextValue(payload.company);
  const email = getTextValue(payload.email).toLowerCase();
  const phone = getTextValue(payload.phone);

  if (name.length < 2) {
    return { error: "Enter a valid name" };
  }

  if (company.length < 2) {
    return { error: "Enter a valid company name" };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Enter a valid email" };
  }

  if (!/^\+\d{10,15}$/.test(phone)) {
    return { error: "Enter a valid phone number" };
  }

  return {
    data: {
      name,
      company,
      email,
      phone,
    },
  };
};

const buildTelegramMessage = (data) =>
  [
    "New VegVision request",
    "",
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
  ]
    .join("\n")
    .slice(0, MAX_MESSAGE_LENGTH);

const postTelegramJson = ({ token, payload }) =>
  new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const request = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${token}/sendMessage`,
        method: "POST",
        family: 4,
        lookup: (hostname, options, callback) => {
          dns.lookup(hostname, { ...options, family: 4 }, callback);
        },
        timeout: TELEGRAM_TIMEOUT_MS,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (response) => {
        response.resume();
        response.on("end", () => {
          resolve({
            ok: response.statusCode >= 200 && response.statusCode < 300,
            status: response.statusCode,
            statusText: response.statusMessage,
          });
        });
      },
    );

    request.on("timeout", () => {
      request.destroy(new Error("Telegram request timed out"));
    });

    request.on("error", reject);
    request.write(body);
    request.end();
  });

const sendTelegramMessage = async ({ token, chatId, text }) => {
  let lastError;

  for (let attempt = 1; attempt <= TELEGRAM_ATTEMPTS; attempt += 1) {
    try {
      const response = await postTelegramJson({
        token,
        payload: {
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        },
      });

      if (response.ok) {
        return response;
      }

      lastError = new Error(`Telegram returned ${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }

    console.error("Telegram send attempt failed", {
      attempt,
      name: lastError instanceof Error ? lastError.name : "UnknownError",
      message: lastError instanceof Error ? lastError.message : String(lastError),
      code: lastError && typeof lastError === "object" ? lastError.code : undefined,
      syscall: lastError && typeof lastError === "object" ? lastError.syscall : undefined,
    });
  }

  throw lastError;
};

module.exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(204, {});
  }

  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return json(500, { message: "Telegram integration is not configured" });
  }

  let payload;

  try {
    const body = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body || "{}";

    payload = JSON.parse(body);
  } catch {
    return json(400, { message: "Invalid request body" });
  }

  const validationResult = validatePayload(payload);

  if (validationResult.error) {
    return json(400, { message: validationResult.error });
  }

  try {
    await sendTelegramMessage({
      token,
      chatId,
      text: buildTelegramMessage(validationResult.data),
    });
  } catch (error) {
    console.error("Telegram request failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : String(error),
      code: error && typeof error === "object" ? error.code : undefined,
      syscall: error && typeof error === "object" ? error.syscall : undefined,
    });

    return json(502, { message: "Could not connect to Telegram API" });
  }

  return json(200, { ok: true });
};
