FROM python:3.5

MAINTAINER John Hegele

COPY ./app/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY ./app /app

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]

EXPOSE 5000