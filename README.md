# Nexus Health

A self-hosted, multi-user health and food tracking PWA.

Track meals, log a daily diary, record health metrics, journal how you feel — for yourself and the people you invite — on hardware you control. No SaaS, no subscriptions, no telemetry.

## Status

**Early development.** Phase 1 (empty deployable scaffold with authentication) is in progress. Feature work follows.

## Quick start

You need Docker and Docker Compose.

```bash
git clone https://github.com/GeneArnold/nexus-health.git
cd nexus-health
cp .env.example .env
# Edit .env and set SESSION_SECRET (run: openssl rand -base64 32)
docker compose up -d
```

Open `http://localhost:3000` and log in with the bootstrap credentials:

- **Email:** `admin`
- **Password:** `password`

On first login you'll be required to set a real email and a real password before you can use anything else.

## Configuration

To override defaults, copy `.env.example` to `.env` and edit:

| Variable | Default | Notes |
|---|---|---|
| `SESSION_SECRET` | _(required)_ | Used to sign session cookies. Must be at least 32 characters. Generate with `openssl rand -base64 32`. |
| `POSTGRES_USER` | `nexus` | Postgres username |
| `POSTGRES_PASSWORD` | `nexus` | Postgres password |
| `POSTGRES_DB` | `nexus_health` | Database name |
| `ADMIN_EMAIL` | `admin` | Bootstrap admin login (only used until the first admin sets their real email) |
| `ADMIN_PASSWORD` | `password` | Bootstrap admin password (must be changed on first login) |

## Tech stack

- Next.js 16 (App Router)
- React 19
- Postgres 16
- Prisma (ORM + migrations)
- JWT sessions (`jose` + HTTP-only cookies)
- Tailwind CSS 4
- TypeScript

## License

MIT — see [LICENSE](./LICENSE).
