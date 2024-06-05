# Поиск источникв

**URL** : `api/workprogram_sources/search_in_ebsco?query=data`

**Method** : `GET`

**Auth required** : Yes

**Permissions required** : IsAuthenticated

Данный запрос предоставляет готовый json для последующего создания объекта библиографической ссылки в api/workprogram_sources/bibliographic_reference <br />
Если нужно создать новый источник, то надо передать один из возвращаемых объектов в АПИ выше <br />

## Request format
###Параметры:<br />
 **query **: `Указывается для GET-запроса в url, является текстом запроса для поиска источника `<br />


## Success Responses

**Code** : `200 OK`

**Content** :
```json
"sources": [
        {
            "accession_number": "2458723",
            "authors": "Mattan GriffelDaniel Guetta",
            "title": "Python for MBAs",
            "publishing_company": "",
            "year": "2021",
            "number_of_edition": null,
            "pages": null,
            "format": null,
            "publication_type": "Учебные издания",
            "main_author": "Mattan GriffelDaniel Guetta",
            "bib_reference": "Mattan GriffelDaniel Guetta, Python for MBAs / Mattan GriffelDaniel Guetta : 2021. — Текст : непосредственный."
        },
        {
            "accession_number": "1991381",
            "authors": "Bhasin, H.",
            "title": "Python Basics : A Self-Teaching Introduction",
            "publishing_company": "",
            "year": "2019",
            "number_of_edition": null,
            "pages": null,
            "format": null,
            "publication_type": "Учебные издания",
            "main_author": "Bhasin",
            "bib_reference": "Bhasin, Python Basics : A Self-Teaching Introduction / Bhasin, H. : 2019. — Текст : непосредственный."
        },
        ]
```
