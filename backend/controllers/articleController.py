from flask import jsonify
from .dummy_data import *
from database import db

#https://pymongo.readthedocs.io/en/stable/tutorial.html#getting-a-collection
articles = db["articles"]

articles.insert_one(dummy_article)
articles.insert_one(dummy_article_2)


# TODO: Implement auth middleware logic to check if user is logged in


# TODO: fetch one article from database
def get_article(id):
    article = articles.find_one(filter = {"_id" : id})
    if article is not None:
        return jsonify(article), 200
    return "", 404


# TODO: create one article
def post_article():
    return jsonify({"success": True}), 200


# TODO: modify one article in the database
def put_article():
    return jsonify({"success": True}), 200


# TODO: delete one article from database
def delete_article(id):
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
