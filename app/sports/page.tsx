import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SportCard } from "@/components/SportCard";
import { SectionHeading } from "@/components/SectionHeading";
import { sports } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Sports",
  description: "Explore EPYAL youth sports programs."
};

export default function SportsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Sports"
        description="Seven youth sports, one East Penn community. Explore seasons, age groups, leadership and registration information for every EPYAL program."
      />
      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="East Penn Panthers"
            title="Choose your program"
            description="Each sport has its own page with current program details and a direct handoff to Sports Connect when it is time to register."
          />
          <div className="sport-grid">
            {sports.map(sport => <SportCard key={sport.slug} sport={sport} />)}
          </div>
        </div>
      </section>
    </>
  );
}
