import type { Metadata } from "next";
import { MapPin, School, Trophy } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Locations",
  description: "EPYAL fields and common youth sports locations."
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Fields & Facilities"
        title="Locations"
        description="Find EPYAL’s primary complex and common program facilities. Sport schedules may use additional regional locations during the season."
      />

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Primary Facility" title="Sheaffer Fieldhouse & Athletic Complex" description="The central home for many EPYAL activities, board meetings and youth sports operations." />
          <div className="detail-grid">
            <article className="detail-card">
              <MapPin size={24} style={{ color: "var(--orange)", marginBottom: 12 }} />
              <h3>Sheaffer Fieldhouse & Athletic Complex</h3>
              <p>907 Wertzville Rd.<br />Enola, PA 17025</p>
            </article>
            <article className="detail-card">
              <School size={24} style={{ color: "var(--orange)", marginBottom: 12 }} />
              <h3>School Gym Locations</h3>
              <p>Basketball may use East Pennsboro Middle School and West Creek Hills Elementary depending on division and gym availability.</p>
            </article>
            <article className="detail-card">
              <Trophy size={24} style={{ color: "var(--orange)", marginBottom: 12 }} />
              <h3>Away & Regional Sites</h3>
              <p>Travel, league and tournament schedules may include other facilities. Always confirm the location shown by your coach or current team schedule.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
