import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, ShieldCheck, Trophy, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About East Pennsboro Youth Athletic League",
  description: "Learn about EPYAL, the East Penn Panthers and the league’s mission to provide youth athletic opportunities for East Pennsboro and surrounding communities."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="East Penn Panthers"
        title="About EPYAL"
        description="A community youth athletic league serving East Pennsboro families through sportsmanship, teamwork, skill development and volunteer leadership."
      />

      <section className="section">
        <div className="container feature-split">
          <div>
            <div className="eyebrow">Since 1946</div>
            <h2 className="feature-title">Generations of youth athletics</h2>
            <p className="feature-copy">East Pennsboro Youth Athletic League has served local families for generations, bringing kids, parents, coaches and volunteers together around organized youth sports and the East Penn Panthers identity. Today the league supports seven sports across multiple seasons.</p>
            <p className="feature-copy" style={{ marginTop: 15 }}>EPYAL operates as a community nonprofit organization focused on providing facilities, supervision and athletic opportunities for youth in East Pennsboro Township and surrounding communities.</p>
            <div className="button-row">
              <Link className="button button-dark" href="/sports">Explore Sports</Link>
              <Link className="button button-outline" href="/leadership">Meet Leadership</Link>
            </div>
          </div>
          <div className="impact-grid">
            <div><Trophy size={25} /><strong>1946</strong><span>League established</span></div>
            <div><Users size={25} /><strong>1,000+</strong><span>Youth served annually</span></div>
            <div><ShieldCheck size={25} /><strong>7</strong><span>Sports programs</span></div>
            <div><HandHeart size={25} /><strong>1</strong><span>Community mission</span></div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="League Values"
            title="More than wins and losses"
            description="EPYAL’s published mission and conduct materials center youth sports around development, cooperation, responsibility and respect."
          />
          <div className="feature-card-grid">
            <article className="feature-card"><Trophy size={27} /><h3>Sportsmanship</h3><p>Teach athletes to compete hard while respecting teammates, opponents, coaches and officials.</p><span>Positive competition</span></article>
            <article className="feature-card"><Users size={27} /><h3>Teamwork</h3><p>Create opportunities for young athletes to learn cooperation, responsibility and how to contribute to a team.</p><span>Grow together</span></article>
            <article className="feature-card"><ShieldCheck size={27} /><h3>Safe Participation</h3><p>Support supervised athletic activities, volunteer screening and responsible youth-sports practices.</p><span>Protect the experience</span></article>
            <article className="feature-card"><HandHeart size={27} /><h3>Community</h3><p>Encourage athletes and families to take pride in East Penn and participate in the betterment of their community.</p><span>Panthers together</span></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="How the Website Works"
            title="Modern public experience. Proven registration system."
            description="The new website improves communication, discovery and community visibility without forcing EPYAL to replace the operational tools families already use."
          />
          <div className="feature-card-grid">
            <article className="feature-card"><Users size={27} /><h3>Families</h3><p>Find registration status, sport information, events, resources and the right contact quickly.</p><span>Clearer experience</span></article>
            <article className="feature-card"><ShieldCheck size={27} /><h3>Sports Connect</h3><p>Parent login, player profiles, waivers, registration and payment remain in the existing system.</p><span>System of record</span></article>
            <article className="feature-card"><HandHeart size={27} /><h3>Volunteers</h3><p>Coaches, photographers and community helpers get a clear place to learn how to participate.</p><span>More involvement</span></article>
            <article className="feature-card"><Trophy size={27} /><h3>Community</h3><p>Sponsors, photos, stories and events become part of one consistent East Penn Panthers brand.</p><span>Stronger identity</span></article>
          </div>
          <div className="center-actions">
            <Link className="button button-dark" href="/board">Board & Governance</Link>
          </div>
        </div>
      </section>
    </>
  );
}
