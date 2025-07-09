import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "^/$", // Home page (exact match)
  "^/about$", // About page (exact match)
  "^/contact$", // Contact page (exact match)
  "^/news$", // News listing page (exact match)
  "^/news/[^/]+$", // Individual news articles (slug pattern)
  "^/terms$", // Terms root page (exact match)
  "^/terms/.*", // All terms subpages
  "^/login-required$", // Special route for showing login prompt
  "^/verify-email/.*", // Email verification pages
  "^/regulations/.*", // Regulations pages
];

const AUTH_ROUTES = [
  "^/auth$", // Auth API root
  "^/auth/.*", // All auth API endpoints
];

const ALWAYS_ACCESSIBLE = [
  "^/_next/.*", // Next.js internal routes
  "^/favicon\\.ico$", // Favicon
  "^/public/.*", // Public assets
  "^/static/.*", // Static assets
  "^/sw\\.js$", // Service worker
  "^/manifest\\.webmanifest$", // PWA manifest
  "^/offline$", // Offline page
  "^/robots\\.txt$", // Robots.txt
  "^/sitemap\\.xml$", // Sitemap
  ".*\\.(png|jpg|jpeg|gif|svg|ico|css|js|webp|woff|woff2|ttf|eot)$", // Static file extensions
];

// Compile regex patterns once for better performance
const PUBLIC_ROUTES_REGEX = PUBLIC_ROUTES.map((pattern) => new RegExp(pattern));
const AUTH_ROUTES_REGEX = AUTH_ROUTES.map((pattern) => new RegExp(pattern));
const ALWAYS_ACCESSIBLE_REGEX = ALWAYS_ACCESSIBLE.map(
  (pattern) => new RegExp(pattern),
);

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES_REGEX.some((regex) => regex.test(pathname));
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES_REGEX.some((regex) => regex.test(pathname));
}

function isAlwaysAccessible(pathname: string): boolean {
  return ALWAYS_ACCESSIBLE_REGEX.some((regex) => regex.test(pathname));
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow access to static assets and auth routes
  if (isAlwaysAccessible(pathname) || isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  // Allow access to public routes without authentication
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // For all other routes, check authentication
  const session = await auth();

  if (!session?.user) {
    // Redirect to login-required page with the original URL as a parameter
    const loginUrl = new URL("/login-required", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
