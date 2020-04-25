FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /application
WORKDIR /application
COPY requirements.txt /server
COPY . /application
RUN pip install -r requirements.txt