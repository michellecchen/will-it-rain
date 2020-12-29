from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
# from flask.ext.cors import CORS, cross_origin
import numpy as np
import joblib
import os

flask_app = Flask(__name__)

# flask_app.config['SECRET_KEY'] = "the quick brown fox jumps over the lazy dog"
# flask_app.config['CORS_HEADERS'] = 'Content-Type'
# cors = CORS(flask_app, resources={r"/foo": {"origins": "http://localhost:port"}})


app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Will it rain?", 
		  description = "Predict the weather!")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				{'MinTemp': fields.Float(required = True, 
				  						description="Today's lowest temperature (Celsius)", 
    					  				help="This field cannot be blank"),
				'MaxTemp': fields.Float(required = True, 
				  						description="Today's highest temperature (Celsius)", 
    					  				help="This field cannot be blank"),
				'Rainfall': fields.Float(required=True,
				  						description='Inches of rainfall from today',
										help="This field cannot be blank"),
				'WindGustDir': fields.String(required = True, 
				  						description="Cardinal direction of today's wind", 
    					  				help="This field cannot be blank"),
				'WindGustSpeed': fields.Integer(required=True,
										description="Speed of today's wind",
										help="This field cannot be blank"),
				'WindDir9am': fields.String(required=True,
										description="Cardinal direction of today's wind at 9 AM",
										help='This field cannot be blank'),
				'WindDir3pm': fields.String(required=True,
										description="Cardinal direction of today's wind at 3 PM",
										help='This field cannot be blank'),
				'WindSpeed9am': fields.Integer(required=True,
										description="Speed of today's wind at 9 AM",
										help='This field cannot be blank'),
				'WindSpeed3pm': fields.Integer(required=True,
										description="Speed of today's wind at 3 PM",
										help='This field cannot be blank'),
				'Humidity9am': fields.Integer(required=True,
										description='Humidity at 9 AM',
										help='This field cannot be blank'),
				'Humidity3pm': fields.Integer(required=True,
										description='Humidity at 3 PM',
										help='This field cannot be blank'),
				'Pressure9am': fields.Float(required=True,
										description='Pressure at 9 AM',
										help='This field cannot be blank'),
				'Pressure3pm': fields.Float(required=True,
										description='Pressure at 3 PM',
										help='This field cannot be blank'),
				'Temp9am': fields.Float(required=True,
										description='Temperature (Celsius) at 9 AM',
										help='This field cannot be blank'),
				'Temp3pm': fields.Float(required=True,
										description='Temperature (Celsius) at 3 PM',
										help='This field cannot be blank'),
				'RainToday': fields.String(required=True,
										description='Did it rain today?',
										help='This field cannot be blank')})

# clf = joblib.load('clf.pkl')
filename = 'clf.joblib'
if os.path.getsize(filename) > 0:
	# clf = pickle.load(open('clf.pkl', 'rb'))
	clf = joblib.load(filename)
else:
	print('ERROR: File is empty, cannot be loaded.')

directions = {
	"N": 1, "NNE": 2, "NE": 3, "ENE": 4,
	"E": 5, "ESE": 6, "SE": 7, "SSE": 8,
	"S": 9, "SSW": 10, "SW": 11, "WSW": 12,
	"W": 13, "WNW": 14, "NW": 15, "NNW": 16
}

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", '*')
		response.headers.add('Access-Control-Allow-Headers', '*')
		response.headers.add('Access-Control-Allow-Methods', '*')
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			
			data[3] = directions[data[3]]
			data[5] = directions[data[5]]
			data[6] = directions[data[6]]
			if data[15] == 'Yes':
				data[15] = 1
			else:
				data[15] = 0

			prediction = clf.predict(np.array(data).reshape(1,-1)) #???
			types = { 1: "Yes", -1: "No" }
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "Prediction: " + types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})