import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { canManageLeagueContent, requireEditor } from "@/lib/admin-auth";
import { cmsConfigured } from "@/lib/cms";
import { setSubscriberActive } from "../actions";

export default async function AdminNewsletterPage() {
  if (!cmsConfigured()) redirect("/admin");
  const { supabase, user, profile } = await requireEditor();
  if (!profile || !canManageLeagueContent(profile.role)) redirect("/admin");

  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("email,active,source,consented_at,unsubscribed_at")
    .order("consented_at", { ascending: false })
    .limit(500);

  const activeCount = (subscribers || []).filter((item: any) => item.active).length;

  return (
    <AdminFrame active="/admin/newsletter" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head"><div><span>Communications</span><h2>Newsletter Subscribers</h2><p>Consent-aware email list collected through the public website.</p></div><div className="admin-count-chip">{activeCount} active</div></div>

      <section className="admin-section-card">
        <div className="admin-card-heading"><div><span>Subscriber List</span><h3>Recent signups</h3></div><small>Sending campaigns remains separate from website content management.</small></div>
        <div className="admin-table">
          <div className="admin-table-row admin-table-head"><span>Email</span><span>Source</span><span>Consent</span><span>Status</span><span>Action</span></div>
          {(subscribers || []).map((subscriber: any) => (
            <div className="admin-table-row" key={subscriber.email}>
              <span>{subscriber.email}</span>
              <span>{subscriber.source}</span>
              <span>{new Date(subscriber.consented_at).toLocaleDateString()}</span>
              <span>{subscriber.active ? "Active" : "Unsubscribed"}</span>
              <form action={setSubscriberActive}>
                <input type="hidden" name="email" value={subscriber.email} />
                <input type="hidden" name="active" value={subscriber.active ? "false" : "true"} />
                <button className="admin-inline-action" type="submit">{subscriber.active ? "Deactivate" : "Reactivate"}</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </AdminFrame>
  );
}
