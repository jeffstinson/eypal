import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, ClipboardCheck, ExternalLink, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { parentGuideSections, codeOfConductUrl } from "@/lib/resource-content";
import { sportsConnectRoot } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Parent Guide",
  description: "A practical parent guide for EPYAL youth sports registration, schedules, sportsmanship and season expectations."
};

export default function ParentsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Families"
        title="Parent Guide"
        description="A practical roadmap for East Pennsboro families — from choosing a sport and registering to understanding season communication, volunteer expectations and league conduct."
      >
        <div className="button-row">
          <a className="button button-orange" href={sportsConnectRoot} target="_blank" rel="noreferrer">Parent Login <ExternalLink size={15} /></a>
          <Link className="button button-ghost" href="/registration">Registration Center</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Season Roadmap"
            title="What families can expect"
            description="Every sport is a little different, but the basic flow is consistent across EPYAL."
          />
          <div className="detail-grid">
            {parentGuideSections.map((section, index) => (
              <article className="detail-card" key={section.title}>
                <span className="meta-label">Step {index + 1}</span>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container two-column">
          <div className="content-panel">
            <div className="eyebrow">Sportsmanship</div>
            <h2>Parents set the tone too</h2>
            <p>EPYAL’s published Code of Conduct asks parents and players to support coaches, officials and teammates with respect. Youth sports work best when adults model the same sportsmanship expected from athletes.</p>
            <div className="button-row">
              <a className="button button-dark" href={codeOfConductUrl} target="_blank" rel="noreferrer">View Code of Conduct ↗</a>
            </div>
          </div>
          <div className="content-panel">
            <div className="eyebrow">Communication</div>
            <h2>Know where to look</h2>
            <p>Use the sport page for program-wide information, your coach for team-specific questions, the Events page for league dates, and the Leadership directory when you need a director or board contact.</p>
            <div className="button-row">
              <Link className="button button-dark" href="/leadership">Leadership Directory</Link>
              <Link className="button button-outline" href="/events">League Events</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Quick Help" title="Common parent questions" />
          <div className="feature-card-grid">
            <article className="feature-card"><ClipboardCheck size={27} /><h3>Registration</h3><p>Sports Connect remains the secure place for parent accounts, participant records and payment.</p><Link href="/registration"><span>Check registration →</span></Link></article>
            <article className="feature-card"><CalendarClock size={27} /><h3>Schedules</h3><p>Team and game schedules are communicated through coaches and program systems as teams are formed.</p><Link href="/events"><span>League events →</span></Link></article>
            <article className="feature-card"><Users size={27} /><h3>Contacts</h3><p>Each sport page lists current program directors and the best sport email address.</p><Link href="/leadership"><span>Find a contact →</span></Link></article>
            <article className="feature-card"><ShieldCheck size={27} /><h3>Policies</h3><p>Use the resource center for Code of Conduct, volunteer clearances and sport-specific documents.</p><Link href="/documents"><span>Documents & policies →</span></Link></article>
          </div>
        </div>
      </section>
    </>
  );
}
