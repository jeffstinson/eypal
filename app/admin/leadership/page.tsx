import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { canManageLeadership, requireEditor } from "@/lib/admin-auth";
import { cmsConfigured } from "@/lib/cms";
import { deleteLeadership, saveLeadership } from "../actions";

const LeadershipForm = ({ person }: { person?: any }) => (
  <form className="admin-form-grid" action={saveLeadership}>
    {person?.id ? <input type="hidden" name="id" value={person.id} /> : null}
    <label><span>Role</span><input name="role" defaultValue={person?.role || ""} required /></label>
    <label><span>Name</span><input name="name" defaultValue={person?.name || ""} required /></label>
    <label><span>Email</span><input name="email" type="email" defaultValue={person?.email || ""} /></label>
    <label><span>Phone</span><input name="phone" defaultValue={person?.phone || ""} /></label>
    <label className="admin-field-wide"><span>Short Bio / Notes</span><textarea name="bio" rows={3} defaultValue={person?.bio || ""} /></label>
    <label><span>Sort Order</span><input name="sort_order" type="number" defaultValue={person?.sort_order ?? 100} /></label>
    <label className="admin-check"><input type="checkbox" name="published" defaultChecked={person ? person.published : true} /><span>Published</span></label>
    <div><button className="button button-orange" type="submit">{person ? "Save Contact" : "Add Contact"}</button></div>
  </form>
);

export default async function AdminLeadershipPage() {
  if (!cmsConfigured()) redirect("/admin");
  const { supabase, user, profile } = await requireEditor();
  if (!profile || !canManageLeadership(profile.role)) redirect("/admin");
  const { data: leadership } = await supabase.from("leadership").select("*").order("sort_order");

  return (
    <AdminFrame active="/admin/leadership" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head"><div><span>Organization</span><h2>Leadership</h2><p>Board officers, directors and league-wide contacts.</p></div></div>
      <section className="admin-section-card"><div className="admin-card-heading"><div><span>New Contact</span><h3>Add leadership record</h3></div></div><LeadershipForm /></section>
      <div className="admin-stack">
        {(leadership || []).map((person: any) => (
          <details className="admin-editor" key={person.id}><summary><div><strong>{person.name}</strong><span>{person.role}</span></div><small>{person.published ? "Published" : "Hidden"}</small></summary><div className="admin-editor-body"><LeadershipForm person={person} /><form action={deleteLeadership} className="admin-danger-form"><input type="hidden" name="id" value={person.id} /><button type="submit">Delete contact</button></form></div></details>
        ))}
      </div>
    </AdminFrame>
  );
}
