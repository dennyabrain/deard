from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY']='secret!'
socket = SocketIO(app)

@app.route('/')
def home():
	return render_template('chat.html')

@socket.on('message')
def handle_message(message):
	print('received message :'+message)

@socket.on('my event')
def handle_myevent(json):
	print('received json'+str(json))
	emit('response','hello')


if __name__=='__main__':
	socket.run(app)