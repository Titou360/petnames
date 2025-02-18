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
      permissions: string[]; // Ajouter permissions dans le token
    }

    const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET || "supersecret") as DecodedToken;

    // 🔥 Si l'utilisateur n'est pas autorisé à accéder à la page d'admin, on le redirige vers le login
    const isAdminRoute = req.nextUrl.pathname.startsWith("/adminpage");
    if (isAdminRoute && !decoded.permissions.includes("write")) { // Admin a besoin de la permission "write"
      return NextResponse.redirect(new URL("/login", req.url)); // 🚫 Si non admin, on redirige
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/adminpage/:path*"], // 🔥 Protection des routes sensibles
};

