import type { AuthorizationParameters } from "@auth0/nextjs-auth0/types";

/**
 * Branding shown on login/signup screens. Safe to customize per product.
 */
export type AuthKitBranding = {
  /** Product name in headings */
  appName: string;
  /** Optional logo URL (same-origin or absolute HTTPS) */
  logoUrl?: string;
  /** Short line under the title */
  tagline?: string;
};

/**
 * Auth0 connection names (Dashboard → Authentication → your connection).
 */
export type AuthKitConnections = {
  /** Google social connection (often `google-oauth2`) */
  google: string;
  /** Username/password database connection */
  database: string;
};

export type AuthKitProviders = {
  google: boolean;
  database: boolean;
};

/**
 * Application-level auth kit config. Edit `src/auth-kit.config.ts` in consuming apps.
 */
export type AuthKitConfig = {
  branding: AuthKitBranding;
  connections: AuthKitConnections;
  /** Toggle which buttons appear (e.g. Google-only vs Google + database) */
  providers: AuthKitProviders;
  /**
   * Default post-login path when `returnTo` is not passed to `/auth/login`.
   * Mirrors Auth0 SDK `signInReturnToPath`.
   */
  signInReturnToPath?: string;
  /**
   * Static authorization parameters for every interactive login (audience, scope, etc.).
   * `AUTH0_AUDIENCE` is merged at runtime when set.
   */
  authorizationParameters?: AuthorizationParameters;
};
