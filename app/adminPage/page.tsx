"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string; permissions: string[] } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();
        if (!data.token) {
          router.push("/login");
        } else {
          setUser({ email: data.email, role: data.role, permissions: data.permissions });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du token:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    toast.success("Déconnexion réussie !");
    router.push("/login");
  };

  // Vérifier que l'utilisateur et ses permissions sont bien définis
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Page</h2>

        <p className="text-center mb-4">
          Bienvenue, <strong>{user.email}</strong> !<br />
          Rôle: <strong>{user.role}</strong>
        </p>

        {/* Vérification que user.permissions est défini avant d'utiliser .includes */}
        <div className="space-y-4">
          <p>Actions disponibles :</p>
          {user.permissions && user.permissions.includes("read") && <p>📖 Voir les données</p>}
          {user.permissions && user.permissions.includes("write") && (
            <button className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              ✍️ Ajouter un nom d’animal
            </button>
          )}
          {user.permissions && user.permissions.includes("delete") && (
            <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
              🗑 Supprimer un nom d’animal
            </button>
          )}
        </div>

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
