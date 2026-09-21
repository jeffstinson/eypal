create index if not exists idx_audit_log_user_id on public.audit_log(user_id);
create index if not exists idx_news_posts_author_id on public.news_posts(author_id);

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles for select using ((select auth.uid()) = id);

drop policy if exists "edit sports" on public.sports;
create policy "edit sports" on public.sports for update
using (exists (select 1 from public.profiles p where p.id = (select auth.uid()) and (p.role in ('admin','marketing') or (p.role='sport_director' and p.sport_slug=sports.slug))))
with check (exists (select 1 from public.profiles p where p.id = (select auth.uid()) and (p.role in ('admin','marketing') or (p.role='sport_director' and p.sport_slug=sports.slug))));

drop policy if exists "edit site settings" on public.site_settings;
create policy "edit site settings" on public.site_settings for all
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')))
with check (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));

drop policy if exists "edit news" on public.news_posts;
create policy "edit news" on public.news_posts for all
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')))
with check (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));

drop policy if exists "edit events" on public.events;
create policy "edit events" on public.events for all
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')))
with check (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));

drop policy if exists "edit sponsors" on public.sponsors;
create policy "edit sponsors" on public.sponsors for all
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing','fundraising')))
with check (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing','fundraising')));

drop policy if exists "edit leadership" on public.leadership;
create policy "edit leadership" on public.leadership for all
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'))
with check (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "edit resources" on public.resources;
create policy "edit resources" on public.resources for all
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')))
with check (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));

drop policy if exists "edit faqs" on public.faqs;
create policy "edit faqs" on public.faqs for all
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')))
with check (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));

drop policy if exists "insert audit log" on public.audit_log;
create policy "insert audit log" on public.audit_log for insert
with check ((select auth.uid()) = user_id);

drop policy if exists "read own audit log" on public.audit_log;
create policy "read own audit log" on public.audit_log for select
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin'));

drop policy if exists "editor read sports" on public.sports;
create policy "editor read sports" on public.sports for select
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and (p.role in ('admin','marketing') or (p.role='sport_director' and p.sport_slug=sports.slug))));

drop policy if exists "editor read settings" on public.site_settings;
create policy "editor read settings" on public.site_settings for select
using (exists (select 1 from public.profiles p where p.id=(select auth.uid())));

drop policy if exists "editor read news" on public.news_posts;
create policy "editor read news" on public.news_posts for select
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));

drop policy if exists "editor read events" on public.events;
create policy "editor read events" on public.events for select
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));

drop policy if exists "editor read sponsors" on public.sponsors;
create policy "editor read sponsors" on public.sponsors for select
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing','fundraising')));

drop policy if exists "editor read leadership" on public.leadership;
create policy "editor read leadership" on public.leadership for select
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));

drop policy if exists "admin read newsletter" on public.newsletter_subscribers;
create policy "admin read newsletter" on public.newsletter_subscribers for select
using (exists (select 1 from public.profiles p where p.id=(select auth.uid()) and p.role in ('admin','marketing')));