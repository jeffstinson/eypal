import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "65vh", display: "grid", alignItems: "center" }}>
      <div className="container page-hero-inner">
        <div className="eyebrow">404</div>
        <h1>Page Not Found</h1>
        <p>The page you were looking for may have moved as EPYAL’s website is being modernized.</p>
        <div className="button-row">
          <Link className="button button-orange" href="/">Return Home</Link>
          <Link className="button button-ghost" href="/sports">Browse Sports</Link>
        </div>
      </div>
    </section>
  );
}
