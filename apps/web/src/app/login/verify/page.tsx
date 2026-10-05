"use client";

import { getMyDashboardRoute } from "@/lib/kisan/route";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function VerifyPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPhone(new URLSearchParams(window.location.search).get("phone") || "");
  }, []);

  async function verifyOtp() {
    if (otp.length !== 6) {
      setMessage("6 digit OTP enter karo.");
      return;
    }

    if (!phone) {
      setMessage("Phone number missing hai.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.replace(await getMyDashboardRoute());
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Verify OTP</h1>
      <p>{phone}</p>

      <input
        type="tel"
        inputMode="numeric"
        maxLength={6}
        placeholder="6 digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
      />

      <button onClick={verifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {message && <p>{message}</p>}
    </main>
  );
}
