import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { events } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Events",
  description: "EPYAL events, board meetings and community activities."
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="League Calendar"
        title="Events"
        description="Board meetings, fundraisers, program events and community activities in one clear calendar."
      />
      <section className="section section-soft">
        <div className="container list-grid">
          {events.map((event, index) => (
            <article className="list-card" key={`${event.title}-${index}`}>
              <div className="list-card-icon"><CalendarDays size={22} /></div>
              <div>
                <span className="meta-label">{event.category}</span>
                <h3>{event.title}</h3>
                <p>{event.date} • {event.time}</p>
                <small>{event.location}</small>
              </div>
              <span className="status-pill status-soon" style={{ position: "static" }}>{event.category}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
