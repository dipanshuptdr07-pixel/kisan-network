"use client";

import { createClient } from "@/lib/supabase/client";
import type { KisanRole } from "@/lib/kisan/profile";

const dashboardRoutes: Record<KisanRole, string> = {
  farmer: "/dashboard/farmer",
  buyer: "/dashboard/buyer",
  company: "/dashboard/company",
  expert: "/dashboard/expert",
  admin: "/",
};

export async function getMyDashboardRoute(): Promise<string> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "/login";

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, onboarding_completed, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.is_active === false) return "/";

  if (!profile.onboarding_completed) return "/onboarding";

  return dashboardRoutes[profile.role as KisanRole] || "/";
}
