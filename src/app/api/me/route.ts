import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth";

/**
 * Example BFF-style route: returns 401 without a session, JSON profile when logged in.
 */
export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json(
      { error: "not_authenticated", description: "No active session" },
      { status: 401 },
    );
  }
  const { user } = session;
  return NextResponse.json({
    sub: user.sub,
    name: user.name,
    email: user.email,
    picture: user.picture,
  });
}
