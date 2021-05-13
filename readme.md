# Учебная аналитика
Репозиторий для хранения серверной части проекта "Учебная аналитика"

## Настройка получения данных о настройках из файла окружения для продакшн и девелопмент версии

В папке /application/analytics_project/ создать файл .env. Настоить в нем режим дебагинга, подключение к БД, secret_key. Пример:

```
DEBUG=True
DATABASE_URL=postgres://postgres:ПАРОЛЬ@db:5432/analytics_db
SECRET_KEY=СЕКРЕТНЫЙ_КЛЮЧ_ДЖАНГО
ISU_CLIENT_ID=''
ISU_CLIENT_SECRET=''
ISU_REDIRECT_URI=''
BARS_LOGIN=''
BARS_PASSWORD=''
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
PORTS = "6435:5432"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=ПАРОЛЬ
POSTGRES_DB=analytics_db
```

### Запуск продакшн версии

```
docker-compose -f docker-compose-prod.yml build
docker-compose -f docker-compose-prod.yml up
```
Не забудьте закрыть порты в настройках docker-compose

## Восстановление данных



