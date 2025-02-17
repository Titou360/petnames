import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Liste des pages protégées
const protectedRoutes = ["/adminPage"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (protectedRoutes.includes(url.pathname)) {
    if (!token) {
      url.pathname = "/login"; // Redirection vers login
      return NextResponse.redirect(url);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET || "supersecret"); // Vérification du token
    } catch {
      url.pathname = "/login"; // Redirection si le token est invalide
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // Continuer normalement si tout est OK
}

export const config = {
  matcher: "/dashboard", // Middleware appliqué uniquement sur /dashboard
};
