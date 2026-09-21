import Link from "next/link";
import type { ReactNode } from "react";
import type { EditorProfile } from "@/lib/admin-auth";
import { logout } from "@/app/admin/actions";

const sections = [
  ["/admin", "Dashboard"],
  ["/admin/sports", "Sports & Registration"],
  ["/admin/news", "News"],
  ["/admin/events", "Events"],
  ["/admin/sponsors", "Sponsors"],
  ["/admin/leadership", "Leadership"],
  ["/admin/resources", "Resources"],
  ["/admin/faqs", "FAQs"],
  ["/admin/newsletter", "Newsletter"]
] as const;

export function AdminFrame({
  active,
  profile,
  email,
  children
}: {
  active: string;
  profile: EditorProfile;
  email: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-shell admin-shell-v2">
      <div className="container">
        <div className="admin-header">
          <div>
            <div className="eyebrow">EPYAL Content Manager</div>
            <h1>Website Admin</h1>
            <p className="admin-userline">{profile.display_name || email} • {profile.role.replaceAll("_", " ")}</p>
          </div>
          <div className="admin-header-actions">
            <Link className="button button-outline" href="/" target="_blank">View Website ↗</Link>
            <form action={logout}><button className="button button-dark" type="submit">Sign Out</button></form>
          </div>
        </div>

        <div className="admin-layout-v2">
          <aside className="admin-sidebar">
            <nav>
              {sections.map(([href, label]) => (
                <Link className={active === href ? "is-active" : ""} href={href} key={href}>{label}</Link>
              ))}
            </nav>
            <div className="admin-sidebar-note">
              <strong>Sports Connect stays separate</strong>
              <span>Registration accounts, player data and payments are not stored here.</span>
            </div>
          </aside>
          <div className="admin-content-v2">{children}</div>
        </div>
      </div>
    </section>
  );
}
