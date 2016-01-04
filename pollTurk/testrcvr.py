from flask import Flask,request, jsonify

app=Flask(__name__)

@app.route('/',methods=['POST','GET'])
def home():
	if request.method=='POST':
		print 'got HTTP Post' + str(request.values['mTurkResponse'])
		#print 'got HTTP Post' + str(request.args['value'])
		return jsonify(value=request.values['mTurkResponse'])
	else:
		return 'Get Successfully'

if __name__=='__main__':
	app.run(debug='True',host='0.0.0.0')