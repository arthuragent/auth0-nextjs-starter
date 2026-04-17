import type { AuthorizationParameters } from "@auth0/nextjs-auth0/types";

import { authKitConfig } from "@/auth-kit.config";

/**
 * Runtime merge of static config with optional API audience from env.
 */
export function getMergedAuthorizationParameters():
  | AuthorizationParameters
  | undefined {
  const base = authKitConfig.authorizationParameters ?? {};
  const audience = process.env.AUTH0_AUDIENCE?.trim();
  if (!audience) {
    return Object.keys(base).length ? base : undefined;
  }
  return { ...base, audience };
}

export function getAuthKitConfig() {
  return authKitConfig;
}
