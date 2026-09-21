import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { canManageSponsors, requireEditor } from "@/lib/admin-auth";
import { cmsConfigured } from "@/lib/cms";
import { deleteSponsor, saveSponsor } from "../actions";

const SponsorForm = ({ sponsor }: { sponsor?: any }) => (
  <form className="admin-form-grid" action={saveSponsor}>
    {sponsor?.id ? <input type="hidden" name="id" value={sponsor.id} /> : null}
    <label><span>Business Name</span><input name="name" defaultValue={sponsor?.name || ""} required /></label>
    <label><span>Tier</span><select name="tier" defaultValue={sponsor?.tier || "Community"}><option>Premier</option><option>Sport</option><option>Community</option></select></label>
    <label><span>Sport</span><input name="sport" defaultValue={sponsor?.sport || ""} placeholder="Optional" /></label>
    <label><span>Website</span><input name="url" type="url" defaultValue={sponsor?.url || ""} /></label>
    <label className="admin-field-wide"><span>Logo URL</span><input name="logo_url" type="url" defaultValue={sponsor?.logo_url || ""} /></label>
    <label className="admin-field-wide"><span>Description</span><textarea name="description" rows={3} defaultValue={sponsor?.description || ""} /></label>
    <label><span>Contact Email</span><input name="contact_email" type="email" defaultValue={sponsor?.contact_email || ""} /></label>
    <label><span>Sort Order</span><input name="sort_order" type="number" defaultValue={sponsor?.sort_order ?? 100} /></label>
    <label><span>Starts</span><input name="starts_at" type="date" defaultValue={sponsor?.starts_at || ""} /></label>
    <label><span>Expires</span><input name="expires_at" type="date" defaultValue={sponsor?.expires_at || ""} /></label>
    <label className="admin-check"><input type="checkbox" name="active" defaultChecked={sponsor ? sponsor.active : true} /><span>Active</span></label>
    <div><button className="button button-orange" type="submit">{sponsor ? "Save Sponsor" : "Add Sponsor"}</button></div>
  </form>
);

export default async function AdminSponsorsPage() {
  if (!cmsConfigured()) redirect("/admin");
  const { supabase, user, profile } = await requireEditor();
  if (!profile || !canManageSponsors(profile.role)) redirect("/admin");
  const { data: sponsors } = await supabase.from("sponsors").select("*").order("sort_order");

  return (
    <AdminFrame active="/admin/sponsors" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head"><div><span>Fundraising</span><h2>Sponsors</h2><p>Manage digital partners, tiers, sport assignments and renewal dates.</p></div></div>
      <section className="admin-section-card"><div className="admin-card-heading"><div><span>New Partner</span><h3>Add a sponsor</h3></div></div><SponsorForm /></section>
      <div className="admin-stack">
        {(sponsors || []).map((sponsor: any) => (
          <details className="admin-editor" key={sponsor.id}><summary><div><strong>{sponsor.name}</strong><span>{sponsor.tier}{sponsor.sport ? ` • ${sponsor.sport}` : ""}</span></div><small>{sponsor.active ? "Active" : "Inactive"}</small></summary><div className="admin-editor-body"><SponsorForm sponsor={sponsor} /><form action={deleteSponsor} className="admin-danger-form"><input type="hidden" name="id" value={sponsor.id} /><button type="submit">Delete sponsor</button></form></div></details>
        ))}
      </div>
    </AdminFrame>
  );
}
