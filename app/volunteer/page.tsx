import type { Metadata } from "next";
import Link from "next/link";
import { Camera, HandHeart, Trophy, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { sportsConnectRoot } from "@/lib/site-content";
import { getSports } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer, coach and support EPYAL youth athletics."
};

export default async function VolunteerPage() {
  const sports = await getSports();
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Volunteer"
        description="Coaches, concessions, event help, photographers and community volunteers are what make youth sports work."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Ways to Help"
            title="There’s a place for more than coaches"
            description="EPYAL can make volunteer opportunities much easier to understand and find."
          />
          <div className="feature-card-grid">
            <article className="feature-card"><Trophy size={27} /><h3>Coach</h3><p>Help players develop skills, confidence, sportsmanship and a love for the game.</p><span>Sport-specific opportunity</span></article>
            <article className="feature-card"><Users size={27} /><h3>Game-Day Volunteer</h3><p>Concessions, fields, scorekeeping and events keep every season moving.</p><span>Flexible ways to help</span></article>
            <article className="feature-card"><Camera size={27} /><h3>Photographer</h3><p>Join the growing parent photographer network and help document EPYAL seasons.</p><span>Photo platform access</span></article>
            <article className="feature-card"><HandHeart size={27} /><h3>League Support</h3><p>Marketing, fundraising, sponsorships and board support create impact across every sport.</p><span>League-wide impact</span></article>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Coaching" title="Start with your sport" description="Program directors can answer current coaching needs and requirements." />
          <div className="directory-grid">
            {sports.map(sport => (
              <article className="directory-card" key={sport.slug}>
                <span>{sport.name}</span>
                <h3>{sport.directors}</h3>
                <a href={`mailto:${sport.email}`}>{sport.email}</a>
                <div className="button-row" style={{ marginTop: 14 }}>
                  <Link className="button button-outline" href={`/sports/${sport.slug}`}>Program</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-panel">
          <div>
            <div className="eyebrow">Sports Connect</div>
            <h2>Existing volunteer tools stay available</h2>
            <p>Where EPYAL currently uses Sports Connect for volunteer registration or account-based forms, those workflows can stay in place while the new site makes them easier to find.</p>
          </div>
          <a className="button button-orange" href={sportsConnectRoot} target="_blank" rel="noreferrer">Sports Connect ↗</a>
        </div>
      </section>
    </>
  );
}
