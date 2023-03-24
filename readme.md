# Учебная аналитика
Репозиторий для хранения серверной части проекта "Учебная аналитика"

## Настройка получения данных о настройках из файла окружения для продакшн и девелопмент версии

В папке /application/analytics_project/ создать файл .env. Настоить в нем режим дебагинга, подключение к БД, secret_key. Пример:

```
DEBUG=True
DATABASE_URL=postgres://**ЛОГИН:ПАРОЛЬ**@db:5432/analytics_db
SECRET_KEY=СЕКРЕТНЫЙ_КЛЮЧ_ДЖАНГО
ISU_CLIENT_ID=''
ISU_CLIENT_SECRET=''
ISU_REDIRECT_URI=''
BARS_LOGIN=''
BARS_PASSWORD=''
ISU_FINISH_URI_WITH_PROTOCOL=''
BARS_URL=''
EMAIL_HOST_USER=''
EMAIL_HOST=''
EMAIL_PORT=''
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
EMAIL_HOST_PASSWORD=''
URL_FRONT=localhost
EMAIL_ENABLE=True
SENTRY_URL=""
AP_FILE_ROUTE="/application/static-backend/export_template/academic_plan_template_2023.xlsx"
ISU_URL_UPDATERS=''

```
В папке /application/onlinecourse создать файл .env. Пример:
```
CERT=''
KEY=''

```

### Запуск версии для разработки

```
docker-compose build
docker-compose up
```

## Дополнительные настройки для продакшн вресии

Поменять в файле настроек /application/analytics_project/ режми дебагинга на False.

В папке / создать файл .env. Настоить в нем режим подключение к БД из Docker-контейнера. Пример:

```
PORTS = "внешний порт:5432"
POSTGRES_USER=**ЛОГИН**
POSTGRES_PASSWORD=**ПАРОЛЬ**
POSTGRES_DB=analytics_db
```

### Запуск продакшн версии

```
docker-compose -f docker-compose-prod.yml build
docker-compose -f docker-compose-prod.yml up
```
Не забудьте закрыть порты в настройках docker-compose

## Восстановление данных
Для восстановления данных использовать [этот дамп](https://drive.google.com/file/d/1uujibvNcLZHorh2bfOeU-3ljX7KaYfjd/view?usp=sharing)



