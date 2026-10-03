import { supabase } from "./supabase";

export async function getAdminStats() {

  const [
    { count: users },
    { count: moods },
    { count: requests },
    { count: resources }
  ] = await Promise.all([

    supabase
      .from("profiles")
      .select("*", { head: true, count: "exact" }),

    supabase
      .from("mood_logs")
      .select("*", { head: true, count: "exact" }),

    supabase
      .from("support_requests")
      .select("*", { head: true, count: "exact" }),

    supabase
      .from("mental_resources")
      .select("*", { head: true, count: "exact" }),

  ]);

  return {
    users: users || 0,
    moods: moods || 0,
    requests: requests || 0,
    resources: resources || 0,
  };

}