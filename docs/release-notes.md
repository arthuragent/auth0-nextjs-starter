# Release notes

## 0.1.0 — Initial kit

- Next.js 16 App Router sample with `@auth0/nextjs-auth0` and **proxy** (`src/proxy.ts`) for the auth boundary.
- Configurable `auth-kit.config.ts` (branding, connections, provider toggles, default post-login path).
- Custom `/login` and `/signup` pages driving `/auth/login` with `connection` and `screen_hint`.
- Example protected dashboard and `/api/me` JSON endpoint.
- Documentation: setup, env contract, integration, and inline flow patterns.
