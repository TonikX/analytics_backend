import math
import random

from nltk import word_tokenize, pos_tag, re
from nltk.corpus import stopwords
import pymorphy2
import pandas as pd
import numpy as np

import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# nltk.download()

raw_data = pd.read_table("../../data/descriptions.tsv")
raw_data.columns = ["id", "description"]
raw_data.dropna()

russian_stopwords = stopwords.words("russian")
rpd_stopwords = [
    "студент",
    "дисциплина",
    "курс",
    "программа",
    "цель",
    "метод",
    "область",
    "знание",
    "принцип",
    "результат",
]

morph = pymorphy2.MorphAnalyzer()

raw_data2 = pd.read_table("../../data/entities_with_domain.tsv")
raw_data2.columns = ["id", "entity_name", "domain_id"]
raw_data2 = raw_data2.reset_index()

punctuation = r"""!"#$%&'()«»*+,-./:;<=>?@[\]^_`{|}~"""


def normalize(word):
    return morph.parse(word)[0].normal_form


def extract_text(item):
    name = item["name"]
    return name.lower()


domain_entities = {}
domain_entities_strings = {}


def prepare_dicts():
    for ind in raw_data2.index:
        entity_name = raw_data2["entity_name"][ind]
        entity_id = raw_data2["id"][ind]
        domain_id = +raw_data2["domain_id"][ind]

        if domain_entities.get(domain_id) is not None:
            domain_entities[domain_id].append({"name": entity_name, "id": entity_id})
        else:
            domain_entities[domain_id] = [{"name": entity_name, "id": entity_id}]

    for domain_id in domain_entities:
        domain_arr = map(extract_text, domain_entities[domain_id])
        domain_text = " ".join(domain_arr)
        domain_entities_strings[domain_id] = domain_text


prepare_dicts()


def get_top_domains(map):
    result = sorted(map.items(), key=lambda item: item[1], reverse=True)
    return np.array(result)


# У меня в данный момент нет ранжирования, поэтому берем k любых из предметной области
# Конечно, потом нужно сделать нормально
def get_k_random_from_array(arr, k):
    return random.sample(list(arr), k)


# Рекомендуем 10 учебных сущностей по угаданному домену
def give_recommendations_by_domain(array):
    num_of_recommendations = 10
    # Нет попаданий — ничего не можем сделать
    if len(array) == 0:
        return []

    # Всего одна предметная область
    if len(array) == 1:
        return domain_entities[array[0][0]][0:num_of_recommendations]

    # Берем две ведущие предметные области и рекомендуем по ним соответственно
    # Здесь 0 индекс — айдишник предметной области, 1 — количество попаданий
    ratio = math.floor(
        array[0][1] * num_of_recommendations / (array[0][1] + array[1][1])
    )

    first_subject_area = domain_entities[array[0][0]]
    second_subject_area = domain_entities[array[1][0]]

    return np.append(
        get_k_random_from_array(first_subject_area, ratio),
        get_k_random_from_array(second_subject_area, num_of_recommendations - ratio),
    )


def search_for_domain(words):
    domain_map = {}
    for word in words:
        pattern = rf"{word}"
        for domain in domain_entities_strings:
            current = domain_entities_strings[domain]
            target = f"{current}"
            score = len(re.findall(pattern, target))
            if score > 0:
                if domain_map.get(domain) is not None:
                    domain_map[domain] = domain_map.get(domain) + score
                else:
                    domain_map[domain] = score

    # Сортируем мапу и определяем наиболее вероятный домен
    top_domains = get_top_domains(domain_map)
    # print(top_domains, ' '.join(words))
    return give_recommendations_by_domain(top_domains)


def recommend(text):
    print(text)
    tokens = word_tokenize(str(text.lower()))
    normalized = map(normalize, tokens)
    without_sw = []
    for token in normalized:
        # Стоп-слова РПД можно еще дополнить
        if (
            token not in russian_stopwords
            and token not in rpd_stopwords
            and token not in punctuation
        ):
            without_sw.append(token)

    nouns = []
    for token, pos in pos_tag(without_sw):
        if pos.startswith("N"):
            nouns.append(token)

    print("-------")
    # print(nouns)
    print(search_for_domain(nouns))


# Пример рекомендации по описанию РПД
N = random.randint(0, len(raw_data.description))
recommend(raw_data.description[N])


# Реомендации сразу пачкой, чтоб посмотреть как работает алгоритм
def recommend_bulk():
    for text in raw_data.description:
        recommend(text)


# recommend_bulk()
