from flask import Flask, jsonify

app = Flask(__name__)

dummy_article = {
    'author':'ctmbl',
    'title':'My dummy article',
    'body':'This is a dummy article hardcoded to build the backend'
    }

@app.route('/')
def root():
    return 'iscsc.fr backend is running'

@app.route('/api/articles', methods=['GET'])
def fetch_all_articles():
    return jsonify([dummy_article, dummy_article])

@app.route('/api/article/<id>', methods=['GET'])
def fetch_article(id):
    return jsonify(dummy_article)