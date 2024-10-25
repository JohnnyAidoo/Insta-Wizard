import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/(api|trpc)(.*)",
  "/api(.*)",
  "/sign-up(.*)",
  "/",
]);

// Allowed CORS Origin
const allowedOrigins = [
  "http://localhost:3000",
  "https://insta-wizard-johnnyaidoos-projects.vercel.app/",
  "https://insta-wizard.vercel.app/",
  "https://insta-wizard.onrender.com/",
  // Add other allowed domains
];

export default clerkMiddleware((auth, request) => {
  const response = NextResponse.next();

  // Add CORS headers for API routes
  if (request.url.includes("/api")) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", "*"); // Replace with your domain in production
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT,OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
    );

    // Handle OPTIONS preflight request
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }
  }

  if (!isPublicRoute(request)) {
    auth().protect();
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/api/:path*",
  ],
};
