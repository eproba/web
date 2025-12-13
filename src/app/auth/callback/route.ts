import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const redirectTo = decodeURIComponent(searchParams.get("redirectTo") || "/");

  if (!session?.user) {
    redirect(redirectTo, RedirectType.replace);
  }

  // Note: Better Auth doesn't automatically include user profile data from your backend
  // You may need to check patrol separately through your API
  redirect(redirectTo, RedirectType.replace);
}
