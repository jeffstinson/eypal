import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { sportsConnectRoot } from "@/lib/site-content";
import { getSports } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Registration",
  description: "EPYAL youth sports registration center."
};

export default async function RegistrationPage() {
  const sports = await getSports();
  return (
    <>
      <PageHero
        eyebrow="Registration Center"
        title="Registration"
        description="See the current status for each EPYAL program before continuing into Sports Connect for parent login, participant information and payment."
      >
        <div className="button-row">
          <a className="button button-orange" href={sportsConnectRoot} target="_blank" rel="noreferrer">
            Parent Login / Programs <ExternalLink size={15} />
          </a>
        </div>
      </PageHero>

      <section className="section section-soft">
        <div className="container">
          <div className="system-callout">
            <ShieldCheck size={28} />
            <div>
              <strong>EPYAL’s new site does not collect registration or payment data.</strong>
              <p>Sports Connect remains the secure source of truth for parent accounts, player profiles, waivers, registration and payment.</p>
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
    </>
  );
}
