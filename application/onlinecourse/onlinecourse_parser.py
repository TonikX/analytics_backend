from bs4 import BeautifulSoup as bs
import requests
import re
import pandas as pd
import time
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from datetime import datetime


online_edu_url = 'https://online.edu.ru'


def get_course_links(url):
    """
    По ссылке на платформу online.edu.ru собирает ссылки на страницу каждого курса в список
    """
    course_links = []
    for i in range(0, 10**9):
        time.sleep(0.5)
        main_url = url + '/public/courses.xhtml?page=' + str(i) + '&name=asc'
        print(main_url)
        session = requests.Session()
        retry = Retry(connect=3, backoff_factor=0.5)
        adapter = HTTPAdapter(max_retries=retry)
        session.mount('http://', adapter)
        session.mount('https://', adapter)
        html_text = session.get(main_url)
        soup = bs(html_text.text, "html.parser")
        print(i)
        if soup.body.find_all(class_="ui-outputpanel ui-widget course-name"):
            course_widgets = soup.body.find_all(class_="ui-outputpanel ui-widget course-name")
            for k in course_widgets:
                course_links.append(k.find('a').get('href'))
        else:
            break
    return course_links


def get_course_info(course_url):
    """
    По ссылке на конкретный курс собирается вся информация о курсе в датафрейм
    """
    time.sleep(5)
    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    html_text = session.get(course_url)
    soup = bs(html_text.text, "html.parser")
    archived = soup.find(class_="archived-label")
    title = ''
    id_from_roo = ''
    description = ''
    institution = ''
    platform = ''
    language = ''
    started_at = None
    record_end_at = None
    finished_at = None
    rating = 0
    visitors_number = 0
    duration = 0
    content = ''
    lectures_number = 0
    external_url = ''
    roc_url = course_url
    has_certificate = ''
    credits = 0
    requirements = ''
    competences = ''
    learning_outcome = ''
    actual = True
    try:
        if archived is None:
            course_info = soup.find(class_="course-info")
            title = re.search(r'.*', str(course_info.find(class_="course-name").text)).group(0)
            course_info_table = course_info.find_all(class_="ui-panelgrid-cell")
            course_info_table_list = []
            for i in course_info_table:
                course_info_table_list.append(i.text)
            started_at = course_info_table_list[3]
            platform = re.sub(r'   *', '', re.sub(r'\n', '', course_info_table_list[5]))
            button_link = course_info.find(
                class_="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only rc-action-button")
            external_url = re.search(r"'.*'", button_link.get('onclick')).group(0)
            course_main = soup.find(class_="course-view-main content")
            institution = course_main.find(id="j_idt260:j_idt290").find('span').text
            if course_main.find(id="j_idt260:j_idt264"):
                rating = float(re.sub(',', '.', re.search(r'\d.*', course_main.find(id="j_idt260:j_idt264").text).group(0)))
            description = re.sub(r'\nО курсе', '', course_main.find(class_="ui-outputpanel ui-widget").text)
            if course_main.find(id="j_idt123:0:j_idt124"):
                requirements = course_main.find(id="j_idt123:0:j_idt124").text
            if course_main.find(id="j_idt130"):
                content = course_main.find(id="j_idt130").text
            if course_main.find(id="course-view-competences"):
                competences = course_main.find(id="course-view-competences")
                list_comp = competences.find_all('li')
                text_list_comp = []
                for i in list_comp:
                    text_list_comp.append(i.text)
                competences = '\n '.join(text_list_comp)
            if course_main.find(id="course-view-results"):
                results = course_main.find(id="course-view-results")
                list_results = results.find_all('li')
                text_list_results = []
                for i in list_results:
                    text_list_results.append(i.text)
                learning_outcome = '\n '.join(text_list_results)
            course_add_info_table = course_main.find_all(class_="ui-panelgrid-cell")
            for i in range(0, len(course_add_info_table)):
                if course_add_info_table[i].text == 'Количество лекций':
                    if str(course_add_info_table[i + 1].text) != '':
                        lectures_number = int(course_add_info_table[i + 1].text)
                elif course_add_info_table[i].text == 'ID курса':
                    id_from_roo = course_add_info_table[i + 1].text
                elif course_add_info_table[i].text == 'Дата ближайшего старта':
                    started_at = course_add_info_table[i + 1].text
                elif course_add_info_table[i].text == 'Дата окончания':
                    finished_at = datetime.strptime(course_add_info_table[i + 1].text, '%d.%m.%Y').date()
                elif course_add_info_table[i].text == 'К-во обучающихся на версии курса':
                    if str(course_add_info_table[i + 1].text) != '':
                        visitors_number = int(course_add_info_table[i + 1].text)
                elif course_add_info_table[i].text == 'Язык':
                    language = course_add_info_table[i + 1].text
                elif course_add_info_table[i].text == 'Длительность':
                    if re.search('\d*', course_add_info_table[i + 1].text)[0] != '':
                        duration = int(re.search('\d*', course_add_info_table[i + 1].text)[0])
                elif course_add_info_table[i].text == 'Сертификат':
                    has_certificate = course_add_info_table[i + 1].text
                elif course_add_info_table[i].text == 'Дата окончания записи':
                    record_end_at = datetime.strptime(course_add_info_table[i + 1].text, '%d.%m.%Y')
                elif course_add_info_table[i].text == 'Трудоёмкость в з.е.':
                    credits = float(course_add_info_table[i + 1].text)
                df = pd.DataFrame([[id_from_roo,
                                    title,
                                    description,
                                    institution,
                                    platform,
                                    language,
                                    started_at,
                                    record_end_at,
                                    finished_at,
                                    rating,
                                    visitors_number,
                                    duration,
                                    content,
                                    lectures_number,
                                    external_url,
                                    roc_url,
                                    has_certificate,
                                    credits,
                                    requirements,
                                    learning_outcome,
                                    competences,
                                    actual]], columns=['id_from_roo', 'title', 'description', 'institution',
                                                       'platform', 'language', 'started_at', 'record_end_at',
                                                       'finished_at', 'rating', 'visitors_number', 'duration',
                                                       'content', 'lectures_number', 'external_url', 'roc_url',
                                                       'has_certificate', 'credits', 'requirements', 'learning_outcome',
                                                       'competences', 'actual'])
            return df
        else:
            pass
    except Exception as e:
        print("Во время парсинга курса", title, 'произошла ошибка')
        print(e)


def get_all_data(url):
    """
    Функция сбора данных об онлайн курсах в датафрейм
    """
    print('Собираем ссылки на курсы')
    course_links = get_course_links(url)
    print('Количество онлайн курсов', len(course_links))
    print("Собираем сами курсы")
    df = pd.DataFrame(
        columns=['id_from_roo', 'title', 'description', 'institution', 'platform', 'language',
                 'started_at', 'record_end_at', 'finished_at', 'rating',
                 'visitors_number', 'duration',
                 'content', 'lectures_number', 'external_url', 'roc_url',
                 'has_certificate', 'credits', 'requirements', 'learning_outcome',
                 'competences', 'actual'])
    for i in course_links:
        print(url + i)
        df = pd.concat([df, get_course_info(url + i)], ignore_index=True)
        print(df.shape)
        #df.to_csv('df_1954.csv')
    return df
