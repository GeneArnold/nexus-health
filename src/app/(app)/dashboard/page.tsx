import { requireUser } from "@/lib/dal";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Welcome{user.name ? `, ${user.name}` : ""}</h1>
      <p className="mt-2 text-sm text-gray-500">
        Phase 1 placeholder. Foods, diary, meals, journal, and metrics land in
        upcoming commits.
      </p>
    </div>
  );
}
