"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyOtp() {
    if (otp.length !== 6) {
      setMessage("6 digit OTP enter karo.");
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

    router.push("/onboarding");
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Verify OTP</h1>
      <p>{phone}</p>

      <input
        inputMode="numeric"
        maxLength={6}
        placeholder="6 digit OTP"
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value.replace(/\D/g, ""))
        }
      />

      <button onClick={verifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {message && <p>{message}</p>}
    </main>
  );
}
