import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://epyal.stincebuilt.com"),
  title: {
    default: "East Penn Panthers | EPYAL",
    template: "%s | EPYAL"
  },
  description: "East Pennsboro Youth Athletic League — youth sports, registration, news, photos, events and community information.",
  openGraph: {
    title: "East Penn Panthers",
    description: "Youth athletics, sportsmanship and community since 1946.",
    type: "website",
    images: ["/assets/images/epyal-football-hero.jpg"]
  },
  icons: {
    icon: "/assets/images/epyal-logo.jpg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
