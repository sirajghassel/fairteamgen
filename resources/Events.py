from flask_restful import Resource, reqparse
import random, string
from db import fetchone, execute

parser = reqparse.RequestParser()
parser.add_argument('notes')
parser.add_argument('max_players')
parser.add_argument('max_teams')

class Events(Resource):
    def get(self, eventpin):
        sql = "SELECT * FROM events WHERE event_pin= '{0}'"
        sql = sql.format(eventpin)
        myresult = fetchone(sql)
        if myresult is None:
            return {'status': 'wrong pin'}, 404
        else:
            return myresult

    def post(self):
        args = parser.parse_args()
        eventpin = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(4))
        sql = "INSERT INTO events (event_pin,notes,max_players,max_teams) VALUES ('{0}','{1}','{2}','{3}')"
        sql = sql.format(eventpin, args['notes'], args['max_players'],args['max_teams'])
        execute(sql)
        return {
            'status': 'success',
            'event_pin': eventpin
        }
