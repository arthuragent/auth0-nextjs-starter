import type { AuthKitConfig } from "./types";

const DEFAULT_LOGIN_ROUTE = "/auth/login";
const DEFAULT_LOGOUT_ROUTE = "/auth/logout";

/**
 * Prevent open redirects: only allow same-origin relative paths.
 * The Auth0 SDK also validates `returnTo`; this keeps UI-generated URLs predictable.
 */
export function sanitizeReturnTo(
  value: string | null | undefined,
  fallback = "/",
): string {
  if (!value || typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed.startsWith("/")) return fallback;
  if (trimmed.startsWith("//")) return fallback;
  if (trimmed.includes("\\")) return fallback;
  return trimmed;
}

type BuildLoginUrlOptions = {
  config: AuthKitConfig;
  /** Auth0 connection name */
  connection?: string;
  screenHint?: "signup" | "login";
  /** Post-auth path (validated before sending) */
  returnTo?: string | null;
};

/**
 * Build `/auth/login` URL with query params forwarded by the Auth0 SDK to `/authorize`.
 */
export function buildAuthLoginUrl(options: BuildLoginUrlOptions): string {
  const params = new URLSearchParams();
  const returnTo = sanitizeReturnTo(options.returnTo);
  if (returnTo !== "/") {
    params.set("returnTo", returnTo);
  }
  if (options.screenHint === "signup") {
    params.set("screen_hint", "signup");
  }
  if (options.connection) {
    params.set("connection", options.connection);
  }
  const qs = params.toString();
  return `${DEFAULT_LOGIN_ROUTE}${qs ? `?${qs}` : ""}`;
}

export function buildAuthLogoutUrl(returnTo?: string | null): string {
  const safe = sanitizeReturnTo(returnTo, "/");
  const params = new URLSearchParams();
  if (safe !== "/") {
    params.set("returnTo", safe);
  }
  const qs = params.toString();
  return `${DEFAULT_LOGOUT_ROUTE}${qs ? `?${qs}` : ""}`;
}

export const authRoutes = {
  login: DEFAULT_LOGIN_ROUTE,
  logout: DEFAULT_LOGOUT_ROUTE,
} as const;
