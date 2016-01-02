from db import db
import sys
from flask import Flask, request, redirect, url_for, render_template, jsonify
import requests
import json
import flask.ext.login as flaskLogin
import afinn
from datetime import datetime, timedelta, date, time
import logging
from ml import ml

url = 'https://hooks.slack.com/services/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'
payload = {'key1': 'value1', 'key2': 'value2','text':'asdfsadf asdf sadf '}

#database = db('slack','responseCollection')
database = db('heroku_lmx991zw','responseCollection')
databaseUser = db('heroku_lmx991zw','users')

#ML = ml();

app = Flask(__name__)

app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)

app.secret_key='itp'
loginManager=flaskLogin.LoginManager()
loginManager.init_app(app)

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

@app.route('/diary', methods=['POST','GET'])
@flaskLogin.login_required
def diary():
	if request.method=='POST':
		requests.post(url, data=json.dumps({'text':request.form['text']}))
		#requests.post(url, data=json.dumps({'text':flaskLogin.current_user.id}))
		databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'])
		return redirect(url_for('diary'))
		#return 'posted'
	
	return render_template('diary.html',database=databaseUser.listAll(),database2=databaseUser.listAll())

@app.route('/login',methods=['POST','GET'])
def login():
	if request.method=='GET':
		return render_template('index.html')

	for post in databaseUser.findMany({}):
		if request.form['username'] in post:
			if request.form['pw']==post[request.form['username']]['pw']:
				user = User()
				user.id=request.form['username']
				flaskLogin.login_user(user)
				return redirect(url_for('diary'))
				#return "Can Log In"
			#return str(post[request.form['username']]['pw'])
	return "Username and Password don't match"

@app.route('/logout')
def logout():
	flaskLogin.logout_user()
	print("logged out")
	return redirect("/", code=302)
	
@app.route('/register',methods=['POST','GET'])
def register():
	if request.method=='GET':
		return render_template('index.html')

		
	#databaseUser.insertOne({request.form['username']:{'pw':request.form['pw']}})
	databaseUser.insertOne({"name":request.form['username'],request.form['username']: {'pw':request.form['pw'],'text':[]}})
	user = User()
	user.id=request.form['username']
	flaskLogin.login_user(user)
	databaseUser.insertReply(request.form['username'],"Hi, %s. I'm Dee. I'm here whenever you want to talk about your day, and help you keep track of the topics and your mood. How was your day today?" % request.form['username'])
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
		#print(flaskLogin.current_user.id)
		#print(request.form['text'])
		databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'])		
		requests.post(url, data=json.dumps({'text':str(str(flaskLogin.current_user.id)+' says: ' +str(request.form['text']))}))
		"""
		Trying out simplest sentiment analysis: returns a float score based on text
		"""
		text = str(request.form['text'])
		afinnScore = afinn.sentiment(text)
		#mlScore=ML.getAnalysis()
		print("******** SENTIMENT SCORE: %6.2f ********** %s" % (afinnScore, text))
		if afinnScore > 0:
			databaseUser.insertReply(flaskLogin.current_user.id,"%6.2f That's great!" % (afinnScore), score=afinnScore)
		elif afinnScore == 0:
			databaseUser.insertReply(flaskLogin.current_user.id,"%6.2f Gotcha." % (afinnScore), score=afinnScore)
		else:
			databaseUser.insertReply(flaskLogin.current_user.id,"%6.2f Sorry to hear :(" % (afinnScore), score=afinnScore)
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
				if request.form['password']==post[request.form['userKey']]['pw']:
					user = User()
					user.id=request.form['userKey']
					flaskLogin.login_user(user)
					#LOOK INTO THIS LATER. 
					#databaseUser.insertReply(request.form['userKey'],"Hey, %s. How's it going?" % request.form['userKey'])
					print ('flask has logged in and user is : ')
					print (flaskLogin.current_user.id)
					return '{"status":"success"}'
		return '{"status":"fail"}'

if __name__=='__main__':

	app.run(debug=True, host='0.0.0.0')
