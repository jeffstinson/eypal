import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { generalFaq } from "@/lib/resource-content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about EPYAL registration, parents, coaching, locations, sponsorships and youth sports programs."
};

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        description="Quick answers to the questions East Penn families are most likely to have before and during a youth sports season."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="faq-list">
            {generalFaq.map(item => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <div><p>{item.answer}</p></div>
              </details>
            ))}
          </div>

          <div className="cta-panel" style={{ marginTop: 36 }}>
            <div>
              <div className="eyebrow">Still Need Help?</div>
              <h2>Find the right EPYAL contact</h2>
              <p>Sport directors handle program-specific questions, while league leadership can help with broader organization questions.</p>
            </div>
            <Link className="button button-orange" href="/leadership">Leadership Directory</Link>
          </div>
        </div>
      </section>
    </>
  );
}
