from flask import Flask
from routes.articles import articles
from routes.users import users

app = Flask(__name__)


@app.route("/")
def get_main():
    return "iscsc.fr backend is running"


app.register_blueprint(articles, url_prefix="/api/articles")
app.register_blueprint(users, url_prefix="/api/users")
