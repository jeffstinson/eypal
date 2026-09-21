import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact East Pennsboro Youth Athletic League."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact EPYAL"
        title="Contact"
        description="Get to the right person faster — whether the question is about a sport, registration, sponsorship or league operations."
      />

      <section className="section">
        <div className="container feature-card-grid">
          <article className="feature-card">
            <MapPin size={27} />
            <h3>League Mailing Address</h3>
            <p>East Pennsboro Youth Athletic League<br />P.O. Box 41<br />Enola, PA 17025</p>
            <span>League correspondence</span>
          </article>
          <article className="feature-card">
            <Phone size={27} />
            <h3>League Phone</h3>
            <p>717-319-8018</p>
            <a href="tel:+17173198018"><span>Call EPYAL</span></a>
          </article>
          <article className="feature-card">
            <Mail size={27} />
            <h3>Fundraising & Sponsors</h3>
            <p>Questions about supporting EPYAL, sponsorship packages or fundraising opportunities.</p>
            <a href="mailto:fundraising@epyal.com"><span>fundraising@epyal.com</span></a>
          </article>
          <article className="feature-card">
            <Users size={27} />
            <h3>Sport Questions</h3>
            <p>Use the Leadership page to reach the correct directors for a specific program.</p>
            <Link href="/leadership"><span>View Leadership</span></Link>
          </article>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container cta-panel">
          <div>
            <div className="eyebrow">Registration Help</div>
            <h2>Looking for a specific sport?</h2>
            <p>Each program page includes director contacts, age/season information and a direct link to the correct registration workflow.</p>
          </div>
          <Link className="button button-orange" href="/sports">Browse Sports</Link>
        </div>
      </section>
    </>
  );
}
