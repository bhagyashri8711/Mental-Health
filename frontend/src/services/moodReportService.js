import { supabase } from "./supabase";

export async function getMoodReports() {
  const { data, error } = await supabase
    .from("mood_logs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}