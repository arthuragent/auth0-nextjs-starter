# Inline auth flow patterns

“Inline” here means **first-party routes and buttons** in your app (not an iframe). The actual credential step for database users is still **Auth0 Universal Login** (hosted) unless you implement a separate custom grant (not part of this kit).

## Connection-specific login

The Auth0 Next.js SDK forwards query parameters from `/auth/login` to the `/authorize` request (except `returnTo`, which is stored in transaction state).

Examples:

- Google only: `/auth/login?connection=google-oauth2`
- Database only: `/auth/login?connection=Username-Password-Authentication`

This kit’s buttons use `buildAuthLoginUrl()` so connection names come from `auth-kit.config.ts`.

## Sign-up vs sign-in

- **Sign-up**: add `screen_hint=signup` → `/auth/login?screen_hint=signup&connection=...`
- **Sign-in**: omit `screen_hint` or use the default login experience for your tenant

The **Sign up** page in this repo passes `screen_hint=signup` for both provider buttons.

## Safe `returnTo`

- Pass **relative** paths only (e.g. `/dashboard`). The SDK validates redirects against your app base URL.
- From custom pages, use `?returnTo=/dashboard` on `/login` or `/signup`; helpers pass that through to `/auth/login`.

## Google-only vs Google + email/password

Toggle `providers.google` and `providers.database` in `auth-kit.config.ts`. When both are `false`, the UI shows a warning; hosted Universal Login remains available from the Auth0 Dashboard for emergencies.

## Logout and session

- Use an **anchor** to `/auth/logout` (or `buildAuthLogoutUrl("/")`) so the request is a full navigation (required for cookie updates).
- Optional: `returnTo` query parameter on `/auth/logout` for where to land after Auth0 logout (subject to **Allowed Logout URLs**).

## Hosted fallback

If you disable custom pages or need the default Auth0 experience, send users directly to `/auth/login` or configure **New Universal Login** branding in the Auth0 Dashboard.
