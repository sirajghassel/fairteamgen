from flask_restful import Resource, reqparse
from db import fetchall, execute

parser = reqparse.RequestParser()
parser.add_argument('name', required=True)
parser.add_argument('frequency', required=True)
parser.add_argument('skill', required=True)
parser.add_argument('age', required=True)

class Players(Resource):
    def get(self, eventpin): #players will be linked via an eventpin
        sql = "SELECT * FROM players  WHERE event_pin= '{0}'"
        sql = sql.format(eventpin)
        myresult = fetchall(sql)
        if myresult is None:
            return {'status': 'wrong pin'}, 404
        else:
            return myresult

    def post(self, eventpin):
        args = parser.parse_args()
        sql = "INSERT INTO players (name, age, skill, frequency, event_pin) VALUES ('{0}','{1}','{2}','{3}', '{4}')"
        sql = sql.format(args['name'], args['age'], args['skill'], args['frequency'], eventpin)
        execute(sql)
        return {'status': 'success'}
