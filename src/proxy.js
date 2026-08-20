import { clerkMiddleware } from "@clerk/nextjs/server";

// Route protection lives in each page (see /, /register, /chargers), per
// Clerk's guidance to use resource-based auth checks instead of path
// matching here. This just attaches the Clerk session context.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
