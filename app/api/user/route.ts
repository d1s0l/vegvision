import { NextResponse } from "next/server";
import { mockCurrentUser } from "@/entities/user";

export async function GET() {
  return NextResponse.json(mockCurrentUser);
}
