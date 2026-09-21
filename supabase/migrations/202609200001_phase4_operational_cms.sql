-- EPYAL Phase 4 operational CMS expansion

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  href text not null,
  category text not null,
  external boolean not null default true,
  published boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null default 'General',
  published boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  summary text,
  created_at timestamptz not null default now()
);

alter table public.news_posts add column if not exists featured boolean not null default false;
alter table public.news_posts add column if not exists seo_title text;
alter table public.news_posts add column if not exists seo_description text;
alter table public.events add column if not exists url text;
alter table public.events add column if not exists featured boolean not null default false;
alter table public.sponsors add column if not exists description text;
alter table public.sponsors add column if not exists contact_email text;
alter table public.leadership add column if not exists phone text;
alter table public.leadership add column if not exists bio text;

alter table public.resources enable row level security;
alter table public.faqs enable row level security;
alter table public.audit_log enable row level security;

create policy "public read published resources" on public.resources
for select using (published = true);

create policy "public read published faqs" on public.faqs
for select using (published = true);

create policy "edit resources" on public.resources for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin','marketing')
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin','marketing')
  )
);

create policy "edit faqs" on public.faqs for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin','marketing')
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin','marketing')
  )
);

create policy "read own audit log" on public.audit_log for select
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "insert audit log" on public.audit_log for insert
with check (auth.uid() = user_id);

-- Editors need SELECT access to drafts they manage in the admin.
create policy "editor read sports" on public.sports for select
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and (
        p.role in ('admin','marketing')
        or (p.role = 'sport_director' and p.sport_slug = sports.slug)
      )
  )
);

create policy "editor read settings" on public.site_settings for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid())
);

create policy "editor read news" on public.news_posts for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
);

create policy "editor read events" on public.events for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
);

create policy "editor read sponsors" on public.sponsors for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing','fundraising'))
);

create policy "editor read leadership" on public.leadership for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
);

create policy "admin read newsletter" on public.newsletter_subscribers for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','marketing'))
);

insert into public.resources (title,description,href,category,external,published,sort_order)
values
('EPYAL Player & Parent Code of Conduct','League expectations for sportsmanship, respect, attendance, equipment care and parent behavior.','https://tshq.bluesombrero.com/Default.aspx?tabid=2754793','Policies',true,true,10),
('Pennsylvania Child Abuse Clearances','Official Commonwealth information about clearances required for adults who work or volunteer with children.','https://www.pa.gov/agencies/dhs/resources/keep-kids-safe/child-abuse-clearances','Safety',true,true,20),
('Little League Volunteer Information','Official Little League overview of volunteering, applications, background checks and abuse-awareness training.','https://www.littleleague.org/volunteer/','Coaches',true,true,30),
('EPYAL Baseball Parent Welcome Guide','A detailed guide for baseball families covering what happens after registration, season expectations and parent responsibilities.','https://tshq.bluesombrero.com/portals/21360/users/247/87/133124087/epyal-baseball-welcome-s25.pdf','Baseball',true,true,40)
on conflict do nothing;

insert into public.faqs (question,answer,category,published,sort_order)
values
('Where do I register my child for EPYAL sports?','Program information and registration status are published on this website. Parent login, participant registration, waivers and payment are completed through EPYAL’s existing Sports Connect / Blue Sombrero system.','Registration',true,10),
('Do I need a separate account for the new EPYAL website?','No. The public website is designed for league information and communications. Parent registration accounts continue to live in Sports Connect.','Registration',true,20),
('How do I know when registration opens?','Use the Registration Center, subscribe to EPYAL email updates and follow the individual sport page. Registration windows vary by sport and season.','Registration',true,30),
('How can I volunteer or coach?','Start with the Coaches & Volunteers page. Requirements vary by sport, and adults working with youth may need Pennsylvania clearances and sport-specific background checks or training.','Volunteers',true,40)
on conflict do nothing;
