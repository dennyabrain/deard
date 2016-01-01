import os
import nltk
nltk.data.path.append('nltk_data/')
nltk.data.path.append('/nltk_data/')
import random

def getNouns(text):
	tokens=nltk.word_tokenize(text)
	taggedWords=nltk.pos_tag(tokens)
	nouns=[word for word,pos in taggedWords if pos=='NN']
	return nouns

def getNounsTuple(text):
    tokens=nltk.word_tokenize(text)
    taggedWords=nltk.pos_tag(tokens)
    nouns=[word for word,pos in taggedWords if pos=='NN']
    #return afinn.score(text)
    if not nouns:
        return 'z'
    else:
        return tuple(nouns)


