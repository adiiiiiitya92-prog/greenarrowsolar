# Green Arrow Solar — greenarrowsolar.com

Next.js (App Router) + Tailwind CSS v4 + Framer Motion. SEO-focused for Jabalpur & Madhya Pradesh.

## Run

```bash
npm install
cp .env.example .env.local        # fill SESSION_SECRET etc.
npm run dev                       # http://localhost:3000
npm run build && npm start        # production
```

## Before going live (owner TODO)

1. Edit real phone / email / address / founder name in `lib/site.ts` (or `NEXT_PUBLIC_*` env vars).
2. Replace the SVG founder placeholder in `components/Sections.tsx` (`FounderCard`) with a real photo via `next/image`, and swap the logo in `components/Logo.tsx` / `app/icon.svg` if you have the original artwork.
3. Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, and a 48-byte random `SESSION_SECRET` on the server.
4. Create the admin: `node scripts/create-admin.mjs you@example.com "LongPassword!" admin` (`viewer` role = read-only). Dashboard at `/admin`.
5. Schedule `node scripts/backup-db.mjs` daily (cron / Task Scheduler) and copy `backups/` off-server.
6. Deploy on a Node host with a **persistent disk** (VPS, Railway, Render disk). SQLite will not persist on serverless (Vercel) — swap `lib/db.ts` for a hosted DB there.
7. Serve over HTTPS behind a proxy that sets `X-Forwarded-Proto` (the app redirects http→https and sends HSTS).
8. Submit `/sitemap.xml` in Google Search Console and create a Google Business Profile for Jabalpur.

## Security notes

- Forms: zod validation on client and server, honeypot + minimum-fill-time, per-IP rate limit, same-origin (CSRF) check, JSON-only.
- DB: only prepared statements with bound parameters. Output is escaped by React.
- Admin: scrypt password hashes, HMAC-signed httpOnly/SameSite=Strict/secure cookie, 8h expiry, login rate limit, roles (`admin` can change/delete, `viewer` read-only). Server Actions carry Next's built-in CSRF protection.
- Headers: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy. No secrets use `NEXT_PUBLIC_`.
- Rate limiter is in-memory (single instance). Use Redis for multiple instances.
- Error monitoring: `instrumentation.ts` logs structured server errors; forward to Sentry there if desired.
