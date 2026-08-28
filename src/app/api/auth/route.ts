import { NextResponse } from "next/server";
import { DEMO_COOKIE_NAME, generateSessionToken, isValidPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: "Invalid demo access password. Please try again." },
        { status: 401 }
      );
    }

    const token = generateSessionToken();
    const response = NextResponse.json({ success: true });

    // Set HTTP-only session cookie for 30 days
    response.cookies.set({
      name: DEMO_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(DEMO_COOKIE_NAME);
  return response;
}
