# Green Arrow Solar — greenarrowsolar.com

Next.js (App Router, **static export**) + Tailwind CSS v4 + Framer Motion + **Firebase** (Firestore + Auth). Installable PWA.
No backend server: `npm run build` produces a static `out/` folder that runs on Netlify or Cloudflare Pages.

- Contact form → writes a lead straight into Firestore `leads` (validated by `firestore.rules`).
- `/admin` → Firebase email/password login, live lead list, status/notes, delete, CSV export.

## Run locally

```bash
npm install
cp .env.example .env.local        # paste Firebase keys
npm run dev                       # http://localhost:3000
npm run build                     # static site in ./out
npx serve out                     # preview the production build (PWA works here)
```

## 1. Firebase setup (one time)

1. https://console.firebase.google.com → **Add project** (Analytics optional).
2. **Build → Firestore Database → Create database** → Production mode → region `asia-south1 (Mumbai)`.
3. **Firestore → Rules** → paste the whole of `firestore.rules` → **Publish**.
4. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable**.
5. **Project settings (gear) → General → Your apps → `</>` Web** → register app → copy the `firebaseConfig` values into `.env.local`:

   | firebaseConfig key  | .env variable                              |
   | ------------------- | ------------------------------------------ |
   | apiKey              | NEXT_PUBLIC_FIREBASE_API_KEY               |
   | authDomain          | NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN           |
   | projectId           | NEXT_PUBLIC_FIREBASE_PROJECT_ID            |
   | storageBucket       | NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET        |
   | messagingSenderId   | NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID   |
   | appId               | NEXT_PUBLIC_FIREBASE_APP_ID                |

## 2. Create an admin (email + password)

1. **Authentication → Users → Add user** → enter email + strong password → **Add user**.
2. Copy that user's **User UID** from the list.
3. **Firestore → Data → Start collection** → Collection ID `admins` → Document ID = *the UID* →
   field `role` (string) = `admin` (full access) or `viewer` (read-only) → **Save**.
4. Open `/admin`, sign in. Forgot password? Use the link on the login form, or Authentication → Users → ⋮ → Reset password.

To remove someone: delete their `admins/<uid>` document (and/or disable the user in Authentication).

## 3. Deploy

**Cloudflare Pages (recommended — free, fast in India, easy GoDaddy domain):**
Workers & Pages → Create → Pages → Connect to Git → pick repo → Framework preset *Next.js (Static HTML Export)* /
Build command `npm run build`, Output directory `out` → add all `NEXT_PUBLIC_*` env vars plus `NODE_VERSION` = `24` → Deploy.

**Netlify:** Add new site → Import from Git → pick repo (build settings come from `netlify.toml`) →
Site configuration → Environment variables → add all `NEXT_PUBLIC_*` → Deploy.

Env vars are baked in at build time: after changing one, trigger a new deploy.

## 4. Before going live

1. Real phone / email / address in `lib/site.ts` or `NEXT_PUBLIC_*` env vars; set `NEXT_PUBLIC_SITE_URL` to the final domain.
2. Firebase → Authentication → Settings → **Authorized domains** → add `greenarrowsolar.com`, `www.greenarrowsolar.com` and the `*.pages.dev` / `*.netlify.app` URL.
3. Optional hardening: Google Cloud Console → APIs & Services → Credentials → the Browser key → *Website restrictions* → your domains.
4. Submit `/sitemap.xml` in Google Search Console.
5. After a big release, bump `VERSION` in `public/sw.js` so installed PWAs drop old caches.

## Security notes

- Firebase web config is public by design. Access control is entirely in `firestore.rules`:
  anyone may **create** a lead (strict schema, size and format checks, `status == "new"`, server timestamp); only users listed in `admins` can read; only `role: admin` can update status/note or delete. Nothing else is readable or writable.
- Form: zod validation, honeypot + minimum-fill-time. Firebase Auth has built-in login brute-force throttling.
- Headers (`public/_headers`): CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy.
- CSV export neutralises spreadsheet formulas.
