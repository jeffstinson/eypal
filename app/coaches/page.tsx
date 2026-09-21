import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, ExternalLink, HandHeart, ShieldCheck, Trophy, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { littleLeagueVolunteerUrl, paClearancesUrl, resources } from "@/lib/resource-content";
import { sports } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Coaches & Volunteers",
  description: "EPYAL coaching, volunteer, background-clearance and youth sports service resources."
};

export default function CoachesPage() {
  const coachingResources = resources.filter(item => ["Coaches","Safety","Baseball","Softball","Flag Football","Cheer"].includes(item.category));

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Coaches & Volunteers"
        description="Youth sports happen because local adults give their time. Start here for coaching contacts, Pennsylvania clearances, volunteer information and sport-specific resources."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Before You Coach"
            title="Safety, screening and approval come first"
            description="Requirements vary by sport, but EPYAL’s current program pages consistently reference background checks, volunteer forms, clearances and board or program approval."
          />
          <div className="feature-card-grid">
            <article className="feature-card"><ShieldCheck size={27} /><h3>PA Clearances</h3><p>Pennsylvania requires applicable adults working or volunteering with children to obtain required clearances.</p><a href={paClearancesUrl} target="_blank" rel="noreferrer"><span>Official PA information <ExternalLink size={14} /></span></a></article>
            <article className="feature-card"><ClipboardCheck size={27} /><h3>Sport Application</h3><p>Baseball, Flag Football and other programs publish coaching applications or volunteer forms through their current pages.</p><Link href="/documents"><span>Find applications →</span></Link></article>
            <article className="feature-card"><Users size={27} /><h3>Program Approval</h3><p>Coaches work through sport directors and league processes before receiving team responsibility.</p><Link href="/leadership"><span>Contact directors →</span></Link></article>
            <article className="feature-card"><Trophy size={27} /><h3>Positive Coaching</h3><p>EPYAL’s published expectations emphasize sportsmanship, safety, development and respect over winning at all costs.</p><Link href="/documents"><span>League policies →</span></Link></article>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Sport Contacts" title="Start with the program you want to help" description="Directors can tell you about current openings, season timing and sport-specific requirements." />
          <div className="directory-grid">
            {sports.map(sport => (
              <article className="directory-card" key={sport.slug}>
                <span>{sport.name}</span>
                <h3>{sport.directors}</h3>
                <a href={`mailto:${sport.email}`}>{sport.email}</a>
                <div className="button-row" style={{ marginTop: 14 }}>
                  <Link className="button button-outline" href={`/sports/${sport.slug}`}>Program Page</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div className="content-panel">
            <div className="eyebrow">Pennsylvania</div>
            <h2>Volunteer clearances</h2>
            <p>Official Pennsylvania guidance says applicable employees and volunteers with child contact may need Child Abuse, State Police and, in some cases, FBI clearances. EPYAL can link families to the official source rather than maintaining stale instructions.</p>
            <a className="button button-dark" href={paClearancesUrl} target="_blank" rel="noreferrer">PA Clearance Information <ExternalLink size={14} /></a>
          </div>
          <div className="content-panel">
            <div className="eyebrow">Little League</div>
            <h2>Baseball & softball volunteers</h2>
            <p>Little League’s official volunteer guidance covers applications, background checks and Abuse Awareness Training. EPYAL’s baseball and softball pages also publish their own current forms and requirements.</p>
            <a className="button button-dark" href={littleLeagueVolunteerUrl} target="_blank" rel="noreferrer">Little League Volunteers <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Current Resources" title="Applications, rules and volunteer information" />
          <div className="list-grid">
            {coachingResources.map(resource => (
              <article className="list-card" key={resource.title}>
                <div className="list-card-icon"><HandHeart size={22} /></div>
                <div><span className="meta-label">{resource.category}</span><h3>{resource.title}</h3><p>{resource.description}</p></div>
                <a className="button button-outline" href={resource.href} target="_blank" rel="noreferrer">Open ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
