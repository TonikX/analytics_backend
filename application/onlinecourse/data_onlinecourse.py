import pandas as pd
import requests

from django.conf import settings


ONLINE_EDU_LINK = "https://online.edu.ru/api/"


def get_data():
    """Collecting platforms to DataFrame."""

    platforms = requests.get(
        ONLINE_EDU_LINK + "partners/v0/platform",
        cert=(settings.ONLINECOURSE_CERT, settings.ONLINECOURSE_CERT),
    )
    platforms_list = platforms.json()["rows"]

    global_id = []
    title = []
    for platform in platforms_list:
        global_id.append(platform["global_id"])
        title.append(platform["title"])

    data_Platform = pd.DataFrame(
        list(zip(global_id, title)), columns=["platform_id", "title"]
    )
    """Collecting institutions to DataFrame."""

    rightholders = requests.get(
        ONLINE_EDU_LINK + "partners/v0/rightholder",
        cert=(settings.ONLINECOURSE_CERT, settings.ONLINECOURSE_CERT),
    )
    rightholders_list = rightholders.json()["rows"]

    global_id = []
    short_title = []

    for rightholder in rightholders_list:
        global_id.append(rightholder["global_id"])
        short_title.append(rightholder["short_title"])

    data_Rigthholder = pd.DataFrame(
        list(zip(global_id, short_title)), columns=["institution_id", "title"]
    )
    """Collecting onlinecourses to DataFrame."""
    # сбор ссылок на все страницы с онлайн курсами
    course_link = ONLINE_EDU_LINK + "courses/v0/course/"
    total_count_courses = requests.get(
        course_link, cert=(settings.ONLINECOURSE_CERT, settings.ONLINECOURSE_CERT)
    ).json()["total_count"]
    count_courses = len(
        requests.get(
            course_link, cert=(settings.ONLINECOURSE_CERT, settings.ONLINECOURSE_CERT)
        ).json()["results"]
    )
    print("Всего онлайн-курсов :", total_count_courses)
    pages = round(total_count_courses / count_courses) + 1
    print("Количество страниц - ", pages)
    course_links = []
    course_links.append(course_link)
    for i in range(1, pages):
        new_link = course_link + "?page=" + str(i)
        course_links.append(new_link)

    # сбор id всех онлайн курсов
    course_id = []
    for link in course_links:
        course = requests.get(
            link, cert=(settings.ONLINECOURSE_CERT, settings.ONLINECOURSE_CERT)
        )
        courses_list = course.json()["results"]
        for i in courses_list:
            course_id.append(i["global_id"])
    print("Длина course_id", len(course_id))
    title = []
    description = []
    institution = []
    platform = []
    language = []
    started_at = []
    created_at = []
    record_end_at = []
    finished_at = []
    rating = []
    experts_rating = []
    visitors_number = []
    total_visitors_number = []
    duration = []
    volume = []
    intensity_per_week = []
    content = []
    lectures_number = []
    external_url = []
    has_certificate = []
    credits = []
    requirements = []
    learning_outcomes = []
    competences = []

    course_id_field_of_study = []
    field_of_study = []

    course_id_transfer = []
    field_of_study_transfer = []
    institution_transfer = []

    # сбор данных по каждому онлайн курсов
    course_link = ONLINE_EDU_LINK + "courses/v0/course/"

    for i in range(0, len(course_id)):
        current_course_link = course_link + str(course_id[i])
        current_course = requests.get(
            current_course_link,
            cert=(settings.ONLINECOURSE_CERT, settings.ONLINECOURSE_CERT),
        )
        title.append(current_course.json()["title"])
        description.append(current_course.json()["description"])
        institution.append(current_course.json()["institution_id"])
        platform.append(current_course.json()["partner_id"])
        language.append(current_course.json()["language"])
        started_at.append(current_course.json()["started_at"])
        created_at.append(current_course.json()["created_at"])
        record_end_at.append(current_course.json()["record_end_at"])
        finished_at.append(current_course.json()["finished_at"])
        rating.append(current_course.json()["rating"])
        experts_rating.append(current_course.json()["experts_rating"])
        visitors_number.append(current_course.json()["visitors_number"])
        total_visitors_number.append(current_course.json()["total_visitors_number"])
        duration.append(current_course.json()["duration"])
        volume.append(current_course.json()["volume"])
        intensity_per_week.append(current_course.json()["intensity_per_week"])
        content.append(current_course.json()["content"])
        lectures_number.append(current_course.json()["lectures_number"])
        external_url.append(current_course.json()["registry_url"])
        has_certificate.append(current_course.json()["has_certificate"])
        credits.append(current_course.json()["credits"])
        try:
            if len(current_course.json()["requirements"]) != 0:
                requirements.append(current_course.json()["requirements"][0])
            else:
                requirements.append("null")
        except Exception:
            continue
        try:
            if len(current_course.json()["learning_outcomes"]) != 0:
                learning_outcomes.append(current_course.json()["learning_outcomes"][0])
            else:
                learning_outcomes.append("null")
        except Exception:
            continue
        try:
            if len(current_course.json()["competences"]) != 0:
                competences.append(current_course.json()["competences"])
            else:
                competences.append("null")
        except Exception:
            competences.append("")

        """
        #Collecting onlinecourse&field_of_study to DataFrame
        """

        for j in current_course.json()["directions"]:
            field_of_study.append(j)
            course_id_field_of_study.append(course_id[i])

        """
        Collecting onlinecourse&credit to DataFrame
        """

        for j in current_course.json()["transfers"]:
            course_id_transfer.append(course_id[i])
            field_of_study_transfer.append(j["direction_id"])
            institution_transfer.append(j["institution_id"])

    data_OnlineCourse = pd.DataFrame(
        list(
            zip(
                course_id,
                title,
                description,
                institution,
                platform,
                language,
                started_at,
                created_at,
                record_end_at,
                finished_at,
                rating,
                experts_rating,
                visitors_number,
                total_visitors_number,
                duration,
                volume,
                intensity_per_week,
                content,
                lectures_number,
                external_url,
                has_certificate,
                credits,
                requirements,
                learning_outcomes,
                competences,
            )
        ),
        columns=[
            "course_id",
            "title",
            "description",
            "institution_id",
            "platform_id",
            "language",
            "started_at",
            "created_at",
            "record_end_at",
            "finished_at",
            "rating",
            "experts_rating",
            "visitors_number",
            "total_visitors_number",
            "duration",
            "volume",
            "intensity_per_week",
            "content",
            "lectures_number",
            "external_url",
            "has_certificate",
            "credits",
            "requirements",
            "learning_outcomes",
            "competences",
        ],
    )
    print(data_OnlineCourse.shape)
    data_OnlineCourse["id_course"] = data_OnlineCourse.index

    print(data_OnlineCourse.shape)

    data_CourseFieldOfStudy = pd.DataFrame(
        list(zip(course_id_field_of_study, field_of_study)),
        columns=["course_id", "field_of_study"],
    )
    data_CourseCredit = pd.DataFrame(
        list(zip(course_id_transfer, institution_transfer, field_of_study_transfer)),
        columns=["course_id", "institution_id", "field_of_study"],
    )
    """Adding new id as FK to OnlineCourse."""

    data_Platform["id_platform"] = data_Platform.index
    data_Rigthholder["id_institution"] = data_Rigthholder.index
    data_online_course_platform = pd.merge(
        data_OnlineCourse, data_Platform, how="left", on="platform_id"
    )
    data_online_course_platform_inst = pd.merge(
        data_online_course_platform, data_Rigthholder, how="left", on="institution_id"
    )

    data_online_course_platform_inst.started_at = pd.to_datetime(
        data_online_course_platform_inst["started_at"],
        format="%Y-%m-%d",
        errors="ignore",
    )
    data_online_course_platform_inst.finished_at = pd.to_datetime(
        data_online_course_platform_inst["finished_at"],
        format="%Y-%m-%d",
        errors="ignore",
    )
    data_OnlineCourse = data_online_course_platform_inst.copy()
    data_OnlineCourse = data_OnlineCourse.fillna("null")
    print("final shape", data_OnlineCourse.shape)
    """Adding new id as FK to CourseFieldOfStudy."""
    data_CourseFieldOfStudy = pd.merge(
        data_CourseFieldOfStudy,
        data_OnlineCourse[["id_course", "course_id"]],
        how="left",
        on="course_id",
    )
    """Adding new id as FK to CourseCredit."""
    data_CourseCredit = pd.merge(
        data_CourseCredit,
        data_OnlineCourse[["id_course", "course_id"]],
        how="left",
        on="course_id",
    )
    data_CourseCredit = pd.merge(
        data_CourseCredit, data_Rigthholder, how="left", on="institution_id"
    )

    return (
        data_Platform,
        data_Rigthholder,
        data_OnlineCourse,
        data_CourseFieldOfStudy,
        data_CourseCredit,
    )
