import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export async function bootstrapAdmin(): Promise<void> {
  const userCount = await db.user.count();
  if (userCount > 0) return;

  const email = process.env.ADMIN_EMAIL ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "password";

  const passwordHash = await hash(password, 10);

  await db.user.create({
    data: {
      email,
      passwordHash,
      role: "ADMIN",
      mustChangePassword: true,
    },
  });

  console.log(
    `[bootstrap] Created initial admin user (email: ${email}). ` +
      `User must change credentials on first login.`,
  );
}
