import Link from "next/link";

type AuthFooterProps = {
  mode: "login" | "signup";
};

export function AuthFooter({ mode }: AuthFooterProps) {
  if (mode === "login") {
    return (
      <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
        No account?{" "}
        <Link
          href="/signup"
          className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
        >
          Sign up
        </Link>
      </p>
    );
  }
  return (
    <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
      Already have an account?{" "}
      <Link
        href="/login"
        className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
      >
        Log in
      </Link>
    </p>
  );
}
