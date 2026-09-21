"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  canManageLeagueContent,
  canManageLeadership,
  canManageSponsors,
  canManageSport,
  requireEditor,
  writeAudit
} from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/news");
  revalidatePath("/events");
  revalidatePath("/sponsors");
  revalidatePath("/leadership");
  revalidatePath("/resources");
  revalidatePath("/documents");
  revalidatePath("/faq");
  revalidatePath("/registration");
  revalidatePath("/sports");
}

async function leagueEditor() {
  const context = await requireEditor();
  if (!context.profile || !canManageLeagueContent(context.profile.role)) {
    throw new Error("You do not have permission to manage league content.");
  }
  return context;
}

async function sponsorEditor() {
  const context = await requireEditor();
  if (!context.profile || !canManageSponsors(context.profile.role)) {
    throw new Error("You do not have permission to manage sponsors.");
  }
  return context;
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateHomepageAnnouncement(formData: FormData) {
  const { supabase, user } = await leagueEditor();

  const announcement = {
    enabled: checked(formData, "enabled"),
    message: value(formData, "message"),
    url: value(formData, "url"),
    linkLabel: value(formData, "link_label") || "Learn More"
  };

  const { error } = await supabase.from("site_settings").upsert({
    key: "homepage_announcement",
    value: announcement,
    updated_at: new Date().toISOString()
  });
  if (error) throw error;

  await writeAudit(supabase, user.id, "update", "site_setting", "homepage_announcement", announcement.message);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateSportRegistration(formData: FormData) {
  const context = await requireEditor();
  if (!context.profile) throw new Error("Editor access is not assigned.");

  const slug = value(formData, "slug");
  if (!canManageSport(context.profile, slug)) {
    throw new Error("You do not have permission to update this sport.");
  }

  const update = {
    status: value(formData, "status"),
    status_label: value(formData, "status_label"),
    registration_summary: value(formData, "registration_summary"),
    registration_url: value(formData, "registration_url"),
    updated_at: new Date().toISOString()
  };

  const { error } = await context.supabase.from("sports").update(update).eq("slug", slug);
  if (error) throw error;

  await writeAudit(context.supabase, context.user.id, "update", "sport", slug, update.status_label);
  revalidatePath("/");
  revalidatePath("/sports");
  revalidatePath("/registration");
  revalidatePath(`/sports/${slug}`);
  revalidatePath("/admin/sports");
}

export async function saveNews(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const id = value(formData, "id");
  const title = value(formData, "title");
  const slug = value(formData, "slug") || slugify(title);

  const payload = {
    slug,
    title,
    category: value(formData, "category") || "League",
    excerpt: value(formData, "excerpt"),
    body: value(formData, "body"),
    display_date: value(formData, "display_date"),
    published: checked(formData, "published"),
    featured: checked(formData, "featured"),
    seo_title: value(formData, "seo_title") || null,
    seo_description: value(formData, "seo_description") || null,
    updated_at: new Date().toISOString(),
    author_id: user.id
  };

  const query = id
    ? supabase.from("news_posts").update(payload).eq("id", id)
    : supabase.from("news_posts").insert(payload);

  const { error } = await query;
  if (error) throw error;

  await writeAudit(supabase, user.id, id ? "update" : "create", "news_post", id || slug, title);
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/news");
}

export async function deleteNews(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const id = value(formData, "id");
  const slug = value(formData, "slug");
  const { error } = await supabase.from("news_posts").delete().eq("id", id);
  if (error) throw error;
  await writeAudit(supabase, user.id, "delete", "news_post", id, slug);
  revalidatePath("/news");
  revalidatePath("/");
  revalidatePath("/admin/news");
}

export async function saveEvent(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const id = value(formData, "id");
  const payload = {
    title: value(formData, "title"),
    category: value(formData, "category") || "League",
    starts_at: value(formData, "starts_at") || null,
    display_date: value(formData, "display_date"),
    display_time: value(formData, "display_time"),
    location: value(formData, "location"),
    description: value(formData, "description") || null,
    url: value(formData, "url") || null,
    published: checked(formData, "published"),
    featured: checked(formData, "featured"),
    updated_at: new Date().toISOString()
  };

  const query = id
    ? supabase.from("events").update(payload).eq("id", id)
    : supabase.from("events").insert(payload);

  const { error } = await query;
  if (error) throw error;

  await writeAudit(supabase, user.id, id ? "update" : "create", "event", id || null, payload.title);
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const id = value(formData, "id");
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
  await writeAudit(supabase, user.id, "delete", "event", id);
  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/admin/events");
}

export async function saveSponsor(formData: FormData) {
  const { supabase, user } = await sponsorEditor();
  const id = value(formData, "id");
  const payload = {
    name: value(formData, "name"),
    tier: value(formData, "tier") || "Community",
    url: value(formData, "url") || null,
    sport: value(formData, "sport") || null,
    logo_url: value(formData, "logo_url") || null,
    description: value(formData, "description") || null,
    contact_email: value(formData, "contact_email") || null,
    starts_at: value(formData, "starts_at") || null,
    expires_at: value(formData, "expires_at") || null,
    active: checked(formData, "active"),
    sort_order: Number(value(formData, "sort_order") || "100"),
    updated_at: new Date().toISOString()
  };

  const query = id
    ? supabase.from("sponsors").update(payload).eq("id", id)
    : supabase.from("sponsors").insert(payload);

  const { error } = await query;
  if (error) throw error;

  await writeAudit(supabase, user.id, id ? "update" : "create", "sponsor", id || null, payload.name);
  revalidatePath("/sponsors");
  revalidatePath("/");
  revalidatePath("/admin/sponsors");
}

export async function deleteSponsor(formData: FormData) {
  const { supabase, user } = await sponsorEditor();
  const id = value(formData, "id");
  const { error } = await supabase.from("sponsors").delete().eq("id", id);
  if (error) throw error;
  await writeAudit(supabase, user.id, "delete", "sponsor", id);
  revalidatePath("/sponsors");
  revalidatePath("/");
  revalidatePath("/admin/sponsors");
}

export async function saveLeadership(formData: FormData) {
  const context = await requireEditor();
  if (!context.profile || !canManageLeadership(context.profile.role)) {
    throw new Error("Only a league admin can manage leadership records.");
  }

  const id = value(formData, "id");
  const payload = {
    role: value(formData, "role"),
    name: value(formData, "name"),
    email: value(formData, "email") || null,
    phone: value(formData, "phone") || null,
    bio: value(formData, "bio") || null,
    sort_order: Number(value(formData, "sort_order") || "100"),
    published: checked(formData, "published"),
    updated_at: new Date().toISOString()
  };

  const query = id
    ? context.supabase.from("leadership").update(payload).eq("id", id)
    : context.supabase.from("leadership").insert(payload);

  const { error } = await query;
  if (error) throw error;

  await writeAudit(context.supabase, context.user.id, id ? "update" : "create", "leadership", id || null, payload.name);
  revalidatePath("/leadership");
  revalidatePath("/board");
  revalidatePath("/");
  revalidatePath("/admin/leadership");
}

export async function deleteLeadership(formData: FormData) {
  const context = await requireEditor();
  if (!context.profile || !canManageLeadership(context.profile.role)) {
    throw new Error("Only a league admin can manage leadership records.");
  }
  const id = value(formData, "id");
  const { error } = await context.supabase.from("leadership").delete().eq("id", id);
  if (error) throw error;
  await writeAudit(context.supabase, context.user.id, "delete", "leadership", id);
  revalidatePath("/leadership");
  revalidatePath("/board");
  revalidatePath("/");
  revalidatePath("/admin/leadership");
}

export async function saveResource(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const id = value(formData, "id");
  const payload = {
    title: value(formData, "title"),
    description: value(formData, "description"),
    href: value(formData, "href"),
    category: value(formData, "category") || "General",
    external: checked(formData, "external"),
    published: checked(formData, "published"),
    sort_order: Number(value(formData, "sort_order") || "100"),
    updated_at: new Date().toISOString()
  };

  const query = id
    ? supabase.from("resources").update(payload).eq("id", id)
    : supabase.from("resources").insert(payload);

  const { error } = await query;
  if (error) throw error;

  await writeAudit(supabase, user.id, id ? "update" : "create", "resource", id || null, payload.title);
  revalidatePath("/resources");
  revalidatePath("/documents");
  revalidatePath("/admin/resources");
}

export async function deleteResource(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const id = value(formData, "id");
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw error;
  await writeAudit(supabase, user.id, "delete", "resource", id);
  revalidatePath("/resources");
  revalidatePath("/documents");
  revalidatePath("/admin/resources");
}

export async function saveFaq(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const id = value(formData, "id");
  const payload = {
    question: value(formData, "question"),
    answer: value(formData, "answer"),
    category: value(formData, "category") || "General",
    published: checked(formData, "published"),
    sort_order: Number(value(formData, "sort_order") || "100"),
    updated_at: new Date().toISOString()
  };

  const query = id
    ? supabase.from("faqs").update(payload).eq("id", id)
    : supabase.from("faqs").insert(payload);

  const { error } = await query;
  if (error) throw error;

  await writeAudit(supabase, user.id, id ? "update" : "create", "faq", id || null, payload.question);
  revalidatePath("/faq");
  revalidatePath("/admin/faqs");
}

export async function deleteFaq(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const id = value(formData, "id");
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw error;
  await writeAudit(supabase, user.id, "delete", "faq", id);
  revalidatePath("/faq");
  revalidatePath("/admin/faqs");
}

export async function setSubscriberActive(formData: FormData) {
  const { supabase, user } = await leagueEditor();
  const email = value(formData, "email");
  const active = value(formData, "active") === "true";

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({
      active,
      unsubscribed_at: active ? null : new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("email", email);

  if (error) throw error;

  await writeAudit(supabase, user.id, "update", "newsletter_subscriber", email, active ? "activated" : "deactivated");
  revalidatePath("/admin/newsletter");
}

export async function revalidateAllContent() {
  await leagueEditor();
  revalidatePublic();
  revalidatePath("/admin");
}
