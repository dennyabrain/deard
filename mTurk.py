from boto.mturk.connection import MTurkConnection
from boto.mturk.question import QuestionContent, Question, QuestionForm, Overview, AnswerSpecification, SelectionAnswer, FormattedContent, FreeTextAnswer
from boto.resultset import ResultSet
import os

class mTurk:
	def __init__(self):
		self.ACCESS_ID=os.environ['ACCESS_KEY_ID']
		self.SECRET_KEY=os.environ['SECRET_ACCESS_KEY']			
		self.HOST='mechanicalturk.sandbox.amazonaws.com'
		self.title='Please respond as a therapist to this question'
		self.description=('Read this diary entry and give a thoughtful advice to this person')
		self.keywords='diary,therapist,friend,advice'
		self.connectMTurk()

	def connectMTurk(self):
		self.mtc=MTurkConnection(aws_access_key_id=self.ACCESS_ID, 
			aws_secret_access_key=self.SECRET_KEY, 
			host=self.HOST)
		#print(self.mtc.get_account_balance())

	def buildOverview(self):
		self.overview=Overview()
		self.overview.append_field('Title','Deard Response')
		self.overview.append(FormattedContent('<h2>DearD User Post</h2>'))

	def buildQuestion(self,diaryEntry):
		self.qc = QuestionContent()
		self.qc.append_field('Title',diaryEntry)
		self.fta = FreeTextAnswer()
		self.q1 = Question(identifier='comments',
			content=self.qc,
			answer_spec=AnswerSpecification(self.fta))

	def buildQuestionForm(self):
		self.question_form = QuestionForm()
		self.question_form.append(self.overview)
		self.question_form.append(self.q1)

	def createHit(self,diaryEntry):
		self.buildOverview()
		self.buildQuestion(diaryEntry)
		self.buildQuestionForm()
		id=self.mtc.create_hit(questions=self.question_form,
			max_assignments=1,
			title=self.title,
			description=self.description,
			duration=60*5,
			reward=0.50)
		return(id[0].HITId)