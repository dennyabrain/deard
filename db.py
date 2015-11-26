from pymongo import MongoClient

class db:
	def __init__(self,dbName,collectionName,):
		self.client = MongoClient()
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