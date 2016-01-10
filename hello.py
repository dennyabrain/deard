from db import db
import sys
from flask import Flask, request, redirect, url_for, render_template, jsonify, session
import requests
import json
import flask.ext.login as flaskLogin
import afinn
from datetime import datetime, timedelta, date, time
import logging
from ml import ml
from uuid import uuid4
from flask.ext.bcrypt import Bcrypt
from helper import incrementCFT
from responseHelper import Response
from flask.ext.socketio import SocketIO, emit
from mTurk import mTurk

url = 'https://hooks.slack.com/services/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'
payload = {'key1': 'value1', 'key2': 'value2','text':'asdfsadf asdf sadf '}

database = db('heroku_lmx991zw','responseCollection')
databaseUser = db('heroku_lmx991zw','users')


app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

loginManager=flaskLogin.LoginManager()
loginManager.init_app(app)
bcrypt = Bcrypt(app)

socket = SocketIO(app)

mturk = mTurk()

response=Response()

commentFormType=['greeting','mood','situation','feeling','thought','preMechTurk','review','rethinking','bye']

class User(flaskLogin.UserMixin):
	pass

def request_wants_json():
    best = request.accept_mimetypes.best_match(['application/json', 'text/html'])
    return best == 'application/json' and request.accept_mimetypes[best] > request.accept_mimetypes['text/html']


@loginManager.user_loader
def user_loader(user_id):
	for post in databaseUser.findMany({}):
		if user_id in post:
			user=User()
			user.id=user_id
			return user
	return None

