import { createClient } from "@/lib/supabase/client";

export type MarketplaceCrop = {
  id: string;
  cropName: string;
  variety: string | null;
  area: number | null;
  areaUnit: string | null;
  sowingDate: string | null;
  farmerName: string;
  district: string | null;
  state: string | null;
};

export async function getMarketplaceCrops(): Promise<MarketplaceCrop[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("crop_records")
    .select(`
      id,
      crop_name,
      variety,
      area,
      area_unit,
      sowing_date,
      crop_seasons!inner (
        fields!inner (
          farmer_id,
          profiles!inner (
            full_name,
            district,
            state,
            role,
            is_active
          )
        )
      )
    `)
    .limit(50);

  if (error || !data) return [];

  return data
    .filter((item: any) => {
      const profile = item.crop_seasons?.fields?.profiles;
      return (
        profile?.role === "farmer" &&
        profile?.is_active !== false
      );
    })
    .map((item: any) => {
      const profile = item.crop_seasons.fields.profiles;

      return {
        id: item.id,
        cropName: item.crop_name,
        variety: item.variety,
        area: item.area,
        areaUnit: item.area_unit,
        sowingDate: item.sowing_date,
        farmerName: profile.full_name || "Farmer",
        district: profile.district,
        state: profile.state,
      };
    });
}
