import multiprocessing
import os

import environ
from gunicorn.app.wsgiapp import WSGIApplication
from uvicorn.workers import UvicornWorker

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

env = environ.Env(
    PROJECT_HOST=(str, "127.0.0.1"),
    PROJECT_PORT=(str, "8000"),
)
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))


class DjangoUvicornWorker(UvicornWorker):
    """
    Generate UvicornWorker with lifespan='off', because Django does not
    (and probably will not https://code.djangoproject.com/ticket/31508)
    support Lifespan.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.config.lifespan = "off"


class StandaloneApplication(WSGIApplication):
    def __init__(self, app_uri, options=None):
        self.options = options or {}
        self.app_uri = app_uri
        super().__init__()

    def load_config(self):
        config = {
            key: value
            for key, value in self.options.items()
            if key in self.cfg.settings and value is not None
        }
        for key, value in config.items():
            self.cfg.set(key.lower(), value)


def run():
    options = {
        "bind": env.str("PROJECT_HOST") + ":" + env.str("PROJECT_PORT"),
        "workers": (multiprocessing.cpu_count() * 2) + 1,
        "worker_class": "server.DjangoUvicornWorker",
    }
    StandaloneApplication(
        app_uri="analytics_project.asgi:application", options=options
    ).run()


if __name__ == "__main__":
    run()
