from boto.mturk.connection import MTurkConnection
from boto.mturk.question import QuestionContent, Question, QuestionForm, Overview, AnswerSpecification, SelectionAnswer, FormattedContent, FreeTextAnswer
import os
from helper import get_all_reviewable_hits, handleHits, postToDearD
from time import sleep

f = open('config.config','r')
line = f.readline()
keys=line.split(',')

ACCESS_ID=keys[0]
SECRET_KEY=keys[1]
HOST='mechanicalturk.sandbox.amazonaws.com'
while True:
	mtc=MTurkConnection(aws_access_key_id=ACCESS_ID, 
		aws_secret_access_key=SECRET_KEY, 
		host=HOST)
	print mtc.get_account_balance()
	hits = get_all_reviewable_hits(mtc)
	handleHits(hits,mtc)
	sleep(10)

#postToDearD('http://posttestserver.com/post.php',{'value':'denny'})
	

