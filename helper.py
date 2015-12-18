import nltk

def getNouns(text):
    tokens=nltk.word_tokenize(text)
    taggedWords=nltk.pos_tag(tokens)
    nouns=[word for word,pos in taggedWords if pos=='NN']
    return nouns