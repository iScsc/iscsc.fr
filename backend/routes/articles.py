from flask import Blueprint
from controllers.articleController import *

articles = Blueprint("articles", "backend")  # FIXME: don't hardcode backend

articles.add_url_rule("/", "get_all_articles", get_all_articles, methods=["GET"])
articles.add_url_rule("/<id>", "get_article", get_article, methods=["GET"])
articles.add_url_rule("/", "post_article", post_article, methods=["POST"])
articles.add_url_rule("/<id>", "delete_article", delete_article, methods=["DELETE"])
articles.add_url_rule(
    "/by-author/<author>",
    "get_article_by_author",
    get_article_by_author,
    methods=["GET"],
)

# Not implemented yet in the frontend
# articles.add_url_rule(put_article, "/<id>", methods=["PUT"])
