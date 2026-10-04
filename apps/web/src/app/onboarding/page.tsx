"use client";

import { useState } from "react";

const roles = [
  ["farmer", "🌾 Farmer"],
  ["buyer", "🛒 Buyer / Trader"],
  ["company", "🏢 Agri Company"],
  ["expert", "👨‍🌾 Agriculture Expert"]
];

export default function OnboardingPage() {
  const [role, setRole] = useState("");

  return (
    <main style={{ padding: 24 }}>
      <h1>Choose your role</h1>
      <p>Select how you will use Kisan Network.</p>

      {roles.map(([id, label]) => (
        <button
          key={id}
          onClick={() => setRole(id)}
          style={{ display: "block", marginTop: 12, padding: 16 }}
        >
          {label}
        </button>
      ))}

      {role && <p>Selected: {role}</p>}
    </main>
  );
}
