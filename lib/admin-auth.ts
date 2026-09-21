import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type EditorRole = "admin" | "marketing" | "sport_director" | "photo_admin" | "fundraising";
export type EditorProfile = {
  role: EditorRole;
  sport_slug: string | null;
  display_name: string | null;
};

export async function requireEditor() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,sport_slug,display_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return { supabase, user, profile: null as EditorProfile | null };
  }

  return { supabase, user, profile: profile as EditorProfile };
}

export function canManageLeagueContent(role: EditorRole) {
  return role === "admin" || role === "marketing";
}

export function canManageSponsors(role: EditorRole) {
  return role === "admin" || role === "marketing" || role === "fundraising";
}

export function canManageLeadership(role: EditorRole) {
  return role === "admin";
}

export function canManageSport(profile: EditorProfile, slug: string) {
  return (
    profile.role === "admin" ||
    profile.role === "marketing" ||
    (profile.role === "sport_director" && profile.sport_slug === slug)
  );
}

export async function writeAudit(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string,
  action: string,
  entityType: string,
  entityId?: string | null,
  summary?: string | null
) {
  const { error } = await supabase.from("audit_log").insert({
    user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId || null,
    summary: summary || null
  });

  if (error) console.error("EPYAL audit log failed", error);
}
