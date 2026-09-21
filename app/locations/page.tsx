import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MapPin, School, Trophy } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Fields & Locations",
  description: "EPYAL fields, Sheaffer Fieldhouse & Athletic Complex, gyms and common youth sports locations in East Pennsboro and Enola, Pennsylvania."
};

const sheafferMaps = "https://www.google.com/maps/search/?api=1&query=907+Wertzville+Rd+Enola+PA+17025";

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Fields & Facilities"
        title="Locations"
        description="Find EPYAL’s primary complex and common program facilities. Team schedules may also use additional regional locations during the season."
      />

      <section className="section">
        <div className="container feature-split">
          <div>
            <div className="eyebrow">Primary EPYAL Facility</div>
            <h2 className="feature-title">Sheaffer Fieldhouse & Athletic Complex</h2>
            <p className="feature-copy">Sheaffer Field is the central home for many East Penn Panthers activities and league operations. EPYAL materials list the complex at 907 Wertzville Road in Enola.</p>
            <p className="feature-copy" style={{ marginTop: 15 }}>The facility is used across the league for youth sports, meetings, events and program operations. Exact field assignments and access details can vary by sport and date.</p>
            <div className="button-row">
              <a className="button button-dark" href={sheafferMaps} target="_blank" rel="noreferrer">Directions <ExternalLink size={14} /></a>
              <Link className="button button-outline" href="/events">League Events</Link>
            </div>
          </div>

          <div className="location-address-card">
            <MapPin size={30} />
            <span>Sheaffer Fieldhouse & Athletic Complex</span>
            <strong>907 Wertzville Rd.</strong>
            <strong>Enola, PA 17025</strong>
            <small>Primary EPYAL complex</small>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Where We Play" title="Home, school and regional facilities" description="Not every EPYAL program uses the same field or gym, and away schedules can take teams throughout the region." />
          <div className="detail-grid">
            <article className="detail-card">
              <MapPin size={24} style={{ color: "var(--orange)", marginBottom: 12 }} />
              <h3>Sheaffer Field</h3>
              <p>Primary EPYAL complex for league operations and many outdoor activities.</p>
            </article>
            <article className="detail-card">
              <School size={24} style={{ color: "var(--orange)", marginBottom: 12 }} />
              <h3>School Gym Locations</h3>
              <p>Basketball and indoor activities may use East Pennsboro school gyms depending on division, event and facility availability.</p>
            </article>
            <article className="detail-card">
              <Trophy size={24} style={{ color: "var(--orange)", marginBottom: 12 }} />
              <h3>Away & Regional Sites</h3>
              <p>Travel, league and tournament schedules may include other facilities. Always confirm the location shown by your coach or current team schedule.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-panel">
            <div className="eyebrow">Before You Leave</div>
            <h2>Always confirm the current team schedule</h2>
            <p>Field assignments can change because of weather, league scheduling, tournaments or facility availability. Team communication should be treated as the final source for the location and start time of a specific practice or game.</p>
          </article>
          <article className="content-panel">
            <div className="eyebrow">Need Help?</div>
            <h2>Contact the right sport</h2>
            <p>If a schedule or field assignment is unclear, contact your coach first for team-specific questions or use the Leadership directory for program directors.</p>
            <div className="button-row"><Link className="button button-dark" href="/leadership">Leadership Directory</Link></div>
          </article>
        </div>
      </section>
    </>
  );
}
