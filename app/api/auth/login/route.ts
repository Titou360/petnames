import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // 🚨 Remplace ceci par une vraie vérification en base de données
  if (email !== "admin@petnames.com" || password !== "password123") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // ✅ Génération du token JWT
  const token = jwt.sign(
    { id: "ad503c5c-deba-4d77-a85b-c03a4f512622", email, role: "user" },
    process.env.JWT_SECRET || "supersecret",
    { expiresIn: "1h" }
  );

  // ✅ Stocker le cookie
  res.setHeader("Set-Cookie", serialize("token", token, {
    path: "/", // Disponible sur tout le site
    httpOnly: false, // ⚠️ Mettre `false` pour permettre l'accès en JS
    secure: process.env.NODE_ENV === "production", // HTTPS seulement en production
    sameSite: "strict",
    maxAge: 3600, // Expiration en 1 heure
  }));

  return res.status(200).json({ message: "Login successful", token });
}
