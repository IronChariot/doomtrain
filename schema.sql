-- Run this once in the Supabase SQL editor for your project.

create extension if not exists pgcrypto;

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  line text,
  stop_reached text not null,
  pdoom numeric(5,2),
  tractability text,
  ceo_sincerity text,
  answers jsonb not null default '{}'::jsonb
);

-- Safe to re-run if you already created the table with an earlier version.
alter table public.responses add column if not exists line text;
alter table public.responses add column if not exists tractability text;

-- P(doom) accepts values far below 1%, down to 0.0001%, so it needs more
-- decimal places than the original numeric(5,2).
alter table public.responses alter column pdoom type numeric(9,6);

alter table public.responses enable row level security;

-- Anonymous visitors may record a response, but may not read anyone's
-- individual row back (including their own) through the anon key.
drop policy if exists "anon can insert responses" on public.responses;
create policy "anon can insert responses"
  on public.responses
  for insert
  to anon
  with check (true);

-- Aggregate-only read path: counts and averages per stop, no raw rows.
create or replace function public.get_stop_stats()
returns table (stop_reached text, n bigint, avg_pdoom numeric)
language sql
security definer
set search_path = public
as $$
  select stop_reached, count(*) as n, round(avg(pdoom), 6) as avg_pdoom
  from public.responses
  where pdoom is not null
  group by stop_reached;
$$;

grant execute on function public.get_stop_stats() to anon;

-- Everything the results animation needs, in one aggregate-only call.
--   total  : how many responses exist
--   stops  : per exit point, the count, average P(doom), and the
--            tractability / CEO-sincerity splits for people who ended there
--   nodes  : per question (stops and detours alike), how many answered
--            yes and how many answered no
-- Still no raw rows: every value below is a count or an average.
create or replace function public.get_board_stats()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'total', (select count(*) from public.responses),
    'stops', coalesce((
      select jsonb_object_agg(stop_reached, jsonb_build_object(
        'n', n,
        'avg_pdoom', avg_pdoom,
        'tractability', tractability,
        'sincerity', sincerity
      ))
      from (
        select
          stop_reached,
          count(*) as n,
          round(avg(pdoom), 6) as avg_pdoom,
          jsonb_build_object(
            'helps', count(*) filter (where tractability = 'helps'),
            'locked', count(*) filter (where tractability = 'locked')
          ) as tractability,
          jsonb_build_object(
            'sincere', count(*) filter (where ceo_sincerity = 'sincere'),
            'exaggerating', count(*) filter (where ceo_sincerity = 'exaggerating'),
            'downplaying', count(*) filter (where ceo_sincerity = 'downplaying')
          ) as sincerity
        from public.responses
        group by stop_reached
      ) s
    ), '{}'::jsonb),
    'nodes', coalesce((
      select jsonb_object_agg(key, jsonb_build_object('yes', yes_n, 'no', no_n))
      from (
        select
          key,
          count(*) filter (where value = 'true'::jsonb) as yes_n,
          count(*) filter (where value = 'false'::jsonb) as no_n
        from public.responses r, jsonb_each(r.answers)
        where key <> '_seed'
        group by key
      ) n
    ), '{}'::jsonb)
  );
$$;

grant execute on function public.get_board_stats() to anon;

-- Lets a visitor withdraw the single response they just submitted. The row id
-- is generated in their browser, so only that page ever knows it, and this
-- deletes by id alone -- it cannot touch anything else. The age limit caps the
-- damage if an id were ever to leak. Returns whether a row actually went.
create or replace function public.delete_response(response_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  with removed as (
    delete from public.responses
    where id = response_id
      and created_at > now() - interval '24 hours'
    returning 1
  )
  select exists (select 1 from removed);
$$;

grant execute on function public.delete_response(uuid) to anon;
