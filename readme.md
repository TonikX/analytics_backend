# Учебная аналитика
Репозиторий для хранения серверной части проекта "Учебная аналитика"

## Настройка получения данных о настройках из файла окружения

В папке /application/analytics_project/ создать файл .env. Настоить в нем режим дебагинга, подключение к БД, secret_key. Пример:

```
DEBUG=False
DATABASE_URL=postgres://postgres:dfsf@db:5432/analytics_db
SECRET_KEY=fdsfdsf
```

## Запуск версии для разработки

```
docker-compose build
docker-compose up
```

## Запуск продакшн версии

```
docker-compose -f docker-compose-prod.yml build
docker-compose -f docker-compose-prod.yml up
```
Не забудьте закрыть порты в настройках docker-compose

## Восстановление данных

