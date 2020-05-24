from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path, re_path
from .views import WorkProgramsList, WorkProgramsPost, WorkProgramsPostUpdate, WorkProgramsListApi, WorkProgramView
from .views import EvaluationToolList, EvaluationToolPost, EvaluationToolPostUpdate
from .views import DisciplineSectionList, DiscplineSectionPost, DisciplineSectionPostUpdate
from .views import TopicList, TopicPost, TopicPostUpdate
from .views import PrerequisitesUpdate, OutcomesUpdate, upload_file, FieldOfStudyWPListView, IndicatorListView, \
    IndicatorUpdateView, CompetenceListView, CompetenceUpdateView, CompetenceIndicatorDetailView, DeleteIndicatorFromCompetenceView, \
    AddIndicatorToCompetenceView, OutcomesOfWorkProgramList
from .views import WorkProgramCreateAPIView, WorkProgramDetailsView, WorkProgramDestroyView, WorkProgramUpdateView
from .views import EvaluationToolListAPI, EvaluationToolDetailAPI, DisciplineSectionListAPI, DisciplineSectionDetailAPI, TopicsListAPI, TopicDetailAPI, NewOrdinalNumbersForDesciplineSectionAPI
from .views import OutcomesOfWorkProgramDestroyView, OutcomesOfWorkProgramCreateAPIView, OutcomesOfWorkProgramUpdateView
from .views import PrerequisitesOfWorkProgramDestroyView, PrerequisitesOfWorkProgramCreateAPIView, PrerequisitesOfWorkProgramUpdateView, PrerequisitesOfWorkProgramList
from .views import OnlineCourseListCreateAPIView, OnlineCourseDetailsView, OnlineCourseDestroyView, OnlineCourseUpdateView




urlpatterns = [

    #ToDo: сделать нормально.
    #re_path(r'^workprograms/(?P<pk>)/update/', WorkProgramsPostUpdate.as_view(), name='workprograms_update'),
    url(r'^workprograms/(?P<pk>\d+)/update/$', WorkProgramsPostUpdate.as_view(), name='workprograms_update'),
    #url for prerequisites
    url(r'^prerequisites/(?P<pk>\d+)/update/$', PrerequisitesUpdate.as_view(), name='prereq_update'),
    #url for outcomes
    url(r'^outcomes/(?P<pk>\d+)/update/$', OutcomesUpdate.as_view(), name='outcome_update'),
    #url for evaluation tools
    path('evaluationlist/', EvaluationToolList.as_view(), name='evaluation'),
    path('evaluation/new', EvaluationToolPost.as_view(), name='eval_post'),
    url(r'^evaluation/(?P<pk>\d+)/update/$', EvaluationToolPostUpdate.as_view(), name='eval_update'),
    #url for sections 
    path('sectionlist/', DisciplineSectionList.as_view(), name='section'),
    path('section/new', DiscplineSectionPost.as_view(), name='sec_post'),
    url(r'^section/(?P<pk>\d+)/update/$', DisciplineSectionPostUpdate.as_view(), name='sec_update'),
    #url for topics
    path('topiclist/', TopicList.as_view(), name='topic'),
    path('topic/new', TopicPost.as_view(), name='topic_post'),
    url(r'^topic/(?P<pk>\d+)/update/$', TopicPostUpdate.as_view(), name='topic_update'),
    path('workprogramslist/', WorkProgramsList.as_view(), name='workprograms'),
    url(r'^workprogram/(?P<pk>\d+)/$', WorkProgramView.as_view(), name='workprogram'),
    path('workprograms/newbinding', WorkProgramsPost.as_view(), name='author_update'),
    url(r'^uploadcsv/$', upload_file, name = 'uploadcsv'),
    url(r'^fswplist/$', FieldOfStudyWPListView.as_view(), name = 'fswp'),


    #Блок реализации API
    path('api/wplist/', WorkProgramsListApi.as_view()),

    #Компетенции индикаторы
    path('api/indicator/', IndicatorListView.as_view(), name='indicator'),
    path('api/indicator/<int:pk>', IndicatorUpdateView.as_view(), name='indicator_update'),
    path('api/competence/', CompetenceListView.as_view(), name='comptence'),
    path('api/competence/<int:pk>', CompetenceUpdateView.as_view(), name='comptence_update'),
    path('api/competenceindicator/<int:pk>', CompetenceIndicatorDetailView.as_view(), name='comptenceindicator'),
    path('api/competenceindicator/indicator/delete', DeleteIndicatorFromCompetenceView.as_view(), name='DeleteIndicatorFromCompetenceView'),
    path('api/competenceindicator/indicator/add', AddIndicatorToCompetenceView.as_view(), name="AddIndicatorFromCompetenceView"),

    path('api/outcomesofworkprogram/<int:workprogram_id>', OutcomesOfWorkProgramList.as_view()),

    #Рабочая программа
    path('api/workprogram/create', WorkProgramCreateAPIView.as_view()),
    path('api/workprogram/detail/<int:pk>', WorkProgramDetailsView.as_view()),
    path('api/workprogram/delete/<int:pk>', WorkProgramDestroyView.as_view()),
    path('api/workprogram/update/<int:pk>', WorkProgramUpdateView.as_view()),

    #Работы с темами и разделами
    path('api/tools/', EvaluationToolListAPI.as_view(), name='tools'),
    path('api/tools/<int:pk>', EvaluationToolDetailAPI.as_view(), name='tool_detail'),

    path('api/sections/', DisciplineSectionListAPI.as_view(), name='sections'),
    path('api/sections/<int:pk>', DisciplineSectionDetailAPI.as_view(), name='section_detail'),
    #path('api/sections/NewOrdinalNumbers', NewOrdinalNumbersForDesciplineSectionAPI.as_view()),
    path('api/sections/NewOrdinalNumbers', NewOrdinalNumbersForDesciplineSectionAPI),

    path('api/topics/', TopicsListAPI.as_view(), name='topics'),
    path('api/topics/<int:pk>', TopicDetailAPI.as_view(), name='topic_detail'),

    #Работа с результатами
    path('api/outcomesofworkprogram/<int:workprogram_id>', OutcomesOfWorkProgramList.as_view()),
    path('api/outcomesofworkprogram/create', OutcomesOfWorkProgramCreateAPIView.as_view()),
    path('api/outcomesofworkprogram/delete/<int:pk>', OutcomesOfWorkProgramDestroyView.as_view()),
    path('api/outcomesofworkprogram/update/<int:pk>', OutcomesOfWorkProgramUpdateView.as_view()),

    #Работа с пререквизитами
    path('api/prerequisitesofworkprogram/<int:workprogram_id>', PrerequisitesOfWorkProgramList.as_view()),
    path('api/prerequisitesofworkprogram/create', PrerequisitesOfWorkProgramCreateAPIView.as_view()),
    path('api/prerequisitesofworkprogram/delete/<int:pk>', PrerequisitesOfWorkProgramDestroyView.as_view()),
    path('api/prerequisitesofworkprogram/update/<int:pk>', PrerequisitesOfWorkProgramUpdateView.as_view()),

    #Онлайн курс
    path('api/onlinecourse', OnlineCourseListCreateAPIView.as_view()),
    path('api/onlinecourse/create', OnlineCourseListCreateAPIView.as_view()),
    path('api/onlinecourse/detail/<int:pk>', OnlineCourseDetailsView.as_view()),
    path('api/onlinecourse/delete/<int:pk>', OnlineCourseDestroyView.as_view()),
    path('api/onlinecourse/update/<int:pk>', OnlineCourseUpdateView.as_view()),


]
