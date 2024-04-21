# Конструктор образовательных программ (op.itmo.ru)

Данный репозиторий является monorepo и содержит в себе backend, frontend, документацию и конфиги nginx

## Развертывание Backend

Бэкенд проекта содержится в папке application

На данный момент используется версия Python 3.11

### Подготовка проекта

1) Поднимите PostgreSQL локально или используя Docker. Создайте базу (например, analytics_db).

2) Запросите у @TonikX актуальный дамп или DDL-схему и накатите на БД используя psql
   ```bash
   psql -h localhost -p 5432 -d analytics_db -U postgres -W -f ./analytics_db-dump.sql
   ```
3) Склонируйте репозиторий и перейдите в папку application
    ```bash
    git clone https://github.com/TonikX/analytics_backend
    cd ./analytics_backend/application
    ```

4) Создайте в папке application файл .env, скопировав его из примера .env.example
   ```bash
   cp ./.env.example ./.env
   ```

5) Заполните скопированный .env файл. Обязательной для запуска проекта является переменная DATABASE_URL.

### Локальное развертывание

1) Убедитесь, что используете нужную версию Python. Актуальную версию можно посмотреть в pyproject.toml.
    ```bash
    python --version
    ```

2) Установите и активируйте виртуальное окружение
    ```bash
    python -m venv venv
   
   # Unix/MacOS
    . ./venv/bin/activate
   
   # Windows
   . ./venv/Scripts/activate
    ```

3) Обновите инструменты для сборки зависимостей и установите pip-tools
    ```bash
    python -m pip install -U pip
    python -m pip install -U setuptools wheel
    python -m pip install pip-tools
    ```

4) Перейдите в папку application и установите зависимости (см. документацию pip-tools)
    ```bash
   cd ./application
   
   # Для среды разработки
   pip-sync requirements-dev.txt
   
   # Для продуктивной среды
   pip-sync requirements.txt
   ```
5) Фейканите миграции (так как БД уже заполнена данными). Если будут появляться ошибки о взаимных импортах, закомментируйте зависимости в миграциях.
   (да, такой подход - это bad practice, но на данный момент миграции в проекте не распространяются)
   ```bash
   python manage.py makemigrations
   python manage.py migrate --fake
   ```

6) Запустите проект
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```

## Развертывание frontend

1) Установите node.js (проверено на версии 18)
2) Перейдите в папку frontend
3) Создайте файл .env по примеру .env.example
   ```bash
   cp ./.env.example ./.env
   ```
4) Установите библиотеки
   ```bash
   npm install --legacy-peer-deps
   ```
5) Запустите проект
   ```bash
   npm start
   ```

## Соглашения о качестве кода

### 1. Используйте pre-commit-hooks для проверки ваших коммитов

После запуска venv и установки **requirements-dev.txt**, запустите команду:

   ```bash
   pre-commit install
   ```

Теперь все ваши коммиты будут проверяться в соответствии с конфигурацией .pre-commit-config.yaml

(Опционально) Вы можете запустить проверки для всех файлов командой:

   ```bash
   pre-commit run --all-files
   ```

Больше информации тут: https://pre-commit.com/
   
### 2. Управляйте зависимостями только через pip-tools

Напрямую редактируйте только файл pyproject.toml.
Не добавляйте в него субзависимости, которые не используются в проекте напрямую.
После обновлений в pyproject.toml запустите эти команды, чтобы обновить файлы requirements:

   ```bash
   # В папке application
   pip-compile --rebuild --strip-extras --output-file=requirements.txt pyproject.toml
   pip-compile --rebuild --extra=dev --strip-extras --output-file=requirements-dev.txt pyproject.toml
   ```

Для установки зависимостей используйте команду pip-sync

   ```bash
   pip-sync requirements.txt
   # или
   pip-sync requirements-dev.txt
   ```
