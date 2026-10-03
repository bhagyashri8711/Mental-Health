import { supabase } from "./supabase";

export async function getDashboardStats() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ count: moodCount }, { count: supportCount }] =
    await Promise.all([
      supabase
        .from("mood_logs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),

      supabase
        .from("support_requests")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);

  return {
    moodCount: moodCount || 0,
    supportCount: supportCount || 0,
    resourcesRead: 0,
  };
}