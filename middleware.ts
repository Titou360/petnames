import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    interface DecodedToken {
      role: string;
      // add other properties as needed
    }

    const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET || "supersecret") as DecodedToken;

    // 🔥 Vérifie si c'est une page Admin et si l'utilisateur a le rôle "admin"
    const isAdminRoute = req.nextUrl.pathname.startsWith("/adminpage");
    if (isAdminRoute && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/adminPage", req.url)); // 🚫 Redirige vers le Dashboard normal
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/adminpage/:path*"], // 🔥 Protection des routes sensibles
};
