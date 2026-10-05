import { createClient } from "@/lib/supabase/client";

export async function createCropEnquiry(
  cropId: string,
  message: string
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase.from("crop_enquiries").insert({
    crop_id: cropId,
    buyer_id: user.id,
    message,
    status: "pending",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}
