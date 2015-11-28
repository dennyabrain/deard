from pymongo import MongoClient

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
				#print(post[userId]['input']), text
				#	post[userId]['input'].append(text)
				temp =userId+'.input'
				self.collection.update_one({'name': userId}, {'$push': {temp: text}})

	def insertReply(self,userId,text):
		for post in self.findMany({}):
			if userId in post:
				#print(post[userId]['input']), text
				#	post[userId]['input'].append(text)
				temp =userId+'.response'
				self.collection.update_one({'name': userId}, {'$push': {temp: text}})
