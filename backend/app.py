from flask import Flask, jsonify

app = Flask(__name__)

dummy_article = {
    'author':'ctmbl',
    'title':'My dummy article',
    'body':'This is a dummy article hardcoded to build the backend',
    '_id':"1"
    }

dummy_article_2 = {
    'author':'ctmbl',
    'title':'My dummy article 2',
    'body':'This is a dummy article 2',
    '_id':"2"
    }

@app.route('/')
def root():
    return 'iscsc.fr backend is running'

@app.route('/api/articles', methods=['GET'])
def fetch_all_articles():
    return jsonify([dummy_article, dummy_article_2])

@app.route('/api/articles/<id>', methods=['GET'])
def fetch_article(id):
    return jsonify(dummy_article)