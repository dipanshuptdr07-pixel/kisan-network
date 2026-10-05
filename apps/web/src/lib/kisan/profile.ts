import { createClient } from "@/lib/supabase/client";

export type KisanRole = "farmer" | "buyer" | "company" | "expert" | "admin";

export type KisanProfile = {
  id: string;
  role: KisanRole;
  full_name: string | null;
  mobile: string | null;
  avatar_url: string | null;
  village: string | null;
  district: string | null;
  state: string | null;
  language_code: string;
  is_active: boolean;
  onboarding_completed: boolean;
  farmer?: {
    land_area: number | null;
    land_unit: string | null;
    ownership_type: string | null;
  } | null;
  buyer?: {
    business_name: string | null;
    business_type: string | null;
    verification_status: string;
    rating_average: number | null;
    rating_count: number;
    business_location: string | null;
  } | null;
  company?: {
    company_name: string;
    location: string | null;
    verification_status: string;
    rating_average: number | null;
    rating_count: number;
  } | null;
  expert?: {
    expertise: unknown;
    verification_status: string;
    bio: string | null;
    rating_average: number | null;
    rating_count: number;
  } | null;
};

export async function getMyKisanProfile(): Promise<KisanProfile | null> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      "id, role, full_name, mobile, avatar_url, village, district, state, language_code, is_active, onboarding_completed"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) return null;

  const role = profile.role as KisanRole;

  const result: KisanProfile = {
    ...profile,
    role,
  };

  if (role === "farmer") {
    const { data } = await supabase
      .from("farmer_profiles")
      .select("land_area, land_unit, ownership_type")
      .eq("user_id", user.id)
      .maybeSingle();

    result.farmer = data;
  }

  if (role === "buyer") {
    const { data } = await supabase
      .from("buyer_profiles")
      .select(
        "business_name, business_type, verification_status, rating_average, rating_count, business_location"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    result.buyer = data;
  }

  if (role === "company") {
    const { data } = await supabase
      .from("company_profiles")
      .select(
        "company_name, location, verification_status, rating_average, rating_count"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    result.company = data;
  }

  if (role === "expert") {
    const { data } = await supabase
      .from("expert_profiles")
      .select(
        "expertise, verification_status, bio, rating_average, rating_count"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    result.expert = data;
  }

  return result;
}
