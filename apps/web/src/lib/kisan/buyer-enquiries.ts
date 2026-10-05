import { createClient } from "@/lib/supabase/client";

export type BuyerEnquiry = {
  id: string;
  message: string;
  status: string;
  createdAt: string;
  cropName: string;
};

export async function getBuyerEnquiries(): Promise<BuyerEnquiry[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("crop_enquiries")
    .select(`
      id,
      message,
      status,
      created_at,
      crop_records!inner (
        crop_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((item: any) => ({
    id: item.id,
    message: item.message,
    status: item.status,
    createdAt: item.created_at,
    cropName: item.crop_records?.crop_name || "Crop",
  }));
}
