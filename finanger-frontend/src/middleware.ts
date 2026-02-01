import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/transactions(.*)',
  '/analytics(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Log to terminal to prove it's alive
  console.log("🔒 Middleware checking:", req.nextUrl.pathname);

  if (isProtectedRoute(req)) {
     await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};