
#Список эндпоинтов для работы с практиками

## Практики

**URL** : `api/practice`

**Method** : `POST, GET, PUT, PATCH, DELETE`

**Auth required** : Yes

**Permissions required** : IsRpdUSer


###Выборные поля (перечисления):<br />
В представленных ниже парах ключ-значение в конечное поле эндпоинта необходимо передавать только ключ<br /><br />
 **language **: `Выборное поле языка реализации, принимает следующие параметры: ` 
```json
   (    
        ('ru', 'ru'),
        ('en', 'en'),
        ('kz', 'kz'),
        ('de', 'de'),
        ('ru/en', 'ru/en'),
    )
```

  **qualification **: `Выборное поле квалификации, принимает следующие параметры: ` 
```json
   (
        ('primary_vocational_education', 'Primary vocational education'),
        ('secondary_vocational_education', 'Secondary vocational education'),
        ('bachelor', 'Bachelor'),
        ('specialist', 'Specialist'),
        ('master', 'Master'),
        ('All_levels', 'All_levels')
    )
```
  **kind_of_practice **: `Выборное поле вида практики, принимает следующие параметры: ` 
```json
    (
        ('educational', 'учебная'),
        ('production', 'производственная'),
    )
```
  **type_of_practice **: `Выборное поле типа практики, принимает следующие параметры: ` 
```json
    (
        ('intro', 'ознакомительная'),
        ('std-intro', 'учебно-ознакомительная'),
        ('tech', 'технологическая'),
        ('constr', 'конструкторская'),
        ('sci-res', 'научно-исследовательская'),
        ('sci-res-work', 'научно-исследовательская работа'),
        ('cons-exp', 'консультативно-экспертная'),
        ('res-inter', 'научно-исследовательская работа / Research Internship'),
        ('org-contr', 'организационно-управленческая'),
        ('sci-ped', 'научно-педагогическая'),
        ('exp-res', 'экспериментально-исследовательская работа'),
        ('proj-constr', 'проектно-конструкторская'),
        ('tech-proj-inter', 'проектно конструкторская / Tech Project Internship'),
        ('prod-tech', 'производственно-технологическая'),
        ('ind-tech', 'технологическая (проектно-технологическая) / Industrial and tech Internship'),
        ('teh-proj-tech-intet', 'технологическая (проектно-технологическая)/ Tech Project Internship'),
        ('tech-proj-tech', 'технологическая (проектно-технологическая)'),
        ('senior-inter', 'эксплуатационная; преддипломная, преддипломная / Senior internship'),
        ('inter', 'стажировка'),
    )
```
  **way_of_doing_practice **: `Выборное поле способа прохождения практики, принимает следующие параметры: ` 
```json
    (
        ('stationary', 'Стационарная '),
        ('external', 'Выездная '),
        ('stationary-external', 'Стационарно / выездная '),
    )
```
  **format_practice **: `Выборное поле формата практики, принимает следующие параметры: ` 
```json
    (
        ('dedicated', 'Выделенная '),
        ('dispersed ', 'Рассредоточенная '),
    )
```