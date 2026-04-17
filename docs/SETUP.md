# Auth0 and Vercel setup

## 1. Create an Auth0 application

1. In [Auth0 Dashboard](https://manage.auth0.com/), create an application of type **Regular Web Application**.
2. Under **Settings**, note **Domain**, **Client ID**, and **Client Secret**.
3. Configure:
   - **Allowed Callback URLs**: `http://localhost:3000/auth/callback` (add production URLs when ready).
   - **Allowed Logout URLs**: `http://localhost:3000` (and production origins).
   - **Allowed Web Origins**: your app origins if you use cross-origin flows.

## 2. Enable connections

- **Google**: Authentication → Social → Google. Use the default connection name `google-oauth2` or set `connections.google` in `src/auth-kit.config.ts` to match.
- **Username / password**: Authentication → Database → create or use **Username-Password-Authentication** (or rename and update `connections.database` in the config).

## 3. Local environment

1. Copy `.env.example` to `.env.local`.
2. Set `AUTH0_SECRET` (`openssl rand -hex 32`), `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, and `APP_BASE_URL=http://localhost:3000`.
3. Run `npm run dev` and open [http://localhost:3000](http://localhost:3000).

## 4. Vercel

1. Add the same variables in the Vercel project **Environment Variables** (Production and Preview as needed).
2. For Preview deployments, you may omit `APP_BASE_URL` so the SDK infers the preview URL; **each preview host** must still be listed under Auth0 **Allowed Callback URLs** (wildcard patterns are supported in Auth0 for trusted patterns).
3. Ensure **Logout URLs** include your production domain and any preview pattern you rely on.
