import { createClient } from "@supabase/supabase-js";
import {
  events as seedEvents,
  leadership as seedLeadership,
  news as seedNews,
  sponsors as seedSponsors,
  sports as seedSports,
  type EventItem,
  type NewsItem,
  type Sponsor,
  type Sport
} from "@/lib/site-content";

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function cmsConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getSports(): Promise<Sport[]> {
  const supabase = client();
  if (!supabase) return seedSports;

  const { data, error } = await supabase
    .from("sports")
    .select("*")
    .eq("published", true)
    .order("sort_order");

  if (error || !data?.length) return seedSports;

  return data.map((row: any) => ({
    slug: row.slug,
    name: row.name,
    short: row.short,
    season: row.season,
    ages: row.ages,
    status: row.status,
    statusLabel: row.status_label,
    directors: row.directors,
    email: row.email,
    registrationUrl: row.registration_url,
    summary: row.summary,
    registrationSummary: row.registration_summary,
    highlights: Array.isArray(row.highlights) ? row.highlights : []
  }));
}

export async function getNews(): Promise<NewsItem[]> {
  const supabase = client();
  if (!supabase) return seedNews;

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(20);

  if (error || !data?.length) return seedNews;

  return data.map((row: any) => ({
    slug: row.slug,
    title: row.title,
    date: row.display_date,
    category: row.category,
    excerpt: row.excerpt
  }));
}

export async function getEvents(): Promise<EventItem[]> {
  const supabase = client();
  if (!supabase) return seedEvents;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("starts_at")
    .limit(30);

  if (error || !data?.length) return seedEvents;

  return data.map((row: any) => ({
    title: row.title,
    date: row.display_date,
    time: row.display_time,
    location: row.location,
    category: row.category
  }));
}

export async function getLeadership() {
  const supabase = client();
  if (!supabase) return seedLeadership;

  const { data, error } = await supabase
    .from("leadership")
    .select("*")
    .eq("published", true)
    .order("sort_order");

  if (error || !data?.length) return seedLeadership;
  return data.map((row: any) => ({ role: row.role, name: row.name, email: row.email || "" }));
}

export async function getSponsors(): Promise<Sponsor[]> {
  const supabase = client();
  if (!supabase) return seedSponsors;

  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .eq("active", true)
    .order("sort_order");

  if (error || !data?.length) return seedSponsors;

  return data.map((row: any) => ({
    name: row.name,
    tier: row.tier,
    url: row.url || undefined,
    sport: row.sport || undefined
  }));
}

export async function getHomepageAnnouncement() {
  const supabase = client();
  if (!supabase) {
    return {
      enabled: true,
      message: "2026–27 Basketball: check Sports Connect for live registration availability.",
      url: "https://tshq.bluesombrero.com/Default.aspx?tabid=1326003",
      linkLabel: "Sports Connect"
    };
  }

  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "homepage_announcement")
    .maybeSingle();

  return data?.value || null;
}
