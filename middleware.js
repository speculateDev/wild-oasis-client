import NextAuth from "next-auth";
import { authConfig } from "./app/_lib/auth";
import { NextResponse } from "next/server";
import { protectedRoutes, authRoute } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtected = protectedRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoute.includes(nextUrl.pathname);

  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL(`/login`, nextUrl.origin));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(`/`, nextUrl.origin));
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
