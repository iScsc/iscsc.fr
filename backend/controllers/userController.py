from flask import jsonify
from flask import request


# TODO: log existing user
def login():
    if (
        "name" in request.form
        and "password" in request.form
        and request.form["name"] == "atxr"
        and request.form["password"] == "123456"
    ):
        return jsonify({"success": request.form["name"] == "atxr"}), 200
    else:
        return jsonify({"success": False}), 401


# TODO: create new user
def signup():
    return jsonify({"success": True}), 200
