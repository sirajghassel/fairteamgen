from flask import Flask
from flask_restful import Resource, Api, reqparse

from resources.Events import Events
from resources.Players import Players

app = Flask(__name__)
api = Api(app)

api.add_resource(Events, '/api/events/<string:eventpin>', '/api/events')
api.add_resource(Players, '/api/players/<string:eventpin>')


if __name__ == '__main__':
    app.run(debug=True)
