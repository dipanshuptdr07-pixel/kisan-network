"use client";

import { useState } from "react";

const roles = [
  ["farmer", "🌾", "Farmer"],
  ["buyer", "🛒", "Buyer / Trader"],
  ["company", "🏢", "Agri Company"],
  ["expert", "👨‍🌾", "Agriculture Expert"],
];

export default function OnboardingPage() {
  const [role, setRole] = useState("");

  return (
    <main style={{ minHeight: "100vh", padding: 24 }}>
      <h1>Choose your role</h1>
      <p>Select how you will use Kisan Network.</p>

      <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
        {roles.map(([id, icon, label]) => (
          <button
            key={id}
            onClick={() => setRole(id)}
            style={{ padding: 18, textAlign: "left" }}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {role && <p style={{ marginTop: 20 }}>Selected: {role}</p>}
    </main>
  );
}
