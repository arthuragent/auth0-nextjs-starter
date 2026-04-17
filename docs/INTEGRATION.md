# Integrating this kit into another Next.js app

## What to copy

1. **`src/lib/auth/`** — Auth0 client factory, URL helpers, and types.
2. **`src/auth-kit.config.ts`** — Branding, connection names, provider toggles, and optional `authorizationParameters`.
3. **`src/proxy.ts`** — Network boundary for Auth0 (Next.js 16 **proxy**; replaces deprecated `middleware.ts` for this flow).
4. **UI (optional)** — `src/components/auth/*`, `src/app/login/`, `src/app/signup/`, and protected examples (`src/app/dashboard/`, `src/app/api/me/`).
5. **Root layout** — Wrap with `Auth0Provider` from `@auth0/nextjs-auth0/client` and pass `session?.user` from `auth0.getSession()` (see `src/app/layout.tsx`).

## Dependencies

```bash
npm install @auth0/nextjs-auth0
```

Peer requirements: Node **20+**, Next.js and React versions compatible with the SDK (see [@auth0/nextjs-auth0](https://www.npmjs.com/package/@auth0/nextjs-auth0)).

## Steps

1. Copy the files above into your app (adjust import aliases if you do not use `@/*` → `./src/*`).
2. Merge `layout.tsx` changes so server session and `Auth0Provider` wrap your tree.
3. Add environment variables per [ENV.md](./ENV.md) and [SETUP.md](./SETUP.md).
4. Tune `auth-kit.config.ts`: `branding`, `connections`, `providers`, `signInReturnToPath`.
5. Replace example routes with your own protected pages and API handlers using `auth0.getSession()`.

## Protected routes

- **Server Components**: `const session = await auth0.getSession();` then `redirect("/login?returnTo=...")` if missing.
- **Route Handlers**: Same session check; return `401` for anonymous callers.
- **Client hooks**: With `Auth0Provider` in the tree, use `useUser()` from `@auth0/nextjs-auth0/client` where appropriate.

## Auth routes (SDK defaults)

| Path | Role |
|------|------|
| `/auth/login` | Starts interactive login; query params become authorization parameters (`connection`, `screen_hint`, etc.); `returnTo` is post-login path. |
| `/auth/logout` | Ends session; optional `returnTo` for post-logout redirect. |
| `/auth/callback` | OAuth callback (registered in Auth0). |

Custom pages at `/login` and `/signup` in this repo are **first-party UI** that link into `/auth/login` with the right query string—no duplicate OAuth implementation.
