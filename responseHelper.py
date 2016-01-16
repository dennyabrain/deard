import json
from pprint import pprint
from datetime import datetime
from random import randrange

class BotResponse:
	def __init__(self):
		self.data={}

		with open('responseText.json') as data_file:
			self.data=json.load(data_file)

	def getGreeting(self):
		hour = datetime.now().hour
		if hour<=5:
			index=randrange(0,len(self.data['greeting']['early morning']))
			return self.data['greeting']['early morning'][index]

		elif hour>5 and hour <=12:
			index=randrange(0,len(selfdata['greeting']['morning']))
			return self.data['greeting']['morning'][index]

		elif hour>12 and hour<=4:
			index=randrange(0,len(self.data['greeting']['noon']))
			return self.data['greeting']['noon'][index]

		elif hour>4:
			index=randrange(0,len(self.data['greeting']['evening']))
			return self.data['greeting']['evening'][index]

	def getMood(self):
		index=randrange(0,len(self.data['mood']))
		return self.data['mood'][index]

	def getSituation(self,mood):
		index=randrange(0,len(self.data['situation'][mood]))
		return self.data['situation'][mood][index]

	def getFeeling(self,mood):
		index=randrange(0,len(self.data['feeling'][mood]))
		return self.data['feeling'][mood][index]

	def getThought(self,mood):
		index=randrange(0,len(self.data['thought'][mood]))
		return self.data['thought'][mood][index]

	def getPreMechTurk(self,mood):
		index=randrange(0,len(self.data['preMechTurk'][mood]))
		return self.data['preMechTurk'][mood][index]

	def getReview(self,review):
		index=randrange(0,len(self.data['review'][review]))
		return self.data['review'][review][index]

	def getRethinking(self,review):
		index=randrange(0,len(self.data['rethinking'][review]))
		return self.data['rethinking'][review][index]

	def getBye(self,mood):
		index=randrange(0,len(self.data['preMechTurk'][mood]))
		return self.data['bye'][mood][index]
