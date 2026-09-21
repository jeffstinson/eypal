import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { sports, sportsConnectRoot } from "@/lib/site-content";

export function generateStaticParams() {
  return sports.map(sport => ({ slug: sport.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sport = sports.find(item => item.slug === slug);
  if (!sport) return { title: "Sport" };
  return {
    title: sport.name,
    description: sport.summary
  };
}

export default async function SportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sport = sports.find(item => item.slug === slug);
  if (!sport) notFound();

  return (
    <>
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
              <p>{sport.summary}</p>

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

            <article className="content-panel" style={{ marginTop: 18 }}>
              <div className="eyebrow">Registration Flow</div>
              <h2>A better front door, without replacing Sports Connect</h2>
              <p>Families can learn about {sport.name.toLowerCase()}, season expectations and current registration status here. When they are ready to register, EPYAL sends them to the existing Sports Connect system in a new tab for parent login, participant information, waivers and payment.</p>
              <div className="button-row">
                <Link className="button button-dark" href="/registration">Registration Center <ArrowRight size={15} /></Link>
                <a className="button button-outline" href={sportsConnectRoot} target="_blank" rel="noreferrer">Parent Login <ExternalLink size={14} /></a>
              </div>
            </article>
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
            <Link className="button button-outline" href="/sports">All Sports</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
