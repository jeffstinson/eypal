import type { Metadata } from "next";
import Link from "next/link";
import { CalendarRange, ExternalLink, ListChecks, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { sportsConnectRoot } from "@/lib/site-content";
import { getSports } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Youth Sports Registration",
  description: "EPYAL registration information for youth baseball, softball, basketball, tackle football, flag football, cheerleading and field hockey in East Pennsboro and Enola, Pennsylvania."
};

export default async function RegistrationPage() {
  const sports = await getSports();

  return (
    <>
      <PageHero
        eyebrow="Registration Center"
        title="Registration"
        description="Check the current status of every EPYAL sport, learn what each program offers and then continue into Sports Connect for parent login, participant information and payment."
      >
        <div className="button-row">
          <a className="button button-orange" href={sportsConnectRoot} target="_blank" rel="noreferrer">
            Parent Login / Available Programs <ExternalLink size={15} />
          </a>
          <Link className="button button-ghost" href="/parents">Parent Guide</Link>
        </div>
      </PageHero>

      <section className="section section-soft">
        <div className="container">
          <div className="system-callout">
            <ShieldCheck size={28} />
            <div>
              <strong>Sports Connect remains EPYAL’s secure registration system.</strong>
              <p>The public website explains programs and registration status. Sports Connect handles parent accounts, player profiles, waivers, registration and payment.</p>
            </div>
          </div>

          <div className="registration-grid">
            {sports.map(sport => (
              <article className="registration-card" key={sport.slug}>
                <div className="registration-card-top">
                  <span className="sport-mark small">{sport.short}</span>
                  <span className={`status-pill status-${sport.status}`}>{sport.statusLabel}</span>
                </div>
                <h3>{sport.name}</h3>
                <p className="registration-meta">{sport.season} • {sport.ages}</p>
                <p>{sport.registrationSummary}</p>
                <div className="registration-actions">
                  <Link className="button button-dark" href={`/sports/${sport.slug}`}>Program Details</Link>
                  <a className="button button-outline" href={sport.registrationUrl} target="_blank" rel="noreferrer">Sports Connect <ExternalLink size={14} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="How It Works"
            title="From interest to registration"
            description="The new site makes it easier to understand the program before asking a parent to enter the registration system."
          />
          <div className="feature-card-grid">
            <article className="feature-card"><CalendarRange size={27} /><h3>1. Find the Season</h3><p>Use sport pages and the Registration Center to see the current season, age range and registration status.</p><Link href="/sports"><span>Browse sports →</span></Link></article>
            <article className="feature-card"><ListChecks size={27} /><h3>2. Review Program Details</h3><p>Read division, uniform, eligibility and family information before beginning the registration process.</p><Link href="/parents"><span>Parent guide →</span></Link></article>
            <article className="feature-card"><Users size={27} /><h3>3. Use Sports Connect</h3><p>Existing EPYAL families log in; new families create an account so Sports Connect can show available programs for their children.</p><a href={sportsConnectRoot} target="_blank" rel="noreferrer"><span>Open Sports Connect ↗</span></a></article>
            <article className="feature-card"><ShieldCheck size={27} /><h3>4. Keep Sensitive Data There</h3><p>Participant records, waivers, payment and registration history remain in the system EPYAL already uses.</p><Link href="/privacy"><span>Website privacy →</span></Link></article>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="Season Overview"
            title="Youth sports throughout the year"
            description="EPYAL programs span spring, summer, fall and winter, giving East Penn families multiple ways to participate."
          />
          <div className="resource-table season-table">
            {sports.map(sport => (
              <div className="resource-table-row" key={sport.slug}>
                <strong>{sport.name}</strong>
                <span>{sport.season} • {sport.ages}</span>
                <Link className="text-link light" href={`/sports/${sport.slug}`}>Program details →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
