from db import db
import sys
from flask import Flask, request, redirect, url_for
import requests
import json

url = 'https://hooks.slack.com/services/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'
payload = {'key1': 'value1', 'key2': 'value2','text':'asdfsadf asdf sadf '}

#database = db('slack','responseCollection')
database = db('heroku_lmx991zw','responseCollection')

app = Flask(__name__)
#app.secret_key='itp'

@app.route('/reply', methods=['POST'])
def reply():
	if request.method=='POST':
		#sys.stdout.write(request)
		database.insertOne({'response':request.data})
		#database.insertOne({'response':'test4'})
		r = requests.post(url, data=json.dumps({'text':'hearing back from the app'}))
		return 'done putting reply into database'

@app.route('/')
def home():
	return 'Home Page'

@app.route('/diary', methods=['POST','GET'])
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