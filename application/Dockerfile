FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /application
COPY requirements.txt /server
COPY . /application
RUN pip install --upgrade pip
RUN pip install -r requirements.txt