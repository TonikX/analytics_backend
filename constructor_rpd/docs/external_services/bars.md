
#Список РПД прошедших экспертизу для БАРС 1.0


**URL** : `api/bars_tools/academicntcheckpoints`

**Method** : `POST`

**Auth required** : Yes

**Permissions required** : IsAdminUser, IsExternalUser

## Request format
###Параметры:<br />
 **year **: `Поле вида 'YYYY/YYYY', указывает учебный год в который реализована РПД`<br />
**from_date**: `поле вида "DD.MM.YYYY", обознает отсчет с даты принятия на экспертизу РПД`<br />

**Data constraints** : `{}`
```json
{
   "year":"2021/2022",
   "from_date":"01.09.2021"	
}
```

## Success Responses

**Code** : `200 OK`

**Content** : `{[]}`

```json
{
    "rpd": [ {
            "id": 3915,
            "dis_id": 25191,
            "bars2": "Bars2",
            "date": "14.09.2021",
            "apprenticeship": "2021/2022",
            "programs": [
                {
                    "id": 1981,
                    "code": "38.03.05.",
                    "name": "Бизнес-информатика"
                }
            ],
            "term": 1,
            "checkpoints": [
                {
                    "name": "Реферат 1",
                    "min_grade": 12,
                    "max_grade": 18,
                    "week": 3,
                    "key": false,
                    "type_id": "Реферат",
                    "term": 1,
                    "certification_type": "regular"
                },
                {
                    "name": "Тест 1",
                    "min_grade": 13,
                    "max_grade": 24,
                    "week": 7,
                    "key": true,
                    "type_id": "Тест",
                    "term": 1,
                    "certification_type": "regular"
                },
                {
                    "name": "Тест 2",
                    "min_grade": 11,
                    "max_grade": 20,
                    "week": 11,
                    "key": false,
                    "type_id": "Тест",
                    "term": 1,
                    "certification_type": "regular"
                },
                {
                    "name": "Реферат 2",
                    "min_grade": 12,
                    "max_grade": 18,
                    "week": 14,
                    "key": false,
                    "type_id": "Реферат",
                    "term": 1,
                    "certification_type": "regular"
                },
                {
                    "name": "Устный экзамен",
                    "min_grade": 12,
                    "max_grade": 20,
                    "week": null,
                    "key": false,
                    "type_id": 25,
                    "term": 1,
                    "certification_type": "final"
                }
            ]
        },
        {
            "id": 4164,
            "dis_id": 25201,
            "bars2": "Bars2",
            "date": "21.09.2021",
            "apprenticeship": "2021/2022",
            "programs": [
                {
                    "id": 4390,
                    "code": "12.03.03.",
                    "name": "Фотоника и оптоинформатика"
                }
            ],
            "term": 1,
            "checkpoints": [
                {
                    "name": "Домашние задания",
                    "min_grade": 0,
                    "max_grade": 33,
                    "week": 7,
                    "key": true,
                    "type_id": "Домашнее задание",
                    "term": 1,
                    "certification_type": "regular"
                },
                {
                    "name": "Практическая задача",
                    "min_grade": 6,
                    "max_grade": 14,
                    "week": 17,
                    "key": true,
                    "type_id": "Домашнее задание",
                    "term": 1,
                    "certification_type": "regular"
                },
                {
                    "name": "Реферат",
                    "min_grade": 0,
                    "max_grade": 23,
                    "week": 14,
                    "key": true,
                    "type_id": "Реферат",
                    "term": 1,
                    "certification_type": "regular"
                },
                {
                    "name": "Тест",
                    "min_grade": 2,
                    "max_grade": 10,
                    "week": 12,
                    "key": true,
                    "type_id": "Тест",
                    "term": 1,
                    "certification_type": "regular"
                },
                {
                    "name": "Письменный зачет",
                    "min_grade": 0,
                    "max_grade": 20,
                    "week": null,
                    "key": false,
                    "type_id": 26,
                    "term": 1,
                    "certification_type": "final"
                }
            ]
        }
	]
}
```
