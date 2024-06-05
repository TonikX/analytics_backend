import psycopg2

from analytics_project.settings import env


def connection_to_postgre():
    connection = psycopg2.connect(
        database=env.db("DATABASE_URL")["NAME"],
        user=env.db("DATABASE_URL")["USER"],
        password=env.db("DATABASE_URL")["PASSWORD"],
        host=env.db("DATABASE_URL")["HOST"],
        port=env.db("DATABASE_URL")["PORT"],
    )
    return connection
