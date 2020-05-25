--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12rc1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_content_type VALUES (1, 'admin', 'logentry');
INSERT INTO public.django_content_type VALUES (2, 'auth', 'permission');
INSERT INTO public.django_content_type VALUES (3, 'auth', 'group');
INSERT INTO public.django_content_type VALUES (4, 'contenttypes', 'contenttype');
INSERT INTO public.django_content_type VALUES (5, 'sessions', 'session');
INSERT INTO public.django_content_type VALUES (6, 'dataprocessing', 'user');
INSERT INTO public.django_content_type VALUES (7, 'dataprocessing', 'domain');
INSERT INTO public.django_content_type VALUES (8, 'dataprocessing', 'items');
INSERT INTO public.django_content_type VALUES (9, 'dataprocessing', 'relation');
INSERT INTO public.django_content_type VALUES (10, 'django_summernote', 'attachment');
INSERT INTO public.django_content_type VALUES (11, 'authtoken', 'token');
INSERT INTO public.django_content_type VALUES (12, 'corsheaders', 'corsmodel');
INSERT INTO public.django_content_type VALUES (13, 'workprogramsapp', 'competence');
INSERT INTO public.django_content_type VALUES (14, 'workprogramsapp', 'disciplinesection');
INSERT INTO public.django_content_type VALUES (15, 'workprogramsapp', 'evaluationtool');
INSERT INTO public.django_content_type VALUES (16, 'workprogramsapp', 'fieldofstudy');
INSERT INTO public.django_content_type VALUES (17, 'workprogramsapp', 'fieldofstudyworkprogram');
INSERT INTO public.django_content_type VALUES (18, 'workprogramsapp', 'indicator');
INSERT INTO public.django_content_type VALUES (19, 'workprogramsapp', 'outcomesofworkprogram');
INSERT INTO public.django_content_type VALUES (20, 'workprogramsapp', 'prerequisitesofworkprogram');
INSERT INTO public.django_content_type VALUES (21, 'workprogramsapp', 'route');
INSERT INTO public.django_content_type VALUES (22, 'workprogramsapp', 'workprogram');
INSERT INTO public.django_content_type VALUES (23, 'workprogramsapp', 'topic');
INSERT INTO public.django_content_type VALUES (24, 'workprogramsapp', 'routecomposition');
INSERT INTO public.django_content_type VALUES (25, 'workprogramsapp', 'indicatorworkprogram');
INSERT INTO public.django_content_type VALUES (26, 'workprogramsapp', 'competenceindicator');
INSERT INTO public.django_content_type VALUES (27, 'workprogramsapp', 'certification');
INSERT INTO public.django_content_type VALUES (28, 'workprogramsapp', 'onlinecourse');


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth_permission VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO public.auth_permission VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO public.auth_permission VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO public.auth_permission VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO public.auth_permission VALUES (5, 'Can add permission', 2, 'add_permission');
INSERT INTO public.auth_permission VALUES (6, 'Can change permission', 2, 'change_permission');
INSERT INTO public.auth_permission VALUES (7, 'Can delete permission', 2, 'delete_permission');
INSERT INTO public.auth_permission VALUES (8, 'Can view permission', 2, 'view_permission');
INSERT INTO public.auth_permission VALUES (9, 'Can add group', 3, 'add_group');
INSERT INTO public.auth_permission VALUES (10, 'Can change group', 3, 'change_group');
INSERT INTO public.auth_permission VALUES (11, 'Can delete group', 3, 'delete_group');
INSERT INTO public.auth_permission VALUES (12, 'Can view group', 3, 'view_group');
INSERT INTO public.auth_permission VALUES (13, 'Can add content type', 4, 'add_contenttype');
INSERT INTO public.auth_permission VALUES (14, 'Can change content type', 4, 'change_contenttype');
INSERT INTO public.auth_permission VALUES (15, 'Can delete content type', 4, 'delete_contenttype');
INSERT INTO public.auth_permission VALUES (16, 'Can view content type', 4, 'view_contenttype');
INSERT INTO public.auth_permission VALUES (17, 'Can add session', 5, 'add_session');
INSERT INTO public.auth_permission VALUES (18, 'Can change session', 5, 'change_session');
INSERT INTO public.auth_permission VALUES (19, 'Can delete session', 5, 'delete_session');
INSERT INTO public.auth_permission VALUES (20, 'Can view session', 5, 'view_session');
INSERT INTO public.auth_permission VALUES (21, 'Can add user', 6, 'add_user');
INSERT INTO public.auth_permission VALUES (22, 'Can change user', 6, 'change_user');
INSERT INTO public.auth_permission VALUES (23, 'Can delete user', 6, 'delete_user');
INSERT INTO public.auth_permission VALUES (24, 'Can view user', 6, 'view_user');
INSERT INTO public.auth_permission VALUES (25, 'Can add domain', 7, 'add_domain');
INSERT INTO public.auth_permission VALUES (26, 'Can change domain', 7, 'change_domain');
INSERT INTO public.auth_permission VALUES (27, 'Can delete domain', 7, 'delete_domain');
INSERT INTO public.auth_permission VALUES (28, 'Can view domain', 7, 'view_domain');
INSERT INTO public.auth_permission VALUES (29, 'Can add items', 8, 'add_items');
INSERT INTO public.auth_permission VALUES (30, 'Can change items', 8, 'change_items');
INSERT INTO public.auth_permission VALUES (31, 'Can delete items', 8, 'delete_items');
INSERT INTO public.auth_permission VALUES (32, 'Can view items', 8, 'view_items');
INSERT INTO public.auth_permission VALUES (33, 'Can add relation', 9, 'add_relation');
INSERT INTO public.auth_permission VALUES (34, 'Can change relation', 9, 'change_relation');
INSERT INTO public.auth_permission VALUES (35, 'Can delete relation', 9, 'delete_relation');
INSERT INTO public.auth_permission VALUES (36, 'Can view relation', 9, 'view_relation');
INSERT INTO public.auth_permission VALUES (37, 'Can add attachment', 10, 'add_attachment');
INSERT INTO public.auth_permission VALUES (38, 'Can change attachment', 10, 'change_attachment');
INSERT INTO public.auth_permission VALUES (39, 'Can delete attachment', 10, 'delete_attachment');
INSERT INTO public.auth_permission VALUES (40, 'Can view attachment', 10, 'view_attachment');
INSERT INTO public.auth_permission VALUES (41, 'Can add Token', 11, 'add_token');
INSERT INTO public.auth_permission VALUES (42, 'Can change Token', 11, 'change_token');
INSERT INTO public.auth_permission VALUES (43, 'Can delete Token', 11, 'delete_token');
INSERT INTO public.auth_permission VALUES (44, 'Can view Token', 11, 'view_token');
INSERT INTO public.auth_permission VALUES (45, 'Can add cors model', 12, 'add_corsmodel');
INSERT INTO public.auth_permission VALUES (46, 'Can change cors model', 12, 'change_corsmodel');
INSERT INTO public.auth_permission VALUES (47, 'Can delete cors model', 12, 'delete_corsmodel');
INSERT INTO public.auth_permission VALUES (48, 'Can view cors model', 12, 'view_corsmodel');
INSERT INTO public.auth_permission VALUES (49, 'Can add competence', 13, 'add_competence');
INSERT INTO public.auth_permission VALUES (50, 'Can change competence', 13, 'change_competence');
INSERT INTO public.auth_permission VALUES (51, 'Can delete competence', 13, 'delete_competence');
INSERT INTO public.auth_permission VALUES (52, 'Can view competence', 13, 'view_competence');
INSERT INTO public.auth_permission VALUES (53, 'Can add discipline section', 14, 'add_disciplinesection');
INSERT INTO public.auth_permission VALUES (54, 'Can change discipline section', 14, 'change_disciplinesection');
INSERT INTO public.auth_permission VALUES (55, 'Can delete discipline section', 14, 'delete_disciplinesection');
INSERT INTO public.auth_permission VALUES (56, 'Can view discipline section', 14, 'view_disciplinesection');
INSERT INTO public.auth_permission VALUES (57, 'Can add evaluation tool', 15, 'add_evaluationtool');
INSERT INTO public.auth_permission VALUES (58, 'Can change evaluation tool', 15, 'change_evaluationtool');
INSERT INTO public.auth_permission VALUES (59, 'Can delete evaluation tool', 15, 'delete_evaluationtool');
INSERT INTO public.auth_permission VALUES (60, 'Can view evaluation tool', 15, 'view_evaluationtool');
INSERT INTO public.auth_permission VALUES (61, 'Can add field of study', 16, 'add_fieldofstudy');
INSERT INTO public.auth_permission VALUES (62, 'Can change field of study', 16, 'change_fieldofstudy');
INSERT INTO public.auth_permission VALUES (63, 'Can delete field of study', 16, 'delete_fieldofstudy');
INSERT INTO public.auth_permission VALUES (64, 'Can view field of study', 16, 'view_fieldofstudy');
INSERT INTO public.auth_permission VALUES (65, 'Can add field of study work program', 17, 'add_fieldofstudyworkprogram');
INSERT INTO public.auth_permission VALUES (66, 'Can change field of study work program', 17, 'change_fieldofstudyworkprogram');
INSERT INTO public.auth_permission VALUES (67, 'Can delete field of study work program', 17, 'delete_fieldofstudyworkprogram');
INSERT INTO public.auth_permission VALUES (68, 'Can view field of study work program', 17, 'view_fieldofstudyworkprogram');
INSERT INTO public.auth_permission VALUES (69, 'Can add indicator', 18, 'add_indicator');
INSERT INTO public.auth_permission VALUES (70, 'Can change indicator', 18, 'change_indicator');
INSERT INTO public.auth_permission VALUES (71, 'Can delete indicator', 18, 'delete_indicator');
INSERT INTO public.auth_permission VALUES (72, 'Can view indicator', 18, 'view_indicator');
INSERT INTO public.auth_permission VALUES (73, 'Can add outcomes of work program', 19, 'add_outcomesofworkprogram');
INSERT INTO public.auth_permission VALUES (74, 'Can change outcomes of work program', 19, 'change_outcomesofworkprogram');
INSERT INTO public.auth_permission VALUES (75, 'Can delete outcomes of work program', 19, 'delete_outcomesofworkprogram');
INSERT INTO public.auth_permission VALUES (76, 'Can view outcomes of work program', 19, 'view_outcomesofworkprogram');
INSERT INTO public.auth_permission VALUES (77, 'Can add prerequisites of work program', 20, 'add_prerequisitesofworkprogram');
INSERT INTO public.auth_permission VALUES (78, 'Can change prerequisites of work program', 20, 'change_prerequisitesofworkprogram');
INSERT INTO public.auth_permission VALUES (79, 'Can delete prerequisites of work program', 20, 'delete_prerequisitesofworkprogram');
INSERT INTO public.auth_permission VALUES (80, 'Can view prerequisites of work program', 20, 'view_prerequisitesofworkprogram');
INSERT INTO public.auth_permission VALUES (81, 'Can add route', 21, 'add_route');
INSERT INTO public.auth_permission VALUES (82, 'Can change route', 21, 'change_route');
INSERT INTO public.auth_permission VALUES (83, 'Can delete route', 21, 'delete_route');
INSERT INTO public.auth_permission VALUES (84, 'Can view route', 21, 'view_route');
INSERT INTO public.auth_permission VALUES (85, 'Can add work program', 22, 'add_workprogram');
INSERT INTO public.auth_permission VALUES (86, 'Can change work program', 22, 'change_workprogram');
INSERT INTO public.auth_permission VALUES (87, 'Can delete work program', 22, 'delete_workprogram');
INSERT INTO public.auth_permission VALUES (88, 'Can view work program', 22, 'view_workprogram');
INSERT INTO public.auth_permission VALUES (89, 'Can add topic', 23, 'add_topic');
INSERT INTO public.auth_permission VALUES (90, 'Can change topic', 23, 'change_topic');
INSERT INTO public.auth_permission VALUES (91, 'Can delete topic', 23, 'delete_topic');
INSERT INTO public.auth_permission VALUES (92, 'Can view topic', 23, 'view_topic');
INSERT INTO public.auth_permission VALUES (93, 'Can add route composition', 24, 'add_routecomposition');
INSERT INTO public.auth_permission VALUES (94, 'Can change route composition', 24, 'change_routecomposition');
INSERT INTO public.auth_permission VALUES (95, 'Can delete route composition', 24, 'delete_routecomposition');
INSERT INTO public.auth_permission VALUES (96, 'Can view route composition', 24, 'view_routecomposition');
INSERT INTO public.auth_permission VALUES (97, 'Can add indicator work program', 25, 'add_indicatorworkprogram');
INSERT INTO public.auth_permission VALUES (98, 'Can change indicator work program', 25, 'change_indicatorworkprogram');
INSERT INTO public.auth_permission VALUES (99, 'Can delete indicator work program', 25, 'delete_indicatorworkprogram');
INSERT INTO public.auth_permission VALUES (100, 'Can view indicator work program', 25, 'view_indicatorworkprogram');
INSERT INTO public.auth_permission VALUES (101, 'Can add competence indicator', 26, 'add_competenceindicator');
INSERT INTO public.auth_permission VALUES (102, 'Can change competence indicator', 26, 'change_competenceindicator');
INSERT INTO public.auth_permission VALUES (103, 'Can delete competence indicator', 26, 'delete_competenceindicator');
INSERT INTO public.auth_permission VALUES (104, 'Can view competence indicator', 26, 'view_competenceindicator');
INSERT INTO public.auth_permission VALUES (105, 'Can add certification', 27, 'add_certification');
INSERT INTO public.auth_permission VALUES (106, 'Can change certification', 27, 'change_certification');
INSERT INTO public.auth_permission VALUES (107, 'Can delete certification', 27, 'delete_certification');
INSERT INTO public.auth_permission VALUES (108, 'Can view certification', 27, 'view_certification');
INSERT INTO public.auth_permission VALUES (109, 'Can add online course', 28, 'add_onlinecourse');
INSERT INTO public.auth_permission VALUES (110, 'Can change online course', 28, 'change_onlinecourse');
INSERT INTO public.auth_permission VALUES (111, 'Can delete online course', 28, 'delete_onlinecourse');
INSERT INTO public.auth_permission VALUES (112, 'Can view online course', 28, 'view_onlinecourse');


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dataprocessing_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_user VALUES (1, 'pbkdf2_sha256$150000$fXziYrLFD06X$PJG/csLzJUROFb5Rk8tXRWVbZhcUyOEwTgeeDNRfo/M=', '2020-05-06 16:32:00.564499+00', true, 'admin', '', '', 'admin@admin.ru', true, true, '2020-04-25 20:22:09.34016+00', NULL, NULL);


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authtoken_token VALUES ('3efe42e295a5096da915473b002a60b01d600711', '2020-04-25 21:25:18.963104+00', 1);


--
-- Data for Name: corsheaders_corsmodel; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dataprocessing_domain; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_domain VALUES (1, 'Анализ данных');


--
-- Data for Name: dataprocessing_domain_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_domain_user VALUES (1, 1, 1);


--
-- Data for Name: dataprocessing_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_items VALUES (1, 'dgfdgdfg', 0, '', 1, NULL);
INSERT INTO public.dataprocessing_items VALUES (2, 'Математика', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (3, 'Алгебра', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (4, 'Матрица', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (5, 'Определитель', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (6, 'Обратная матрица', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (7, 'Элементарные преобразования матриц', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (8, 'Ранг матрицы', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (9, 'Системы линейных уравнений', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (10, 'Метод Крамера', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (11, 'Метод обратной матрицы', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (12, 'Метод Гаусса', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (13, 'Однородные системы линейных уравнений', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (14, 'Фундаментальная система решений', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (15, 'Геометрия', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (16, 'Вектор', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (17, 'Направляющие косинусы', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (18, 'Условие коллинеарности', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (19, 'Скалярное произведение векторов', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (20, 'Условие ортогональности', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (21, 'Векторное произведение векторов', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (22, 'Вычисление площади параллелограмма', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (23, 'Смешанное произведение векторов', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (24, 'Объем параллелепипеда', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (25, 'Объем тетраэдра', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (26, 'Аналитическая геометрия', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (27, 'Системы координат на плоскости', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (28, 'Системы координат в пространстве', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (29, 'Преобразование координат', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (30, 'Линейные геометрические объекты', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (31, 'Алгебраические кривые второго порядка', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (32, 'Аналитическое задание кривых на плоскости', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (33, 'Аналитическое задание кривых в пространстве', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (34, 'Переход к параметрическому заданию', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (35, 'Кривые в полярных координатах', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (36, 'Поверхности второго порядка', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (37, 'Метод параллельных сечений', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (38, 'Приведение уравнения поверхности второго порядка к канонической форме', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (39, 'Линейное пространство и квадратичные формы', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (40, 'Линейное пространство', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (41, 'Евклидово пространство', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (42, 'Квадратичные формы второго порядка', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (43, 'Квадратичные поверхности второго порядка', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (44, 'Введение в матанализ', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (45, 'Теория пределов', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (46, 'Множество', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (47, 'Числовое множество', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (48, 'Операции над множествами', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (49, 'Функция одной вещественной переменной', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (50, 'Предел функции одной переменной', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (51, 'Свойства пределов', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (52, 'Вычисление пределов', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (53, 'Непрерывная функция', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (54, 'Исследование функции на непрерывность и разрыв', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (55, 'Дифференциальное исчисление функции одной переменной', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (56, 'Производная', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (57, 'Дифференциал функции одной переменной первого порядка', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (58, 'Дифференциал функции одной переменной высшего порядка', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (59, 'Правила дифференцирования функций', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (60, 'Свойства дифференцируемых функций на отрезке', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (61, 'Исследование функции', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (62, 'Дифференциальное исчисление функции нескольких переменных', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (63, 'Функция нескольких переменных', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (64, 'Дифференцирование', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (65, 'Применение производных функции нескольких переменных к исследованию кривых и поверхностей', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (66, 'Интегрирование функции одной переменной', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (67, 'Неопределенный интеграл', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (68, 'Методы интегрирования', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (69, 'Интегрирование функций', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (70, 'Интегрирование тригонометрических выражений', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (71, 'Дифференциальные уравнения', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (72, 'Обыкновенные дифференциальные уравнения (ОДУ)', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (73, 'Интегрируемые оду 1-го порядка', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (74, 'ДУ высших порядков', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (75, 'Линейные ДУ n-го порядка с постоянными коэффициентами', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (76, 'Системы линейных дифференциальных уравнений с постоянными коэффициентами', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (77, 'Определенные интегралы', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (78, 'Определенный интеграл', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (79, 'Вычисление определенного интеграла', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (80, 'Несобственные интегралы', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (81, 'Сходимость несобственных интегралов', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (82, 'Кратные интегралы', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (83, 'Двойной интеграл', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (84, 'Вычисление двойного интеграла', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (85, 'Числовые и функциональные ряды', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (86, 'Числовые ряды', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (87, 'Сходимость числовых рядов', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (88, 'Функциональные ряды', 0, 'uploaded', 1, 1);
INSERT INTO public.dataprocessing_items VALUES (89, 'Ряд Тейлора-Маклорена', 0, 'uploaded', 1, 1);


--
-- Data for Name: dataprocessing_relation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dataprocessing_relation_item2; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dataprocessing_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dataprocessing_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_admin_log VALUES (1, '2020-04-25 21:26:36.261503+00', '1', 'dgfdgdfg', 1, '[{"added": {}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (2, '2020-04-25 21:26:51.427812+00', '1', 'sfgfg', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (3, '2020-04-28 21:25:47.896578+00', '1', '09.04.03 Прикладная информатика', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (4, '2020-04-28 21:27:22.916805+00', '2', 'Алгоритмы и структуры данных', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (5, '2020-04-28 21:27:57.491936+00', '1', 'Способен управлять аналитическими работами и работать со сложными структурами данных при решении практических задач программирования', 1, '[{"added": {}}]', 13, 1);
INSERT INTO public.django_admin_log VALUES (6, '2020-04-28 21:28:27.225629+00', '2', 'Способен собирать, обрабатывать с использованием современных информационных технологий и интерпретировать необходимые данные для формирования суждений по соответствующим социальным, научным и професси', 1, '[{"added": {}}]', 13, 1);
INSERT INTO public.django_admin_log VALUES (7, '2020-04-28 21:29:24.248889+00', '1', 'Разрабатывает технико-коммерческое предложение и участвует  в его защите', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (8, '2020-04-28 21:29:38.148374+00', '2', 'Разрабатывает методику выполнения аналитических работ и управляет аналитическими ресурсами и компетенциями', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (9, '2020-04-28 21:30:06.954245+00', '1', 'CompetenceIndicator object (1)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (10, '2020-04-28 21:30:13.387387+00', '2', 'CompetenceIndicator object (2)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (11, '2020-04-28 21:30:40.428965+00', '3', 'Выбирает методы и инструментальные средства для проведения аналитических работ', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (12, '2020-04-28 21:30:52.762104+00', '4', 'Разрабатывает и проводит оценку используемых моделей', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (13, '2020-04-28 21:31:11.566587+00', '3', 'CompetenceIndicator object (3)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (14, '2020-04-28 21:31:19.528668+00', '4', 'CompetenceIndicator object (4)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (15, '2020-04-30 10:25:24.16382+00', '1', 'OutcomesOfWorkProgram object (1)', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (16, '2020-04-30 15:55:56.301777+00', '1', 'Основы построения и анализа алгоритмов', 1, '[{"added": {}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (17, '2020-04-30 15:56:10.134585+00', '2', 'Основные абстрактные типы данных', 1, '[{"added": {}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (18, '2020-04-30 15:58:34.176257+00', '1', 'Сравнительный анализ сложности и  времени выполнения алгоритмов', 1, '[{"added": {}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (19, '2020-04-30 15:59:00.071141+00', '2', 'Основные абстрактные типы данных', 1, '[{"added": {}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (20, '2020-04-30 15:59:22.402272+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["evaluation_tools"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (21, '2020-04-30 15:59:25.967236+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["evaluation_tools"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (22, '2020-04-30 18:09:58.343041+00', '3', 'OutcomesOfWorkProgram object (3)', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (23, '2020-04-30 20:27:21.408757+00', '1', '1.1', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (24, '2020-05-04 12:08:32.081366+00', '1', 'Certification object (1)', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (25, '2020-05-04 12:10:26.873363+00', '3', 'PrerequisitesOfWorkProgram object (3)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (26, '2020-05-04 12:16:07.55125+00', '2', 'Алгоритмы и структуры данных', 2, '[{"changed": {"fields": ["qualification"]}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (27, '2020-05-05 15:36:42.335587+00', '4', '', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (28, '2020-05-05 15:36:48.402324+00', '4', '', 3, '', 22, 1);
INSERT INTO public.django_admin_log VALUES (29, '2020-05-06 16:04:38.580035+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (30, '2020-05-06 16:07:27.66177+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (31, '2020-05-07 14:49:13.500799+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (32, '2020-05-07 14:49:17.701254+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (33, '2020-05-07 14:51:17.1065+00', '1', 'Основы построения и анализа алгоритмов', 2, '[]', 14, 1);
INSERT INTO public.django_admin_log VALUES (34, '2020-05-07 14:51:42.747761+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (35, '2020-05-07 15:13:57.645398+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (36, '2020-05-07 15:16:26.274422+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (37, '2020-05-07 15:16:34.595787+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (38, '2020-05-07 15:17:40.757011+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (39, '2020-05-07 15:18:03.312556+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (40, '2020-05-07 15:18:10.445622+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (41, '2020-05-07 15:24:12.681578+00', '1', '1 Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["name"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (42, '2020-05-07 15:24:18.627621+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (43, '2020-05-07 15:24:25.051248+00', '2', '2 Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["name"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (44, '2020-05-07 15:24:52.923588+00', '2', '2 Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (45, '2020-05-07 15:25:01.71721+00', '1', '1 Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (46, '2020-05-07 15:25:39.349973+00', '1', '1 Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (47, '2020-05-07 15:26:50.228826+00', '1', '1 Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (48, '2020-05-07 15:26:53.816227+00', '2', '2 Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_migrations VALUES (1, 'contenttypes', '0001_initial', '2020-04-25 20:20:58.450818+00');
INSERT INTO public.django_migrations VALUES (2, 'contenttypes', '0002_remove_content_type_name', '2020-04-25 20:20:58.46317+00');
INSERT INTO public.django_migrations VALUES (3, 'auth', '0001_initial', '2020-04-25 20:20:58.505542+00');
INSERT INTO public.django_migrations VALUES (4, 'auth', '0002_alter_permission_name_max_length', '2020-04-25 20:20:58.555963+00');
INSERT INTO public.django_migrations VALUES (5, 'auth', '0003_alter_user_email_max_length', '2020-04-25 20:20:58.564032+00');
INSERT INTO public.django_migrations VALUES (6, 'auth', '0004_alter_user_username_opts', '2020-04-25 20:20:58.572011+00');
INSERT INTO public.django_migrations VALUES (7, 'auth', '0005_alter_user_last_login_null', '2020-04-25 20:20:58.580194+00');
INSERT INTO public.django_migrations VALUES (8, 'auth', '0006_require_contenttypes_0002', '2020-04-25 20:20:58.584026+00');
INSERT INTO public.django_migrations VALUES (9, 'auth', '0007_alter_validators_add_error_messages', '2020-04-25 20:20:58.594736+00');
INSERT INTO public.django_migrations VALUES (10, 'auth', '0008_alter_user_username_max_length', '2020-04-25 20:20:58.603206+00');
INSERT INTO public.django_migrations VALUES (11, 'auth', '0009_alter_user_last_name_max_length', '2020-04-25 20:20:58.614672+00');
INSERT INTO public.django_migrations VALUES (12, 'auth', '0010_alter_group_name_max_length', '2020-04-25 20:20:58.623137+00');
INSERT INTO public.django_migrations VALUES (13, 'auth', '0011_update_proxy_permissions', '2020-04-25 20:20:58.633488+00');
INSERT INTO public.django_migrations VALUES (14, 'dataprocessing', '0001_initial', '2020-04-25 20:20:58.7218+00');
INSERT INTO public.django_migrations VALUES (15, 'admin', '0001_initial', '2020-04-25 20:20:58.820867+00');
INSERT INTO public.django_migrations VALUES (16, 'admin', '0002_logentry_remove_auto_add', '2020-04-25 20:20:58.844246+00');
INSERT INTO public.django_migrations VALUES (17, 'admin', '0003_logentry_add_action_flag_choices', '2020-04-25 20:20:58.857124+00');
INSERT INTO public.django_migrations VALUES (18, 'authtoken', '0001_initial', '2020-04-25 20:20:58.878227+00');
INSERT INTO public.django_migrations VALUES (19, 'authtoken', '0002_auto_20160226_1747', '2020-04-25 20:20:58.937717+00');
INSERT INTO public.django_migrations VALUES (20, 'corsheaders', '0001_initial', '2020-04-25 20:20:58.947762+00');
INSERT INTO public.django_migrations VALUES (21, 'django_summernote', '0001_initial', '2020-04-25 20:20:58.957644+00');
INSERT INTO public.django_migrations VALUES (22, 'django_summernote', '0002_update-help_text', '2020-04-25 20:20:58.963597+00');
INSERT INTO public.django_migrations VALUES (23, 'sessions', '0001_initial', '2020-04-25 20:20:58.97687+00');
INSERT INTO public.django_migrations VALUES (24, 'workprogramsapp', '0001_initial', '2020-04-25 20:23:33.429633+00');
INSERT INTO public.django_migrations VALUES (25, 'workprogramsapp', '0002_auto_20200430_1008', '2020-04-30 10:08:14.251041+00');
INSERT INTO public.django_migrations VALUES (26, 'workprogramsapp', '0003_auto_20200430_2018', '2020-04-30 20:18:58.445215+00');
INSERT INTO public.django_migrations VALUES (27, 'workprogramsapp', '0004_auto_20200430_2110', '2020-04-30 21:10:48.522017+00');
INSERT INTO public.django_migrations VALUES (28, 'workprogramsapp', '0005_auto_20200503_2322', '2020-05-03 23:22:36.911365+00');
INSERT INTO public.django_migrations VALUES (29, 'workprogramsapp', '0006_auto_20200504_1021', '2020-05-04 10:21:25.188057+00');
INSERT INTO public.django_migrations VALUES (30, 'workprogramsapp', '0007_auto_20200504_1215', '2020-05-04 12:15:52.138703+00');
INSERT INTO public.django_migrations VALUES (31, 'workprogramsapp', '0008_workprogram_discipline_code', '2020-05-04 13:49:33.390324+00');
INSERT INTO public.django_migrations VALUES (35, 'workprogramsapp', '0009_auto_20200505_1521', '2020-05-05 17:35:12.940487+00');
INSERT INTO public.django_migrations VALUES (37, 'workprogramsapp', '0009_auto_20200505_1338', '2020-05-05 17:37:27.557911+00');
INSERT INTO public.django_migrations VALUES (38, 'workprogramsapp', '0010_merge_20200505_1731', '2020-05-05 17:37:27.569676+00');
INSERT INTO public.django_migrations VALUES (39, 'dataprocessing', '0002_auto_20200506_1602', '2020-05-06 16:03:15.662015+00');
INSERT INTO public.django_migrations VALUES (40, 'workprogramsapp', '0011_auto_20200506_1602', '2020-05-06 16:04:02.620837+00');
INSERT INTO public.django_migrations VALUES (41, 'workprogramsapp', '0012_auto_20200507_1621', '2020-05-07 16:22:38.08487+00');
INSERT INTO public.django_migrations VALUES (42, 'workprogramsapp', '0013_topic_url_online_course', '2020-05-07 16:22:38.120972+00');
INSERT INTO public.django_migrations VALUES (43, 'workprogramsapp', '0014_auto_20200507_1623', '2020-05-07 16:23:47.73779+00');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_session VALUES ('50rptf6zkhzunj15mlkgoldyad7wrzuq', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-09 20:22:16.663152+00');
INSERT INTO public.django_session VALUES ('cl73msh4cdos9mkeutqn1qucpreogo9v', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-11 15:21:32.221268+00');
INSERT INTO public.django_session VALUES ('wfqewmoostqujm1muirsd45qrie5iud0', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-12 11:36:12.692896+00');
INSERT INTO public.django_session VALUES ('0x5jx8vzuwsma5mudqqzxavfgglm5jwk', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-14 10:22:56.081435+00');
INSERT INTO public.django_session VALUES ('44q1l1zew42k54drwij4habyb8us99mi', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-14 10:25:03.086392+00');
INSERT INTO public.django_session VALUES ('p086mj3s9xfl0emcbksgrmp2gwfd36yv', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-14 10:25:03.228942+00');
INSERT INTO public.django_session VALUES ('6zinu0k9x0qzvirtasdx2trtqmr3orxf', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-18 11:29:03.638988+00');
INSERT INTO public.django_session VALUES ('4q7ljnx1jepy3g8la3y1sxojyftty3q7', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-19 15:22:42.089229+00');


--
-- Data for Name: django_summernote_attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_workprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_workprogram VALUES (2, 'Алгоритмы и структуры данных', 108, NULL, 'bachelor', NULL);
INSERT INTO public.workprogramsapp_workprogram VALUES (3, 'Очень крутая рабочая программа', 15, 0, 'bachelor', 'Б52');
INSERT INTO public.workprogramsapp_workprogram VALUES (1, 'sdfsdfdddddddddddddddsdf', NULL, NULL, NULL, 'dfsfdsfdsdfsdfsdfsdfdsf');


--
-- Data for Name: workprogramsapp_certification; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_certification VALUES (1, 'EX', 1, 'Очень сложный экзамен', 12, 2);


--
-- Data for Name: workprogramsapp_competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_competence VALUES (1, 'ПКС-1.1', 'Способен управлять аналитическими работами и работать со сложными структурами данных при решении практических задач программирования');
INSERT INTO public.workprogramsapp_competence VALUES (2, 'ПКС-1.3', 'Способен собирать, обрабатывать с использованием современных информационных технологий и интерпретировать необходимые данные для формирования суждений по соответствующим социальным, научным и профессиональным проблемам');


--
-- Data for Name: workprogramsapp_fieldofstudy; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_fieldofstudy VALUES (1, '09.04.03 Прикладная информатика', 'bachelor', 'internal', NULL, NULL);


--
-- Data for Name: workprogramsapp_competence_field_of_study; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_competence_field_of_study VALUES (1, 1, 1);
INSERT INTO public.workprogramsapp_competence_field_of_study VALUES (2, 2, 1);


--
-- Data for Name: workprogramsapp_competence_work_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_competence_work_program VALUES (1, 1, 2);
INSERT INTO public.workprogramsapp_competence_work_program VALUES (2, 2, 2);


--
-- Data for Name: workprogramsapp_disciplinesection; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_disciplinesection VALUES (1, '1 Основы построения и анализа алгоритмов', 2, NULL, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (2, '2 Основные абстрактные типы данных', 2, NULL, NULL, NULL, NULL, NULL, NULL, 1);


--
-- Data for Name: workprogramsapp_evaluationtool; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_evaluationtool VALUES (1, 'Лабораторная работа 1', 'Сравнительный анализ сложности и  времени выполнения алгоритмов', NULL, NULL, 1, 6, 10);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (2, 'Лабораторная работа 2', 'Основные абстрактные типы данных', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: workprogramsapp_disciplinesection_evaluation_tools; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (1, 2, 1);
INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (2, 1, 2);


--
-- Data for Name: workprogramsapp_fieldofstudyworkprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_indicator; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_indicator VALUES (1, 'ПКС-1.1.1', 'Разрабатывает технико-коммерческое предложение и участвует  в его защите', 1);
INSERT INTO public.workprogramsapp_indicator VALUES (2, 'ПКС-1.1.2', 'Разрабатывает методику выполнения аналитических работ и управляет аналитическими ресурсами и компетенциями', 1);
INSERT INTO public.workprogramsapp_indicator VALUES (3, 'ПКС-1.3.2', 'Выбирает методы и инструментальные средства для проведения аналитических работ', 1);
INSERT INTO public.workprogramsapp_indicator VALUES (4, 'ПКС-1.3.3', 'Разрабатывает и проводит оценку используемых моделей', 1);


--
-- Data for Name: workprogramsapp_indicatorworkprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_onlinecourse; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_outcomesofworkprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_outcomesofworkprogram VALUES (1, '2', 1, 2);
INSERT INTO public.workprogramsapp_outcomesofworkprogram VALUES (2, '1', 3, 1);
INSERT INTO public.workprogramsapp_outcomesofworkprogram VALUES (3, '3', 3, 2);
INSERT INTO public.workprogramsapp_outcomesofworkprogram VALUES (4, '1', 8, 2);


--
-- Data for Name: workprogramsapp_prerequisitesofworkprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_prerequisitesofworkprogram VALUES (3, '1', 12, 2);


--
-- Data for Name: workprogramsapp_route; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_routecomposition; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_topic VALUES (1, '1.1', 'Крутой топик', 2, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (2, '1.2', 'dfdfdfdfdf', 2, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (3, '1.4', 'dfdfdfdfdf', 2, NULL);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 112, true);


--
-- Name: corsheaders_corsmodel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.corsheaders_corsmodel_id_seq', 1, false);


--
-- Name: dataprocessing_domain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_domain_id_seq', 1, true);


--
-- Name: dataprocessing_domain_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_domain_user_id_seq', 1, true);


--
-- Name: dataprocessing_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_items_id_seq', 89, true);


--
-- Name: dataprocessing_relation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_relation_id_seq', 1, false);


--
-- Name: dataprocessing_relation_item2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_relation_item2_id_seq', 1, false);


--
-- Name: dataprocessing_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_user_groups_id_seq', 1, false);


--
-- Name: dataprocessing_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_user_id_seq', 1, true);


--
-- Name: dataprocessing_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 48, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 28, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 43, true);


--
-- Name: django_summernote_attachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_summernote_attachment_id_seq', 1, false);


--
-- Name: workprogramsapp_certification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_certification_id_seq', 1, true);


--
-- Name: workprogramsapp_competence_field_of_study_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_competence_field_of_study_id_seq', 2, true);


--
-- Name: workprogramsapp_competence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_competence_id_seq', 2, true);


--
-- Name: workprogramsapp_competence_work_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_competence_work_program_id_seq', 2, true);


--
-- Name: workprogramsapp_disciplinesection_evaluation_tools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_disciplinesection_evaluation_tools_id_seq', 2, true);


--
-- Name: workprogramsapp_disciplinesection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_disciplinesection_id_seq', 2, true);


--
-- Name: workprogramsapp_evaluationtool_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_evaluationtool_id_seq', 2, true);


--
-- Name: workprogramsapp_fieldofstudy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_fieldofstudy_id_seq', 1, true);


--
-- Name: workprogramsapp_fieldofstudyworkprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_fieldofstudyworkprogram_id_seq', 1, false);


--
-- Name: workprogramsapp_indicator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_indicator_id_seq', 4, true);


--
-- Name: workprogramsapp_indicatorworkprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_indicatorworkprogram_id_seq', 1, false);


--
-- Name: workprogramsapp_onlinecourse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_onlinecourse_id_seq', 1, false);


--
-- Name: workprogramsapp_outcomesofworkprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_outcomesofworkprogram_id_seq', 4, true);


--
-- Name: workprogramsapp_prerequisitesofworkprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_prerequisitesofworkprogram_id_seq', 3, true);


--
-- Name: workprogramsapp_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_route_id_seq', 1, false);


--
-- Name: workprogramsapp_routecomposition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_routecomposition_id_seq', 1, false);


--
-- Name: workprogramsapp_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_topic_id_seq', 3, true);


--
-- Name: workprogramsapp_workprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_workprogram_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

