import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { sportsConnectRoot } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/assets/images/epyal-logo.jpg" alt="" />
          <div>
            <strong>East Penn Panthers</strong>
            <p>Youth athletics, sportsmanship and community since 1946.</p>
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link href="/sports">Sports</Link>
          <Link href="/registration">Registration</Link>
          <Link href="/news">News</Link>
          <Link href="/events">Events</Link>
          <Link href="/photos">Photos</Link>
          <Link href="/locations">Locations</Link>
        </div>

        <div className="footer-column">
          <h3>Families & League</h3>
          <Link href="/resources">Resource Center</Link>
          <Link href="/parents">Parent Guide</Link>
          <Link href="/coaches">Coaches & Volunteers</Link>
          <Link href="/documents">Documents & Policies</Link>
          <Link href="/safety">Safety & Clearances</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/board">Board & Governance</Link>
        </div>

        <div className="footer-column">
          <h3>Community</h3>
          <Link href="/sponsors">Sponsorships</Link>
          <Link href="/fundraising">Fundraising</Link>
          <Link href="/leadership">Leadership</Link>
          <Link href="/about">About EPYAL</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <a href={sportsConnectRoot} target="_blank" rel="noreferrer">
            Parent Login <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} East Pennsboro Youth Athletic League.</span>
        <span>East Penn Panthers • Enola, Pennsylvania</span>
      </div>
    </footer>
  );
}
