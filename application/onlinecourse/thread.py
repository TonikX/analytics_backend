import threading, time
from .models import OnlineCourse
from .onlinecourse_parser import get_all_data, online_edu_url
from rest_framework.response import Response
import requests
from bs4 import BeautifulSoup as bs


def upload_data_to_db():
    """
    Adding data to OnlineCourse
    """
    #data_OnlineCourse = pd.read_csv('/Users/valeriaartamonova/Desktop/Work/analytics_backend/application/df3003_0900.csv')
    data_OnlineCourse = get_all_data(online_edu_url)
    for i in range(len(data_OnlineCourse)):
        if OnlineCourse.objects.filter(id_from_roo=data_OnlineCourse.id_from_roo[i]).exists():
            continue
        else:
            onlinecourse = OnlineCourse(id_from_roo=data_OnlineCourse.id_from_roo[i],
                                        title=data_OnlineCourse.title[i],
                                        description=data_OnlineCourse.description[i],
                                        institution=data_OnlineCourse.institution[i],
                                        platform=data_OnlineCourse.platform[i],
                                        language=data_OnlineCourse.language[i],
                                        external_url=data_OnlineCourse.external_url[i],
                                        roc_url=data_OnlineCourse.roc_url[i],
                                        has_certificate=data_OnlineCourse.has_certificate[i],
                                        rating=data_OnlineCourse.rating[i],
                                        started_at=data_OnlineCourse.started_at[i],
                                        )
            onlinecourse.save()
            if len(str(data_OnlineCourse.record_end_at[i])) > 3:
                onlinecourse.record_end_at = data_OnlineCourse.record_end_at[i]
            if len(str(data_OnlineCourse.finished_at[i])) > 3:
                onlinecourse.finished_at = data_OnlineCourse.finished_at[i]
            try:
                onlinecourse.duration = int(data_OnlineCourse.duration[i])
            except:
                continue
            if len(str(data_OnlineCourse.requirements[i])) > 3:
                onlinecourse.requirements = data_OnlineCourse.requirements[i]
            if len(str(data_OnlineCourse.competences[i])) > 3:
                onlinecourse.competences = data_OnlineCourse.competences[i]
            if len(str(data_OnlineCourse.learning_outcome[i])) > 3:
                onlinecourse.learning_outcome = data_OnlineCourse.learning_outcome[i]
            if len(str(data_OnlineCourse.content[i])) > 3:
                onlinecourse.content = data_OnlineCourse.content[i]

            if data_OnlineCourse.lectures_number[i] > 0:
                onlinecourse.lectures_number = data_OnlineCourse.lectures_number[i]
            if data_OnlineCourse.visitors_number[i] > 0:
                onlinecourse.visitors_number = data_OnlineCourse.visitors_number[i]
            if data_OnlineCourse.credits[i] > 0:
                onlinecourse.credits = data_OnlineCourse.credits[i]

            onlinecourse.save()
            print("добавлен онлайн курс -", i)
    return Response(status=200)


class OnlineCourseThread(threading.Thread):
    """
    Класс потока для онлайн курсов
    """
    def __init__(self, event):
        threading.Thread.__init__(self)
        self.stopped = event

    def run(self):
        """
        Метод потока для парсинга онлайн курсов и их загрузки в БД
        """
        while not self.stopped.wait(10):
            print('Старт потока')
            upload_data_to_db()
            print('Завершение работы потока')
            time.sleep(60 * 60 * 24 * 7)


class OnlineCourseActualThread(threading.Thread):
    """
    Класс потока для проверки актуальности онлайн курсов
    """
    def __init__(self, event):
        threading.Thread.__init__(self)
        self.stopped = event

    def run(self):
        """
        Метод потока для проверки актуальности курсов
        """
        while not self.stopped.wait(10):
            print('Запущен поток для проверки актуальности курсов')
            online_courses = OnlineCourse.objects.all()
            for i in online_courses:
                #print(i)
                html_text = requests.get(i.roc_url, timeout=15)
                soup = bs(html_text.text, "html.parser")
                archived = soup.find(class_="archived-label")
                if archived is None:
                    continue
                else:
                    print('Найден устаревший курс', i.roc_url, i.title)
                    i.actual = False
                    i.save()
                time.sleep(5)
            print('Поток для проверки актуальности курсов завершен')
            time.sleep(60*60*24*7)


stopFlag = threading.Event()
course_thread = OnlineCourseThread(stopFlag)

stopFlag2 = threading.Event()
course_actual_thread = OnlineCourseActualThread(stopFlag)
