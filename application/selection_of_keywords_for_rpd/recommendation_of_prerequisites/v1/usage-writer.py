import csv
import numpy as np
import psycopg2

from selection_of_keywords_for_rpd.recommendation_of_prerequisites.v1.connection_to_postgre import connection_to_postgre


# only editors
# select_query = "select data.user_id, array_agg(data.item_id order by data.user_id, data.item_id) entities from (select * from dataprocessing_items items join workprogramsapp_prerequisitesofworkprogram prerequisites on items.id = prerequisites.item_id join workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id join workprogramsapp_workprogram_editors editors on program.id = editors.workprogram_id join public.workprogramsapp_expertise we on program.id = we.work_program_id where items.domain_id is not null and we.expertise_status = 'AC') as data group by data.user_id order by data.user_id;"
# only authors
select_query = "select data.uid, array_agg(data.item_id order by data.uid, data.item_id) entities from (select du.id as uid, item_id from dataprocessing_items items join workprogramsapp_prerequisitesofworkprogram prerequisites on items.id = prerequisites.item_id join workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id join public.workprogramsapp_expertise we on program.id = we.work_program_id join dataprocessing_user du on program.authors like '%' || du.last_name || '%' where items.domain_id is not null and du.first_name <> '' and du.last_name <> '' and we.expertise_status = 'AC') as data group by data.uid order by data.uid;"
# authors & editors

# select_query = "select * from (select data.uid, array_agg(data.item_id order by data.uid, data.item_id) entities from (select du.id as uid, item_id from dataprocessing_items items join workprogramsapp_prerequisitesofworkprogram prerequisites on items.id = prerequisites.item_id join workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id join public.workprogramsapp_expertise we on program.id = we.work_program_id join dataprocessing_user du on program.authors like '%' || du.last_name || '%' where items.domain_id is not null and du.first_name <> '' and du.last_name <> '' and we.expertise_status = 'AC') as data group by data.uid order by data.uid) as by_authors union select * from (select data.user_id, array_agg(data.item_id order by data.user_id, data.item_id) entities from (select * from dataprocessing_items items join workprogramsapp_prerequisitesofworkprogram prerequisites on items.id = prerequisites.item_id join workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id join workprogramsapp_workprogram_editors editors on program.id = editors.workprogram_id join public.workprogramsapp_expertise we on program.id = we.work_program_id where items.domain_id is not null and we.expertise_status = 'AC') as data group by data.user_id order by data.user_id) as by_editors;"
# select_query = "SELECT data.user_id, ARRAY_AGG( data.item_id ORDER BY data.user_id, data.item_id ) entities FROM (SELECT * FROM dataprocessing_items items JOIN workprogramsapp_prerequisitesofworkprogram prerequisites on items.id = prerequisites.workprogram_id JOIN workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id JOIN workprogramsapp_workprogram_editors editors on program.id = editors.workprogram_id UNION ALL SELECT * FROM dataprocessing_items items JOIN workprogramsapp_outcomesofworkprogram outcomes on items.id = outcomes.item_id JOIN workprogramsapp_workprogram program on program.id = outcomes.workprogram_id JOIN workprogramsapp_workprogram_editors editors on program.id = editors.workprogram_id ) as data GROUP BY data.user_id ORDER BY data.user_id";
# select_query = "SELECT data.user_id, ARRAY_AGG(data.item_id ORDER BY data.user_id, data.item_id) entities FROM (SELECT * FROM dataprocessing_items items JOIN workprogramsapp_prerequisitesofworkprogram prerequisites on items.id = prerequisites.workprogram_id JOIN workprogramsapp_workprogram program on program.id = prerequisites.workprogram_id JOIN workprogramsapp_workprogram_editors editors on program.id = editors.workprogram_id JOIN dataprocessing_user users on editors.user_id = users.id WHERE last_name like '%' || authors || '%' UNION ALL SELECT * FROM dataprocessing_items items JOIN workprogramsapp_outcomesofworkprogram outcomes on items.id = outcomes.item_id JOIN workprogramsapp_workprogram program on program.id = outcomes.workprogram_id JOIN workprogramsapp_workprogram_editors editors on program.id = editors.workprogram_id JOIN dataprocessing_user users on editors.user_id = users.id WHERE last_name like '%' || authors || '%' ) as data GROUP BY data.user_id ORDER BY data.user_id"

unique_items = set()
user_data = {}

try:
    connection = connection_to_postgre()
    cursor = connection.cursor()
    cursor.execute(select_query)
    entities = cursor.fetchall()
    print("Selecting rows from mobile table using cursor.fetchall")
    vector = {}
    all_features = set()

    print("Print each row and it's columns values")
    for row in entities:
        for user_id, items in entities:
            unique_items.update(items)
            user_data[user_id] = items

except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

unique_items = sorted(unique_items)

with open('selection_of_keywords_for_rpd/recommendation_of_prerequisites/data/output.tsv', 'wt') as out_file:
    tsv_writer = csv.writer(out_file, delimiter='\t')
    # tsv_writer.writerow(['user', 'entity', 'count'])
    for user, elems in user_data.items():
        res = []
        unique, counts = np.unique(elems, return_counts=True)
        user_data[user] = dict(zip(unique, counts))

        for items in user_data[user].items():
            tsv_writer.writerow([user, items[0], items[1]])
