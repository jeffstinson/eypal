import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { canManageLeagueContent, requireEditor } from "@/lib/admin-auth";
import { cmsConfigured } from "@/lib/cms";
import { deleteResource, saveResource } from "../actions";

const ResourceForm = ({ resource }: { resource?: any }) => (
  <form className="admin-form-grid" action={saveResource}>
    {resource?.id ? <input type="hidden" name="id" value={resource.id} /> : null}
    <label><span>Title</span><input name="title" defaultValue={resource?.title || ""} required /></label>
    <label><span>Category</span><input name="category" defaultValue={resource?.category || "General"} required /></label>
    <label className="admin-field-wide"><span>Description</span><textarea name="description" rows={3} defaultValue={resource?.description || ""} required /></label>
    <label className="admin-field-wide"><span>URL</span><input name="href" defaultValue={resource?.href || ""} required /></label>
    <label><span>Sort Order</span><input name="sort_order" type="number" defaultValue={resource?.sort_order ?? 100} /></label>
    <label className="admin-check"><input type="checkbox" name="external" defaultChecked={resource ? resource.external : true} /><span>External link</span></label>
    <label className="admin-check"><input type="checkbox" name="published" defaultChecked={resource ? resource.published : true} /><span>Published</span></label>
    <div><button className="button button-orange" type="submit">{resource ? "Save Resource" : "Add Resource"}</button></div>
  </form>
);

export default async function AdminResourcesPage() {
  if (!cmsConfigured()) redirect("/admin");
  const { supabase, user, profile } = await requireEditor();
  if (!profile || !canManageLeagueContent(profile.role)) redirect("/admin");
  const { data: resources } = await supabase.from("resources").select("*").order("sort_order");

  return (
    <AdminFrame active="/admin/resources" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head"><div><span>Reference Library</span><h2>Resources</h2><p>Manage policies, parent guides, safety links and sport documents.</p></div></div>
      <section className="admin-section-card"><div className="admin-card-heading"><div><span>New Resource</span><h3>Add a document or link</h3></div></div><ResourceForm /></section>
      <div className="admin-stack">
        {(resources || []).map((resource: any) => (
          <details className="admin-editor" key={resource.id}><summary><div><strong>{resource.title}</strong><span>{resource.category}</span></div><small>{resource.published ? "Published" : "Hidden"}</small></summary><div className="admin-editor-body"><ResourceForm resource={resource} /><form action={deleteResource} className="admin-danger-form"><input type="hidden" name="id" value={resource.id} /><button type="submit">Delete resource</button></form></div></details>
        ))}
      </div>
    </AdminFrame>
  );
}
