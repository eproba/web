import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const session = await auth();

  const redirectTo = decodeURIComponent(searchParams.get("redirectTo") || "/");

  if (!session?.user) {
    redirect(redirectTo, RedirectType.replace);
  }

  if (!session.user.patrol) {
    const separator = redirectTo.includes("?") ? "&" : "?";
    redirect(
      `${redirectTo}${separator}openSelectPatrolDialog=true`,
      RedirectType.replace,
    );
  }

  redirect(redirectTo, RedirectType.replace);
}
