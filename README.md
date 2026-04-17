# Auth Kit — reusable Next.js + Auth0

A **standalone, copy-friendly** authentication kit built on the [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0) (`@auth0/nextjs-auth0`). Use it as a template for new products: configurable branding, Google and database connections, first-party login/signup pages, session-aware layout, and documented env and integration steps.

## Features

- **Configurable module surface** — `src/auth-kit.config.ts` controls app name, tagline, optional logo, Auth0 connection names, and which providers appear (Google-only, database-only, or both).
- **Custom login & sign-up** — `/login` and `/signup` routes with branded UI; buttons navigate to `/auth/login` with `connection`, `screen_hint=signup`, and safe `returnTo` (handled by the SDK).
- **Google + email/password** — Email/password flows use your **database connection** on Auth0 (Universal Login for the credential step). Google uses your **social** connection (default name `google-oauth2`).
- **Inline flow patterns** — Documented in [docs/INLINE-FLOWS.md](./docs/INLINE-FLOWS.md): connection selection, signup hint, logout `returnTo`, and hosted fallback.
- **Session & logout** — `Auth0Provider` + server `getSession()`; logout via `/auth/logout` using anchor links (see [docs/INLINE-FLOWS.md](./docs/INLINE-FLOWS.md)).
- **Examples** — Protected `dashboard` page; JSON `GET /api/me` for a BFF-style check.

## Quick start

```bash
npm install
cp .env.example .env.local
# Set AUTH0_SECRET (openssl rand -hex 32), AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, APP_BASE_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Example configuration

Edit **`src/auth-kit.config.ts`**:

```ts
export const authKitConfig: AuthKitConfig = {
  branding: {
    appName: "My Product",
    tagline: "Short line shown under the title.",
    // logoUrl: "/logo.svg",
  },
  connections: {
    google: "google-oauth2",
    database: "Username-Password-Authentication",
  },
  providers: {
    google: true,
    database: true,
  },
  signInReturnToPath: "/dashboard",
};
```

Optional API audience: set `AUTH0_AUDIENCE` in `.env.local`; it is merged into SDK `authorizationParameters` (see `src/lib/auth/config.ts`).

## Documentation

| Doc | Content |
|-----|---------|
| [docs/SETUP.md](./docs/SETUP.md) | Auth0 application, connections, Vercel |
| [docs/ENV.md](./docs/ENV.md) | Environment variable contract |
| [docs/INTEGRATION.md](./docs/INTEGRATION.md) | Copying the kit into another app |
| [docs/INLINE-FLOWS.md](./docs/INLINE-FLOWS.md) | `returnTo`, connections, logout |
| [docs/release-notes.md](./docs/release-notes.md) | Version history |

## Project layout (auth-related)

| Path | Role |
|------|------|
| `src/lib/auth/` | `Auth0Client`, URL helpers, types |
| `src/auth-kit.config.ts` | Product-facing config |
| `src/proxy.ts` | Next.js 16 **proxy** — Auth0 middleware boundary |
| `src/app/login`, `src/app/signup` | Custom auth UI |
| `src/app/dashboard` | Example protected page |

Auth0 routes (defaults): **`/auth/login`**, **`/auth/logout`**, **`/auth/callback`**.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build (requires Auth0 env vars)
npm run start    # Serve production build
npm run lint     # ESLint
```

For `next build`, provide at least `AUTH0_SECRET`, `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, and usually `APP_BASE_URL`.

## Security notes

- Keep **Client Secret** and **AUTH0_SECRET** server-side only.
- Prefer **relative** `returnTo` paths; the SDK validates redirects.
- Use `<a href="/auth/...">` for login/logout navigations so cookies and redirects behave correctly (see SDK docs).

## License

MIT (same spirit as the upstream Auth0 SDK; add your own license file if you fork this repo for a product).
