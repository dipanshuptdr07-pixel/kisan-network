import { createClient } from "@/lib/supabase/client";

export async function updateEnquiryStatus(
  enquiryId: string,
  status: "accepted" | "rejected"
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data: enquiry } = await supabase
    .from("crop_enquiries")
    .select(`
      id,
      crop_records!inner (
        crop_seasons!inner (
          fields!inner (
            farmer_id
          )
        )
      )
    `)
    .eq("id", enquiryId)
    .maybeSingle();

  if (
    !enquiry ||
    (enquiry as any).crop_records?.crop_seasons?.fields?.farmer_id !==
      user.id
  ) {
    return { success: false, error: "Not authorized" };
  }

  const { error } = await supabase
    .from("crop_enquiries")
    .update({ status })
    .eq("id", enquiryId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
