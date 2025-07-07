create extension if not exists "uuid-ossp";
create table specialties(id uuid primary key default uuid_generate_v4(), code text, name text);
create table procedures(id uuid primary key default uuid_generate_v4(), specialty_id uuid references specialties(id), name text);
create table referrals(
  id uuid primary key default uuid_generate_v4(),
  patient_name text,
  specialty_id uuid references specialties(id),
  procedure_ids uuid[],
  special_instructions text,
  status text default 'Pending',
  created_at timestamptz default now()
);
-- seed demo
insert into specialties(id,code,name) values (uuid_generate_v4(),'PERIO','Periodontics');