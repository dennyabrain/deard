from flask import Flask, request
import requests
import json

url = 'https://hooks.slack.com/services/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'
payload = {'key1': 'value1', 'key2': 'value2','text':'asdfsadf asdf sadf '}

app = Flask(__name__)
app.secret_key='itp'

@app.route('/reply', methods=['POST'])
def reply():
	if request.method=='POST':
		print('data received')
		r = requests.post(url, data=json.dumps({'text':'hearing back from the app'}))
		return 'data recieved'
