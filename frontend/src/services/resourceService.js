import { supabase } from "./supabase";

// ---------------- Database ----------------

// Get all resources
export async function getResources() {
  const { data, error } = await supabase
    .from("mental_resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// Add resource
export async function addResource(resource) {
  const { error } = await supabase
    .from("mental_resources")
    .insert(resource);

  if (error) throw error;
}

// Update resource
export async function updateResource(id, resource) {
  const { error } = await supabase
    .from("mental_resources")
    .update(resource)
    .eq("id", id);

  if (error) throw error;
}

// Delete resource
export async function deleteResource(id) {
  const { error } = await supabase
    .from("mental_resources")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ---------------- Extra Helpers ----------------

const thoughts = [
  "Every day is a fresh beginning.",
  "Small steps lead to big changes.",
  "You are stronger than your struggles.",
  "Take one breath at a time.",
  "Your mental health matters."
];

const affirmations = [
  "I am enough.",
  "I choose peace today.",
  "I believe in myself.",
  "I deserve happiness.",
  "I am growing every day."
];

export function getThoughtOfDay() {
  const index = new Date().getDate() % thoughts.length;
  return thoughts[index];
}

export function getAffirmation() {
  const index = new Date().getDate() % affirmations.length;
  return affirmations[index];
}