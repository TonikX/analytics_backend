import pymysql
import re
# import mysql.connector

def fetch(sql):

    # host = 'db' - for docker develpment 
    # TODO .env file
    db = pymysql.connect(host='mysql',
    # db = mysql.connector.connect(host='mysql',
                         port=3306,
                         user='root',
                         password='root')
    cursor = db.cursor()

    sql = sql.replace('\r', '')
    sql = re.sub(r'(\/\*(.|\n)*\*\/)|(--.*(\n|$))', '', sql)
    sql = sql.strip().replace('\n', '')

    queries = sql.split(';')
    print('входные запросы в фетчере',queries)
    data = []

    for query in queries:
        query = query.strip()

        if len(query):
            try:
                cursor.execute(query+';')
                data.append((query, cursor.fetchall()))
                #print('попытка добавить данные',data)
                db.commit()
            except Exception as e:
                data.append((query, e))
                return (False, data, e)
    db.close()
    return (True, data, '')
