import { cookies } from "next/headers";

export async function GET() {
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value || null;

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
