"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sendOtp() {
    if (!phone.trim()) {
      setMessage("Phone number enter karo.");
      return;
    }

    setLoading(true);
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      phone: phone.trim(),
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("OTP sent successfully.");
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "100%", maxWidth: 420 }}>
        <h1>Kisan Network</h1>
        <p>Smart Agriculture. One Powerful Platform.</p>

        <input
          type="tel"
          placeholder="+91XXXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", padding: 14, marginTop: 20 }}
        />

        <button
          onClick={sendOtp}
          disabled={loading}
          style={{ width: "100%", padding: 14, marginTop: 12 }}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {message && <p style={{ marginTop: 16 }}>{message}</p>}
      </section>
    </main>
  );
}
