import type { AuthKitConfig } from "@/lib/auth/types";

/**
 * Example configuration surface for this kit. Copy `src/lib/auth/` and this file into
 * other apps and adjust branding, connection names, and provider toggles.
 */
export const authKitConfig: AuthKitConfig = {
  branding: {
    appName: "Auth Kit",
    tagline: "Reusable Next.js + Auth0 sign-in for your products.",
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
