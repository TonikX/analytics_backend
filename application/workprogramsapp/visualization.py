from sklearn.metrics.pairwise import cosine_similarity
from dataprocessing.models import Items, Relation
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.metrics.distance import jaro_similarity, jaro_winkler_similarity
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

class WorkProgramSameProgramView(generics.ListAPIView):
    """
    Список одинаковых рабочих программ
    """
    queryset = WorkProgram.objects.all()
    serializer_class = WorkProgramSerializerByName
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, pk):
        queryset = self.queryset.get(id=pk).outcomes.all()
        outcomes = [val.id for val in queryset]
        pre = self.queryset.get(id=pk).prerequisites.all()
        prer = [val.id for val in pre]
        queryset_without_pk = self.queryset.exclude(pk=pk)
        same_programs = queryset_without_pk.filter(outcomes__in=outcomes) #замена на формулу 

        to_fix = { # ? 
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
        #twin = {}
        programs = []
        results = {}
        #twin[self.queryset.get(id=pk).title] = [pk]
        for i in same_programs:
            program_prereq = [val.id for val in i.prerequisites.all()]
            program_outcomes = [val.id for val in i.outcomes.all()]
            coef1 = len(list(set(prer) & set(program_prereq)))
            coef2 = len(list(set(outcomes) & set(program_outcomes)))
            result = round((coef1 + coef2)/ (len(prer)+ len(outcomes)), 2)
            results[i.id] = result

        sorted_by_value = sorted(results.items(), key=lambda kv: kv[1], reverse=True)[:7]

        for el in sorted_by_value:
            cur_program = self.queryset.get(id=el[0])
            programs.append(
                {"id":el[0],
                 "title": cur_program.title, 
                "score": el[1],
                "prerequisites": [(val.id, val.name) for val in cur_program.prerequisites.all()],
                "outcomes": [(val.id, val.name) for val in cur_program.outcomes.all()]}
            )


        return Response(data=programs, status=status.HTTP_200_OK)

class WorkProgramItemsRelationView(generics.ListAPIView):
    queryset = WorkProgram.objects.all()
    permission_classes = [IsRpdDeveloperOrReadOnly]

    def get(self, request, pk):
        queryset = self.queryset.get(id=pk)
        items = [val.id for val in queryset.outcomes.all()]
        for val in queryset.prerequisites.all():
            items.append(val.id)

        # при сортировке
        filters = self.request.GET.get("filters")
        if filters: 
            filters_object = json.loads(filters)

            if filters_object.get("relation"):
                relations_item1 = Relation.objects.filter(Q(item1__in=items)
                    & Q(relation=filters_object.get("relation")))

                relations_item2 = Relation.objects.filter(Q(item2__in=items)
                    & Q(relation=filters_object.get("relation")))

                reltions = {
                    "item1": relations_item1.values(),
                    "item2": relations_item2.values()
                }

                return Response(data=reltions, status=status.HTTP_200_OK )

        return Response(data=items, status=status.HTTP_200_OK)

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
        return '{}/{}.png'.format(GRAPH_URL, id)

    def get(self, request, pk):
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
                #similarity_wp_prof['jaro_similarity'] = jaro_similarity(title_workprogram, title_profession)
                #similarity_wp_prof['jaro_winkler_similarity'] = jaro_winkler_similarity(title_workprogram, title_profession)
            similarity_wp_prof =  sorted(similarity_wp_prof.items(), key=lambda kv: kv[1], reverse=True)[:10]
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
        graph_matrix = np.maximum( graph_matrix, graph_matrix.transpose())*25



        all_info["WorkProgram"] = queryset.title
        all_info["Close_professions"] = professions  
        all_info["Professions_distance"] =  distance   

        # отображение графа
        dt = [('len', float)]
        graph_matrix = graph_matrix.view(dt)
        G = nx.from_numpy_matrix(graph_matrix)
        G = nx.relabel_nodes(G, dict(zip(range(len(G.nodes())), title_for_graph)))    

        G = nx.drawing.nx_agraph.to_agraph(G)

        G.node_attr.update(color="green", style="filled")
        G.edge_attr.update(color="blue", width="2.0")
        print("Print: ",self.graph_directory_path(settings.GRAPH_ROOT, pk))
        G.draw(self.graph_directory_path(settings.GRAPH_ROOT, pk), format='png', prog='neato')
        all_info['graph'] = f'{settings.BACKEND_URL}{settings.GRAPH_URL}/{ pk }.png'
        return Response(data=all_info, status=status.HTTP_200_OK)
