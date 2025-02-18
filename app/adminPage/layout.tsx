"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // 🔥 Obligatoire pour récupérer les cookies
      });

      const data = await res.json();
      if (!data.token) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Vérification...</p>
      </div>
    ); // Affiche une page de chargement temporaire
  }

  return <>{children}</>;
}
