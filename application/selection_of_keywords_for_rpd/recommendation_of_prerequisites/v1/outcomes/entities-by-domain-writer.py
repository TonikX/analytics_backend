import csv
import psycopg2

from selection_of_keywords_for_rpd.recommendation_of_prerequisites.v1.connection_to_postgre import connection_to_postgre

select_query = "select id, name, domain_id from dataprocessing_items where domain_id is not null order by id asc;";

unique_items = set()

result = []

try:
    connection = connection_to_postgre()
    cursor = connection.cursor()
    cursor.execute(select_query)
    entities = cursor.fetchall()
    print("Selecting rows from mobile table using cursor.fetchall")
    vector = {}
    all_features = set()

    print("Print each row and it's columns values")
    for id, name, domain_id in entities:
        result.append([id, name, domain_id])

except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

unique_items = sorted(unique_items)

with open('../../data/entities_with_domain.tsv', 'wt') as out_file:
    tsv_writer = csv.writer(out_file, delimiter='\t')
    tsv_writer.writerow(['id', 'entity_name', 'domain_id'])
    for item in result:
        print(item)
        tsv_writer.writerow(item)

print('end')