import type { Metadata } from "next";
import { Building2, HeartHandshake, Megaphone, Trophy } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { getSponsors } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "EPYAL sponsorship and community partnership opportunities."
};

export default async function SponsorsPage() {
  const sponsors = await getSponsors();
  return (
    <>
      <PageHero
        eyebrow="Support EPYAL"
        title="Sponsors"
        description="Give local businesses more meaningful visibility while creating new year-round support for East Penn youth athletics."
      >
        <div className="button-row">
          <a className="button button-orange" href="mailto:fundraising@epyal.com?subject=EPYAL%20Sponsorship%20Interest">Request Sponsorship Information</a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Partnership Structure"
            title="More than a field sign"
            description="The new website gives EPYAL a stronger digital sponsorship product to pair with signage, events and sport-level opportunities."
          />
          <div className="feature-card-grid">
            <article className="feature-card"><Trophy size={27} /><h3>Premier Partner</h3><p>High-visibility league-wide placement across the homepage, sponsor hub and key digital communications.</p><span>Top-level exposure</span></article>
            <article className="feature-card"><Megaphone size={27} /><h3>Sport Partner</h3><p>Associate a business with the sport and families most relevant to that sponsorship.</p><span>Program-specific</span></article>
            <article className="feature-card"><Building2 size={27} /><h3>Community Partner</h3><p>An accessible way for neighborhood businesses to support the league and receive digital recognition.</p><span>Local visibility</span></article>
            <article className="feature-card"><HeartHandshake size={27} /><h3>Custom Support</h3><p>Fundraisers, events, in-kind support and larger partnerships can be packaged around league needs.</p><span>Flexible opportunities</span></article>
          </div>
        </div>
      </section>

      <section className="section section-black">
        <div className="container">
          <SectionHeading eyebrow="Why It Matters" title="Make sponsorship easier to sell and renew" description="A structured sponsor database can eventually track logos, tiers, websites, sports, start dates and renewal dates — all feeding directly into the website." />
          <div className="sponsor-preview-grid">
            {sponsors.map((sponsor, index) => (
              <div className={`sponsor-preview ${index === 0 ? "featured" : ""}`} key={`${sponsor.name}-${index}`}>
                <span>{sponsor.tier} Partner</span>
                <strong>{sponsor.name}</strong>
                <small>{sponsor.sport ? `${sponsor.sport} • ` : ""}Digital visibility • community support</small>
              </div>
            ))}
          </div>
          <div className="center-actions">
            <a className="button button-orange" href="mailto:fundraising@epyal.com?subject=EPYAL%20Sponsorship%20Interest">Talk to Fundraising</a>
          </div>
        </div>
      </section>
    </>
  );
}
