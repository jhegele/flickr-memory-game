from flask import Flask, render_template, url_for, jsonify, request, Blueprint
from flickr import Flickr
import requests
import random
import os

app = Flask(__name__)
flickr = Flickr(os.environ.get('FLICKR_MEMORY_GAME'))

bp = Blueprint('bp', __name__, template_folder='templates', static_folder='static')

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/get-images/<query>/<int:num_images>', methods=['POST'])
def get_images(query, num_images):
    photos = flickr.photos_search(tags=query, sort='relevance', safe_search=1)
    if len(photos) > 3 * num_images:
        photos = photos[:(3 * num_images)]
    random.shuffle(photos)
    return jsonify({
        'photos': [
            photo.url('n') for photo in photos[:num_images]
        ]
    })
    
app.register_blueprint(bp, url_prefix='')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)