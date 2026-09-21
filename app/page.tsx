import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Camera, ExternalLink, FileText, HandHeart, HelpCircle, ShieldCheck, Trophy, Users } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionHeading } from "@/components/SectionHeading";
import { SportCard } from "@/components/SportCard";
import { sportsConnectRoot } from "@/lib/site-content";
import { getEvents, getLeadership, getNews, getSponsors, getSports } from "@/lib/cms";

export default async function HomePage() {
  const [sports, news, events, leadership, sponsors] = await Promise.all([
    getSports(),
    getNews(),
    getEvents(),
    getLeadership(),
    getSponsors()
  ]);
  const registrationSports = sports.filter(s => ["open", "soon", "waitlist"].includes(s.status)).slice(0, 4);

  return (
    <>
      <section className="home-hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="eyebrow">East Penn Panthers</div>
          <h1>Building athletes.<br />Building confidence.<br />Building <span>community.</span></h1>
          <p>Serving East Pennsboro families through youth athletics, teamwork, sportsmanship and community since 1946.</p>
          <div className="button-row">
            <a className="button button-orange" href={sportsConnectRoot} target="_blank" rel="noreferrer">
              Register Now <ExternalLink size={15} />
            </a>
            <Link className="button button-ghost" href="/sports">Explore Sports <ArrowRight size={15} /></Link>
          </div>
          <div className="hero-stats">
            <div><strong>1946</strong><span>League established</span></div>
            <div><strong>7</strong><span>Youth sports</span></div>
            <div><strong>1,000+</strong><span>Athletes served annually</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Programs"
            title="Find your sport"
            description="One league, seven programs and a place for East Penn kids to compete, grow and belong."
          />
          <div className="sport-grid">
            {sports.map(sport => <SportCard key={sport.slug} sport={sport} />)}
          </div>
          <div className="center-actions">
            <Link className="text-link" href="/sports">View all program details <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Registration Center"
            title="Know what’s open before you click"
            description="EPYAL explains the program. Sports Connect securely handles parent accounts, participant information and payment."
            align="left"
          />

          <div className="system-callout">
            <ShieldCheck size={28} />
            <div>
              <strong>Sports Connect remains the registration system of record.</strong>
              <p>Every registration action opens EPYAL’s existing Blue Sombrero / Sports Connect experience in a new browser tab.</p>
            </div>
          </div>

          <div className="registration-grid">
            {registrationSports.map(sport => (
              <article className="registration-card" key={sport.slug}>
                <div className="registration-card-top">
                  <span className="sport-mark small">{sport.short}</span>
                  <span className={`status-pill status-${sport.status}`}>{sport.statusLabel}</span>
                </div>
                <h3>{sport.name}</h3>
                <p className="registration-meta">{sport.season} • {sport.ages}</p>
                <p>{sport.registrationSummary}</p>
                <div className="registration-actions">
                  <Link className="button button-dark" href={`/sports/${sport.slug}`}>Program Details</Link>
                  <a className="button button-outline" href={sport.registrationUrl} target="_blank" rel="noreferrer">Sports Connect <ExternalLink size={14} /></a>
                </div>
              </article>
            ))}
          </div>

          <div className="center-actions">
            <Link className="button button-dark" href="/registration">View Registration Center <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <SectionHeading eyebrow="Around EPYAL" title="Latest news" align="left" />
            <div className="news-list">
              {news.map(item => (
                <article className="news-row" key={item.slug}>
                  <div className="news-icon"><Trophy size={22} /></div>
                  <div>
                    <span className="meta-label">{item.category} • {item.date}</span>
                    <h3><Link href={`/news/${item.slug}`}>{item.title}</Link></h3>
                    <p>{item.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link className="text-link" href="/news">All league news <ArrowRight size={15} /></Link>
          </div>

          <div>
            <SectionHeading eyebrow="Mark the calendar" title="Upcoming events" align="left" />
            <div className="event-list">
              {events.map((event, index) => (
                <article className="event-row" key={`${event.title}-${index}`}>
                  <div className="event-icon"><CalendarDays size={22} /></div>
                  <div>
                    <span className="meta-label">{event.category}</span>
                    <h3>{event.title}</h3>
                    <p>{event.date} • {event.time}</p>
                    <small>{event.location}</small>
                  </div>
                </article>
              ))}
            </div>
            <Link className="text-link" href="/events">Full event calendar <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-dark legacy-section">
        <div className="container legacy-grid">
          <div>
            <div className="eyebrow">Since 1946</div>
            <h2>Built in East Penn.<br />Built for East Penn.</h2>
            <p>EPYAL has served generations of local families. The website should make that history, organization and community feel just as strong online as it does on the field.</p>
            <Link className="text-link light" href="/leadership">Meet league leadership <ArrowRight size={15} /></Link>
          </div>
          <div className="impact-grid">
            <div><Trophy size={25} /><strong>80</strong><span>Years of history in 2026</span></div>
            <div><Users size={25} /><strong>1,000+</strong><span>Local athletes each year</span></div>
            <div><ShieldCheck size={25} /><strong>7</strong><span>Sports under one league</span></div>
            <div><HandHeart size={25} /><strong>1</strong><span>Community-first mission</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container feature-split">
          <div className="photo-feature-card">
            <div className="photo-badge"><Camera size={15} /> EPYAL PHOTOS</div>
            <div className="photo-chip-row">
              <span>Football</span><span>Cheer</span><span>Baseball</span><span>Softball</span>
            </div>
          </div>
          <div>
            <div className="eyebrow">Photos</div>
            <h2 className="feature-title">A league-wide photo home</h2>
            <p className="feature-copy">The Cheer photo portal is the foundation for a broader EPYAL photography platform: organized albums, approved parent photographers, downloads and optional Panthers-branded images.</p>
            <div className="button-row">
              <Link className="button button-dark" href="/photos">Explore Photos <ArrowRight size={15} /></Link>
              <Link className="button button-outline" href="/volunteer">Become a Photographer</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Get Involved"
            title="Youth sports run on people who show up"
            description="Make it obvious where coaches, volunteers, community partners and future board members can help."
          />
          <div className="feature-card-grid">
            {[
              ["Coach", "Help develop athletes and set the tone for sportsmanship, effort and teamwork.", "/volunteer", Trophy],
              ["Volunteer", "Concessions, events, fields and game-day support keep EPYAL moving.", "/volunteer", Users],
              ["Photography", "Help document seasons across the league as part of the growing photo program.", "/photos", Camera],
              ["Community Partner", "Support youth programs while putting your local business in front of East Penn families.", "/sponsors", HandHeart]
            ].map(([title, copy, href, Icon]) => {
              const IconComp = Icon as typeof Trophy;
              return (
                <Link className="feature-card" href={href as string} key={title as string}>
                  <IconComp size={27} />
                  <h3>{title as string}</h3>
                  <p>{copy as string}</p>
                  <span>Learn more <ArrowRight size={14} /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Parent & Coach Resources"
            title="Everything families need in one place"
            description="The old site scattered useful guides and policies across individual sport pages. The new Resource Center gives parents, coaches and volunteers a clear path to the information they actually need."
          />
          <div className="feature-card-grid">
            <Link className="feature-card" href="/parents">
              <BookOpen size={27} />
              <h3>Parent Guide</h3>
              <p>Registration, season expectations, sportsmanship, communication and what happens after you sign up.</p>
              <span>For families <ArrowRight size={14} /></span>
            </Link>
            <Link className="feature-card" href="/coaches">
              <Users size={27} />
              <h3>Coaches & Volunteers</h3>
              <p>Clearances, applications, coaching contacts and the steps adults need to help safely.</p>
              <span>Get involved <ArrowRight size={14} /></span>
            </Link>
            <Link className="feature-card" href="/documents">
              <FileText size={27} />
              <h3>Documents & Policies</h3>
              <p>Code of Conduct, parent guides, rules, volunteer resources and sport-specific forms.</p>
              <span>Open resources <ArrowRight size={14} /></span>
            </Link>
            <Link className="feature-card" href="/faq">
              <HelpCircle size={27} />
              <h3>League FAQ</h3>
              <p>Quick answers about registration, Sports Connect, contacts, facilities, volunteering and photos.</p>
              <span>Find an answer <ArrowRight size={14} /></span>
            </Link>
          </div>
          <div className="center-actions">
            <Link className="button button-dark" href="/resources">Open Resource Center <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section section-black">
        <div className="container">
          <SectionHeading
            eyebrow="Support EPYAL"
            title="Turn sponsorship into a real partnership"
            description="Website placement gives local businesses visible, year-round value for investing in East Penn youth athletics."
          />
          <div className="sponsor-preview-grid">
            {sponsors.map((sponsor, index) => (
              <div className={`sponsor-preview ${index === 0 ? "featured" : ""}`} key={`${sponsor.name}-${index}`}>
                <span>{sponsor.tier} Partner</span>
                <strong>{sponsor.name}</strong>
                <small>Logo placement • digital visibility • community support</small>
              </div>
            ))}
          </div>
          <div className="center-actions">
            <Link className="button button-orange" href="/sponsors">Sponsorship Opportunities <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="League Leadership" title="Know who to contact" description="Clear league and sport contacts without hunting through old pages or personal email threads." />
          <div className="leadership-preview">
            {leadership.slice(0, 8).map(person => (
              <article key={person.role}>
                <span>{person.role}</span>
                <strong>{person.name}</strong>
                {person.email ? <a href={`mailto:${person.email}`}>{person.email}</a> : <small>League leadership</small>}
              </article>
            ))}
          </div>
          <div className="center-actions">
            <Link className="text-link" href="/leadership">View full directory <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container newsletter-grid">
          <div>
            <div className="eyebrow">Stay Connected</div>
            <h2>Never miss a registration window</h2>
            <p>Get registration reminders, league news, community events, volunteer opportunities and important EPYAL updates by email.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
