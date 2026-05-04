import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import ChangeForm from "./change-form";

export default async function ForcePasswordChangePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.mustChangePassword) redirect("/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Set up your account</h1>
          <p className="mt-2 text-sm text-gray-500">
            You signed in with the bootstrap admin credentials. Set a real
            email and password before you can use Nexus Health.
          </p>
        </div>
        <ChangeForm currentEmail={user.email} />
      </div>
    </main>
  );
}
