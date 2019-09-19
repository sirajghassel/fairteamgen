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
