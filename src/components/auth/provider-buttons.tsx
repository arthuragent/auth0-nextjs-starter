import { buildAuthLoginUrl } from "@/lib/auth/urls";
import type { AuthKitConfig } from "@/lib/auth/types";

type ProviderButtonsProps = {
  config: AuthKitConfig;
  mode: "login" | "signup";
  /** Where to send the user after Auth0 completes (relative path) */
  returnTo?: string | null;
};

function GoogleIcon() {
  return (
    <svg
      aria-hidden
      className="h-5 w-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function ProviderButtons({
  config,
  mode,
  returnTo,
}: ProviderButtonsProps) {
  const screenHint = mode === "signup" ? "signup" : "login";
  const { google, database } = config.providers;

  const googleHref = buildAuthLoginUrl({
    config,
    connection: config.connections.google,
    screenHint,
    returnTo,
  });

  const dbHref = buildAuthLoginUrl({
    config,
    connection: config.connections.database,
    screenHint,
    returnTo,
  });

  const enabled = google || database;

  if (!enabled) {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
        No providers are enabled in <code className="font-mono text-xs">auth-kit.config</code>.
        Enable Google and/or the database connection, or use Auth0 Universal Login from the
        dashboard.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {google ? (
        <a
          href={googleHref}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
        >
          <GoogleIcon />
          Continue with Google
        </a>
      ) : null}
      {database ? (
        <a
          href={dbHref}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          {mode === "signup" ? "Sign up with email" : "Continue with email"}
        </a>
      ) : null}
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
        Email/password uses your Auth0 database connection (Auth0-hosted login step for
        credentials).
      </p>
    </div>
  );
}
