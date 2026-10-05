"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const roles = [
  ["farmer", "🌾 Farmer"],
  ["buyer", "🛒 Buyer / Trader"],
  ["company", "🏢 Agri Company"],
  ["expert", "👨‍🌾 Agriculture Expert"]
];

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function selectRole(role: string) {
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.rpc("set_my_role", {
      new_role: role
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    const dashboardRoutes: Record<string, string> = {
      farmer: "/dashboard/farmer",
      buyer: "/dashboard/buyer",
      company: "/dashboard/company",
      expert: "/dashboard/expert"
    };

    router.push(dashboardRoutes[role] || "/");
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Choose your role</h1>
      <p>Select how you will use Kisan Network.</p>

      {roles.map(([id, label]) => (
        <button
          key={id}
          disabled={loading}
          onClick={() => selectRole(id)}
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            padding: 16
          }}
        >
          {label}
        </button>
      ))}

      {message && <p>{message}</p>}
    </main>
  );
}
