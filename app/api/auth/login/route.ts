import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

// ✅ Simuler une vérification en base de données
if (email !== "admin@petnames.com" || password !== "password123") {
  return new Response(JSON.stringify({ message: "Invalid credentials" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

// ✅ Déterminer les permissions en fonction du rôle
let permissions = ["read"]; // Par défaut, "read" pour les utilisateurs standards
if (email === "admin@petnames.com") {
  permissions = ["read", "write", "delete"]; // L'administrateur a toutes les permissions
}

// ✅ Génération du token JWT avec les permissions
const token = jwt.sign(
  { id: "ad503c5c-deba-4d77-a85b-c03a4f512622", email, role: "user", permissions },
  process.env.JWT_SECRET || "supersecret",
  { expiresIn: "1h" }
);

// ✅ Stocker le token dans les cookies avec Next.js
const cookieStore = await cookies();
cookieStore.set("token", token, {
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 3600,
});

return new Response(JSON.stringify({ message: "Login successful" }), {
  status: 200,
  headers: { "Content-Type": "application/json" },
});

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
