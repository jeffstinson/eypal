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
        </div>

        <div className="footer-column">
          <h3>Get Involved</h3>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/sponsors">Sponsorships</Link>
          <Link href="/leadership">Leadership</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h3>Registration</h3>
          <a href={sportsConnectRoot} target="_blank" rel="noreferrer">
            Sports Connect <ExternalLink size={12} />
          </a>
          <a href={sportsConnectRoot} target="_blank" rel="noreferrer">
            Parent Login <ExternalLink size={12} />
          </a>
          <p className="footer-note">Parent accounts, participant data and payments remain securely handled by Sports Connect.</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} East Pennsboro Youth Athletic League.</span>
        <span>East Penn Panthers • Enola, Pennsylvania</span>
      </div>
    </footer>
  );
}
