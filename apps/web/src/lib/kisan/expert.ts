import { createClient } from "@/lib/supabase/client";

export type ExpertStats = {
  expertise: unknown;
  verificationStatus: string;
  bio: string;
  rating: number;
  ratingCount: number;
};

export async function getExpertStats(): Promise<ExpertStats | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("expert_profiles")
    .select(
      "expertise, verification_status, bio, rating_average, rating_count"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;

  return {
    expertise: data.expertise,
    verificationStatus: data.verification_status || "pending",
    bio: data.bio || "",
    rating: Number(data.rating_average ?? 0),
    ratingCount: Number(data.rating_count ?? 0),
  };
}
