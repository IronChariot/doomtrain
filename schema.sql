-- Run this once in the Supabase SQL editor for your project.

create extension if not exists pgcrypto;

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  stop_reached text not null,
  pdoom numeric(5,2),
  ceo_sincerity text,
  answers jsonb not null default '{}'::jsonb
);

alter table public.responses enable row level security;

-- Anonymous visitors may record a response, but may not read anyone's
-- individual row back (including their own) through the anon key.
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
  select stop_reached, count(*) as n, round(avg(pdoom), 1) as avg_pdoom
  from public.responses
  where pdoom is not null
  group by stop_reached;
$$;

grant execute on function public.get_stop_stats() to anon;
