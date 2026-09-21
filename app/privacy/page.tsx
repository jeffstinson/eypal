import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description: "EPYAL website privacy information."
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Website Information"
        title="Privacy"
        description="How the EPYAL public website is designed to handle information while registration remains within Sports Connect."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <article className="content-panel">
            <h2>Public website privacy</h2>
            <p>This website is designed as EPYAL’s public information and communications hub. It does not collect or store child registration records, dates of birth, medical information, waivers or registration payment details.</p>

            <h3>Registration information</h3>
            <p>When a family selects a registration or parent-login action, they are sent to EPYAL’s existing Sports Connect / Blue Sombrero system. Information entered there is handled through that service and its applicable privacy terms.</p>

            <h3>Email updates</h3>
            <p>If you subscribe to EPYAL email updates, the site stores the email address and the date of consent so league communications can be delivered. Subscribers can unsubscribe from future marketing email.</p>

            <h3>Website analytics</h3>
            <p>EPYAL may use privacy-conscious website analytics to understand aggregate traffic, popular pages and registration interest. The goal is to improve league communications and program discovery, not to create participant profiles.</p>

            <h3>Questions</h3>
            <p>Privacy or website questions can be directed to EPYAL through the league contact information published on this site.</p>
          </article>
        </div>
      </section>
    </>
  );
}
