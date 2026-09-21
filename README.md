# EPYAL Website

Modern public website concept for the East Pennsboro Youth Athletic League.

## Phase 2 architecture

- Next.js 16 / React 19
- Vercel hosting and Git deployments
- Responsive East Penn Panthers design system
- Real multi-page information architecture
- Sports Connect / Blue Sombrero remains the registration, parent account and payment system of record
- Supabase-ready CMS with seeded fallback content
- Role-aware admin foundation
- Newsletter endpoint prepared for Supabase subscriber storage and Resend delivery

## Public routes

- `/`
- `/sports`
- `/sports/[sport]`
- `/registration`
- `/news`
- `/events`
- `/photos`
- `/volunteer`
- `/sponsors`
- `/leadership`
- `/contact`
- `/about`
- `/locations`
- `/privacy`

## CMS

The website runs safely from `lib/site-content.ts` when Supabase is not configured.

When these are set:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

the public collections can read from Supabase and `/admin` becomes the content-management surface.

Database setup:

`supabase/schema.sql`

The schema includes:

- sports / registration state
- homepage settings
- news
- events
- sponsors
- leadership
- newsletter subscribers
- editor profiles and roles

Editor roles include admin, marketing, sport director, photo admin and fundraising.

Sport directors can be limited to their own sport.

## Newsletter

The endpoint is:

`POST /api/subscribe`

It can store the consented subscriber in Supabase and optionally add the address to a Resend audience.

Optional email variables:

```
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
NEWSLETTER_FROM_EMAIL=
```

## Registration safety

The public site intentionally does not duplicate child DOB, medical, waiver, payment or parent credential data. Registration CTAs open Sports Connect in a new browser tab.

## Deployment

Production currently uses Vercel and the custom preview domain:

`https://epyal.stincebuilt.com`

Phase 2 should be reviewed as a Vercel Preview before it is merged into `main`.
