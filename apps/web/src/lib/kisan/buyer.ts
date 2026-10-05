import { createClient } from "@/lib/supabase/client";

export type BuyerStats = {
  businessName: string;
  businessType: string;
  verificationStatus: string;
  rating: number;
  ratingCount: number;
  location: string;
};

export async function getBuyerStats(): Promise<BuyerStats | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("buyer_profiles")
    .select(
      "business_name, business_type, verification_status, rating_average, rating_count, business_location"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;

  return {
    businessName: data.business_name || "Buyer / Trader",
    businessType: data.business_type || "Agricultural Buyer",
    verificationStatus: data.verification_status || "pending",
    rating: Number(data.rating_average ?? 0),
    ratingCount: Number(data.rating_count ?? 0),
    location: data.business_location || "India",
  };
}
