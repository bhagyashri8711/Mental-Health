import { supabase } from "./supabase";

const ROOM_ID = 1;

export async function initializeRoom() {
  const { data } = await supabase
    .from("chat_rooms")
    .select("*")
    .eq("id", ROOM_ID);

  if (!data || data.length === 0) {
    await supabase
      .from("chat_rooms")
      .insert([{ id: ROOM_ID }]);
  }
}

export async function getMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("room_id", ROOM_ID)
    .order("created_at", { ascending: true });

  return { data, error };
}

export async function sendMessage(message) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return await supabase
    .from("messages")
    .insert([
      {
        room_id: ROOM_ID,
        sender_id: user.id,
        message,
      },
    ]);
}

export function subscribeToMessages(callback) {
  return supabase
    .channel("messages-room")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      callback
    )
    .subscribe();
}