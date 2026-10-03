import { supabase } from "./supabase";

export async function saveMood(mood, note) {

    const { data: { user } } =
        await supabase.auth.getUser();

    return await supabase
        .from("mood_logs")
        .insert([
            {
                user_id: user.id,
                mood,
                note
            }
        ]);
}

export async function getMoods() {

    const { data: { user } } =
        await supabase.auth.getUser();

    const { data, error } =
        await supabase
            .from("mood_logs")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

    return { data, error };

}