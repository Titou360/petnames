import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  // 🔥 Récupérer le token depuis les cookies
  
  const cookies = req.cookies.getAll();
console.log("🔍 Cookies reçus dans le middleware:", cookies);

const token = req.cookies.get("token")?.value;
console.log("🔍 Token extrait du middleware:", token);



  // Si pas de token, rediriger vers /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // 🔥 Vérifier le token
    console.log("Token reçu par le middleware:", token);
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    // Si token invalide, rediriger vers /login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// 🔹 Appliquer le middleware aux routes protégées
export const config = {
  matcher: ["/dashboard/:path*"],
};
