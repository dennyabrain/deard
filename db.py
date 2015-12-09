from pymongo import MongoClient
import time

class db:
	def __init__(self,dbName,collectionName,):
		self.client = MongoClient('mongodb://heroku_lmx991zw:tbh7minpt7ihmbcshkull6nh9a@ds059524.mongolab.com:59524/heroku_lmx991zw')
		#self.client = MongoClient()
		self.db=self.client[dbName]
		self.collection=self.db[collectionName]

	def insertOne(self,entry):
		self.collection.insert_one(entry)

	def insertMany(self,entry):
		self.collection.insert_many(entry)

	def findOne(self,query):
		return self.collection.find_one(query)

	def findMany(self,query):
		return self.collection.find(query)

	def listAll(self):
		return self.collection.find()

	def insertInput(self,userId,text):
		for post in self.findMany({}):
			if userId in post:
				temp =userId+'.text'
				self.collection.update_one({'name': userId}, {'$push': {temp: {"type":"user","text":text, "created_at": time.time()}}})

	def insertReply(self,userId,text,score=0):
		for post in self.findMany({}):
			if userId in post:
				temp =userId+'.text'
				self.collection.update_one({'name': userId}, {'$push': {temp: {"type":"bot","text":text, "afinn_score": score, "created_at": time.time()}}})

	def listAllText(self,userId):
		for post in self.findMany({}):
			if userId in post:
			#	if 'text' in post:
				print(post)
				return post[userId]['text']
			#	else:
			#		return []