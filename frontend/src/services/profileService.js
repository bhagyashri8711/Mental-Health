import { supabase } from "./supabase";

export async function getProfile() {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { data, error };
}

export async function updateProfile(profile) {

  return await supabase
    .from("profiles")
    .update({
      full_name: profile.full_name,
      bio: profile.bio,
      phone: profile.phone,
    })
    .eq("id", profile.id);
}