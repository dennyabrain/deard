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

socket = SocketIO(app,logger=True, engineio_logger=True)

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
	print("logged out")
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
		# Set the date range (default: 7 days)
		daterange = int(request.args.get('range', 7))
		if daterange < 1 or daterange > 90:
			daterange = 7

		# Set startdate (default: today) and enddate
		startdate_str = request.args.get('startdate', None)
		if not startdate_str:
			startdate = datetime.today()
		else:
			startdate = datetime.strptime(startdate_str, '%Y-%m-%d') # 2015-12-31
		enddate = (startdate - timedelta(days=daterange))

		# Initialize results
		text = {}
		for i in range(daterange):
			text[ str(i) ] = []

		# Get comments from database
		comments = databaseUser.listAllText(flaskLogin.current_user.id)
		for item in comments:
			temp = []
			if 'created_at' in item:
				# Calculate difference based on each day
				td = ( startdate.date() - item['created_at'].date() ).days

				# Ensure comment is in date range, add to array for that day
				if td < daterange and td >= 0:
					text[ str(td) ].append(item)

		# Return results
		return jsonify(comments=text,daterange=daterange,startdate=startdate.strftime('%Y-%m-%d'),enddate=enddate.strftime('%Y-%m-%d'))

@app.route('/comments', methods=['POST','GET'])
def comment():
	if request.method=='POST':
		postId=session['id']
		if session['index']==1: #MOOD
			databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'],session['id'])
			#HACKY MOOD MAPPING
			if request.form['text']==':D' or request.form['text']==':)':
				mood="happy"
			elif request.form['text']==':/':
				mood="ok"
			else:
				mood="bad"

			session['mood']=mood
			session['index']=incrementCFT(session['index'])
			text = response.getSituation(session['mood'])
			databaseUser.insertReply(flaskLogin.current_user.id,text, session['id'], commentFormType[session['index']],0)

			#Converting datetime.now and uuid to str because they are not JSON serializable. Also I know they aren't being used in the front end.
			socket.emit('insert',{
								'text':text,
								'affin_score':0,
								'created_at':str(datetime.now()),
								'post_id':str(session['id']),
								'type':'bot', 
								'commentFormType':commentFormType[session['index']]})
			databaseUser.insertSetSession(flaskLogin.current_user.id,'sessionData',{"sessionId":session['id'],"sessionIndex":session['index']})
		elif session['index']==2: #SITUATION
			databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'],session['id'])
			session['index']=incrementCFT(session['index'])
			text = response.getFeeling(session['mood'])
			databaseUser.insertReply(flaskLogin.current_user.id,text, session['id'], commentFormType[session['index']],0)
			socket.emit('insert',{
								'text':text,
								'affin_score':0,
								'created_at':str(datetime.now()),
								'post_id':str(session['id']),
								'type':'bot', 
								'commentFormType':commentFormType[session['index']]})
			session['text']=request.form['text']
			databaseUser.insertSetSession(flaskLogin.current_user.id,'sessionData',{"sessionId":session['id'],"sessionIndex":session['index']})
		elif session['index']==3: #FEELING
			databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'],session['id'])
			session['index']=incrementCFT(session['index'])
			text = response.getThought(session['mood'])
			databaseUser.insertReply(flaskLogin.current_user.id,text, session['id'], commentFormType[session['index']],0)
			socket.emit('insert',{
								'text':text,
								'affin_score':0,
								'created_at':str(datetime.now()),
								'post_id':str(session['id']),
								'type':'bot', 
								'commentFormType':commentFormType[session['index']]})
			session['text']+='\n Feelings :'+request.form['text']
			databaseUser.insertSetSession(flaskLogin.current_user.id,'sessionData',{"sessionId":session['id'],"sessionIndex":session['index']})
		elif session['index']==4: #THOUGHT
			databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'],session['id'])
			session['index']=incrementCFT(session['index'])
			#session['thought']=request.form['text']
			text = response.getPreMechTurk(session['mood'])
			databaseUser.insertReply(flaskLogin.current_user.id,text, session['id'], commentFormType[session['index']],0)
			socket.emit('insert',{
								'text':text,
								'affin_score':0,
								'created_at':str(datetime.now()),
								'post_id':str(session['id']),
								'type':'bot', 
								'commentFormType':commentFormType[session['index']]})
			session['text']+='\n Thoughts : '+request.form['text']+'\n'
			databaseUser.insertSetSession(flaskLogin.current_user.id,'sessionData',{"sessionId":session['id'],"sessionIndex":session['index']})
		elif session['index']==5: #PREMECHTURK
			databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'],session['id'])
			session['index']=incrementCFT(session['index'])
			id=mturk.createHit(session['text'])
			databaseUser.insertLastHit(flaskLogin.current_user.id,session['text'],id)
			botResponse = "insert mTurk Response"
			databaseUser.insertReply(flaskLogin.current_user.id,botResponse, session['id'], commentFormType[session['index']],0)
			socket.emit('insert',{
								'text':botResponse,
								'affin_score':0,
								'created_at':str(datetime.now()),
								'post_id':str(session['id']),
								'type':'bot', 
								'commentFormType':commentFormType[session['index']]})
			databaseUser.insertSetSession(flaskLogin.current_user.id,'sessionData',{"sessionId":session['id'],"sessionIndex":session['index']})
		elif session['index']==6: #REVIEW
			databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'],session['id'])
			session['index']=incrementCFT(session['index'])
			session['review']=request.form['text']
			botResponse = response.getReview(session['review'])
			databaseUser.insertReply(flaskLogin.current_user.id,botResponse, session['id'], commentFormType[session['index']],0)
			#socket.emit('insert','hello review')
			botResponse2 = response.getRethinking(session['review'])
			databaseUser.insertReply(flaskLogin.current_user.id,botResponse2, session['id'], commentFormType[session['index']],0)
			
			socket.emit('insert',{
								'text':botResponse,
								'affin_score':0,
								'created_at':str(datetime.now()),
								'post_id':str(session['id']),
								'type':'bot', 
								'commentFormType':commentFormType[session['index']]})
			socket.emit('insert',{
								'text':botResponse2,
								'affin_score':0,
								'created_at':str(datetime.now()),
								'post_id':str(session['id']),
								'type':'bot', 
								'commentFormType':commentFormType[session['index']]})
			databaseUser.insertSetSession(flaskLogin.current_user.id,'sessionData',{"sessionId":session['id'],"sessionIndex":session['index']})
		elif session['index']==7: #RETHINKING
			databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'],session['id'])
			session['index']=incrementCFT(session['index'])
			botResponse = response.getBye(session['mood'])
			databaseUser.insertReply(flaskLogin.current_user.id,botResponse, session['id'], commentFormType[session['index']],0)
			socket.emit('insert',{
								'text':botResponse,
								'affin_score':0,
								'created_at':str(datetime.now()),
								'post_id':str(session['id']),
								'type':'bot', 
								'commentFormType':commentFormType[session['index']]})

		"""
		Post Question on mTurk
		"""

		return jsonify(status='commentInsert')

	if request.method=='GET':
		#obj{}
		# TODO : GET ALL COMMENTS FROM DB FROM THAT USER
		if request_wants_json():
			if flaskLogin.current_user and flaskLogin.current_user.id:
				comments = databaseUser.listAllText(flaskLogin.current_user.id)
				return jsonify(userKey=flaskLogin.current_user.id, comments=comments)
			else:
				return jsonify(error='true')
		else:
			return render_template('index.html')

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
					
					sessionDB = databaseUser.getSession(flaskLogin.current_user.id)
					if sessionDB['sessionIndex'] != 7:
						session['id']=sessionDB['sessionId']
						session['index']=sessionDB['sessionIndex']
						databaseUser.insertSetSession(flaskLogin.current_user.id,'sessionData',{"sessionId":session['id'],"sessionIndex":session['index']})
						socket.emit('login',{
								'commentFormType':commentFormType[session['index']]})
					else:
						session['id']=uuid4()
						session['index']=1
						databaseUser.insertSetSession(flaskLogin.current_user.id,'sessionData',{"sessionId":session['id'],"sessionIndex":session['index']})
						databaseUser.insertReply(request.form['userKey'],"Hey, %s. How's it going?" % request.form['userKey'], session['id'],"greeting",0)
						databaseUser.insertReply(request.form['userKey'],"Good morning. How is your mood today?", session['id'],"mood",0)
					
					return '{"status":"success"}'
		return '{"status":"fail"}'

@app.route('/deard', methods=['POST'])
def deard():
	if request.method=='POST':
		#print request.form['test']
		return '{"status":"successDbInsert"}'

if __name__=='__main__':
	#app.run(debug=True, host='0.0.0.0')
	socket.run(app, debug=True,port=3000)