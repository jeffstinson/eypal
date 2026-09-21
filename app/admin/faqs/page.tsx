import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { canManageLeagueContent, requireEditor } from "@/lib/admin-auth";
import { cmsConfigured } from "@/lib/cms";
import { deleteFaq, saveFaq } from "../actions";

const FaqForm = ({ faq }: { faq?: any }) => (
  <form className="admin-form-grid" action={saveFaq}>
    {faq?.id ? <input type="hidden" name="id" value={faq.id} /> : null}
    <label><span>Category</span><input name="category" defaultValue={faq?.category || "General"} required /></label>
    <label><span>Sort Order</span><input name="sort_order" type="number" defaultValue={faq?.sort_order ?? 100} /></label>
    <label className="admin-field-wide"><span>Question</span><input name="question" defaultValue={faq?.question || ""} required /></label>
    <label className="admin-field-wide"><span>Answer</span><textarea name="answer" rows={5} defaultValue={faq?.answer || ""} required /></label>
    <label className="admin-check"><input type="checkbox" name="published" defaultChecked={faq ? faq.published : true} /><span>Published</span></label>
    <div><button className="button button-orange" type="submit">{faq ? "Save FAQ" : "Add FAQ"}</button></div>
  </form>
);

export default async function AdminFaqPage() {
  if (!cmsConfigured()) redirect("/admin");
  const { supabase, user, profile } = await requireEditor();
  if (!profile || !canManageLeagueContent(profile.role)) redirect("/admin");
  const { data: faqs } = await supabase.from("faqs").select("*").order("sort_order");

  return (
    <AdminFrame active="/admin/faqs" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head"><div><span>Help Center</span><h2>FAQs</h2><p>Maintain the answers parents see most often.</p></div></div>
      <section className="admin-section-card"><div className="admin-card-heading"><div><span>New Question</span><h3>Add an FAQ</h3></div></div><FaqForm /></section>
      <div className="admin-stack">
        {(faqs || []).map((faq: any) => (
          <details className="admin-editor" key={faq.id}><summary><div><strong>{faq.question}</strong><span>{faq.category}</span></div><small>{faq.published ? "Published" : "Hidden"}</small></summary><div className="admin-editor-body"><FaqForm faq={faq} /><form action={deleteFaq} className="admin-danger-form"><input type="hidden" name="id" value={faq.id} /><button type="submit">Delete FAQ</button></form></div></details>
        ))}
      </div>
    </AdminFrame>
  );
}
