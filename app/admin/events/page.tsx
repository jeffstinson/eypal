import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/admin/AdminFrame";
import { canManageLeagueContent, requireEditor } from "@/lib/admin-auth";
import { cmsConfigured } from "@/lib/cms";
import { deleteEvent, saveEvent } from "../actions";

const EventForm = ({ event }: { event?: any }) => (
  <form className="admin-form-grid" action={saveEvent}>
    {event?.id ? <input type="hidden" name="id" value={event.id} /> : null}
    <label><span>Event Title</span><input name="title" defaultValue={event?.title || ""} required /></label>
    <label><span>Category</span><input name="category" defaultValue={event?.category || "League"} required /></label>
    <label><span>Start Date/Time</span><input name="starts_at" type="datetime-local" defaultValue={event?.starts_at ? String(event.starts_at).slice(0,16) : ""} /></label>
    <label><span>Display Date</span><input name="display_date" defaultValue={event?.display_date || ""} placeholder="October 7, 2026" required /></label>
    <label><span>Display Time</span><input name="display_time" defaultValue={event?.display_time || ""} placeholder="8:00 PM" required /></label>
    <label><span>Location</span><input name="location" defaultValue={event?.location || ""} required /></label>
    <label className="admin-field-wide"><span>Description</span><textarea name="description" rows={3} defaultValue={event?.description || ""} /></label>
    <label className="admin-field-wide"><span>Optional Link</span><input name="url" type="url" defaultValue={event?.url || ""} /></label>
    <label className="admin-check"><input type="checkbox" name="published" defaultChecked={event ? event.published : true} /><span>Published</span></label>
    <label className="admin-check"><input type="checkbox" name="featured" defaultChecked={Boolean(event?.featured)} /><span>Featured</span></label>
    <div><button className="button button-orange" type="submit">{event ? "Save Event" : "Create Event"}</button></div>
  </form>
);

export default async function AdminEventsPage() {
  if (!cmsConfigured()) redirect("/admin");
  const { supabase, user, profile } = await requireEditor();
  if (!profile || !canManageLeagueContent(profile.role)) redirect("/admin");
  const { data: events } = await supabase.from("events").select("*").order("starts_at", { ascending: true });

  return (
    <AdminFrame active="/admin/events" profile={profile} email={user.email || "EPYAL editor"}>
      <div className="admin-page-head"><div><span>Calendar</span><h2>Events</h2><p>Board meetings, fundraisers, registration dates and community events.</p></div></div>
      <section className="admin-section-card"><div className="admin-card-heading"><div><span>New Event</span><h3>Add to the league calendar</h3></div></div><EventForm /></section>
      <div className="admin-stack">
        {(events || []).map((event: any) => (
          <details className="admin-editor" key={event.id}><summary><div><strong>{event.title}</strong><span>{event.display_date} • {event.display_time}</span></div><small>{event.published ? "Published" : "Draft"}</small></summary><div className="admin-editor-body"><EventForm event={event} /><form action={deleteEvent} className="admin-danger-form"><input type="hidden" name="id" value={event.id} /><button type="submit">Delete event</button></form></div></details>
        ))}
      </div>
    </AdminFrame>
  );
}
