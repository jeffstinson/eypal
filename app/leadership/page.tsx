import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { leadership } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Leadership",
  description: "EPYAL board and sport leadership directory."
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Board & Program Leadership"
        title="Leadership"
        description="A clear directory for league officers, sport directors and league-wide support roles."
      />
      <section className="section section-soft">
        <div className="container directory-grid">
          {leadership.map(person => (
            <article className="directory-card" key={person.role}>
              <span>{person.role}</span>
              <h3>{person.name}</h3>
              {person.email ? <a href={`mailto:${person.email}`}>{person.email}</a> : <p>League leadership</p>}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
