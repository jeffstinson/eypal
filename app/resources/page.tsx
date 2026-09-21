import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ClipboardCheck, FileText, HelpCircle, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { resources } from "@/lib/resource-content";

export const metadata: Metadata = {
  title: "Resources",
  description: "EPYAL parent, coach, volunteer, safety and policy resources for East Pennsboro youth sports."
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="League Resources"
        title="Resources"
        description="One place for parents, coaches and volunteers to find practical EPYAL information, policies, forms and trusted outside resources."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Start Here"
            title="Find what you need without hunting through old pages"
            description="The current EPYAL site has valuable information spread across individual sports. This hub brings the most useful material together."
          />
          <div className="feature-card-grid resource-hub-grid">
            <Link className="feature-card" href="/parents"><BookOpen size={27} /><h3>Parent Guide</h3><p>Registration, season expectations, sportsmanship, schedule changes and who to contact.</p><span>Parent resources →</span></Link>
            <Link className="feature-card" href="/coaches"><Users size={27} /><h3>Coaches & Volunteers</h3><p>Clearances, applications, coaching expectations and ways to help across the league.</p><span>Volunteer resources →</span></Link>
            <Link className="feature-card" href="/documents"><FileText size={27} /><h3>Documents & Policies</h3><p>Code of Conduct, parent guides, rule books, volunteer requirements and external governing resources.</p><span>Open documents →</span></Link>
            <Link className="feature-card" href="/faq"><HelpCircle size={27} /><h3>Frequently Asked Questions</h3><p>Quick answers about registration, accounts, volunteering, facilities, sponsors and photos.</p><span>Browse FAQs →</span></Link>
            <Link className="feature-card" href="/safety"><ShieldCheck size={27} /><h3>Safety & Clearances</h3><p>Official Pennsylvania clearance information, concussion resources and youth-sports safety links.</p><span>Safety resources →</span></Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Current Links" title="Verified EPYAL and safety resources" description="These links point to EPYAL’s existing published material or official governing resources while the full content system is migrated." />
          <div className="list-grid">
            {resources.map((resource) => (
              <article className="list-card" key={resource.title}>
                <div className="list-card-icon">
                  {resource.category === "Safety" ? <ShieldCheck size={22} /> : resource.category === "Coaches" ? <ClipboardCheck size={22} /> : <FileText size={22} />}
                </div>
                <div>
                  <span className="meta-label">{resource.category}</span>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                </div>
                <a className="button button-outline" href={resource.href} target={resource.external ? "_blank" : undefined} rel={resource.external ? "noreferrer" : undefined}>Open Resource ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
