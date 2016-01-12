from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY']='secret!'
app.config['DEBUG']=True

socketio = SocketIO(app)

@app.route('/')
def home():
	return render_template('test.html')

@socketio.on('connect')
def connect():
	emit('connected','flask says hi')

if __name__=='__main__':
	socketio.run(app)