import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, FileText, Mail } from "lucide-react";
import { sports as seedSports, sportsConnectRoot } from "@/lib/site-content";
import { getSports } from "@/lib/cms";
import { resources, sportEditorial } from "@/lib/resource-content";

export function generateStaticParams() {
  return seedSports.map(sport => ({ slug: sport.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sports = await getSports();
  const sport = sports.find(item => item.slug === slug);
  if (!sport) return { title: "Sport" };

  return {
    title: `${sport.name} | East Pennsboro Youth Sports`,
    description: `${sport.summary} Learn about ${sport.name.toLowerCase()} registration, ages, season information and contacts for the East Penn Panthers in Enola, Pennsylvania.`,
    alternates: { canonical: `/sports/${sport.slug}` }
  };
}

export default async function SportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sports = await getSports();
  const sport = sports.find(item => item.slug === slug);
  if (!sport) notFound();

  const editorial = sportEditorial[slug];
  const related = editorial?.relatedResources?.length
    ? resources.filter(item => editorial.relatedResources?.includes(item.title))
    : [];

  const faqSchema = editorial?.faq?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: editorial.faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  } : null;

  return (
    <>
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}

      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/sports">Sports</Link><span>/</span><span>{sport.name}</span></div>
          <div className="eyebrow">{sport.season} • {sport.ages}</div>
          <h1>{sport.name}</h1>
          <p>{sport.summary}</p>
          <div className="button-row">
            <a className="button button-orange" href={sport.registrationUrl} target="_blank" rel="noreferrer">
              Open Sports Connect <ExternalLink size={15} />
            </a>
            <a className="button button-ghost" href={`mailto:${sport.email}`}>
              Contact Directors <Mail size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container page-grid">
          <div>
            <article className="content-panel">
              <div className="eyebrow">Program Overview</div>
              <h2>{sport.name} at EPYAL</h2>
              <p>{editorial?.intro || sport.summary}</p>

              <div className="info-banner">
                <strong>Registration:</strong> {sport.registrationSummary}
              </div>

              <div className="detail-grid">
                {sport.highlights.map(item => (
                  <div className="detail-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </article>

            {editorial?.divisions?.length ? (
              <article className="content-panel" style={{ marginTop: 18 }}>
                <div className="eyebrow">Divisions & Eligibility</div>
                <h2>How the program is organized</h2>
                <p>Division structures can change as participation and governing-league rules change. The information below reflects EPYAL’s currently published program structure.</p>
                <div className="resource-table">
                  {editorial.divisions.map(item => (
                    <div className="resource-table-row" key={item.name}>
                      <strong>{item.name}</strong>
                      <span>{item.detail}</span>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}

            {editorial?.familyNotes?.length ? (
              <article className="content-panel" style={{ marginTop: 18 }}>
                <div className="eyebrow">For Families</div>
                <h2>What to know before the season</h2>
                <div className="detail-grid">
                  {editorial.familyNotes.map(item => (
                    <div className="detail-card" key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}

            <article className="content-panel" style={{ marginTop: 18 }}>
              <div className="eyebrow">Registration Flow</div>
              <h2>A better front door, without replacing Sports Connect</h2>
              <p>Families can learn about {sport.name.toLowerCase()}, season expectations and current registration status here. When they are ready to register, EPYAL sends them to the existing Sports Connect system in a new tab for parent login, participant information, waivers and payment.</p>
              <div className="button-row">
                <Link className="button button-dark" href="/registration">Registration Center <ArrowRight size={15} /></Link>
                <a className="button button-outline" href={sportsConnectRoot} target="_blank" rel="noreferrer">Parent Login <ExternalLink size={14} /></a>
              </div>
            </article>

            {editorial?.faq?.length ? (
              <article className="content-panel" style={{ marginTop: 18 }}>
                <div className="eyebrow">{sport.name} FAQ</div>
                <h2>Common questions</h2>
                <div className="faq-list">
                  {editorial.faq.map(item => (
                    <details className="faq-item" key={item.question}>
                      <summary>{item.question}</summary>
                      <div><p>{item.answer}</p></div>
                    </details>
                  ))}
                </div>
              </article>
            ) : null}

            {related.length ? (
              <article className="content-panel" style={{ marginTop: 18 }}>
                <div className="eyebrow">Resources</div>
                <h2>{sport.name} documents & links</h2>
                <div className="list-grid">
                  {related.map(resource => (
                    <div className="list-card" key={resource.title}>
                      <div className="list-card-icon"><FileText size={20} /></div>
                      <div><h3>{resource.title}</h3><p>{resource.description}</p></div>
                      <a className="button button-outline" href={resource.href} target="_blank" rel="noreferrer">Open ↗</a>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>

          <aside className="sidebar-panel">
            <span className={`status-pill status-${sport.status}`} style={{ position: "static" }}>{sport.statusLabel}</span>
            <div className="sidebar-row">
              <small>Directors</small>
              <strong>{sport.directors}</strong>
            </div>
            <div className="sidebar-row">
              <small>Email</small>
              <a href={`mailto:${sport.email}`}>{sport.email}</a>
            </div>
            <div className="sidebar-row">
              <small>Season</small>
              <strong>{sport.season}</strong>
            </div>
            <div className="sidebar-row">
              <small>Age / Grade</small>
              <strong>{sport.ages}</strong>
            </div>
            <a className="button button-orange" href={sport.registrationUrl} target="_blank" rel="noreferrer">Sports Connect <ExternalLink size={14} /></a>
            <Link className="button button-outline" href="/parents">Parent Guide</Link>
            <Link className="button button-outline" href="/coaches">Coaches & Volunteers</Link>
            <Link className="button button-outline" href="/sports">All Sports</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
