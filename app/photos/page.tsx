import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Download, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { sports } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Photos",
  description: "EPYAL youth sports photography and album platform."
};

export default function PhotosPage() {
  return (
    <>
      <PageHero
        eyebrow="EPYAL Photos"
        title="Photos"
        description="A league-wide home for game-day photography, team albums and community memories — growing from the Cheer photo portal into every EPYAL sport."
      />

      <section className="section">
        <div className="container feature-split">
          <div className="photo-feature-card">
            <div className="photo-badge"><Camera size={15} /> EPYAL PHOTOS</div>
            <div className="photo-chip-row">
              {sports.slice(0, 4).map(sport => <span key={sport.slug}>{sport.name}</span>)}
            </div>
          </div>
          <div>
            <div className="eyebrow">Built from Cheer</div>
            <h2 className="feature-title">One photography platform for the whole league</h2>
            <p className="feature-copy">The existing Cheer Portal gives EPYAL the foundation for a larger sports photography platform: approved photographers, sport and team albums, clean downloads and optional Panthers-branded versions.</p>
            <div className="button-row">
              <a className="button button-dark" href="mailto:info@epyal.com?subject=EPYAL%20Photography%20Volunteer">Volunteer as a Photographer</a>
              <Link className="button button-outline" href="/volunteer">Get Involved</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Photography Program"
            title="Designed for families and volunteers"
            description="A photo platform should make finding and sharing great images easy without turning the main league website into a file dump."
          />
          <div className="feature-card-grid">
            <article className="feature-card"><Camera size={27} /><h3>Sport Albums</h3><p>Browse by sport, season, team and event instead of scrolling social media feeds.</p><span>Organized by EPYAL</span></article>
            <article className="feature-card"><Users size={27} /><h3>Approved Photographers</h3><p>Bring more parents and volunteers into the program with controlled photographer access.</p><span>Permission based</span></article>
            <article className="feature-card"><Download size={27} /><h3>Easy Downloads</h3><p>Families can download clean originals or, where available, Panthers-branded versions.</p><span>Family friendly</span></article>
            <article className="feature-card"><ShieldCheck size={27} /><h3>League Controlled</h3><p>Photography remains under EPYAL’s own structure instead of relying on disappearing social posts.</p><span>Built for continuity</span></article>
          </div>
        </div>
      </section>
    </>
  );
}
