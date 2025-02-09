import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  console.log("🔍 Token extrait du middleware:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// 🔹 Appliquer le middleware aux routes protégées
export const config = {
  matcher: ["/dashboard/:path*"],
};
