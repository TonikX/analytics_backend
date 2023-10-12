-- Все учебные сущности с ненулевым доменом
select items.name as entity_name, items.id as entity_id, dom.name as domain_name, dom.id as domain_id
from dataprocessing_items as items
         join dataprocessing_domain as dom
              on items.domain_id = dom.id
where items.domain_id is not null;

-- Все айдишники учебных сущностей с агрегацией по домену
select data.domain_id,
       array_agg(
               data.entity_id
               order by
                   data.entity_id,
                   data.domain_id
           ) as entities
from (
         select items.name as entity_name,
                items.id   as entity_id,
                dom.name   as domain_name,
                dom.id     as domain_id
         from dataprocessing_items as items
                  join dataprocessing_domain as dom
                       on items.domain_id = dom.id
         where items.domain_id is not null) as data
group by data.domain_id
order by data.domain_id;

-- Все названия учебных сущностей с агрегацией по домену
select data.domain_id,
       array_agg(
               data.entity_name
               order by
                   data.entity_id,
                   data.domain_id
           ) as entities
from (
         select items.name as entity_name,
                items.id   as entity_id,
                dom.name   as domain_name,
                dom.id     as domain_id
         from dataprocessing_items as items
                  join dataprocessing_domain as dom
                       on items.domain_id = dom.id
         where items.domain_id is not null) as data
group by data.domain_id
order by data.domain_id;


-- Айдюки всех одобренных РПД
select work_program_id
from workprogramsapp_expertise we
where we.expertise_status = 'AC';

-- Пререквизиты всех одобренных РПД (эта фигня нужна для кроссчекинга)
select workprogram_id, item_id
from dataprocessing_items di
         join workprogramsapp_prerequisitesofworkprogram wpp on di.id = wpp.item_id
where wpp.workprogram_id in (
    select work_program_id
    from public.workprogramsapp_expertise we
    where we.expertise_status = 'AC'
)
order by workprogram_id;

-- Агрегированные айдишники сущностей из пререквизитов одобренных РПД по юзерам (редакторы)
select data.user_id, array_agg(data.item_id order by data.user_id, data.item_id) entities
from (select *
      from dataprocessing_items items
               join workprogramsapp_prerequisitesofworkprogram prerequisites on items.id = prerequisites.item_id
               join workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id
               join workprogramsapp_workprogram_editors editors on program.id = editors.workprogram_id
               join public.workprogramsapp_expertise we on program.id = we.work_program_id
      where items.domain_id is not null
        and we.expertise_status = 'AC') as data
group by data.user_id
order by data.user_id;


-- Агрегированные айдишники сущностей из пререквизитов одобренных РПД по юзерам (авторы)
select data.uid, array_agg(data.item_id order by data.uid, data.item_id) entities
from (select du.id as uid, item_id
      from dataprocessing_items items
               join workprogramsapp_prerequisitesofworkprogram prerequisites on items.id = prerequisites.item_id
               join workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id
               join public.workprogramsapp_expertise we on program.id = we.work_program_id
               join dataprocessing_user du on program.authors like '%' || du.last_name || '%'
      where items.domain_id is not null
        and du.first_name <> ''
        and du.last_name <> ''
        and we.expertise_status = 'AC') as data
group by data.uid
order by data.uid;

-- Агрегированные айдишники сущностей из пререквизитов одобренных РПД по юзерам (авторы + редакторы)
select *
from (select data.uid, array_agg(data.item_id order by data.uid, data.item_id) entities
      from (select du.id as uid, item_id
            from dataprocessing_items items
                     join workprogramsapp_prerequisitesofworkprogram prerequisites
                          on items.id = prerequisites.item_id
                     join workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id
                     join public.workprogramsapp_expertise we on program.id = we.work_program_id
                     join dataprocessing_user du on program.authors like '%' || du.last_name || '%'
            where items.domain_id is not null
              and du.first_name <> ''
              and du.last_name <> ''
              and we.expertise_status = 'AC') as data
      group by data.uid
      order by data.uid) as by_authors
union
select *
from (select data.user_id, array_agg(data.item_id order by data.user_id, data.item_id) entities
      from (select *
            from dataprocessing_items items
                     join workprogramsapp_prerequisitesofworkprogram prerequisites
                          on items.id = prerequisites.item_id
                     join workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id
                     join workprogramsapp_workprogram_editors editors on program.id = editors.workprogram_id
                     join public.workprogramsapp_expertise we on program.id = we.work_program_id
            where items.domain_id is not null
              and we.expertise_status = 'AC') as data
      group by data.user_id
      order by data.user_id) as by_editors;

-- Получим описания всех одобренных РПД
select id, /*title,*/ description /*, structural_unit_id*/ from workprogramsapp_workprogram ww where work_status = 'a' and description <> '' limit 10;