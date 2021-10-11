from .models import OnlineCourse
from workprogramsapp.models import WorkProgram, Topic, DisciplineSection
import pandas as pd
import numpy as np
import re
import nltk; nltk.download('stopwords')
from nltk.corpus import stopwords
from pymorphy2 import MorphAnalyzer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Вспомогательные функции
stop_words = stopwords.words('russian')
stop_words.extend(stopwords.words('english'))
stop_words.extend(['', 'p', 'br', 'strong', 'li', 'ol', 'em', 'ul', 'span', 'tr', 'td', 'align', 'justify',
                       'b', 'h2', 'hr', 'f', 'href'])
morph = MorphAnalyzer(lang='ru')


# объединение контента курса с его описанием
def unite_course(courses, titles, content, description):
    course_text = []
    for i in courses.index:
        if type(description[i]) != float and type(content[i]) != float and type(titles[i]) != float:
            course_text.append(str(titles[i]) + ' ' + str(description[i]) + ' ' + str(content[i]))
            continue
        if type(content[i]) == float:
            course_text.append(titles[i] + ' ' + description[i])
            continue
        if type(description[i]) == float:
            course_text.append(titles[i] + ' ' + content[i])
            continue

    return course_text


def preprocessing(sentences):
    """Общая обработка текста: разделение на слова, приведение к начальной форме, удаление стоп-слов"""
    for sentence in sentences:
        sentence = re.split("\W+", sentence.lower())
        sentence = [morph.normal_forms(word)[0] for word in sentence if word not in stop_words]
        yield ' '.join(sentence)


def prepare_courses():
    """Функция для подготовки курсов к рекомендациям"""
    courses = OnlineCourse.objects.all()
    courses_df = pd.DataFrame(courses.values())
    # Удаление дубликатов
    courses_df.drop_duplicates('title', inplace=True)
    # Удаление тестовых названий
    drop = courses_df[courses_df.title.isin(['Title 1234', 'тест', 'test'])].index.to_list()
    drop.extend(courses_df[courses_df.description == 'тест'].index.to_list())
    titles = courses_df.title.str.lower()
    new_titles = titles.map(
        lambda x: '-1' if x.find('тест ') != -1 or x.find('тестов') != -1 or x.find('ааа') != -1 or x.find(
            'title') != -1 or x.find('1111') != -1 else x)
    drop.extend(new_titles[new_titles == '-1'].index.to_list())
    drop.extend(titles[titles.duplicated()].index.to_list())
    # Удаление курсов с большим кол-вом пропусков
    nulls = courses_df.isnull().sum(axis=1)
    drop.extend(nulls[nulls > 11].index.to_list())

    courses_df.drop(drop, inplace=True)
    processed_courses = courses_df.reset_index()
    processed_courses.drop(['index'], axis=1, inplace=True)

    # обработка текста
    titles, description, content = processed_courses.title, processed_courses.description, processed_courses.content
    urls = processed_courses.external_url

    # объединение названий, описания и контента курсов в общий текст
    course_text = unite_course(processed_courses, titles, content, description)
    # обработка текста курсов
    data = list(preprocessing(course_text))
    return data, titles, urls


def get_topics(id_workprogram):
    """По id рабочей программы получаются все разделы.
    Для каждого раздела получаются все темы.
    Возвращается список тем"""
    all_topics = []
    sections = DisciplineSection.objects.filter(work_program=id_workprogram).values('id', 'name')

    for section in sections:
        section_topics = Topic.objects.filter(discipline_section=section['id']).values('id', 'description')
        all_topics.extend(section_topics)
    return all_topics


def create_matrix(courses):
    """Векторизация текста.
    Создание матрицы косинусных расстояний.
    Вычисление максимально близкого текста для последнего документа в матрице."""
    tfidf = TfidfVectorizer().fit_transform(courses)
    similarity_matrix = cosine_similarity(tfidf, tfidf)
    np.fill_diagonal(similarity_matrix, np.nan)
    recommendation = np.nanargmax(similarity_matrix[-1])
    return recommendation, similarity_matrix[-1][recommendation]


def get_recommendation(course_data, titles, urls, topics=''):
    """Функция для формирования рекомендаций на входе названия и id тем"""
    recommended = []
    # Достаются только названия тем (без id)
    topic_names = [x['description'] for x in topics]
    topics_processed = list(preprocessing(topic_names))
    # установка порога
    recommended_min = 0.40
    max_rec = ['course_id', 'topic', recommended_min]

    for i in range(len(topics_processed)):
        # для каждой темы ведется поиск курса
        topic = topics_processed[i]
        # добавление темы в датасет с курсами последней записью
        course_data.append(topic)
        rec, similarity_count = create_matrix(course_data)
        # Проверка на преодоление порога для самого близкого курса
        if similarity_count > max_rec[2]:
            max_rec[0] = int(rec)  # id курса
            max_rec[1] = topics[i]  # Тема с id и названием
            max_rec[2] = similarity_count  # значение кос близости
            recommended.append([max_rec[1], similarity_count, titles[max_rec[0]], urls[max_rec[0]]])
        # удаление темы из датасета с курсами
        course_data.remove(topic)

    return recommended

