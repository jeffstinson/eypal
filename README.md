# EPYAL Vercel Demo

Target public demo: `https://epyal.stincebuilt.com`

## Architecture

- Static HTML/CSS/JS on Vercel
- Vercel Function at `/api/subscribe`
- Resend Contacts for newsletter signups
- Sports Connect / Blue Sombrero remains the system of record for:
  - parent login
  - participant profiles
  - program registration
  - payments
  - roster/registration operations

Every registration and Parent Login CTA opens Sports Connect in a new browser tab.

## Content represented in the demo

- Baseball
- Softball
- Basketball
- Tackle Football
- Cheerleading
- Field Hockey
- Flag Football
- Registration center
- Leadership directory
- Get Involved
- Sponsors / fundraising
- Photos
- About / Contact
- Upcoming public board events
- Newsletter signup

## Newsletter

The form posts to `/api/subscribe`.

The serverless function:
- validates email
- requires consent
- includes a honeypot
- keeps the Resend API key server-side
- creates a Resend Contact
- treats duplicates as a successful subscription experience

Set this Vercel environment variable:

`RESEND_API_KEY`

## Vercel deployment

This folder is ready to deploy as a Vercel project. No framework is required.

Recommended project name:

`epyal-website`

## Custom subdomain

After the project is live:

1. Vercel Project → Settings → Domains
2. Add `epyal.stincebuilt.com`
3. At the DNS provider for `stincebuilt.com`, create the exact record Vercel requests.
4. Remove any existing conflicting A/AAAA/CNAME record for the `epyal` host before adding the Vercel record.
5. Wait for Vercel to show the domain as Valid Configuration.
6. Vercel provisions TLS/SSL automatically after validation.

This is DNS mapping, not a browser redirect. Visitors keep seeing `epyal.stincebuilt.com`.

## Current update model

For the working demo, frequently changed homepage content lives in:

`assets/js/site-data.js`

The planned production phase is to move sports, registration windows, announcements, events, sponsors, board members, and homepage banners into a small admin/CMS so board members can update content without editing code.

## Important

This is a working public-site demo, not a replacement for Sports Connect.
Do not copy child DOBs, medical data, registration payments, waivers, or parent credentials into this site.


## Deployment trigger

Fresh production deployment trigger after Vercel Git connection was established on 2026-09-20.
