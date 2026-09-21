import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getHomepageAnnouncement } from "@/lib/cms";

export const metadata: Metadata = {
  metadataBase: new URL("https://epyal.stincebuilt.com"),
  title: {
    default: "East Penn Panthers | East Pennsboro Youth Athletic League",
    template: "%s | EPYAL"
  },
  description: "East Pennsboro Youth Athletic League (EPYAL) provides youth baseball, softball, basketball, tackle football, flag football, cheerleading and field hockey for families in East Pennsboro and Enola, Pennsylvania.",
  keywords: [
    "East Pennsboro youth sports",
    "EPYAL",
    "East Penn Panthers",
    "Enola youth sports",
    "East Pennsboro baseball",
    "East Pennsboro football",
    "East Pennsboro basketball",
    "East Pennsboro cheerleading",
    "East Pennsboro softball",
    "East Pennsboro flag football",
    "East Pennsboro field hockey"
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "East Penn Panthers | EPYAL",
    description: "Youth athletics, sportsmanship and community in East Pennsboro since 1946.",
    type: "website",
    locale: "en_US",
    siteName: "East Pennsboro Youth Athletic League",
    images: ["/assets/images/epyal-football-hero.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "East Penn Panthers | EPYAL",
    description: "Youth athletics, sportsmanship and community in East Pennsboro.",
    images: ["/assets/images/epyal-football-hero.jpg"]
  },
  icons: {
    icon: "/assets/images/epyal-logo.jpg"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "East Pennsboro Youth Athletic League",
  alternateName: ["EPYAL", "East Penn Panthers"],
  url: "https://epyal.stincebuilt.com",
  logo: "https://epyal.stincebuilt.com/assets/images/epyal-logo.jpg",
  foundingDate: "1946",
  telephone: "+1-717-319-8018",
  address: {
    "@type": "PostalAddress",
    postOfficeBoxNumber: "41",
    addressLocality: "Enola",
    addressRegion: "PA",
    postalCode: "17025",
    addressCountry: "US"
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "East Pennsboro Township, Pennsylvania"
  },
  sameAs: ["https://facebook.com/epyal/"],
  sport: ["Baseball", "Softball", "Basketball", "American Football", "Flag Football", "Cheerleading", "Field Hockey"]
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const announcement = await getHomepageAnnouncement();
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <SiteHeader announcement={announcement} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
