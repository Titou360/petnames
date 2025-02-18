import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).set("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // Expire immédiatement
  });

  return new Response(JSON.stringify({ message: "Déconnexion réussie" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
