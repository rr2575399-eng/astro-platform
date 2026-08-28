-- Jathagam AI production schema (Supabase/PostgreSQL)
create extension if not exists pgcrypto;

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_en text not null,
  name_ta text not null,
  price_inr integer not null check (price_inr >= 0),
  discount_price_inr integer,
  delivery_hours integer not null default 24,
  active boolean not null default true,
  prompt_version integer not null default 1,
  prompt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  gender text not null,
  mobile text not null,
  whatsapp text not null,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists birth_details (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  dob date not null,
  birth_time time,
  time_unknown boolean not null default false,
  birth_place text not null,
  birth_country text not null default 'India',
  latitude numeric(10,7),
  longitude numeric(10,7),
  time_zone text not null default '+05:30'
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_id uuid not null references customers(id),
  birth_details_id uuid not null references birth_details(id),
  service_slug text not null,
  amount_inr integer not null check (amount_inr >= 0),
  currency text not null default 'INR',
  questions text,
  consent_given boolean not null default false,
  status text not null default 'ORDER_CREATED',
  payment_status text not null default 'CREATED',
  gateway_order_id text,
  gateway_payment_id text,
  report_id uuid,
  pdf_url text,
  whatsapp_status text not null default 'PENDING',
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists astrology_calculations (
  id uuid primary key default gen_random_uuid(),
  order_id uuid unique not null references orders(id) on delete cascade,
  engine text not null,
  engine_version text,
  input_json jsonb not null,
  result_json jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists ai_reports (
  id uuid primary key default gen_random_uuid(),
  order_id uuid unique not null references orders(id) on delete cascade,
  prompt_version integer not null,
  model text not null,
  input_json jsonb not null,
  output_text text not null,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  gateway text not null,
  gateway_order_id text,
  gateway_payment_id text,
  amount_inr integer not null,
  status text not null,
  webhook_event_id text unique,
  raw_event jsonb,
  created_at timestamptz not null default now()
);

create table if not exists webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text unique not null,
  event_type text,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

create table if not exists job_queue (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,
  order_id uuid not null references orders(id) on delete cascade,
  status text not null default 'PENDING',
  attempts integer not null default 0,
  available_at timestamptz not null default now(),
  locked_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(job_type, order_id)
);

create index if not exists orders_mobile_idx on orders(customer_id);
create index if not exists orders_status_idx on orders(status);
create index if not exists jobs_status_idx on job_queue(status, available_at);
