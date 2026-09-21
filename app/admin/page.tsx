import Link from "next/link";
import { redirect } from "next/navigation";
import { cmsConfigured } from "@/lib/cms";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logout, updateHomepageAnnouncement, updateSportRegistration } from "./actions";

export default async function AdminPage() {
  if (!cmsConfigured()) {
    return (
      <section className="admin-shell">
        <div className="container">
          <div className="admin-header">
            <div><div className="eyebrow">Phase 2 CMS</div><h1>EPYAL Content Manager</h1></div>
            <span className="admin-badge">Setup Ready</span>
          </div>
          <div className="admin-grid">
            <nav className="admin-nav"><span>Overview</span><a href="#content">Content</a><a href="#roles">Roles</a></nav>
            <div className="admin-panel">
              <h2>CMS foundation is built and waiting for the EPYAL Supabase project.</h2>
              <p style={{ color: "var(--muted)" }}>The public site uses safe seeded content until Supabase environment variables are connected. Once connected, this dashboard becomes the controlled editor for registration status, homepage announcements and additional content collections.</p>
              <div className="admin-cards" id="content">
                <div className="admin-card"><strong>Registration Controls</strong><span>Open / soon / closed / waitlist, message and Sports Connect URL.</span></div>
                <div className="admin-card"><strong>Homepage Announcement</strong><span>Turn the orange alert bar on/off and edit its message and link.</span></div>
                <div className="admin-card"><strong>Structured Collections</strong><span>News, events, sponsors and leadership are represented in the database schema.</span></div>
              </div>
              <div className="info-banner" id="roles"><strong>Role model:</strong> Admin, Marketing and Sport Director roles are included. Sport Directors can be limited to their assigned program.</div>
              <Link className="button button-dark" href="/">Return to Website</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [{ data: profile }, { data: sports }, { data: setting }] = await Promise.all([
    supabase.from("profiles").select("role,sport_slug").eq("id", user.id).maybeSingle(),
    supabase.from("sports").select("slug,name,status,status_label,registration_summary,registration_url").order("sort_order"),
    supabase.from("site_settings").select("value").eq("key", "homepage_announcement").maybeSingle()
  ]);

  if (!profile) {
    return (
      <section className="admin-shell"><div className="container"><div className="admin-panel">
        <h1>Editor access not assigned</h1>
        <p>Your login is valid, but an EPYAL admin must assign a profile/role before content can be edited.</p>
        <form action={logout}><button className="button button-dark">Sign Out</button></form>
      </div></div></section>
    );
  }

  const announcement = (setting?.value as any) || {
    enabled: true,
    message: "2026–27 Basketball: check Sports Connect for live registration availability.",
    url: "https://tshq.bluesombrero.com/Default.aspx?tabid=1326003",
    linkLabel: "Sports Connect"
  };

  const canLeagueEdit = ["admin", "marketing"].includes(profile.role);

  return (
    <section className="admin-shell">
      <div className="container">
        <div className="admin-header">
          <div><div className="eyebrow">EPYAL Content Manager</div><h1>Website Admin</h1></div>
          <form action={logout}><button className="button button-outline">Sign Out</button></form>
        </div>

        <div className="admin-grid">
          <nav className="admin-nav"><span>Registration</span><a href="#announcement">Announcement</a><Link href="/">View Site</Link></nav>
          <div style={{ display: "grid", gap: 18 }}>
            {canLeagueEdit ? (
              <div className="admin-panel" id="announcement">
                <h2>Homepage Announcement</h2>
                <form action={updateHomepageAnnouncement} style={{ display: "grid", gap: 10 }}>
                  <label><input type="checkbox" name="enabled" defaultChecked={Boolean(announcement.enabled)} /> Enabled</label>
                  <input name="message" defaultValue={announcement.message || ""} placeholder="Announcement message" style={{ height: 44, padding: "0 11px", border: "1px solid var(--line)", borderRadius: 8 }} />
                  <input name="url" defaultValue={announcement.url || ""} placeholder="Link URL" style={{ height: 44, padding: "0 11px", border: "1px solid var(--line)", borderRadius: 8 }} />
                  <input name="link_label" defaultValue={announcement.linkLabel || ""} placeholder="Link label" style={{ height: 44, padding: "0 11px", border: "1px solid var(--line)", borderRadius: 8 }} />
                  <button className="button button-dark" type="submit">Save Announcement</button>
                </form>
              </div>
            ) : null}

            {(sports || []).filter((sport: any) => canLeagueEdit || profile.sport_slug === sport.slug).map((sport: any) => (
              <div className="admin-panel" key={sport.slug}>
                <div className="eyebrow">{sport.name}</div>
                <h2 style={{ marginTop: 5 }}>Registration Controls</h2>
                <form action={updateSportRegistration} style={{ display: "grid", gap: 10 }}>
                  <input type="hidden" name="slug" value={sport.slug} />
                  <select name="status" defaultValue={sport.status} style={{ height: 44, padding: "0 11px", border: "1px solid var(--line)", borderRadius: 8 }}>
                    <option value="open">Open</option><option value="soon">Opening Soon / Seasonal</option><option value="closed">Closed</option><option value="waitlist">Waitlist</option>
                  </select>
                  <input name="status_label" defaultValue={sport.status_label} placeholder="Public status label" style={{ height: 44, padding: "0 11px", border: "1px solid var(--line)", borderRadius: 8 }} />
                  <textarea name="registration_summary" defaultValue={sport.registration_summary} rows={4} style={{ padding: 11, border: "1px solid var(--line)", borderRadius: 8 }} />
                  <input name="registration_url" defaultValue={sport.registration_url} placeholder="Sports Connect URL" style={{ height: 44, padding: "0 11px", border: "1px solid var(--line)", borderRadius: 8 }} />
                  <button className="button button-orange" type="submit">Update {sport.name}</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
