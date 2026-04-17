import type { Metadata } from "next";

import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthShell } from "@/components/auth/auth-shell";
import { ProviderButtons } from "@/components/auth/provider-buttons";
import { getAuthKitConfig } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your account",
};

type PageProps = {
  searchParams: Promise<{ returnTo?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { returnTo } = await searchParams;
  const config = getAuthKitConfig();

  return (
    <AuthShell branding={config.branding}>
      <ProviderButtons config={config} mode="login" returnTo={returnTo} />
      <AuthFooter mode="login" />
    </AuthShell>
  );
}
