import { createClient } from "@/lib/supabase/client";

export type CompanyStats = {
  companyName: string;
  location: string;
  verificationStatus: string;
  rating: number;
  ratingCount: number;
};

export async function getCompanyStats(): Promise<CompanyStats | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("company_profiles")
    .select(
      "company_name, location, verification_status, rating_average, rating_count"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;

  return {
    companyName: data.company_name || "Agri Company",
    location: data.location || "India",
    verificationStatus: data.verification_status || "pending",
    rating: Number(data.rating_average ?? 0),
    ratingCount: Number(data.rating_count ?? 0),
  };
}
