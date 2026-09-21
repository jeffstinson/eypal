import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{title}</span></div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}
