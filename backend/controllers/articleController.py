from flask import jsonify
from .dummy_data import *

# TODO: Implement auth middleware logic to check if user is logged in


# TODO: fetch one article from database
def get_article(id):
    if id == "1":
        return jsonify(dummy_article), 200
    elif id == "2":
        return jsonify(dummy_article_2), 200
    else:
        return "", 404


# TODO: create one article
def post_article():
    return jsonify({"success": True}), 200


# TODO: modify one article in the database
def put_article():
    return jsonify({"success": True}), 200


# TODO: delete one article from database
def delete_article():
    return jsonify({"success": True}), 200


# TODO: fetch all articles from database
def get_all_articles():
    return jsonify([dummy_article, dummy_article_2]), 200


# TODO: fetch one article from database by author
def get_article_by_author(author):
    if author == "ctmbl":
        return jsonify([dummy_article, dummy_article_2]), 200
    else:
        return "", 404
