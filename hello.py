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

socket = SocketIO(app, logger=True, engineio_logger=True)

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

@app.route('/reply', methods=['POST'])
def reply():
	if request.method=='POST':
		text = request.form['text'].split(' ',1)
		databaseUser.insertReply(text[0],text[1])
		return '{"status":"successDbInsert"}'

@app.route('/')
def home():
	return render_template('index.html')

@app.route('/logout')
def logout():
	flaskLogin.logout_user()
	#print("logged out")
	return redirect("/", code=302)
	
@app.route('/register',methods=['POST','GET'])
def register():
	if request.method=='GET':
		return render_template('index.html')

	#Check if the user exists:
	for post in databaseUser.findMany({}):
		if request.form['username'] in post:
			return'{"status":"userExists"}'

	#Creating Hashed Password:
	pw_hash=bcrypt.generate_password_hash(request.form['pw']);

	#databaseUser.insertOne({request.form['username']:{'pw':request.form['pw']}})

	databaseUser.insertOne({"name":request.form['username'],request.form['username']: {'pw':pw_hash,'text':[]}})
	user = User()
	user.id=request.form['username']
	flaskLogin.login_user(user)
	session['id']=uuid4()
	session['index']=1
	databaseUser.insertReply(request.form['username'],"Hi, %s. I'm Dee. I'm here whenever you want to talk about your day, and help you keep track of the topics and your mood. How was your mood today?" % request.form['username'],session['id'],"mood",0.0)
	return '{"status":"success"}'

# Get from 30 day range:   /userstats?range=30
# Get from specified date:   /userstats?startdate=2015-12-01
# Get 30 days from specified date:   /userstats?range=30&startdate=2015-12-01

@app.route('/userstats', methods=['GET'])
def userstats():
	if request.method=='GET':
		return 'userstats'

@app.route('/comments', methods=['POST','GET'])
def comment():
	return 'comment'

@app.route('/login2',methods=['POST'])
def login2():
	if request.method=='POST':
		for post in databaseUser.findMany({}):
			if request.form['userKey'] in post:
				if bcrypt.check_password_hash(post[request.form['userKey']]['pw'],request.form['password']):
					user = User()
					user.id=request.form['userKey']
					flaskLogin.login_user(user)
					# CREATE A NEW SESSION ID ASSOCIATED WITH THIS USER
					session['id']=uuid4()
					session['index']=1
					databaseUser.insertReply(request.form['userKey'],"Hey, %s. How's it going?" % request.form['userKey'], session['id'],"greeting",0)
					databaseUser.insertReply(request.form['userKey'],"Good morning. How is your mood today?", session['id'],"mood",0)
					#print ('index')
					#print (session['index'])
					#print ('flask has logged in and user is : ')
					#print (flaskLogin.current_user.id)
					return '{"status":"success"}'
		return '{"status":"fail"}'

@app.route('/approve', methods=['POST'])
def approve():
	return '{"status":"coming back from Approve"}'

@app.route('/reject', methods=['POST'])
def reject():
	return '{"status":"coming back from Reject"}'

if __name__=='__main__':
	#app.run(debug=True, host='0.0.0.0')
	socket.run(app)