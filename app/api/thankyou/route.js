import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().delete("thankyou");
  return NextResponse.json({ success: true });
}
