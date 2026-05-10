import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Алексей",
    fullName: "Алексей Смирнов",
    email: "alexey@vegvision.app",
    username: "alexey",
    role: "Главный агроном",
  });
}
