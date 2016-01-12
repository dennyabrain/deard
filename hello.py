from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY']='secret!'
app.config['DEBUG']=True

socketio = SocketIO(app)

@app.route('/')
def home():
	return 'Home'

if __name__=='__main__':
	socketio.run(app)