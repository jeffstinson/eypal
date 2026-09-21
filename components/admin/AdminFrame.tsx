import Link from "next/link";
import type { ReactNode } from "react";
import type { EditorProfile } from "@/lib/admin-auth";
import { logout } from "@/app/admin/actions";

type NavItem = {
  href: string;
  label: string;
  roles: EditorProfile["role"][];
};

const sections: NavItem[] = [
  { href: "/admin", label: "Dashboard", roles: ["admin","marketing","sport_director","photo_admin","fundraising"] },
  { href: "/admin/sports", label: "Sports & Registration", roles: ["admin","marketing","sport_director"] },
  { href: "/admin/news", label: "News", roles: ["admin","marketing"] },
  { href: "/admin/events", label: "Events", roles: ["admin","marketing"] },
  { href: "/admin/sponsors", label: "Sponsors", roles: ["admin","marketing","fundraising"] },
  { href: "/admin/leadership", label: "Leadership", roles: ["admin"] },
  { href: "/admin/resources", label: "Resources", roles: ["admin","marketing"] },
  { href: "/admin/faqs", label: "FAQs", roles: ["admin","marketing"] },
  { href: "/admin/newsletter", label: "Newsletter", roles: ["admin","marketing"] }
];

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
  const visibleSections = sections.filter(item => item.roles.includes(profile.role));

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
              {visibleSections.map(item => (
                <Link className={active === item.href ? "is-active" : ""} href={item.href} key={item.href}>{item.label}</Link>
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
