@AGENTS.md

# Nexus Health

A freestanding, self-hosted, multi-user health and food tracking PWA. Single instance per host. Open-source MIT.

## Architecture

- **Next.js 16** App Router (TypeScript, React 19)
- **Postgres 16** via Prisma ORM. Schema in `prisma/schema.prisma`, migrations in `prisma/migrations/`.
- **Auth.js** — email + password, invite-only, JWT sessions
- **Tailwind CSS 4**
- **Docker Compose** — `app` + `postgres` + `uploads` volume

The full stack is in this repo. No external services required.

## Key design decisions

- **Single tenant per instance, multi-user.** A "household app." Admin invites users (family, friends); each user has their own data.
- **No public signup.** Invite-only. The first admin is bootstrapped via env vars (`ADMIN_EMAIL` / `ADMIN_PASSWORD`, default `admin` / `password`); they're forced to change credentials on first login.
- **Foods are shared on an instance, everything else is per-user.**
  - `foods` table is global on the instance; `created_by` is for accountability only, not access control.
  - `user_food_pins` (a per-user "My Foods" list) is the personal filter — auto-pinned when a user creates a food; user can manually pin/unpin any food.
  - `meals`, `diary_entries`, `health_metrics`, `journal`, `tags` — all per-user.
- **Soft delete** on user-facing content (foods, meals, health metrics, food tags).

## Commands

```bash
npm run dev              # Local dev server
npm run build            # Production build (runs prisma generate)
npm start                # Production start (runs prisma migrate deploy)
npm run db:migrate       # Create a new migration in dev
npm run db:studio        # Open Prisma Studio
docker compose up -d     # Run the full stack locally
```

## Out of scope (deferred)

- Multi-tenancy / SaaS features
- Billing
- HIPAA infrastructure
- Cross-instance food federation (e.g. push to Open Food Facts)
- Household sharing of meals / recipes (a "publish recipe" feature for later)
