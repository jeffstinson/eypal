"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Profile = { role: string; sport_slug: string | null };

async function editor() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,sport_slug")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) throw new Error("No EPYAL editor profile is assigned to this user.");

  return { supabase, user, profile: profile as Profile };
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateSportRegistration(formData: FormData) {
  const { supabase, profile } = await editor();
  const slug = String(formData.get("slug") || "");
  const status = String(formData.get("status") || "");
  const statusLabel = String(formData.get("status_label") || "");
  const registrationSummary = String(formData.get("registration_summary") || "");
  const registrationUrl = String(formData.get("registration_url") || "");

  const leagueWide = profile.role === "admin" || profile.role === "marketing";
  const ownSport = profile.role === "sport_director" && profile.sport_slug === slug;
  if (!leagueWide && !ownSport) throw new Error("You do not have permission to update this sport.");

  const { error } = await supabase
    .from("sports")
    .update({
      status,
      status_label: statusLabel,
      registration_summary: registrationSummary,
      registration_url: registrationUrl,
      updated_at: new Date().toISOString()
    })
    .eq("slug", slug);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/sports");
  revalidatePath("/registration");
  revalidatePath(`/sports/${slug}`);
}

export async function updateHomepageAnnouncement(formData: FormData) {
  const { supabase, profile } = await editor();
  if (!["admin", "marketing"].includes(profile.role)) {
    throw new Error("You do not have permission to edit the homepage announcement.");
  }

  const value = {
    enabled: formData.get("enabled") === "on",
    message: String(formData.get("message") || ""),
    url: String(formData.get("url") || ""),
    linkLabel: String(formData.get("link_label") || "Learn More")
  };

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: "homepage_announcement", value, updated_at: new Date().toISOString() });

  if (error) throw error;

  revalidatePath("/");
}
