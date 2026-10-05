import { createClient } from "@/lib/supabase/client";

export type FarmerStats = {
  fields: number;
  activeSeasons: number;
  cropRecords: number;
  crops: string[];
};

export async function getFarmerStats(): Promise<FarmerStats> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      fields: 0,
      activeSeasons: 0,
      cropRecords: 0,
      crops: [],
    };
  }

  const { data: fields } = await supabase
    .from("fields")
    .select("id")
    .eq("farmer_id", user.id);

  const fieldIds = (fields ?? []).map((field) => field.id);

  if (fieldIds.length === 0) {
    return {
      fields: 0,
      activeSeasons: 0,
      cropRecords: 0,
      crops: [],
    };
  }

  const { data: seasons } = await supabase
    .from("crop_seasons")
    .select("id, status")
    .in("field_id", fieldIds);

  const seasonIds = (seasons ?? []).map((season) => season.id);

  const activeSeasons = (seasons ?? []).filter(
    (season) =>
      season.status === "active" ||
      season.status === "ongoing" ||
      season.status === "current"
  ).length;

  if (seasonIds.length === 0) {
    return {
      fields: fieldIds.length,
      activeSeasons,
      cropRecords: 0,
      crops: [],
    };
  }

  const { data: records } = await supabase
    .from("crop_records")
    .select("id, crop_name")
    .in("season_id", seasonIds);

  const cropNames = Array.from(
    new Set(
      (records ?? [])
        .map((record) => record.crop_name)
        .filter(Boolean)
    )
  );

  return {
    fields: fieldIds.length,
    activeSeasons,
    cropRecords: records?.length ?? 0,
    crops: cropNames,
  };
}
