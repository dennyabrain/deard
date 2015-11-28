from db import db
import sys
from flask import Flask, request, redirect, url_for
import requests
import json
import flask.ext.login as flaskLogin

url = 'https://hooks.slack.com/services/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'
payload = {'key1': 'value1', 'key2': 'value2','text':'asdfsadf asdf sadf '}

#database = db('slack','responseCollection')
database = db('heroku_lmx991zw','responseCollection')
databaseUser = db('heroku_lmx991zw','users')

app = Flask(__name__)
app.secret_key='itp'
loginManager=flaskLogin.LoginManager()
loginManager.init_app(app)

class User(flaskLogin.UserMixin):
	pass

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
		#return request.data
		#sys.stdout.write(request)
		database.insertOne({'response':request.form['text']})
		#database.insertOne({'response':'test4'})
		#r = requests.post(url, data=json.dumps({'text':'hearing back from the app'}))
		return 'done putting reply into database'

@app.route('/')
def home():
	return 'Home Page'

@app.route('/diary', methods=['POST','GET'])
@flaskLogin.login_required
def diary():
	if request.method=='POST':
		requests.post(url, data=json.dumps({'text':request.form['text']}))
		return redirect(url_for('diary'))
		#return 'posted'
	
	return '''
			<form action='diary' method='post'>
				<input type='text' name='text', id='text', placeholder='email'></input>
				<input type='submit' name='send'></input>
			</form>
			'''

@app.route('/login',methods=['POST','GET'])
def login():
	if request.method=='GET':
		return'''
		<form action='login' method='post'>
			<input type='text' name='username', id='username', placeholder='username'></input>
			<input type='password' name='pw', id='pw', placeholder='password'></input>
			<input type='submit' name='login'></input>
		</form>
		'''
	#ans = ''
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
	return 'Logged Out'
	
@app.route('/register',methods=['POST','GET'])
def register():
	if request.method=='GET':
		return'''
		<h3>Choose a username and password for yourself</h3>
		<form action='register' method='post'>
			<input type='text' name='username', id='username', placeholder='username'></input>
			<input type='password' name='pw', id='pw', placeholder='password'></input>
			<input type='submit' name='login'></input>
		</form>'''
	databaseUser.insertOne({request.form['username']:{'pw':request.form['pw']}})
	return 'added to database'
