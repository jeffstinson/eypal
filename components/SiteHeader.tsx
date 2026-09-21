"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { sportsConnectRoot } from "@/lib/site-content";

const nav = [
  { href: "/sports", label: "Sports" },
  { href: "/registration", label: "Registration" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/photos", label: "Photos" },
  { href: "/volunteer", label: "Get Involved" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/resources", label: "Resources" }
];

type Announcement = {
  enabled?: boolean;
  message?: string;
  url?: string;
  linkLabel?: string;
} | null;

export function SiteHeader({ announcement }: { announcement?: Announcement }) {
  const [open, setOpen] = useState(false);
  const showAnnouncement = announcement?.enabled !== false;
  const announcementMessage = announcement?.message || "2026–27 Basketball: check Sports Connect for live registration availability.";
  const announcementUrl = announcement?.url || sportsConnectRoot;
  const announcementLabel = announcement?.linkLabel || "Sports Connect";

  return (
    <>
      {showAnnouncement ? (
        <div className="announcement-bar">
          <div className="container announcement-inner">
            <span>{announcementMessage}</span>
            <a href={announcementUrl} target="_blank" rel="noreferrer">
              {announcementLabel} <ExternalLink size={13} />
            </a>
          </div>
        </div>
      ) : null}

      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/assets/images/epyal-logo.jpg" alt="East Penn Panthers logo" />
            <span className="brand-copy">
              <span className="brand-kicker">EAST PENN</span>
              <span className="brand-name">PANTHERS</span>
              <span className="brand-sub">YOUTH ATHLETIC LEAGUE</span>
            </span>
          </Link>

          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>

          <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
            {nav.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a className="nav-login" href={sportsConnectRoot} target="_blank" rel="noreferrer">
              Parent Login <ExternalLink size={13} />
            </a>
            <a className="nav-register" href={sportsConnectRoot} target="_blank" rel="noreferrer">
              Register <ExternalLink size={13} />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
