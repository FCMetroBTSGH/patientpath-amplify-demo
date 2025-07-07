-- full_catalog.sql
create extension if not exists "uuid-ossp";
truncate table procedures cascade; truncate table specialties cascade;

-- Helper function
create or replace function add_spec(name text, code text) returns uuid as $$
declare sid uuid;
begin
  sid := uuid_generate_v4();
  insert into specialties(id,code,name) values (sid,code,name);
  return sid;
end $$ language plpgsql;

-- Periodontics
with s as (select add_spec('Periodontics','PERIO') as id)
insert into procedures(specialty_id,name) values
((select id from s),'Comprehensive Periodontal Evaluation'),
((select id from s),'Periodontal Maintenance'),
((select id from s),'Localized Evaluation'),
((select id from s),'Extractions'),
((select id from s),'Bone Grafting'),
((select id from s),'Implant Placement'),
((select id from s),'Crown Lengthening'),
((select id from s),'Soft-Tissue Grafting'),
((select id from s),'Biopsy'),
((select id from s),'Frenectomy'),
((select id from s),'Sinus Augmentation'),
((select id from s),'Ridge Augmentation'),
((select id from s),'3D Imaging (CBCT)'),
((select id from s),'All-on-X / Teeth in a Day Therapy'),
((select id from s),'Canine Exposure and Bonding'),
((select id from s),'Pre-prosthetic Surgery'),
((select id from s),'Other');

-- Repeat for Oral Surgery, Endodontist, Orthodontics, Pediatric Dentist, Prosthodontist ...