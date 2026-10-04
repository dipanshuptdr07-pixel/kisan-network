"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function sendOtp() {
    if (!phone.trim()) {
      setMessage("Phone number enter karo.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone.trim(),
    });

    setMessage(error ? error.message : "OTP sent successfully.");
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Kisan Network</h1>
      <p>Smart Agriculture. One Powerful Platform.</p>
      <input
        type="tel"
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>
      {message && <p>{message}</p>}
    </main>
  );
}
