import os

from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from dotenv import load_dotenv
from model import query_home_recommendation, query_cities

load_dotenv()
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

BASE_URL = "https://www.google.com/maps/embed/v1/directions?origin={0}&destination={1}&key={2}"

app = Flask(__name__)
CORS(app)


@app.route('/commute/<string:work1>/<string:work2>')
def make_recommendation(work1, work2):
  work1 = work1.title()
  work2 = work2.title()
  return jsonify(query_home_recommendation(work1, work2))


@app.route('/maps/<string:origin>/<string:destination>')
def get_link(origin, destination):
  origin = origin.title()
  destination = destination.title()
  origin += " CA"
  destination += " CA"
  return jsonify(BASE_URL.format(origin, destination, API_KEY).replace(" ", "%20"))


@app.route('/cities')
def search_cities():
  term = request.args.get('term')
  return jsonify(query_cities(term))
