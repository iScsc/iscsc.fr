from flask import Flask, jsonify

app = Flask(__name__)

dummy_article = {
    'author':'ctmbl',
    }

@app.route('/')
def root():
    return 'iscsc.fr backend is running'

@app.route('/api/articles', methods=['GET'])
def fetch_all_articles():


@app.route('/api/article/<id>', methods=['GET'])
def fetch_article(id):
    return 