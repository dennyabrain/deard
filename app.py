from db import db
import sys
from flask import Flask, request, redirect, url_for, render_template
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
		text = request.form['text'].split(' ',1)
		databaseUser.insertReply(text[0],text[1])
		return 'done putting reply into database'

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
		return render_template('login.html')

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
		return render_template('register.html')
		
	#databaseUser.insertOne({request.form['username']:{'pw':request.form['pw']}})
	databaseUser.insertOne({request.form['username']: {'pw':request.form['pw'],'input':[],'response':[]}})
	return 'added to database'

@app.route('/comments', methods=['POST'])
def comment():
	if request.method=='POST':
		print(flaskLogin.current_user.id)
		#print(request.form['text'])
		databaseUser.insertInput(flaskLogin.current_user.id,request.form['text'])
		return str(request.form['author'])
	return 'data GETed'

@app.route('/login2',methods=['POST'])
def login2():
	if request.method=='POST':
		print('in post of login2')
		for post in databaseUser.findMany({}):
			print('in post.2 of login2')
			if request.form['userKey'] in post:
				print('in post.3 of login2')
				if request.form['password']==post[request.form['userKey']]['pw']:
					print('in post.4 of login2')
					user = User()
					user.id=request.form['userKey']
					flaskLogin.login_user(user)
					print ('flask has logged in and user is : ')
					print (flaskLogin.current_user.id)
					#return redirect(url_for('diary'))
					return '{"status":"success"}'
				#return str(post[request.form['username']]['pw'])
		return '{"status":"fail"}'

if __name__=='__main__':

	app.run(debug=True, host='0.0.0.0')
