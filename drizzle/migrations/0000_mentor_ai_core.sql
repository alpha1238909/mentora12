-- Roles
create type public.app_role as enum ('student','org','admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null default 'student',
  org_name text,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select, insert on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());
create policy "own roles insert" on public.user_roles for insert to authenticated with check (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- Profiles
create table public.profiles (
  id uuid primary key,
  name text not null default '',
  grade int not null default 9,
  country text not null default 'Казахстан',
  city text not null default '',
  school text,
  language text not null default 'ru',
  goal text not null default 'olympiad',
  daily_minutes int not null default 20,
  connection_quality text not null default 'stable',
  has_mentor boolean not null default false,
  self_level text not null default 'beginner',
  org_code text,
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "own profile select" on public.profiles for select to authenticated using (id = auth.uid());
create policy "own profile insert" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name) values (new.id, coalesce(new.raw_user_meta_data->>'name',''))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'student')
  on conflict do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- Diagnostics / assessments (kind: diagnostic | checkpoint | final)
create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  kind text not null default 'diagnostic',
  grade int not null default 9,
  day int,
  question_ids jsonb not null default '[]'::jsonb,
  status text not null default 'in_progress',
  total_score numeric,
  max_score numeric,
  skill_scores jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);
grant select, insert, update on public.assessments to authenticated;
grant all on public.assessments to service_role;
alter table public.assessments enable row level security;
create policy "own assessments" on public.assessments for select to authenticated using (user_id = auth.uid());
create policy "own assessments insert" on public.assessments for insert to authenticated with check (user_id = auth.uid());
create policy "own assessments update" on public.assessments for update to authenticated using (user_id = auth.uid());

create table public.assessment_answers (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  user_id uuid not null,
  question_id text not null,
  skill text not null,
  transfer boolean not null default false,
  answer text not null default '',
  is_correct boolean,
  score numeric not null default 0,
  max_score numeric not null default 1,
  ai_feedback text,
  seconds_spent int not null default 0,
  updated_at timestamptz not null default now(),
  unique (assessment_id, question_id)
);
grant select, insert, update on public.assessment_answers to authenticated;
grant all on public.assessment_answers to service_role;
alter table public.assessment_answers enable row level security;
create policy "own answers" on public.assessment_answers for select to authenticated using (user_id = auth.uid());
create policy "own answers insert" on public.assessment_answers for insert to authenticated with check (user_id = auth.uid());
create policy "own answers update" on public.assessment_answers for update to authenticated using (user_id = auth.uid());

-- Skill map
create table public.skill_states (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  skill text not null,
  mastery int not null default 0,
  status text not null default 'untested',
  base_correct int not null default 0,
  base_total int not null default 0,
  transfer_correct int not null default 0,
  transfer_total int not null default 0,
  no_ai_score numeric,
  attempts int not null default 0,
  error_types jsonb not null default '[]'::jsonb,
  last_checked_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, skill)
);
grant select, insert, update on public.skill_states to authenticated;
grant all on public.skill_states to service_role;
alter table public.skill_states enable row level security;
create policy "own skills" on public.skill_states for select to authenticated using (user_id = auth.uid());
create policy "own skills insert" on public.skill_states for insert to authenticated with check (user_id = auth.uid());
create policy "own skills update" on public.skill_states for update to authenticated using (user_id = auth.uid());

-- 14-day route
create table public.route_days (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  day int not null,
  kind text not null default 'lesson',
  lesson_id text,
  skill text not null,
  topic text not null,
  goal text not null default '',
  outcome text not null default '',
  reason text not null default '',
  difficulty text not null default 'base',
  duration_min int not null default 20,
  status text not null default 'planned',
  score numeric,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, day)
);
grant select, insert, update, delete on public.route_days to authenticated;
grant all on public.route_days to service_role;
alter table public.route_days enable row level security;
create policy "own route" on public.route_days for select to authenticated using (user_id = auth.uid());
create policy "own route insert" on public.route_days for insert to authenticated with check (user_id = auth.uid());
create policy "own route update" on public.route_days for update to authenticated using (user_id = auth.uid());
create policy "own route delete" on public.route_days for delete to authenticated using (user_id = auth.uid());

-- Lesson progress
create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id text not null,
  day int,
  stage text not null default 'theory',
  practice jsonb not null default '{}'::jsonb,
  score numeric,
  max_score numeric,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);
grant select, insert, update on public.lesson_progress to authenticated;
grant all on public.lesson_progress to service_role;
alter table public.lesson_progress enable row level security;
create policy "own lesson progress" on public.lesson_progress for select to authenticated using (user_id = auth.uid());
create policy "own lesson progress insert" on public.lesson_progress for insert to authenticated with check (user_id = auth.uid());
create policy "own lesson progress update" on public.lesson_progress for update to authenticated using (user_id = auth.uid());

-- Opportunities catalog (public read)
create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organizer text not null,
  country text not null default 'Казахстан',
  region text,
  subject text not null default 'Математика',
  grades int[] not null default '{8,9,10}',
  level text not null default 'national',
  format text not null default 'offline',
  cost text not null default 'Бесплатно',
  requirements text not null default '',
  selection_path text not null default '',
  deadline date,
  deadline_note text not null default 'Дедлайн уточняется — проверьте официальный источник',
  registration_open boolean not null default false,
  registration_url text,
  official_url text not null,
  source_name text not null,
  last_checked date not null default current_date,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.opportunities to anon, authenticated;
grant all on public.opportunities to service_role;
alter table public.opportunities enable row level security;
create policy "opportunities public read" on public.opportunities for select using (true);

create table public.saved_opportunities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, opportunity_id)
);
grant select, insert, delete on public.saved_opportunities to authenticated;
grant all on public.saved_opportunities to service_role;
alter table public.saved_opportunities enable row level security;
create policy "own saved" on public.saved_opportunities for select to authenticated using (user_id = auth.uid());
create policy "own saved insert" on public.saved_opportunities for insert to authenticated with check (user_id = auth.uid());
create policy "own saved delete" on public.saved_opportunities for delete to authenticated using (user_id = auth.uid());

create table public.opportunity_clicks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  clicked_at timestamptz not null default now()
);
grant select, insert on public.opportunity_clicks to authenticated;
grant all on public.opportunity_clicks to service_role;
alter table public.opportunity_clicks enable row level security;
create policy "own clicks" on public.opportunity_clicks for select to authenticated using (user_id = auth.uid());
create policy "own clicks insert" on public.opportunity_clicks for insert to authenticated with check (user_id = auth.uid());

-- Activity log (for retention analytics)
create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  event text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
grant select, insert on public.activity_log to authenticated;
grant all on public.activity_log to service_role;
alter table public.activity_log enable row level security;
create policy "own activity" on public.activity_log for select to authenticated using (user_id = auth.uid());
create policy "own activity insert" on public.activity_log for insert to authenticated with check (user_id = auth.uid());

-- Seed official opportunities
insert into public.opportunities (title, organizer, country, region, grades, level, format, cost, requirements, selection_path, deadline_note, registration_open, registration_url, official_url, source_name)
values
('Республиканская олимпиада по математике', 'РНПЦ «Дарын»', 'Казахстан', 'Все регионы', '{8,9,10}', 'national', 'offline', 'Бесплатно', 'Участие через школьный и областной этапы', 'Школьный этап → районный/городской → областной → республиканский', 'Дедлайн уточняется — проверьте официальный источник', false, null, 'https://daryn.kz/', 'РНПЦ «Дарын»'),
('Портал олимпиад «Дарын» (онлайн-туры и пробники)', 'РНПЦ «Дарын»', 'Казахстан', 'Все регионы', '{8,9,10}', 'national', 'online', 'Бесплатно', 'Регистрация на портале, доступ по школьному аккаунту', 'Регистрация на портале участия', 'Дедлайн уточняется — проверьте официальный источник', true, 'https://games.daryn.kz/', 'https://games.daryn.kz/', 'Портал «Дарын»'),
('Международная Жаутыковская олимпиада (IZhO)', 'РФМШ / Фонд «Даryn»', 'Казахстан', 'Алматы', '{9,10}', 'international', 'offline', 'Уточняется у организатора', 'Отбор командой страны или приглашение школы', 'Национальный отбор → команда страны → участие в IZhO', 'Дедлайн уточняется — проверьте официальный источник', false, null, 'https://izho.kz/', 'IZhO'),
('International Mathematical Olympiad (IMO)', 'IMO Board', 'Международная', null, '{9,10}', 'international', 'offline', 'Через национальную сборную', 'Отбор в национальную сборную страны', 'Республиканская олимпиада → сборы кандидатов → национальная команда → IMO', 'Дедлайн уточняется — проверьте официальный источник', false, null, 'https://www.imo-official.org/', 'IMO Official');
