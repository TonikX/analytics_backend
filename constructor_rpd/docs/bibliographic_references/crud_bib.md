# Список источников в системе

**URL** : `api/workprogram_sources/bibliographic_reference`

**Method** : `GET`

**Auth required** : Yes

**Permissions required** : IsAuthenticated

## Request format
### GET-Параметры:<br />
 **author **: `Автор источника`<br />
 **title **: `Наименование источника `<br />
 **year **: `Год издания `<br />


## Success Responses

**Code** : `200 OK`

**Content** : 
```json
"results": [
        {
            "id": 25,
            "accession_number": null,
            "title": null,
            "authors": null,
            "bib_reference": null,
            "description": "Прикладная математика для инженеров. Специальные курсы : [доп. МВ и ССО СССР в качестве учебного пособия для студентов высших технических учебных заведений] / А. Д. Мышкис .— Изд. 3-е, доп .— М. : ФИЗМАТЛИТ, 2007 .— 687, [1] с. : ил. — (Математика. Прикладная математика) .— Библиогр.: с. 672-677 .— ISBN 978-5-9221-0747-1."
        },
        {
            "id": 24,
            "accession_number": null,
            "title": null,
            "authors": null,
            "bib_reference": null,
            "description": "Математические методы прогнозирования : рек. УМО по классич. унив. образованию в качестве учебного пособия для студентов высш. учеб. заведений (направл.) подготовки ВПО 010501 (010500.62) \"Прикл. математика и информатика\" / А. М. Шурыгин .— М. : Горячая линия - Телеком, 2009 .— 178, [2] с. : ил. — (Учебное пособие для высших учебных заведений) .— Имен. указ.: с. 175-176 .— Предм. указ.: с. 177-178 .— ISBN 978-5-9912-0062-2."
        },
        {
            "id": 27,
            "accession_number": null,
            "title": null,
            "authors": null,
            "bib_reference": null,
            "description": "Решение задач вычислительной математики в пакетах Mathcad 12, MATLAB 7, Maple 9 / Е. Р. Алексеев, О. В. Чеснокова .— М. : НТ Пресс, 2006 .— 492 с. : ил .— (Самоучитель) .— Прил.: с. 425-484 .— Библиогр.: с.486-487 .— Предм. указ.: с. 488-492 .— ISBN 5-477-00208-5"
        }
        ]
```

# Конкретный источник

**URL** : `api/workprogram_sources/bibliographic_reference/id`

**Method** : `GET`

**Auth required** : Yes

**Permissions required** : IsAuthenticated

## Request format
### GET-Параметры:<br />
**id **: `id источника`<br />
 **author **: `Автор источника`<br />
 **title **: `Наименование источника `<br />
 **year **: `Год издания `<br />


## Success Responses

**Code** : `200 OK`

**Content** : 
```json
{
    "id": 12011,
    "accession_number": "2458723",
    "authors": "Mattan GriffelDaniel Guetta",
    "main_author": "Mattan GriffelDaniel Guetta",
    "publication_type": "Учебные издания",
    "title": "Python for MBAs",
    "publishing_company": "",
    "year": "2022",
    "number_of_edition": null,
    "pages": null,
    "format": null,
    "publishing_type": null,
    "bib_reference": "Mattan GriffelDaniel Guetta, Python for MBAs / Mattan GriffelDaniel Guetta : 2021. — Текст : непосредственный.",
    "description": null
}
```

# Создание источника

**URL** : `api/workprogram_sources/bibliographic_reference`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : IsAuthenticated

## Request format
### Параметры:<br />
Де-факто все параметры (не считая description) копируют ответ от api/workprogram_sources/search_in_ebsco?query=data <br />
Если при создании источника уже существует объект с таким accession_number, то запрос вернет существующий объект и не будет создавать новый <br />

**accession_number **: `id источника в EBSCO`<br />
 **authors **: `Авторы источника`<br />
 **title **: `Наименование источника `<br />
 **publishing_company **: `Ищдатель. Возвращает пустую строку `<br />
 **year **: `Год издания `<br />
 **number_of_edition **: `Номер издания, возвращает None `<br />
 **pages **: `Кол-во страниц, возвращает None  `<br />
 **format **: `Формат `<br />
 **publication_type **: `Тип публикации `<br />
 **main_author **: `Главный автор`<br />
 **bib_reference **: `Сгенерированная библ. ссылка `<br />
 **description **: `Описание (используется в старых объектах)`<br />
 


## Success Responses

**Code** : `201 OK`

**Content** : 
```json
{
    "id": 12011,
    "accession_number": "2458723",
    "authors": "Mattan GriffelDaniel Guetta",
    "main_author": "Mattan GriffelDaniel Guetta",
    "publication_type": "Учебные издания",
    "title": "Python for MBAs",
    "publishing_company": "",
    "year": "2022",
    "number_of_edition": null,
    "pages": null,
    "format": null,
    "publishing_type": null,
    "bib_reference": "Mattan GriffelDaniel Guetta, Python for MBAs / Mattan GriffelDaniel Guetta : 2021. — Текст : непосредственный.",
    "description": null
}
```

Изменение и удаление источника используют те же самые поля и URL и требуют указать соответсвующий метод при отправке запроса.