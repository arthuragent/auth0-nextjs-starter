import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth0, buildAuthLogoutUrl } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/login?returnTo=/dashboard");
  }

  const { user } = session;

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col gap-8 px-4 py-16">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Example protected route using a server session.
          </p>
        </div>
        <a
          href={buildAuthLogoutUrl("/")}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
        >
          Log out
        </a>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {user.picture ? (
            <Image
              src={user.picture}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-lg font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              {(user.name ?? user.email ?? "?").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
              {user.name ?? user.nickname ?? "Signed in user"}
            </p>
            {user.email ? (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.email}</p>
            ) : null}
            <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-500">
              sub: {user.sub}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
