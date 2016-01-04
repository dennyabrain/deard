from boto.mturk.connection import MTurkConnection
from boto.mturk.question import QuestionContent, Question, QuestionForm, Overview, AnswerSpecification, SelectionAnswer, FormattedContent, FreeTextAnswer
import uuid

f = open('config.config','r')
line = f.readline()
keys=line.split(',')

#ACCESS_ID=keys[0]
#SECRET_KEY=keys[1]
ACCESS_ID='AKIAIDORW7RNFE23LATA'
SECRET_KEY='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'
HOST='mechanicalturk.sandbox.amazonaws.com'

print ACCESS_ID
print SECRET_KEY


mtc=MTurkConnection(aws_access_key_id=ACCESS_ID, 
	aws_secret_access_key=SECRET_KEY, 
	host=HOST)

print mtc.get_account_balance()

title='Please respond as a therapist to this question'
description=('Read this diary entry and give a thoughtful advice to this person')
keywords='diary,therapist,friend,advice'

#Build Overview
overview=Overview()
overview.append_field('Title','DearD Response')
overview.append(FormattedContent('<h2>DearD User Post</h2>'))

#Build Question 1
qc = QuestionContent()
qc.append_field('Title','Respond to this user'+str(uuid.uuid4()))
fta = FreeTextAnswer()
q1 = Question(identifier='comments',
	content=qc,
	answer_spec=AnswerSpecification(fta))

#Build Question Form
question_form = QuestionForm()
question_form.append(overview)
question_form.append(q1)

#Create the HIT
mtc.create_hit(questions=question_form,
	max_assignments=1,
	title=title,
	description=description,
	duration=60*5,
	reward=0.05)
