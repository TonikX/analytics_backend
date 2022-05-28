import argparse
from typing import Dict
from typing import Iterable
from typing import List
from typing import Tuple

from django.core.management.base import BaseCommand
from django.db import connection
import pydot


def get_in_clause(field_name: str, lst: Iterable[str]) -> str:
    clause = ','.join([f"'{item}'" for item in lst])
    return f'{field_name} IN ({clause})'


class Command(BaseCommand):

    @staticmethod
    def get_tables(tables: Iterable[str]) -> List[str]:
        where_params = [
            "t.schemaname = 'public'"
        ]
        if tables:
            where_params.append(get_in_clause('t.tablename', tables))
        where_clause = ' AND '.join(where_params)

        query = f'''
           SELECT t.tablename
             FROM pg_catalog.pg_tables AS t
            WHERE {where_clause}
            ORDER BY t.tablename;
        '''

        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

        return [row[0] for row in rows]  # fetchall returns list of tuples so we need to unpack them

    @staticmethod
    def get_tables_info(tables: Iterable[str]) -> Dict[str, dict]:
        where_params = [
            "c.table_schema = 'public'"
        ]
        if tables:
            where_params.append(get_in_clause('c.table_name', tables))
        where_clause = ' AND '.join(where_params)

        query = f'''
           SELECT c.table_name,
                  c.column_name,
                  c.is_nullable = 'YES' AS is_nullable,
                  BOOL_OR(tc_pk.constraint_name IS NOT NULL) AS is_primary_key,
                  BOOL_OR(tc_fk.constraint_name IS NOT NULL) AS is_foreign_key
             FROM information_schema.columns AS c
        LEFT JOIN information_schema.key_column_usage AS kcu
                  ON kcu.table_schema = c.table_schema
                     AND kcu.table_name = c.table_name
                     AND kcu.column_name = c.column_name
        LEFT JOIN information_schema.table_constraints AS tc_pk
                  ON tc_pk.constraint_name = kcu.constraint_name
                     AND tc_pk.constraint_type = 'PRIMARY KEY'
        LEFT JOIN information_schema.table_constraints AS tc_fk
                  ON tc_fk.constraint_name = kcu.constraint_name
                     AND tc_fk.constraint_type = 'FOREIGN KEY'
            WHERE {where_clause}
            GROUP BY c.table_name, c.column_name, c.is_nullable, c.ordinal_position
            ORDER BY c.table_name, c.ordinal_position;
        '''

        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

            result = {}
            for table_name, column_name, is_nullable, is_primary_key, is_foreign_key in rows:
                if table_name not in result:
                    result[table_name] = {}

                result[table_name][column_name] = {
                    'is_nullable': is_nullable,
                    'is_pk': is_primary_key,
                    'is_fk': is_foreign_key
                }

        return result

    @staticmethod
    def get_relations(tables: Iterable[str]) -> Tuple[str, str]:
        where_params = [
            "tc.constraint_type = 'FOREIGN KEY'",
            "ccu.table_schema = 'public'",
        ]
        if tables:
            where_params.append(get_in_clause('tc.table_name', tables))
        where_clause = ' AND '.join(where_params)

        query = f'''
        SELECT ccu.table_name AS foreign_table_name,
               tc.table_name
          FROM information_schema.table_constraints AS tc
          JOIN information_schema.key_column_usage AS kcu
               ON tc.constraint_name = kcu.constraint_name
                  AND tc.table_schema = kcu.table_schema
          JOIN information_schema.constraint_column_usage AS ccu
               ON ccu.constraint_name = tc.constraint_name
                  AND ccu.table_schema = tc.table_schema
         WHERE {where_clause};
        '''

        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

        return rows

    def add_arguments(self, parser: argparse.ArgumentParser):
        parser.add_argument(
            'tables',
            action='store',
            nargs='*',
            type=str,
            help='Tables to build graph for'
        )

    @staticmethod
    def make_record(table_name: str, table_info: dict) -> str:
        record_fields = []
        record_pks = []
        for column_name, info in table_info.items():
            is_pk = info['is_pk']
            is_fk = info['is_fk']
            is_nullable = info['is_nullable']

            prefix = '#' if is_pk else '○' if is_nullable else '◉'
            postfix = ' (FK)' if is_fk else ''

            list_to_append = record_pks if is_pk else record_fields
            list_to_append.append(f'{prefix} {column_name}{postfix}')

        pks = '<br align="left" />'.join(record_pks)
        pk_rows = f'<td align="left">{pks}</td>'

        fks = '<br align="left" />'.join(record_fields)
        fk_rows = f'<td align="left">{fks}</td>'

        record = f'''<<table border="0" cellborder="1" cellspacing="0">
            <tr>
                <td><b>{table_name}</b></td>
            </tr>
            <tr> {pk_rows} </tr>
            <tr> {fk_rows} </tr>
        </table>>'''
        return record

    def execute(self, *args, **options):
        tables = options['tables']
        graph = pydot.Dot('er', graph_type='digraph', bgcolor='white')

        relations = self.get_relations(tables)
        tables = set([table for sublist in relations for table in sublist])
        tables_info = self.get_tables_info(tables)

        for table_name in tables:
            record = self.make_record(table_name, tables_info[table_name])
            graph.add_node(pydot.Node(
                table_name,
                label=record,
                shape='plain'
            ))

        for (fr, to) in relations:
            graph.add_edge(pydot.Edge(fr, to, color='blue'))

        graph.write_svg('test.svg')
        graph.write_dot('test.dot')
