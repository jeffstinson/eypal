import type { Metadata } from "next";
import Link from "next/link";
import { Building2, HandHeart, Megaphone, Trophy } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Fundraising",
  description: "Support East Pennsboro youth sports through EPYAL fundraising, sponsorships and community partnerships."
};

export default function FundraisingPage() {
  return (
    <>
      <PageHero
        eyebrow="Support East Penn Youth Sports"
        title="Fundraising"
        description="Fundraising and local sponsorships help EPYAL maintain equipment, uniforms, facilities and accessible youth sports opportunities for East Pennsboro families."
      >
        <div className="button-row">
          <a className="button button-orange" href="mailto:fundraising@epyal.com?subject=EPYAL%20Fundraising%20or%20Sponsorship">Contact Fundraising</a>
          <Link className="button button-ghost" href="/sponsors">Sponsorship Opportunities</Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Community Support"
            title="Every partnership helps the league go further"
            description="EPYAL’s current baseball materials specifically note that donations and sponsorships help fund equipment, uniforms and facilities while keeping registration costs reasonable."
          />
          <div className="feature-card-grid">
            <article className="feature-card"><Building2 size={27} /><h3>Business Sponsorships</h3><p>Local companies can support the league while receiving digital, field and sport-specific visibility.</p><Link href="/sponsors"><span>Explore sponsorships →</span></Link></article>
            <article className="feature-card"><HandHeart size={27} /><h3>Donations</h3><p>Direct community support can help programs cover equipment, facility and seasonal operating needs.</p><a href="mailto:fundraising@epyal.com?subject=EPYAL%20Donation"><span>Ask about donating →</span></a></article>
            <article className="feature-card"><Megaphone size={27} /><h3>Seasonal Fundraisers</h3><p>Programs may run sport-specific fundraisers throughout the year. A modern site gives those campaigns a central home.</p><Link href="/events"><span>Check league events →</span></Link></article>
            <article className="feature-card"><Trophy size={27} /><h3>Program Support</h3><p>Businesses can also work with EPYAL on sport-level support, events and in-kind partnerships.</p><a href="mailto:fundraising@epyal.com?subject=EPYAL%20Program%20Support"><span>Start a conversation →</span></a></article>
          </div>
        </div>
      </section>

      <section className="section section-black">
        <div className="container cta-panel">
          <div>
            <div className="eyebrow">Fundraising Director</div>
            <h2>Have an idea or want to help?</h2>
            <p>James Edrington currently serves as EPYAL’s Fundraising Director. Reach out to discuss sponsorships, fundraisers, donations or community partnerships.</p>
          </div>
          <a className="button button-orange" href="mailto:fundraising@epyal.com">fundraising@epyal.com</a>
        </div>
      </section>
    </>
  );
}
