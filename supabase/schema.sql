-- CATO! · esquema de base de datos para Supabase
-- Pégalo completo en Supabase > SQL Editor > New query y pulsa Run. Solo se ejecuta una vez.

-- TABLAS -------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  -- obligatorios
  name text not null check (char_length(name) between 1 and 30),
  birth date not null,
  gender text not null,
  looking_for text[] not null check (looking_for <@ array['amistad','conocer'] and array_length(looking_for,1) >= 1),
  interests text[] not null check (array_length(interests,1) between 3 and 12),
  photos text[] not null default '{}' check (array_length(photos,1) between 1 and 3),
  -- opcionales
  bio text not null default '' check (char_length(bio) <= 300),
  career text not null default '',
  semester int,
  hide_career boolean not null default false,
  ig text not null default '',
  artists text not null default '',
  ice jsonb,
  updated_at timestamptz not null default now()
);

create table public.swipes (
  swiper uuid not null references public.profiles(id) on delete cascade,
  target uuid not null references public.profiles(id) on delete cascade,
  liked boolean not null,
  created_at timestamptz not null default now(),
  primary key (swiper, target)
);

create table public.daily_answers (
  user_id uuid not null references public.profiles(id) on delete cascade,
  day date not null,
  body text not null check (char_length(body) between 1 and 150),
  created_at timestamptz not null default now(),
  primary key (user_id, day)          -- una respuesta por día
);

create table public.answer_reactions (
  user_id uuid not null references public.profiles(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  day date not null,
  primary key (user_id, author_id, day)
);

create table public.messages (
  id bigint generated always as identity primary key,
  sender uuid not null references public.profiles(id) on delete cascade,
  recipient uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now()
);
create index messages_sender_idx on public.messages (sender, created_at desc);
create index messages_recipient_idx on public.messages (recipient, created_at desc);

create table public.blocks (
  blocker uuid not null references public.profiles(id) on delete cascade,
  blocked uuid not null references public.profiles(id) on delete cascade,
  primary key (blocker, blocked)
);

create table public.reports (
  id bigint generated always as identity primary key,
  reporter uuid not null references public.profiles(id) on delete cascade,
  about uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- SEGURIDAD (Row Level Security) ---------------------------------------------
alter table public.profiles        enable row level security;
alter table public.swipes          enable row level security;
alter table public.daily_answers   enable row level security;
alter table public.answer_reactions enable row level security;
alter table public.messages        enable row level security;
alter table public.blocks          enable row level security;
alter table public.reports         enable row level security;

-- Perfiles: todos los usuarios con sesión los ven; cada quien edita solo el suyo.
create policy "ver perfiles" on public.profiles for select to authenticated using (true);
create policy "crear mi perfil" on public.profiles for insert to authenticated with check (id = auth.uid());
create policy "editar mi perfil" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Swipes: solo ves los tuyos y los likes que te dieron.
create policy "ver mis swipes" on public.swipes for select to authenticated using (swiper = auth.uid() or target = auth.uid());
create policy "crear mi swipe" on public.swipes for insert to authenticated with check (swiper = auth.uid());
create policy "cambiar mi swipe" on public.swipes for update to authenticated using (swiper = auth.uid()) with check (swiper = auth.uid());

-- Pregunta del día: todos leen; cada quien escribe la suya.
create policy "ver respuestas" on public.daily_answers for select to authenticated using (true);
create policy "responder como yo" on public.daily_answers for insert to authenticated with check (user_id = auth.uid());

create policy "ver reacciones" on public.answer_reactions for select to authenticated using (true);
create policy "reaccionar como yo" on public.answer_reactions for insert to authenticated with check (user_id = auth.uid());
create policy "quitar mi reaccion" on public.answer_reactions for delete to authenticated using (user_id = auth.uid());

-- Mensajes: solo los ven quien los envió y quien los recibe.
create policy "ver mis mensajes" on public.messages for select to authenticated using (sender = auth.uid() or recipient = auth.uid());
create policy "enviar mensajes" on public.messages for insert to authenticated with check (sender = auth.uid());

-- Bloqueos: privados.
create policy "ver mis bloqueos" on public.blocks for select to authenticated using (blocker = auth.uid());
create policy "bloquear" on public.blocks for insert to authenticated with check (blocker = auth.uid());
create policy "desbloquear" on public.blocks for delete to authenticated using (blocker = auth.uid());

-- Reportes: cualquiera puede crear; solo tú los lees desde el panel de Supabase (Table Editor).
create policy "reportar" on public.reports for insert to authenticated with check (reporter = auth.uid());

-- FOTOS (Storage) -------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('photos', 'photos', true) on conflict (id) do nothing;

create policy "subir mis fotos" on storage.objects for insert to authenticated
  with check (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "borrar mis fotos" on storage.objects for delete to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- TIEMPO REAL: avisa a la app cuando algo cambia --------------------------------
alter publication supabase_realtime add table
  public.profiles, public.swipes, public.daily_answers, public.answer_reactions, public.messages, public.blocks;
