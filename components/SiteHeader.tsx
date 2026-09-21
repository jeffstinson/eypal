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
  { href: "/leadership", label: "Leadership" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <span><strong>2026–27 Basketball:</strong> check Sports Connect for live registration availability.</span>
          <a href={sportsConnectRoot} target="_blank" rel="noreferrer">
            Sports Connect <ExternalLink size={13} />
          </a>
        </div>
      </div>

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
