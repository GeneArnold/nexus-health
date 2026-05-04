"use server";

import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { getSession } from "@/lib/dal";

export type LoginState =
  | { error: string }
  | { ok: true }
  | undefined;

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const ok = await compare(password, user.passwordHash);
  if (!ok) {
    return { error: "Invalid email or password." };
  }

  await createSession({ userId: user.id, role: user.role });

  redirect(user.mustChangePassword ? "/force-password-change" : "/dashboard");
}

export async function logout(): Promise<never> {
  await deleteSession();
  redirect("/login");
}

export type ChangePasswordState =
  | { error: string }
  | { ok: true }
  | undefined;

export async function changeInitialCredentials(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const newEmail = String(formData.get("email") ?? "").trim().toLowerCase();
  const newPassword = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!newEmail || !newEmail.includes("@")) {
    return { error: "Enter a valid email address." };
  }
  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existing = await db.user.findUnique({ where: { email: newEmail } });
  if (existing && existing.id !== session.userId) {
    return { error: "That email is already in use." };
  }

  const passwordHash = await hash(newPassword, 10);

  await db.user.update({
    where: { id: session.userId },
    data: {
      email: newEmail,
      passwordHash,
      mustChangePassword: false,
    },
  });

  redirect("/dashboard");
}
