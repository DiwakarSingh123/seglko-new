import { NextResponse } from "next/server";
import { getAdminAuth, saveAdminAuth } from "@/lib/admin-auth-store";
import { hashPassword, verifyPassword } from "@/lib/password";

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Current and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const auth = await getAdminAuth();

    if (!verifyPassword(currentPassword, auth.passwordHash)) {
      return NextResponse.json(
        { success: false, error: "Current password is incorrect." },
        { status: 401 }
      );
    }

    if (verifyPassword(newPassword, auth.passwordHash)) {
      return NextResponse.json(
        { success: false, error: "New password must be different from the current password." },
        { status: 400 }
      );
    }

    await saveAdminAuth({
      ...auth,
      passwordHash: hashPassword(newPassword),
    });

    return NextResponse.json({ success: true, message: "Password changed successfully." });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to change password. Please try again." },
      { status: 500 }
    );
  }
}
