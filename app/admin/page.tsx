import Link from "next/link";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { cmsConfigured } from "@/lib/cms";
import { requireEditor } from "@/lib/admin-auth";
import { revalidateAllContent, updateHomepageAnnouncement } from "./actions";

export default async function AdminPage() {
  if (!cmsConfigured()) {
    return (
      <section className="admin-shell admin-shell-v2">
        <div className="container">
          <div className="admin-header">
            <div>
              <div className="eyebrow">Phase 4 CMS</div>
              <h1>EPYAL Content Manager</h1>
            </div>
            <span className="admin-badge">Database Connection Required</span>
          </div>
          <div className="admin-setup-panel">
            <h2>The operational CMS is built.</h2>
            <p>The site is still safely running from seeded content. Connect a dedicated EPYAL Supabase project to activate authentication, editable content, newsletter storage and the role-based admin dashboard.</p>
            <div className="admin-stat-grid">
              <div><strong>9</strong><span>Admin sections ready</span></div>
              <div><strong>5</strong><span>Editor roles</span></div>
              <div><strong>0</strong><span>Sensitive player records stored here</span></div>
            </div>
            <Link className="button button-dark" href="/">Return to Website</Link>
          </div>
        </div>
      </section>
    );
  }

  const { supabase, user, profile } = await requireEditor();
  if (!profile) {
    return (
      <section className="admin-shell"><div className="container"><div className="admin-panel">
        <h1>Editor access not assigned</h1>
        <p>Your login is valid, but a league admin must assign an EPYAL editor role before you can manage content.</p>
      </div></div></section>
    );
  }

  const [
    sportsCount,
    newsCount,
    eventCount,
    sponsorCount,
    subscriberCount,
    setting,
    audits
  ] = await Promise.all([
    supabase.from("sports").select("*", { count: "exact", head: true }),
    supabase.from("news_posts").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("sponsors").select("*", { count: "exact", head: true }).eq("active", true),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("active", true),
    supabase.from("site_settings").select("value").eq("key", "homepage_announcement").maybeSingle(),
    profile.role === "admin"
      ? supabase.from("audit_log").select("action,entity_type,summary,created_at").order("created_at", { ascending: false }).limit(8)
      : Promise.resolve({ data: [] as any[] })
  ]);

  const announcement = (setting.data?.value as any) || {
    enabled: true,
    message: "2026–27 Basketball: check Sports Connect for live registration availability.",
    url: "https://tshq.bluesombrero.com/Default.aspx?tabid=1326003",
    linkLabel: "Sports Connect"
  };

  return (
    <AdminFrame active="/admin" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head">
        <div><span>Overview</span><h2>League website at a glance</h2></div>
        <form action={revalidateAllContent}><button className="button button-outline" type="submit">Refresh Public Content</button></form>
      </div>

      <div className="admin-stat-grid">
        <Link href="/admin/sports"><strong>{sportsCount.count ?? "—"}</strong><span>Sports programs</span></Link>
        <Link href="/admin/news"><strong>{newsCount.count ?? "—"}</strong><span>News posts</span></Link>
        <Link href="/admin/events"><strong>{eventCount.count ?? "—"}</strong><span>Events</span></Link>
        <Link href="/admin/sponsors"><strong>{sponsorCount.count ?? "—"}</strong><span>Active sponsors</span></Link>
        <Link href="/admin/newsletter"><strong>{subscriberCount.count ?? "—"}</strong><span>Email subscribers</span></Link>
      </div>

      {["admin","marketing"].includes(profile.role) ? (
        <section className="admin-section-card">
          <div className="admin-card-heading">
            <div><span>Homepage</span><h3>Announcement Bar</h3></div>
            <small>Changes appear sitewide after saving.</small>
          </div>
          <form className="admin-form-grid" action={updateHomepageAnnouncement}>
            <label className="admin-check"><input type="checkbox" name="enabled" defaultChecked={Boolean(announcement.enabled)} /> <span>Announcement enabled</span></label>
            <label><span>Message</span><input name="message" defaultValue={announcement.message || ""} required /></label>
            <label><span>Link URL</span><input name="url" defaultValue={announcement.url || ""} /></label>
            <label><span>Link Label</span><input name="link_label" defaultValue={announcement.linkLabel || ""} /></label>
            <div><button className="button button-orange" type="submit">Save Announcement</button></div>
          </form>
        </section>
      ) : null}

      {profile.role === "admin" ? (
        <section className="admin-section-card">
          <div className="admin-card-heading"><div><span>Audit Trail</span><h3>Recent website changes</h3></div></div>
          <div className="admin-audit-list">
            {(audits.data || []).length ? (audits.data || []).map((item: any, index: number) => (
              <div key={index}>
                <strong>{item.action} {item.entity_type.replaceAll("_"," ")}</strong>
                <span>{item.summary || "Content updated"}</span>
                <small>{new Date(item.created_at).toLocaleString()}</small>
              </div>
            )) : <p>No audited changes yet.</p>}
          </div>
        </section>
      ) : null}
    </AdminFrame>
  );
}
