
from pymongo import MongoClient
from os import getenv

class MissingEnvironmentVariable(Exception):
    pass

DB_PORT, DB_NAME = getenv("DB_PORT"), getenv("DB_NAME")

if DB_NAME is None:
    raise MissingEnvironmentVariable("DB_NAME is missing")

if DB_PORT is None:
    raise MissingEnvironmentVariable("DB_PORT is missing")
else:
    DB_PORT = int(DB_PORT)
    print("connecting to port : " ,DB_PORT)


client = MongoClient("mongodb", DB_PORT)

#https://pymongo.readthedocs.io/en/stable/tutorial.html#getting-a-database
db = getattr(client, DB_NAME)