import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, HeartPulse, ShieldCheck, UserCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { paClearancesUrl } from "@/lib/resource-content";

export const metadata: Metadata = {
  title: "Safety & Clearances",
  description: "EPYAL youth sports safety resources, Pennsylvania volunteer clearances and concussion education."
};

const cdcHeadsUp = "https://www.cdc.gov/heads-up/";
const cdcCoachTraining = "https://www.cdc.gov/heads-up/training/youth-sports.html";
const childline = "https://www.pa.gov/services/dhs/report-child-abuse-or-neglect";

export default function SafetyPage() {
  return (
    <>
      <PageHero
        eyebrow="Youth Sports Safety"
        title="Safety & Clearances"
        description="A central place for trusted safety information, volunteer screening resources and league expectations that help protect East Penn athletes."
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Volunteer Safety"
            title="Start with required clearances and program approval"
            description="EPYAL’s current sport pages reference background checks, volunteer forms and Pennsylvania clearance requirements. This page points adults to official sources rather than duplicating instructions that can change."
          />
          <div className="feature-card-grid">
            <article className="feature-card">
              <ShieldCheck size={27} />
              <h3>PA Child Abuse Clearances</h3>
              <p>Official Commonwealth guidance for employees and volunteers who have direct contact with children.</p>
              <a href={paClearancesUrl} target="_blank" rel="noreferrer"><span>PA clearances <ExternalLink size={14} /></span></a>
            </article>
            <article className="feature-card">
              <UserCheck size={27} />
              <h3>Sport Approval</h3>
              <p>Coaching and volunteer approval is handled through EPYAL’s sport directors and league processes.</p>
              <Link href="/coaches"><span>Coach & volunteer center →</span></Link>
            </article>
            <article className="feature-card">
              <HeartPulse size={27} />
              <h3>Concussion Education</h3>
              <p>CDC HEADS UP provides current concussion recognition, response and return-to-sports resources for youth athletics.</p>
              <a href={cdcHeadsUp} target="_blank" rel="noreferrer"><span>CDC HEADS UP <ExternalLink size={14} /></span></a>
            </article>
            <article className="feature-card">
              <FileText size={27} />
              <h3>League Conduct</h3>
              <p>Sportsmanship, respectful behavior and positive adult leadership are part of the safety culture too.</p>
              <Link href="/documents"><span>Documents & policies →</span></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container two-column">
          <article className="content-panel">
            <div className="eyebrow">Concussion Response</div>
            <h2>When a concussion is suspected</h2>
            <p>CDC HEADS UP recommends removing an athlete from participation right away when a concussion is suspected, keeping the athlete out the same day and having return-to-sports decisions made by a healthcare provider.</p>
            <p>This page is an informational link to official guidance, not a substitute for medical evaluation or your sport’s required safety procedures.</p>
            <div className="button-row">
              <a className="button button-dark" href={cdcCoachTraining} target="_blank" rel="noreferrer">Coach Training <ExternalLink size={14} /></a>
              <a className="button button-outline" href={cdcHeadsUp} target="_blank" rel="noreferrer">HEADS UP Resources <ExternalLink size={14} /></a>
            </div>
          </article>

          <article className="content-panel">
            <div className="eyebrow">Child Safety</div>
            <h2>Reporting concerns</h2>
            <p>Pennsylvania’s ChildLine is the Commonwealth resource for reporting suspected child abuse or neglect. The state lists ChildLine at 1-800-932-0313 and provides online reporting information for mandatory reporters.</p>
            <p>For immediate danger or a medical emergency, use emergency services.</p>
            <a className="button button-dark" href={childline} target="_blank" rel="noreferrer">Pennsylvania ChildLine Information <ExternalLink size={14} /></a>
          </article>
        </div>
      </section>
    </>
  );
}
