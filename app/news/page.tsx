import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { news } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "News",
  description: "Latest EPYAL news and league updates."
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="League Updates"
        title="News"
        description="Registration reminders, program highlights, community stories and important updates from across East Penn youth athletics."
      />
      <section className="section section-soft">
        <div className="container list-grid">
          {news.map(item => (
            <article className="list-card" key={item.slug}>
              <div className="list-card-icon"><Newspaper size={22} /></div>
              <div>
                <span className="meta-label">{item.category} • {item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </div>
              <span className="status-pill status-soon" style={{ position: "static" }}>League Update</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
