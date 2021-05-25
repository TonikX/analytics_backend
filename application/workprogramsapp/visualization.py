from sklearn.metrics.pairwise import cosine_similarity
from dataprocessing.models import Items, Relation
from sklearn.feature_extraction.text import TfidfVectorizer
from itertools import combinations
import networkx as nx
from django.db.models import Q
from rest_framework import generics, status
from .models import *
from .serializers import *
from django.conf import settings
from .permissions import *
import numpy as np
from rest_framework.response import Response
from matplotlib.patches import Patch
from matplotlib.lines import Line2D

""""Удалены старые views с использованием джанго рендеринга"""
"""Блок реализации API"""


# class WorkProgramsListApi(APIView):
# #     """
# #     Список рабочих программ для апи.
# #     """
# #     def get(self, request, format=None):
# #         WorkPrograms = WorkProgram.objects.all()
# #         serializer = WorkProgramSerializer(WorkPrograms, many=True)
# #         return Response(serializer.data)

class WorkProgramSameProgramView(generics.ListAPIView):
    """
    Список одинаковых рабочих программ
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializerByName
    permission_classes = [IsRpdDeveloperOrReadOnly]


    def graph_directory_path(self, GRAPH_URL, id):
        return '{}/workprogram/{}.png'.format(GRAPH_URL, id)

    def get(self, request, pk):
        num_workprogram = self.request.data.get('num_workprogram')
        queryset = self.queryset.get(id=pk).outcomes.all()
        outcomes = [val.id for val in queryset]
        pre = self.queryset.get(id=pk).prerequisites.all()
        prer = [val.id for val in pre]
        queryset_without_pk = self.queryset.exclude(pk=pk)
        outcomes += prer
        same_programs = queryset_without_pk.filter(outcomes__in=outcomes) 
        results = {}
        for i in same_programs:
            program_prereq = [val.id for val in i.prerequisites.all()]
            program_outcomes = [val.id for val in i.outcomes.all()]
            coef1 = len(list(set(prer) & set(program_prereq)))
            coef2 = len(list(set(outcomes) & set(program_outcomes)))
            result = round((coef1 + coef2)/ (len(prer)+ len(outcomes)), 2)
            results[i.id] = result
        sorted_by_value = sorted(results.items(), key=lambda kv: kv[1], reverse=True)[:num_workprogram]
        plt.figure(figsize=(25, 20))
        plt.axis("off")
        G = nx.Graph()
        pos = {}
        p = 0
        out = 0
        prog = 1.9

        for el in sorted_by_value:
            cur_program = self.queryset.get(id=el[0])
            G.add_node(cur_program.title)
            prereqisites = [val.name for val in cur_program.prerequisites.all()]
            outcomes =  [val.name for val in cur_program.outcomes.all()]
            if len(prereqisites) > len(outcomes):
                pos[cur_program.title] = (-0.01, prog)
            elif len(prereqisites) < len(outcomes):
                pos[cur_program.title] = (0.01, prog)
            else:
                pos[cur_program.title] = (0, prog)
            prog -=0.5
            for p1 in prereqisites:
                pos[p1] = (-0.02, p)
                G.add_node(p1)
                p += 0.1
                G.add_edge(p1, cur_program.title, color='y')
            
            for o in outcomes:
                pos[o] = (0.02, out)
                G.add_node(o)
                out +=0.1
                G.add_edge(o, cur_program.title, color='g')

        wp_title = self.queryset.get(id=pk).title
        pos[wp_title] = (0, 2)
        G.add_node(wp_title)
        colors = []
        for node in G:
            if node == wp_title:
                colors.append('darkorange')
            elif pos[node][0] == 0.02:
                colors.append('lightblue')
            elif pos[node][0] == -0.02:
                colors.append('y')
            else:
                colors.append('green')
        edge_colors = [G[u][v]['color'] for u, v in G.edges()]
        nx.draw_networkx(G, pos=pos, with_labels=True, node_size=250, font_size=12,node_color=colors, edge_color=edge_colors)
        handles = [Line2D([0], [0], markerfacecolor='lightblue', marker='o', label='Результат', markersize=15, color='w'),
                Line2D([0], [0], markerfacecolor='darkorange', marker='o', label='Выбранная РПД', markersize=15, color='w'),
                Line2D([0], [0], markerfacecolor='g', marker='o', label='Схожая РПД', markersize=15, color='w'),
                Line2D([0], [0], markerfacecolor='y', marker='o', label='Пререквизит', markersize=15, color='w'),
                Line2D([0], [0], lw=3, label='Связь: РПД-Результат',  color='g'),
                Line2D([0], [0], lw=3, label='Связь: РПД-Переквизит',  color='y')]
        plt.legend(handles=handles, loc='upper left', fontsize='x-large')
        plt.savefig(self.graph_directory_path(settings.GRAPH_ROOT, pk))
        programs = {
            "coordinates": pos, 
            "graph": f'{settings.BACKEND_URL}{settings.GRAPH_URL}/workprogram/{ pk }.png'
        }
        return Response(data=programs, status=status.HTTP_200_OK)

class WorkProgramItemsRelationView(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def graph_directory_path(self, GRAPH_URL, id):
        return '{}/item/{}.png'.format(GRAPH_URL, id)
    
    def merge_nodes(self, G, n1, n2, pos, relation_dict_items):
        # Get all predecessors and successors of two nodes
        # Create the new node with combined name
        name = str(n1) + '|' + str(n2)

        G.add_node(name)
        # coordinates
        coor1 = pos[n1]
        coor2 = pos[n2]
        # Remove old nodes
        G.remove_nodes_from([n1, n2])
        pos[name] = (coor1[0], (coor1[1]+coor2[1]-0.05)/2)
        del_list = [] # cписок ключей, которые нужно удалить
        new_dict = {} # словарь с переименновыноми узлами
        for key in relation_dict_items.keys():
            if (n1 in key) & (n2 in key):
                del_list.append(key)
            else:
                if n1 in key:
                    value = relation_dict_items[key]
                    del_list.append(key)
                    value_list = list(key)
                    index = value_list.index(n1)
                    value_list[index] = name
                    value_list = tuple(value_list)
                    new_dict[value_list] = value
                
                elif n2 in key:
                    value = relation_dict_items[key]
                    del_list.append(key)
                    value_list = list(key)
                    index = value_list.index(n2)
                    value_list[index] = name
                    value_list = tuple(value_list)
                    new_dict[value_list] = value


        
        for d in del_list:
            del relation_dict_items[d]
        relation_dict_items.update(new_dict)


                

    def get(self, request, pk):
        queryset = self.queryset.get(id=pk)

        items = [val.name for val in queryset.outcomes.all()]
        items_prerequisites = [val.name for val in queryset.prerequisites.all()]
        all = items+items_prerequisites
        plt.figure(figsize=(30, 10))
        plt.axis('off')
        G = nx.Graph()
        workprogram_title = queryset.title
        pos = {}
        k = 0
        z = 0
        for i in items:
            pos[i] = (0.01, k)
            G.add_node(i)
            k+=0.1
        G.add_node(workprogram_title)
        for i in items_prerequisites:
            pos[i] = (-0.01, z)
            G.add_node(i)
            z+=0.1
        num = k - 0.3
        pos[workprogram_title] = (0, num)
        nx.set_node_attributes(G, pos, 'coord')

        relation_dict_items = {}
        #relation_dict_items[('Администрирование реляционных БД', 'NoSQL системы хранения данных')] = '5'
        #relation_dict_items[('Методы построения', 'Администрирование реляционных БД')] = '4'
        #relation_dict_items[('Реляционные СУБД', 'Администрирование базы данных')] = '5'
        #relation_dict_items[('Линейная регрессия', '\ufeffОсновы программирования')] = '4'
        comb_all = list(x for x in combinations(all,2))
        for elem in comb_all:
            item1 = Items.objects.get(name=elem[0]).id
            item2 = Items.objects.get(name=elem[1]).id
            item_list = [item1, item2]
            relation_item = Relation.objects.filter(Q(item1__in=item_list)&Q(item2__in=item_list))
            if relation_item:
                relation_dict_items[elem] = relation_item.first().relation
        # интересующие связи для отображения
        # 2 - является частью одного раздела
        # 4 - имеет пререквизит
        # 5 - синонимы / тождественно
        #wanted_edges = [ '2', '4', '5']
        value5 = 0
        for key, value in relation_dict_items.items():
            if value == '5':
                value5 += 1

        for i in range(value5):
            for key, value in relation_dict_items.items():
                if value == '5':
                    self.merge_nodes(G, key[0], key[1], pos, relation_dict_items)
                    break
                
        for key, value in relation_dict_items.items():
            if value == '4':
                coor0 = pos[key[0]]
                coor1 = pos[key[1]]
                if abs(coor1[1] - coor0[1])> 0.1:
                    if (key[0] not in items_prerequisites) & (key[1] not in items_prerequisites):
                        new_val = coor1[0] + 0.005
                        coor_y = coor1[1]
                        coor1 = (new_val, coor_y)
                        pos[key[1]] = coor1
                    elif (key[0] not in items) & (key[1] not in items):
                        new_val = coor1[0] - 0.005
                        coor_y = coor1[1]
                        coor1 = (new_val, coor_y)
                        pos[key[1]] = coor1
                G.add_edge(key[0], key[1], color='b')

           

        for key, value in relation_dict_items.items():
            if value == '2':
                if(key[0] in items) & (key[1] in items):
                    coor0 = pos[key[0]]
                    coor1 = pos[key[1]]
                    new_x2 = coor1[0] + 0.005
                    new_y2 = coor0[1] - 0.05
                    new_coor = (new_x2, new_y2)
                    pos[key[1]] = new_coor
                    G.add_edge(key[0], key[1], color='green')

                elif (key[0] in items_prerequisites) & (key[1] in items_prerequisites):
                    coor0 = pos[key[0]]
                    coor1 = pos[key[1]]
                    new_x2 = coor1[0] - 0.005
                    new_y2 = coor0[1] - 0.05
                    new_coor = (new_x2, new_y2)
                    pos[key[1]] = new_coor
                    G.add_edge(key[0], key[1], color='green')
                
                else:
                    if (key[0] in items) & (key[1] in items_prerequisites):
                        coor0 = pos[key[0]] # in items
                        coor1 = pos[key[1]] # in prerequisites
                        if (key[0] in items) & (key[1] in items_prerequisites):
                            new_x1 = coor0[0] - 0.0025
                            new_x2 = coor1[0] + 0.0025
                        elif (key[0] in items_prerequisites) & (key[1] in items):
                            new_x1 = coor0[0] + 0.0025
                            new_x2 = coor1[0] - 0.0025
                        new_coor1 = (new_x1, coor0[1])
                        new_coor2 = (new_x2, coor0[1] - 0.1)
                        pos[key[0]] = new_coor1
                        pos[key[1]] = new_coor2
                        G.add_edge(key[0], key[1], color='green')

        colour_map = []
        
        for node in G:
            if node in items:
                colour_map.append('y')
            elif node == workprogram_title:
                colour_map.append('green')
            elif '|' in node:
                colour_map.append('darkorange')
            else:
                colour_map.append('lightgrey')
        plt.text(
            0.1,
            0.99,
            "Пререквизиты",
            horizontalalignment="center",
            transform=plt.gca().transAxes,
            weight="bold",
            size=13
        )
        plt.text(
            0.7,
            0.99,
            "Результаты",
            horizontalalignment="center",
            transform=plt.gca().transAxes,
            weight="bold",
            size=13
        )

        if len(items)> 8:
            value = 1000
        else:
            value = 1500
        edges = G.edges()
        colors = [G[u][v]['color'] for u, v in edges]
        nx.draw_networkx(G, pos=pos, with_labels=True, font_size=9, font_weight='bold', node_color=colour_map, node_shape='o', node_size=value, edge_color=colors)

        plt.axis('off')

        legend_elements = [Line2D([0], [0], markerfacecolor='y', marker='o', label='Результат', markersize=15, color='w'),
                    Line2D([0], [0], markerfacecolor='g', marker='o', label='РПД', markersize=15, color='w'),
                   Line2D([0], [0], marker='o', markerfacecolor='lightgrey', label='Пререквизит', markersize=15, color='w'),
                Line2D([0], [0], marker='o', markerfacecolor='darkorange', label='Связь - Тождество', markersize=15, color='w'),
                Line2D([0], [0], lw=3, label='Связь - Имеет преревизит',  color='g'),
                Line2D([0], [0], lw=3, label='Связь - Являются частью одного раздела',  color='b')]
        plt.legend(handles=legend_elements, loc='upper right', fontsize='x-large')
        plt.savefig(self.graph_directory_path(settings.GRAPH_ROOT, pk))
        final = {
            "coordinates": pos,
            "graph": f'{settings.BACKEND_URL}{settings.GRAPH_URL}/item/{ pk }.png'
        }

        return Response(data=final, status=status.HTTP_200_OK)

class WorkProgramProfessionView(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def clean_title(self, queryset, title_array):

        to_fix = { 
            "e":"е",
            "c":"с",
            "a":"а",
            "o":"о",
            "y":"у",
            "p":"р",
            "H":"Н",
            "K":"К",
            "B":"В", 
            "M":"М"
        }
        for val in queryset:
            if '\ufeff' in val.name:
                title_array[0] += ' ' + val.name.split('\ufeff')[1] 
            else: 
                title_array[0] += ' ' + val.name

                for i in val.name:
                    if i in to_fix.keys():
                        val.name = val.name.replace(i, to_fix[i])

        return title_array

    def get_len_list(self, size):
        if size == 1:
            return 1
        else:
            result = size + self.get_len_list(size-1)
            return result

    def graph_directory_path(self, GRAPH_URL, id):
        return '{}/profession/{}.png'.format(GRAPH_URL, id)

    def get(self, request, pk):
        num_professions = self.request.data.get('num_professions')
        queryset = self.queryset.get(id=pk)
        outcomes = [val.id for val in queryset.outcomes.all()]
        title_workprogram = ['']
        title_workprogram = self.clean_title(queryset.outcomes.all(), title_workprogram)
        title_workprogram = self.clean_title(queryset.prerequisites.all(), title_workprogram)
        title_for_graph = [queryset.title]
        for val in queryset.prerequisites.all():
            outcomes.append(val.id)
        if len(title_workprogram[0]) > 1:
            tfidf_vectorizer = TfidfVectorizer()
            title_matrix_workprogram = tfidf_vectorizer.fit_transform(title_workprogram).toarray()
        # профессии с теми же учебными сущностями 
        professions_with_items = Profession.objects.filter(skills__in=outcomes)
        # косинусное сходство
        all_info = {}
        similarity_wp_prof = {}
        similarity_prof = {}
        
        if len(professions_with_items):
            for i in range(len(professions_with_items.values())):
                title_profession = ['']
                id = professions_with_items.values()[i]['id']
                items_of_profession = Profession.objects.get(id=id).skills.all()
                # список учебных сущностей профессии
                title_profession = self.clean_title(items_of_profession, title_profession)
                title_matrix_profession = tfidf_vectorizer.transform(title_profession).toarray()
                # считаем косинусное сходство
                # записываем значение в словарь
                similarity_wp_prof[id] = round(cosine_similarity(title_matrix_workprogram, title_matrix_profession)[0][0], 4)
                similarity_prof[id] = title_profession

            similarity_wp_prof =  sorted(similarity_wp_prof.items(), key=lambda kv: kv[1], reverse=True)[:num_professions]
            value = len(similarity_wp_prof) + 1

            professions = []
            prof_id = []
            el1 = []
            for el in similarity_wp_prof:
                cur_prof = Profession.objects.get(id=el[0])
                professions.append(
                    {"id":cur_prof.id,
                    "profession": cur_prof.title,
                    "cosine_similarity":el[1]}
                )
                prof_id.append(cur_prof.id)
                el1.append(1-el[1])
                title_for_graph.append(cur_prof.title)

            for key in similarity_prof.keys():
                if key not in prof_id:
                    similarity_prof = {k: similarity_prof[k] for k in similarity_prof.keys() - {key}}

            comb = list(x for x in combinations(similarity_prof.keys(),2))
            prof_cosine = {}            
            for el in comb:
                prof1 = Profession.objects.get(id=el[0]).title
                prof2 = Profession.objects.get(id=el[1]).title
                title1 = tfidf_vectorizer.fit_transform(similarity_prof[el[0]]).toarray()
                title2 = tfidf_vectorizer.transform(similarity_prof[el[1]]).toarray()
                prof_cosine[prof1+' - '+prof2] = round(cosine_similarity(title1, title2)[0][0], 4)

        prof_cosine =  sorted(prof_cosine.items(), key=lambda kv: kv[1], reverse=True)
        distance =[]
        el2 = []
        for el in prof_cosine:
            distance.append({
                "professions":el[0],
                "cosine_distance":el[1]
            })
            el2.append(1-el[1])

        len_list = self.get_len_list(value-1)
        el = el1+el2
        graph_matrix = np.zeros((value,value))
        for i in range(value):
            for j in range(value):
                if i == j:
                     graph_matrix[i][j] = 0
                elif j == 0:
                    graph_matrix[i][j] = el[i-1]
                
        k = 0
        count = 0
        for elem in range(len_list+1):
            if elem == 0:
                el2.insert(elem,0)
                k+=2
            elif elem == count + k:
                el2.insert(elem,0)
                k+=1
                count = i
        indices = np.tril_indices(value-1)
        graph_matrix1 = np.zeros((value-1, value-1))
        graph_matrix1[indices] = el2
        c = np.zeros((value-1,1)) # новый столбец
        graph_matrix1 = np.column_stack([c, graph_matrix1])
        r = np.zeros((1, value)) # новая строка
        graph_matrix1 = np.row_stack([r, graph_matrix1])
        graph_matrix += graph_matrix1
        graph_matrix = np.maximum( graph_matrix, graph_matrix.transpose())

        # all_info["WorkProgram"] = queryset.title
        # all_info["Close_professions"] = professions  
        #all_info["Professions_distance"] =  distance   

        # отображение графа
        dt = [('len', float)]
        plt.figure(figsize=(40, 10))
        graph_matrix = graph_matrix.view(dt)
        G = nx.from_numpy_matrix(graph_matrix)
        G = nx.relabel_nodes(G, dict(zip(range(len(G.nodes())), title_for_graph)))  
        colors = []
        for node in G:
            if node ==  queryset.title:
                colors.append('darkorange')
            else:
                colors.append('green')
        nx.draw(G, with_labels = True, node_size=2000, node_color=colors, edge_color='white', font_size=15)
        handles = [Line2D([0], [0], markerfacecolor='darkorange', marker='o', label='РПД', markersize=20, color='w'),
                Line2D([0], [0], markerfacecolor='green', marker='o', label='Профессия', markersize=20, color='w')]
        plt.legend(handles=handles, loc='upper right', fontsize='x-large')
        plt.savefig(self.graph_directory_path(settings.GRAPH_ROOT, pk))
        all_info['graph_title'] = title_for_graph
        all_info['matrix'] = graph_matrix
        all_info['graph'] = f'{settings.BACKEND_URL}{settings.GRAPH_URL}/profession/{ pk }.png'
        return Response(data=all_info, status=status.HTTP_200_OK)
