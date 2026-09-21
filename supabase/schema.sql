-- EPYAL Phase 2 CMS schema
-- Run in a dedicated Supabase project before adding the environment variables to Vercel.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','marketing','sport_director','photo_admin','fundraising')),
  sport_slug text,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.sports (
  slug text primary key,
  name text not null,
  short text not null,
  season text not null,
  ages text not null,
  status text not null default 'closed' check (status in ('open','soon','closed','waitlist')),
  status_label text not null,
  directors text not null,
  email text not null,
  registration_url text not null,
  summary text not null,
  registration_summary text not null,
  highlights jsonb not null default '[]'::jsonb,
  sort_order integer not null default 100,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null default 'League',
  excerpt text not null,
  body text,
  display_date text not null,
  published_at timestamptz not null default now(),
  published boolean not null default true,
  author_id uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'League',
  starts_at timestamptz,
  display_date text not null,
  display_time text not null,
  location text not null,
  description text,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier text not null check (tier in ('Premier','Sport','Community')),
  url text,
  sport text,
  logo_url text,
  starts_at date,
  expires_at date,
  active boolean not null default true,
  sort_order integer not null default 100,
  updated_at timestamptz not null default now()
);

create table if not exists public.leadership (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  name text not null,
  email text,
  sort_order integer not null default 100,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  email text primary key,
  consented_at timestamptz not null,
  source text not null default 'website',
  active boolean not null default true,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.sports enable row level security;
alter table public.site_settings enable row level security;
alter table public.news_posts enable row level security;
alter table public.events enable row level security;
alter table public.sponsors enable row level security;
alter table public.leadership enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Public read access for website content.
create policy "public read published sports" on public.sports for select using (published = true);
create policy "public read site settings" on public.site_settings for select using (true);
create policy "public read published news" on public.news_posts for select using (published = true);
create policy "public read published events" on public.events for select using (published = true);
create policy "public read active sponsors" on public.sponsors for select using (active = true);
create policy "public read published leadership" on public.leadership for select using (published = true);

-- A logged-in user can see their own editor profile.
create policy "read own profile" on public.profiles for select
using (auth.uid() = id);

-- Admin / marketing can update all sports; sport directors can update only their assigned sport.
create policy "edit sports" on public.sports for update
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and (
        p.role in ('admin','marketing')
        or (p.role = 'sport_director' and p.sport_slug = sports.slug)
      )
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and (
        p.role in ('admin','marketing')
        or (p.role = 'sport_director' and p.sport_slug = sports.slug)
      )
  )
);

create policy "edit site settings" on public.site_settings for all
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
)
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
);

create policy "edit news" on public.news_posts for all
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
)
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
);

create policy "edit events" on public.events for all
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
)
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
);

create policy "edit sponsors" on public.sponsors for all
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing','fundraising'))
)
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing','fundraising'))
);

create policy "edit leadership" on public.leadership for all
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
)
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- newsletter_subscribers intentionally has no public policies.
-- The website subscription endpoint writes with SUPABASE_SERVICE_ROLE_KEY.

insert into public.site_settings (key, value)
values (
  'homepage_announcement',
  '{"enabled":true,"message":"2026–27 Basketball: check Sports Connect for live registration availability.","url":"https://tshq.bluesombrero.com/Default.aspx?tabid=1326003","linkLabel":"Sports Connect"}'::jsonb
)
on conflict (key) do nothing;

insert into public.sports
(slug,name,short,season,ages,status,status_label,directors,email,registration_url,summary,registration_summary,highlights,sort_order)
values
(
  'baseball','Baseball','BB','Spring & Fall','Youth through Teeners','closed','Registration Closed',
  'Kyle Trovinger & Jason Clapper','baseball@epyal.com','https://tshq.bluesombrero.com/Default.aspx?tabid=2741249',
  'A long-running East Penn program built around fundamentals, player development, sportsmanship and Little League tradition.',
  'Fall registration is currently closed. Sports Connect will display the next available program when registration reopens.',
  '[{"title":"Player Development","text":"Age-appropriate divisions help players build skills and confidence as they progress."},{"title":"Little League Roots","text":"EPYAL baseball carries decades of local baseball tradition and organized youth competition."},{"title":"Spring & Fall","text":"Multiple seasonal opportunities give families more ways to stay involved."}]'::jsonb,10
),
(
  'softball','Softball','SB','Spring & Fall','Youth Fastpitch','closed','Registration Closed',
  'Lisa Clapper & Dave Budzyn','softball@epyal.com','https://tshq.bluesombrero.com/Default.aspx?tabid=2013780',
  'Girls fastpitch softball focused on teamwork, confidence, fundamentals and a positive competitive environment.',
  'Fall registration is currently closed. Check Sports Connect for the next available softball program.',
  '[{"title":"Fastpitch Fundamentals","text":"Players develop throwing, fielding, hitting, base running and game awareness."},{"title":"Team Culture","text":"Coaches emphasize sportsmanship, effort and confidence alongside competition."},{"title":"Seasonal Play","text":"Spring and fall opportunities keep players connected to the game."}]'::jsonb,20
),
(
  'basketball','Basketball','BK','Winter','Kindergarten–12th Grade','soon','Check Availability',
  'Dan White & Matt Snyder','basketball@epyal.com','https://tshq.bluesombrero.com/Default.aspx?tabid=2741306',
  'Recreational and travel basketball serving boys and girls from Kindergarten through high school.',
  'The 2026–27 registration window is active during the fall. Sports Connect has the current program availability and deadlines.',
  '[{"title":"Recreational Basketball","text":"Age-based divisions combine instruction, practices and game play."},{"title":"Travel Opportunities","text":"Selected age groups may offer additional regional competition."},{"title":"K–12 Pathway","text":"Programs span introductory youth basketball through older recreational divisions."}]'::jsonb,30
),
(
  'football','Tackle Football','FB','Fall','Ages 5–13','closed','Registration Closed',
  'Rocky Magaro & Ian Worrall','football@epyal.com','https://tshq.bluesombrero.com/Default.aspx?tabid=2741307',
  'East Penn Panthers tackle football develops fundamentals, discipline, teamwork and community pride through age-based CFA competition.',
  '2026 tackle football registration is closed. Families with questions should contact the football directors.',
  '[{"title":"Age-Based Levels","text":"Smurf, Pee Wee, Pony and Midget divisions provide an appropriate progression."},{"title":"Panthers Tradition","text":"Players represent East Penn with a strong focus on effort, sportsmanship and team identity."},{"title":"Volunteer Coaches","text":"Community coaches help teach both the game and the habits that make good teammates."}]'::jsonb,40
),
(
  'cheer','Cheerleading','CH','Football & Basketball','Grades 1–8','soon','Seasonal Registration',
  'Brandi McKenney & Crystal Katlic','cheer@epyal.com','https://tshq.bluesombrero.com/Default.aspx?tabid=2741310',
  'Football cheer, basketball cheer, competition opportunities and community events backed by generations of East Penn tradition.',
  'Football Cheer is closed for the current season. Basketball Cheer registration is seasonal and subject to capacity.',
  '[{"title":"Football Cheer","text":"Squads support Panthers football throughout the fall season."},{"title":"Basketball Cheer","text":"Seasonal squads bring EPYAL spirit into the winter program."},{"title":"Competition & Community","text":"Cheer includes competition opportunities, Pink Out and community events."}]'::jsonb,50
),
(
  'field-hockey','Field Hockey','FH','Fall','Youth Program','closed','Season In Progress',
  'Liz Horrick & Kristin Becker','fieldhockey@epyal.com','https://tshq.bluesombrero.com/Default.aspx?tabid=1326003',
  'A local youth field hockey program introducing players to fundamentals, teamwork and organized competition.',
  'Current fall registration is not advertised as open. Contact the directors or check Sports Connect for current availability.',
  '[{"title":"Learn the Game","text":"Players build stick skills, positioning, passing and game awareness."},{"title":"Local Community","text":"A convenient East Penn option for families interested in youth field hockey."},{"title":"Fall Season","text":"The program centers on the fall youth sports calendar."}]'::jsonb,60
),
(
  'flag-football','Flag Football','FF','Summer','Ages 5–17','soon','2027 Coming Soon',
  'Jared Bornman & Ken Field','flagfootball@epyal.com','https://tshq.bluesombrero.com/Default.aspx?tabid=2741308',
  'Summer flag football with age-based divisions, tournament play and an accessible path into the game.',
  'Summer 2027 information is coming soon.',
  '[{"title":"Ages 5–17","text":"Divisions run from Pee Wee through Pro."},{"title":"Summer Competition","text":"A fast-paced seasonal option outside the traditional fall tackle schedule."},{"title":"Volunteer Driven","text":"Coaches and families help make the program possible each summer."}]'::jsonb,70
)
on conflict (slug) do nothing;

insert into public.leadership (role,name,email,sort_order)
values
('President','Steve Chernov',null,10),
('Vice President','Barry Donbaugh',null,20),
('Secretary','Alicia Worrall',null,30),
('Treasurer','Rob Maxwell','treasurer@epyal.com',40),
('Baseball Directors','Kyle Trovinger & Jason Clapper','baseball@epyal.com',50),
('Basketball Directors','Dan White & Matt Snyder','basketball@epyal.com',60),
('Football Directors','Rocky Magaro & Ian Worrall','football@epyal.com',70),
('Cheer Directors','Brandi McKenney & Crystal Katlic','cheer@epyal.com',80),
('Softball Directors','Lisa Clapper & Dave Budzyn','softball@epyal.com',90),
('Field Hockey Directors','Liz Horrick & Kristin Becker','fieldhockey@epyal.com',100),
('Flag Football Directors','Jared Bornman & Ken Field','flagfootball@epyal.com',110),
('Fundraising Director','James Edrington','fundraising@epyal.com',120)
on conflict do nothing;

insert into public.news_posts (slug,title,category,excerpt,display_date,published)
values
('basketball-registration-2026','2026–27 Basketball Registration','Registration','Families can review the current basketball program information and continue into Sports Connect for live availability.','September 2026',true),
('cheer-tradition','Celebrating Generations of East Penn Cheer','League','Football, basketball, competition and community events continue a proud Panthers cheer tradition.','2026 Season',true),
('smurf-bowl','Panthers Championship Tradition','Football','A look at the athletes, coaches and families who help build the East Penn football program.','League Highlight',true)
on conflict (slug) do nothing;

insert into public.events (title,category,starts_at,display_date,display_time,location,published)
values
('Public Board Meeting','Board','2026-10-07T20:00:00-04:00','October 7, 2026','8:00 PM','Sheaffer Field — Upstairs',true),
('Cheer Competition Pin Making','Cheer','2026-10-22T18:30:00-04:00','October 22, 2026','6:30 PM','Sheaffer Field — Upstairs',true),
('Field Hockey Fundraiser','Fundraising','2026-10-23T17:00:00-04:00','October 23, 2026','5:00 PM','Sheaffer Field — Upstairs',true),
('Public Board Meeting','Board','2026-11-04T20:00:00-05:00','November 4, 2026','8:00 PM','Sheaffer Field — Upstairs',true);
