export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { bootstrapAdmin } = await import("@/lib/bootstrap");
  try {
    await bootstrapAdmin();
  } catch (err) {
    console.error("[instrumentation] bootstrap failed:", err);
  }
}
