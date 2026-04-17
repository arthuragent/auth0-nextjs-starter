import { Auth0Client } from "@auth0/nextjs-auth0/server";

import { authKitConfig } from "@/auth-kit.config";

import { getMergedAuthorizationParameters } from "./config";

/**
 * Single Auth0 client for middleware, Server Components, and route handlers.
 */
export const auth0 = new Auth0Client({
  signInReturnToPath: authKitConfig.signInReturnToPath ?? "/",
  authorizationParameters: getMergedAuthorizationParameters(),
});
