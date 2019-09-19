# fairteamgen

## Requirements
- MySQL
- Python 3.x
- Node

## Installation

#### Backend 

```sh
$ python3 -m venv venv
$ source activate venv/bin/activate
$ pip3 intsall -r requirements.txt
```

Create database and run `db.sql` file.

Create a `config.py` and paste this in it.
```python
MYSQL = {
	'user': 'root',
	'passwd': '',
	'host': 'localhost',
	'database': 'dbname'
}
```

#### Frontend
```sh
$ cd static
$ npm i
```

## Deployment
### Development 
#### Backend
```sh
$ python3 app.py
```
#### Frontend
```sh
$ cd static
$ npm start
```

### Production
#### Backend
```sh
$ python3 app.py prod
```
#### Front end
```sh
$ cd static
$ npm run build
$ serve -s build
```
