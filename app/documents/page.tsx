import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { resources } from "@/lib/resource-content";

export const metadata: Metadata = {
  title: "Documents & Policies",
  description: "EPYAL youth sports documents, policies, parent guides, volunteer requirements and rules."
};

export default function DocumentsPage() {
  const categories = [...new Set(resources.map(item => item.category))];

  return (
    <>
      <PageHero
        eyebrow="League Resources"
        title="Documents & Policies"
        description="A cleaner library for EPYAL codes of conduct, parent guides, coaching resources, volunteer requirements and sport rule links."
      />

      <section className="section section-soft">
        <div className="container">
          {categories.map(category => {
            const items = resources.filter(item => item.category === category);
            return (
              <div key={category} style={{ marginBottom: 42 }}>
                <SectionHeading eyebrow={category} title={category === "Policies" ? "League Policies" : `${category} Resources`} align="left" />
                <div className="list-grid">
                  {items.map(item => (
                    <article className="list-card" key={item.title}>
                      <div className="list-card-icon"><FileText size={22} /></div>
                      <div><h3>{item.title}</h3><p>{item.description}</p></div>
                      <a className="button button-outline" href={item.href} target="_blank" rel="noreferrer">Open <ExternalLink size={14} /></a>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
