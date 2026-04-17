import Link from "next/link";

import {
  auth0,
  buildAuthLoginUrl,
  buildAuthLogoutUrl,
  getAuthKitConfig,
} from "@/lib/auth";

export default async function Home() {
  const session = await auth0.getSession();
  const config = getAuthKitConfig();

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {config.branding.appName}
          </span>
          <nav className="flex items-center gap-4 text-sm">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                >
                  Dashboard
                </Link>
                <a
                  href={buildAuthLogoutUrl("/")}
                  className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                >
                  Log out
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-1 flex-col justify-center gap-10 px-4 py-24">
        <div className="max-w-xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Next.js + Auth0
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            A reusable auth kit for your next product
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Opinionated session handling, custom login and signup screens, Google and
            database connections, and documented env and integration steps—ready to copy into
            new apps.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {session ? (
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Open dashboard
            </Link>
          ) : (
            <>
              <a
                href={buildAuthLoginUrl({
                  config,
                  returnTo: "/dashboard",
                })}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                Log in
              </a>
              <Link
                href="/signup?returnTo=/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 px-6 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
