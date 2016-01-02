from boto.mturk.connection import MTurkConnection
from boto.mturk.question import QuestionContent, Question, QuestionForm, Overview, AnswerSpecification, SelectionAnswer, FormattedContent, FreeTextAnswer

class mTurk:
	def __init__(self):
		self.ACCESS_ID=
		self.SECRET_KEY=
		self.HOST='mechanicalturk.sandbox.amazonaws.com'