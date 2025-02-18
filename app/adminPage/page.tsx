"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // 🔥 Obligatoire pour inclure le cookie
        });

        const data = await res.json();
        if (!data.token) {
          router.push("/login");
        } else {
          setUser("Utilisateur connecté");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du token:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
  
      toast.success("Déconnexion réussie !");
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>

        <p className="text-center mb-4">Bienvenue, {user} !</p>

        <button
          onClick={handleLogout}
          className="w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
