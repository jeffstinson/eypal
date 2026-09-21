import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { canManageLeagueContent, requireEditor } from "@/lib/admin-auth";
import { cmsConfigured } from "@/lib/cms";
import { deleteNews, saveNews } from "../actions";

export default async function AdminNewsPage() {
  if (!cmsConfigured()) redirect("/admin");
  const { supabase, user, profile } = await requireEditor();
  if (!profile || !canManageLeagueContent(profile.role)) redirect("/admin");

  const { data: posts } = await supabase.from("news_posts").select("*").order("published_at", { ascending: false });

  return (
    <AdminFrame active="/admin/news" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head"><div><span>Content</span><h2>News</h2><p>Create registration updates, program stories and shareable league articles.</p></div></div>

      <section className="admin-section-card">
        <div className="admin-card-heading"><div><span>New Article</span><h3>Create a news post</h3></div></div>
        <form className="admin-form-grid" action={saveNews}>
          <label><span>Title</span><input name="title" required /></label>
          <label><span>Category</span><input name="category" defaultValue="League" required /></label>
          <label><span>Display Date</span><input name="display_date" placeholder="October 2026" required /></label>
          <label><span>Custom Slug</span><input name="slug" placeholder="optional-auto-generated" /></label>
          <label className="admin-field-wide"><span>Excerpt</span><textarea name="excerpt" rows={3} required /></label>
          <label className="admin-field-wide"><span>Article Body</span><textarea name="body" rows={10} placeholder="Use blank lines between paragraphs." required /></label>
          <label><span>SEO Title</span><input name="seo_title" /></label>
          <label><span>SEO Description</span><input name="seo_description" /></label>
          <label className="admin-check"><input type="checkbox" name="published" defaultChecked /><span>Published</span></label>
          <label className="admin-check"><input type="checkbox" name="featured" /><span>Featured</span></label>
          <div><button className="button button-orange" type="submit">Create Article</button></div>
        </form>
      </section>

      <div className="admin-stack">
        {(posts || []).map((post: any) => (
          <details className="admin-editor" key={post.id}>
            <summary><div><strong>{post.title}</strong><span>{post.category} • {post.display_date}</span></div><small>{post.published ? "Published" : "Draft"}</small></summary>
            <div className="admin-editor-body">
              <form className="admin-form-grid" action={saveNews}>
                <input type="hidden" name="id" value={post.id} />
                <label><span>Title</span><input name="title" defaultValue={post.title} required /></label>
                <label><span>Category</span><input name="category" defaultValue={post.category} required /></label>
                <label><span>Display Date</span><input name="display_date" defaultValue={post.display_date} required /></label>
                <label><span>Slug</span><input name="slug" defaultValue={post.slug} required /></label>
                <label className="admin-field-wide"><span>Excerpt</span><textarea name="excerpt" rows={3} defaultValue={post.excerpt} required /></label>
                <label className="admin-field-wide"><span>Article Body</span><textarea name="body" rows={10} defaultValue={post.body || ""} required /></label>
                <label><span>SEO Title</span><input name="seo_title" defaultValue={post.seo_title || ""} /></label>
                <label><span>SEO Description</span><input name="seo_description" defaultValue={post.seo_description || ""} /></label>
                <label className="admin-check"><input type="checkbox" name="published" defaultChecked={post.published} /><span>Published</span></label>
                <label className="admin-check"><input type="checkbox" name="featured" defaultChecked={post.featured} /><span>Featured</span></label>
                <div><button className="button button-dark" type="submit">Save Changes</button></div>
              </form>
              <form action={deleteNews} className="admin-danger-form"><input type="hidden" name="id" value={post.id} /><input type="hidden" name="slug" value={post.slug} /><button type="submit">Delete article</button></form>
            </div>
          </details>
        ))}
      </div>
    </AdminFrame>
  );
}
