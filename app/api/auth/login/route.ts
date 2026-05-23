import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/admin-auth-store";
import { verifyPassword } from "@/lib/password";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const auth = await getAdminAuth();
    const emailMatch = email.trim().toLowerCase() === auth.email.toLowerCase();
    const passwordMatch = verifyPassword(password, auth.passwordHash);

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, email: auth.email });
  } catch {
    return NextResponse.json(
      { success: false, error: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
