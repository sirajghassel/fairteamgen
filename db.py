import mysql.connector
import json
from config import MYSQL

mydb = mysql.connector.connect(
    host= MYSQL['host'],
    user=MYSQL['user'],
    passwd=MYSQL['passwd'],
    database=MYSQL['database']
)

def execute(query, values=None):
    mydb = mysql.connector.connect(
        host= MYSQL['host'],
        user=MYSQL['user'],
        passwd=MYSQL['passwd'],
        database=MYSQL['database']
    )
    mycursor = mydb.cursor()
    if values == None:
        mycursor.execute(query)
    else:
        mycursor.execute(query, values)
    mydb.commit()
    return mycursor

def executemany(query, values=None):
    mydb = mysql.connector.connect(
        host= MYSQL['host'],
        user=MYSQL['user'],
        passwd=MYSQL['passwd'],
        database=MYSQL['database']
    )
    mycursor = mydb.cursor()
    if values == None:
        mycursor.executemany(query)
    else:
        mycursor.executemany(query, values)
    mydb.commit()
    return mycursor

def fetchall(query, values=None):
    mydb = mysql.connector.connect(
        host= MYSQL['host'],
        user=MYSQL['user'],
        passwd=MYSQL['passwd'],
        database=MYSQL['database']
    )
    mycursor = mydb.cursor()
    if values == None:
        mycursor.execute(query)
    else:
        mycursor.execute(query, values)
    columns = [col[0] for col in mycursor.description]
    rows = [dict(zip(columns, row)) for row in mycursor.fetchall()]
    return rows

def fetchone(query, values):
    mydb = mysql.connector.connect(
        host= MYSQL['host'],
        user=MYSQL['user'],
        passwd=MYSQL['passwd'],
        database=MYSQL['database']
    )
    mycursor = mydb.cursor()
    if values == None:
        mycursor.execute(query)
    else:
        mycursor.execute(query, values)
    columns = [col[0] for col in mycursor.description]
    result = mycursor.fetchone()
    if not result:
        row = None
    else:
        row = {}
        for i, x in enumerate(result):
            row[columns[i]] = x
    return row
