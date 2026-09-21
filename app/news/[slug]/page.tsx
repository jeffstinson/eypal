import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getNewsPost } from "@/lib/cms";
import { news as seedNews } from "@/lib/site-content";
import { newsEditorial } from "@/lib/news-content";

export function generateStaticParams() {
  return seedNews.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsPost(slug);
  if (!item) return { title: "News" };

  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt,
    alternates: { canonical: `/news/${item.slug}` }
  };
}

function CmsArticleBody({ body }: { body: string }) {
  const blocks = body.split(/\n\s*\n/).map(block => block.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) return <h2 key={index}>{block.slice(3)}</h2>;
        if (block.startsWith("### ")) return <h3 key={index}>{block.slice(4)}</h3>;
        return <p key={index}>{block}</p>;
      })}
    </>
  );
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsPost(slug);
  if (!item) notFound();

  const editorial = !item.id ? newsEditorial[slug] : null;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.excerpt,
    publisher: {
      "@type": "SportsOrganization",
      name: "East Pennsboro Youth Athletic League",
      logo: {
        "@type": "ImageObject",
        url: "https://epyal.stincebuilt.com/assets/images/epyal-logo.jpg"
      }
    },
    mainEntityOfPage: `https://epyal.stincebuilt.com/news/${item.slug}`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/news">News</Link><span>/</span><span>{item.category}</span></div>
          <div className="eyebrow">{item.category} • {item.date}</div>
          <h1>{item.title}</h1>
          <p>{item.excerpt}</p>
        </div>
      </section>

      <section className="section">
        <div className="container article-layout">
          <article className="article-body">
            {item.id && item.body ? (
              <CmsArticleBody body={item.body} />
            ) : (
              <>
                <p className="article-lead">{editorial?.intro || item.excerpt}</p>
                {editorial?.sections?.map(section => (
                  <section key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                  </section>
                ))}
              </>
            )}
          </article>

          <aside className="article-sidebar">
            <div className="eyebrow">Related Links</div>
            <h3>Keep exploring</h3>
            <div className="article-links">
              {(editorial?.relatedLinks || [
                { label: "League News", href: "/news" },
                { label: "Registration", href: "/registration" },
                { label: "Parent Guide", href: "/parents" }
              ]).map(link => (
                <Link href={link.href} key={link.href}>{link.label} <ArrowRight size={14} /></Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
