import random 
import nltk

class ml():
	def __init__(self):
		self.goodFile = open('datasets/good.txt')
		self.averageFile = open('datasets/average.txt')
		self.friendFile = open('datasets/friends.txt')
		self.relationshipFile = open('datasets/relationship.txt')	
		self.labeledFeelings=([(good.decode('utf-8'),'good') for good in self.goodFile]+
                 [(average.decode('utf-8'),'average') for average in self.averageFile]+
                 [(friend.decode('utf-8'),'friend') for friend in self.friendFile]+
                 [(relationship.decode('utf-8'),'relationship') for relationship in self.relationshipFile])
		random.shuffle(self.labeledFeelings)
		self.featuresets = [(self.features(text),label) for (text,label) in self.labeledFeelings]
		self.classifier = nltk.NaiveBayesClassifier.train(self.featuresets)

	def getAnalysis(self,text):
		return self.classifier.classify(self.features(text))

	def getNouns(self,text):
		tokens=nltk.word_tokenize(text)
		taggedWords=nltk.pos_tag(tokens)
		nouns=[word for word,pos in taggedWords if pos=='NN']
		if not nouns:
			return 'z'
		else:
			return tuple(nouns)

	def features(self,text):
		return{"nouns":self.getNouns(text)}