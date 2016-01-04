import urllib
import urllib2

SERVER_URL='http://172.17.45.253:5000'

'''
    get_all_reviewable_hits returns all the hits that are categorized as 
    reviewable on mechanical turk. page_size specifies how many entries a page
    has and page_number can be used to go through all pages.
'''
def get_all_reviewable_hits(mtc):
    page_size = 50
    hits = mtc.get_reviewable_hits(page_size=page_size)
    print "Total results to fetch %s " % hits.TotalNumResults
    print "Request hits page %i" % 1
    total_pages = float(hits.TotalNumResults)/page_size
    int_total= int(total_pages)
    if(total_pages-int_total>0):
        total_pages = int_total+1
    else:
        total_pages = int_total
    pn = 1
    while pn < total_pages:
        pn = pn + 1
        print "Request hits page %i" % pn
        temp_hits = mtc.get_reviewable_hits(page_size=page_size,page_number=pn)
        hits.extend(temp_hits)
    return hits
 
def handleHits(hits,mtc):
    for hit in hits:
        assignments = mtc.get_assignments(hit.HITId)
        for assignment in assignments:
            print "Answers of the worker %s" % assignment.WorkerId
            for question_form_answer in assignment.answers[0]:
                for key in question_form_answer.fields:
                    print key
                    #POST TO DEARD SERVER 
                    value={
                        'mTurkResponse':key
                    }
                    postToDearD(SERVER_URL,value)
            mtc.approve_assignment(assignment.AssignmentId)
            print "--------------------"
        mtc.disable_hit(hit.HITId)

def postToDearD(url,value):
    data = urllib.urlencode(value)
    req = urllib2.Request(url,data)
    response = urllib2.urlopen(req)
    the_page = response.read()
    print "response : " + str(response)
    print "page : " + str(the_page)