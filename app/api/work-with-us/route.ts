import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const functionUrl = process.env.WORK_WITH_US_FUNCTION_URL

  if (!functionUrl) {
    return NextResponse.json(
      { message: "Work-with-us function is not configured" },
      { status: 500 },
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
  }

  let response: Response

  try {
    response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  } catch {
    return NextResponse.json(
      { message: "Could not connect to work-with-us function" },
      { status: 502 },
    )
  }

  const text = await response.text()

  try {
    return NextResponse.json(JSON.parse(text), { status: response.status })
  } catch {
    return NextResponse.json(
      { message: response.ok ? "OK" : "Invalid function response" },
      { status: response.status },
    )
  }
}
