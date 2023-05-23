from flask import Blueprint
from controllers.userController import *

users = Blueprint("users", "backend")  # FIXME: don't hardcode backend

users.add_url_rule("/login", "login", login, methods=["POST"])
users.add_url_rule("/signup", "signup", signup, methods=["POST"])

# Not implemented yet in the frontend
# users.add_url_rule(get_user, "/<id>", methods=["GET"])
# users.add_url_rule(put_user, "/<id>", methods=["PUT"])
