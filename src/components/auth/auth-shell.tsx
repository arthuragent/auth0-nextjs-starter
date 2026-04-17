import Image from "next/image";

import type { AuthKitBranding } from "@/lib/auth/types";

type AuthShellProps = {
  branding: AuthKitBranding;
  children: React.ReactNode;
};

export function AuthShell({ branding, children }: AuthShellProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 px-4 py-16 dark:from-zinc-950 dark:to-black">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <header className="mb-8 text-center">
          {branding.logoUrl ? (
            <div className="mb-4 flex justify-center">
              <Image
                src={branding.logoUrl}
                alt=""
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                unoptimized
              />
            </div>
          ) : null}
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {branding.appName}
          </h1>
          {branding.tagline ? (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {branding.tagline}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </div>
  );
}
