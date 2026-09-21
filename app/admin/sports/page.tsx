import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { canManageSport, requireEditor } from "@/lib/admin-auth";
import { cmsConfigured } from "@/lib/cms";
import { updateSportRegistration } from "../actions";

export default async function AdminSportsPage() {
  if (!cmsConfigured()) redirect("/admin");
  const { supabase, user, profile } = await requireEditor();
  if (!profile) redirect("/admin");

  const { data: sports } = await supabase
    .from("sports")
    .select("slug,name,season,ages,status,status_label,registration_summary,registration_url,published")
    .order("sort_order");

  const editable = (sports || []).filter((sport: any) => canManageSport(profile, sport.slug));

  return (
    <AdminFrame active="/admin/sports" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head">
        <div><span>Programs</span><h2>Sports & Registration</h2><p>Control what families see before they enter Sports Connect.</p></div>
      </div>

      <div className="admin-stack">
        {editable.map((sport: any) => (
          <section className="admin-section-card" key={sport.slug}>
            <div className="admin-card-heading">
              <div><span>{sport.season} • {sport.ages}</span><h3>{sport.name}</h3></div>
              <span className={`status-pill status-${sport.status}`} style={{ position: "static" }}>{sport.status_label}</span>
            </div>
            <form className="admin-form-grid" action={updateSportRegistration}>
              <input type="hidden" name="slug" value={sport.slug} />
              <label><span>Registration Status</span><select name="status" defaultValue={sport.status}><option value="open">Open</option><option value="soon">Opening Soon / Seasonal</option><option value="closed">Closed</option><option value="waitlist">Waitlist</option></select></label>
              <label><span>Public Status Label</span><input name="status_label" defaultValue={sport.status_label} required /></label>
              <label className="admin-field-wide"><span>Registration Message</span><textarea name="registration_summary" rows={4} defaultValue={sport.registration_summary} required /></label>
              <label className="admin-field-wide"><span>Sports Connect URL</span><input name="registration_url" type="url" defaultValue={sport.registration_url} required /></label>
              <div><button className="button button-orange" type="submit">Save {sport.name}</button></div>
            </form>
          </section>
        ))}
      </div>
    </AdminFrame>
  );
}
