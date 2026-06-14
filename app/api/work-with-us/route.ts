import { NextResponse } from "next/server"
import { isValidPhoneNumber } from "react-phone-number-input/input"

type WorkWithUsPayload = {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE_LENGTH = 3500

const getTextValue = (value: unknown) => (typeof value === "string" ? value.trim() : "")

const validatePayload = (payload: WorkWithUsPayload) => {
  const name = getTextValue(payload.name)
  const company = getTextValue(payload.company)
  const email = getTextValue(payload.email).toLowerCase()
  const phone = getTextValue(payload.phone)

  if (name.length < 2) {
    return { error: "Введите корректное имя" }
  }

  if (company.length < 2) {
    return { error: "Введите корректное название компании" }
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Введите корректный email" }
  }

  if (!isValidPhoneNumber(phone)) {
    return { error: "Введите корректный номер телефона" }
  }

  return {
    data: {
      name,
      company,
      email,
      phone,
    },
  }
}

const buildTelegramMessage = (data: NonNullable<ReturnType<typeof validatePayload>["data"]>) =>
  [
    "Новая заявка VegVision",
    "",
    `Имя: ${data.name}`,
    `Компания: ${data.company}`,
    `Email: ${data.email}`,
    `Телефон: ${data.phone}`,
  ]
    .join("\n")
    .slice(0, MAX_MESSAGE_LENGTH)

export async function POST(request: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json(
        { message: "Telegram integration is not configured" },
        { status: 500 },
      )
    }

    let payload: WorkWithUsPayload

    try {
      payload = (await request.json()) as WorkWithUsPayload
    } catch {
      return NextResponse.json({ message: "Некорректный формат заявки" }, { status: 400 })
    }

    const validationResult = validatePayload(payload)

    if ("error" in validationResult) {
      return NextResponse.json({ message: validationResult.error }, { status: 400 })
    }

    let telegramResponse: Response

    try {
      telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramMessage(validationResult.data),
          disable_web_page_preview: true,
        }),
      })
    } catch {
      return NextResponse.json(
        { message: "Не удалось подключиться к Telegram API" },
        { status: 502 },
      )
    }

    if (!telegramResponse.ok) {
      return NextResponse.json(
        { message: "Не удалось отправить заявку в Telegram" },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { message: "Не удалось обработать заявку" },
      { status: 500 },
    )
  }
}
