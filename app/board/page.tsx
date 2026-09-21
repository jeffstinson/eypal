import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, FileText, Mail, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { events, leadership } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Board & League Governance",
  description: "EPYAL board leadership, public meetings and league governance information."
};

export default function BoardPage() {
  const officers = leadership.slice(0, 4);
  const meetings = events.filter(event => event.category === "Board");

  return (
    <>
      <PageHero
        eyebrow="League Leadership"
        title="Board & Governance"
        description="EPYAL is a community-run youth athletic organization. Public meetings, league officers and clear points of contact help families understand how the organization works."
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="League Officers" title="Current board leadership" />
          <div className="directory-grid">
            {officers.map(person => (
              <article className="directory-card" key={person.role}>
                <span>{person.role}</span>
                <h3>{person.name}</h3>
                {person.email ? <a href={`mailto:${person.email}`}>{person.email}</a> : <p>EPYAL Board</p>}
              </article>
            ))}
          </div>
          <div className="center-actions">
            <Link className="text-link" href="/leadership">View full league leadership →</Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container two-column">
          <div>
            <SectionHeading eyebrow="Public Meetings" title="Board meeting calendar" align="left" />
            <div className="list-grid">
              {meetings.map((meeting, index) => (
                <article className="list-card" key={`${meeting.title}-${index}`}>
                  <div className="list-card-icon"><CalendarDays size={22} /></div>
                  <div>
                    <h3>{meeting.title}</h3>
                    <p>{meeting.date} • {meeting.time}</p>
                    <small>{meeting.location}</small>
                  </div>
                  <Link className="button button-outline" href="/events">Calendar</Link>
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="How to Engage" title="Questions, ideas and league business" align="left" />
            <div className="feature-card-grid board-feature-grid">
              <article className="feature-card"><Users size={27} /><h3>Attend a Meeting</h3><p>Public board meetings give families a direct look at league-wide planning and operations.</p><Link href="/events"><span>Upcoming meetings →</span></Link></article>
              <article className="feature-card"><Mail size={27} /><h3>Contact Leadership</h3><p>Use the Leadership directory to reach the right officer, director or fundraising contact.</p><Link href="/leadership"><span>Leadership directory →</span></Link></article>
              <article className="feature-card"><FileText size={27} /><h3>Policies & Resources</h3><p>League expectations, volunteer resources and program documents are organized in the Resource Center.</p><Link href="/documents"><span>Documents & policies →</span></Link></article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
