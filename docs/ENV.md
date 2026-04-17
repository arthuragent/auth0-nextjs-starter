# Environment contract

This kit reads configuration from **environment variables** (and from `src/auth-kit.config.ts` for product-specific options). Values are validated at runtime by the Auth0 Next.js SDK.

## Required for local and production

| Variable | Purpose |
|----------|---------|
| `AUTH0_SECRET` | 32-byte hex secret used to encrypt cookies. Generate with `openssl rand -hex 32`. |
| `AUTH0_DOMAIN` | Auth0 tenant hostname (e.g. `tenant.us.auth0.com`). |
| `AUTH0_CLIENT_ID` | Application **Client ID** (Regular Web Application). |
| `AUTH0_CLIENT_SECRET` | Application **Client Secret**. Never expose to the browser. |

## Strongly recommended

| Variable | Purpose |
|----------|---------|
| `APP_BASE_URL` | Absolute base URL of this app (e.g. `http://localhost:3000`, `https://app.example.com`). On Vercel preview deployments you may omit this so the SDK infers the host from the request (ensure Auth0 **Allowed Callback URLs** cover those hosts). |

## Optional

| Variable | Purpose |
|----------|---------|
| `AUTH0_AUDIENCE` | API identifier for Resource Owner / backend calls. Merged into `authorizationParameters` when set. |

## Cookie and advanced SDK options

The SDK supports additional `AUTH0_COOKIE_*` and other variables (see [@auth0/nextjs-auth0](https://github.com/auth0/nextjs-auth0) README). Use these when you need custom cookie domains, DPoP keys, or multiple allowed `APP_BASE_URL` values.

## Callback and logout URLs (Auth0 Dashboard)

Register URLs that match how users reach your app:

- **Allowed Callback URLs**: `{APP_BASE_URL}/auth/callback`
- **Allowed Logout URLs**: `{APP_BASE_URL}` (and specific paths if you use `returnTo`)

For local development, include `http://localhost:3000/auth/callback` and `http://localhost:3000`.
