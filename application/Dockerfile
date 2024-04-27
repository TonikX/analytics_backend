FROM python:3.11
ENV PYTHONUNBUFFERED 1
WORKDIR /application
COPY requirements.txt /server
COPY . /application

RUN apt-get update && apt-get install -y locales

# Locale
RUN sed -i -e \
  's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
   && locale-gen

ENV LANG ru_RU.UTF-8
ENV LANGUAGE ru_RU:ru
ENV LC_LANG ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8

# +Timezone (если надо на этапе сборки)
ENV TZ Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN python -m pip install -U pip
RUN python -m pip install -U setuptools wheel
RUN python -m pip install -U pip-tools
RUN pip-sync requirements.txt
