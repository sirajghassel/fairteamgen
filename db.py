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
    mycursor = mydb.cursor()
    if values == None:
        mycursor.execute(query)
    else:
        mycursor.execute(query, values)
    mydb.commit()
    return mycursor

def executemany(query, values=None):
    mycursor = mydb.cursor()
    if values == None:
        mycursor.executemany(query)
    else:
        mycursor.executemany(query, values)
    mydb.commit()
    return mycursor

def fetchall(query):
    mycursor = mydb.cursor()
    mycursor.execute(query)
    columns = [col[0] for col in mycursor.description]
    rows = [dict(zip(columns, row)) for row in mycursor.fetchall()]
    return rows

def fetchone(query):
    mycursor = mydb.cursor()
    mycursor.execute(query)
    columns = [col[0] for col in mycursor.description]
    result = mycursor.fetchone()
    row = {}
    for i, x in enumerate(result):
        row[columns[i]] = x
    return row
