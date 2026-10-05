import { createClient } from "@/lib/supabase/client";

export type FarmerEnquiry = {
  id: string;
  message: string;
  status: string;
  createdAt: string;
  cropName: string;
};

export async function getFarmerEnquiries(): Promise<FarmerEnquiry[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("crop_enquiries")
    .select(`
      id,
      message,
      status,
      created_at,
      crop_records!inner (
        crop_name,
        crop_seasons!inner (
          fields!inner (
            farmer_id
          )
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  return data
    .filter(
      (item: any) =>
        item.crop_records?.crop_seasons?.fields?.farmer_id === user.id
    )
    .map((item: any) => ({
      id: item.id,
      message: item.message,
      status: item.status,
      createdAt: item.created_at,
      cropName: item.crop_records?.crop_name || "Crop",
    }));
}
