from transitions import Machine
from responseHelper import BotResponse
from datetime import datetime
from responseHelper import BotResponse

class Diary:
	states=['greeting','mood','situation','feeling','thought','preMechTurk','blankState','review','rethinking','bye']
	commentFormType=['greeting','mood','situation','feeling','thought','preMechTurk','blankState','review','rethinking','bye']
	affinMap = {':D':2,':)':1,':/':0,':(':-1,":'(":-2}
	def __init__(self,socket,db,mturk):
		self.socket=socket
		self.db=db
		self.response=BotResponse()
		self.mturk=mturk
		self.machine=Machine(self, states=Diary.states, initial='mood')
		self.response=BotResponse()

		#Initial Transitions
		self.machine.add_transition('next','greeting','mood')
		self.machine.add_transition('next','mood','situation')
		self.machine.add_transition('next','situation','feeling')
		self.machine.add_transition('next','feeling','thought')
		#Transitions if Mood is sad
		self.machine.add_transition('next','thought','preMechTurk',conditions='is_sad')
		self.machine.add_transition('next','preMechTurk','blankState')
		#self.machine.add_transition('next','thought','preMechTurk')
		self.machine.add_transition('next','preMechTurk','review')
		self.machine.add_transition('next','review','rethinking')
		self.machine.add_transition('next','rethinking','bye')
		#Transitions if User wants to log more
		self.machine.add_transition('next','bye','greeting',conditions='wants_to_log_more')
		#Transitions if Mood is Happy
		self.machine.add_transition('next','thought','bye',conditions='is_happy')
		#self.machine.add_transition('next','rethinking','bye')
		#Transitions if Mood is neutral
		self.machine.add_transition('next','thought','bye',conditions='is_ok')
		#self.machine.add_transition('next','rethinking','bye')
		#circular 
		self.machine.add_transition('next','bye','greeting')

		self.message=""
		self.mood=""
		self.review=""

	def initUser(self,userId,sessionIndex,sessionId,mood="",review="",message=""):
		self.username=userId
		self.sessionIndex=sessionIndex
		self.sessionId=sessionId
		self.machine.set_state(Diary.commentFormType[sessionIndex])
		self.mood=mood
		self.review=review

	def setMood(self,mood):
		self.mood=mood

	def setReview(self,review):
		self.review=review

	def updateMessage(self,text):
		self.message+=str(text)
		
	def is_sad(self):
		#print("in is_sad")
		return self.mood=='bad'

	def is_happy(self):
		#print("in is_happy")
		return self.mood=='happy'

	def is_ok(self):
		#print("in is_ok")
		return self.mood=='ok'

	def wants_to_log_more(self):
		return True

	def run(self,requestForm,room):
		#print("deard is currently in %s state" % self.state)
		if self.state=='mood':
			self.insertInputToDbase(requestForm['text'],self.state)
			self.next()
			#print("deard is currently in %s state" % self.state)
			if requestForm['text']==':D' or requestForm['text']==':)':
				self.setMood("happy")
			elif requestForm['text']==':/':
				self.setMood("ok")
			else:
				self.setMood("bad")
			#print self.mood
			affinScore=Diary.affinMap[requestForm['text']]
			self.incrementSessionIndex()
			text=self.response.getSituation(self.mood)
			self.insertReplyIntoDatabase(text,affinScore)
			self.emitInsertEvent(text,affinScore,str(datetime.now()),room)
			self.updateSessionData()
			
		elif self.state=='situation' or self.state=='feeling':
			self.insertInputToDbase(requestForm['text'],self.state)
			#text=self.fetchResponseFromJSON(self.mood)
			if self.state=='situation':
				text=self.response.getFeeling(self.mood)
				#print ("in if condition of situation")
			elif self.state=='feeling':
				text=self.response.getThought(self.mood)
				#print ("in if condition of feeling")
			self.updateMessage(self.state+" : "+str(requestForm['text'])+'\n')
			self.next()
			#print("deard is currently in %s state" % self.state)
			self.incrementSessionIndex()
			self.insertReplyIntoDatabase(text)
			self.emitInsertEvent(text,-99,str(datetime.now()),room)
			self.updateSessionData()

		elif self.state=='thought':
			if self.mood=='bad':
				self.insertInputToDbase(requestForm['text'],self.state)
				text=self.response.getPreMechTurk(self.mood)
				self.updateMessage(self.state+" : "+str(requestForm['text'])+'\n')
				self.next()
				#print("deard is currently in %s state" % self.state)
				self.incrementSessionIndex()
				self.insertReplyIntoDatabase(text)
				self.emitInsertEvent(text,-99,str(datetime.now()),room)
				id=self.mturk.createHit(self.message)
				self.db.insertLastHit(self.username,self.message,id)
				self.updateSessionData()
			else:
				self.insertInputToDbase(requestForm['text'],self.state)
				text=self.response.getBye(self.mood)
				print ("========== %s ========="%self.state)
				self.next()
				print ("========== %s ========="%self.state)
				self.sessionIndex=9
				self.insertReplyIntoDatabase(text)
				self.emitInsertEvent(text,-99,str(datetime.now()),room)
				self.updateSessionData()
				
			
		elif self.state=='preMechTurk':
			self.next()
			#print("deard is currently in %s state" % self.state)
			self.incrementSessionIndex()
			print self.sessionIndex
			#id=self.mturk.createHit(self.message)
			#self.db.insertLastHit(self.username,self.message,id)
			#print requestForm
			#print ("before emitInsertEvent")
			self.emitInsertEvent(requestForm,-99,str(datetime.now()),room)
			#print "emit insert event in preMechTurk"
			print "before calling updateSessionData in preMechTurk"
			self.updateSessionData()
			print "before calling updateSessionData in preMechTurk"
			#print "inPreMechTurk after updateSesson"
			

		elif self.state=='review':
			self.insertInputToDbase(requestForm['text'],self.state)
			self.next()
			#print("deard is currently in %s state" % self.state)
			self.incrementSessionIndex()
			self.setReview(requestForm['text'])
			text1=self.response.getReview(self.review)
			self.insertReplyIntoDatabase(text1)
			text2=self.response.getRethinking(self.review)
			self.insertReplyIntoDatabase(text2)
			self.emitInsertEvent(text1,-99,str(datetime.now()),room)
			self.emitInsertEvent(text2,-99,str(datetime.now()),room)
			self.updateSessionData()
			

		elif self.state=='rethinking':
			self.insertInputToDbase(requestForm['text'],self.state)
			self.next()
			#print("deard is currently in %s state" % self.state)
			self.incrementSessionIndex()
			text=self.response.getBye(self.mood)
			self.insertReplyIntoDatabase(text)
			self.emitInsertEvent(text,-99,str(datetime.now()),room)
			

		elif self.state=='bye':
			#Go back to state greeting
			text1="I'm glad this is helpful and you feel like talking more."
			text2="How do you feel right now?"
			#TODO start a new session
			self.db.insertReply(self.username,text1,self.sessionId,"greeting",0.0)
			self.db.insertReply(self.username,text2,self.sessionId,"mood",0.0)
			self.next()
			self.incrementSessionIndex()
			self.emitInsertEvent(text1,-99,str(datetime.now()),room)
			self.next()
			self.incrementSessionIndex()
			self.updateSessionData()
			self.emitInsertEvent(text2,-99,str(datetime.now()),room)
			self.mood=""
			self.review=""
			self.message=""

	def emitInsertEvent(self,text,affinScore,now,roomId):
		self.socket.emit('insert',{
									'text':text,
									'mood_score':affinScore,
									'created_at':str(now),
									'post_id':str(self.sessionId),
									'type':'bot',
									'commentFormType':self.state
								},room=roomId)

	def insertInputToDbase(self,text,commentFormType):
		self.db.insertInput(self.username,text,self.sessionId,commentFormType)

	def incrementSessionIndex(self):
		self.sessionIndex=(self.sessionIndex+1)%9

	def fetchResponseFromJSON(self,mode):
		#print mode
		text = self.response.getText(self.state,mode)
		return text

	def insertReplyIntoDatabase(self,text,affinScore=-99):
		self.db.insertReply(self.username,text,self.sessionId, self.state,affinScore)

	def updateSessionData(self):
		print "in updateSessionData with sessionIndex %s" %str(self.sessionIndex)
		self.db.insertSetSession(self.username,'sessionData',{"sessionId":self.sessionId,
															"sessionIndex":self.sessionIndex,
															"mood":self.mood,
															"review":self.review,
															"message":self.message
															})
