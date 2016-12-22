# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import requests
import re

def RepresentsInt(s):
	try: 
		int(s)
		return True
	except ValueError:
		return False

page = requests.get('http://www.english-for-students.com/Adjective-Able.html')
#print page.text
soup = BeautifulSoup(page.text, 'html.parser')
first = False
for elem in soup(text=re.compile(r"^1\.	.+", re.MULTILINE)):
	if first==False:
		print "Synonyms"
		first = True
	else:
		print "Antonyms"
	for child in elem.parent.descendants:
		if RepresentsInt(child.encode('utf-8')[0]):
			print child.split('	', 1)[-1].lower()
			print "---"
print "Next"
first = False
for elem in soup(text=re.compile(r"nyms: $")):
	if first==False:
		print "Synonyms"
		first = True
	else:
		print "Antonyms"
	#print elem
	elem = elem.find_next("span")
	for child in elem.descendants:
		#print str(child)
		#print "--"
		a = child.encode('utf-8').replace('\n', '')
		if len(a)>0:
			if a[0].isalpha():
				print a.lower()
				print "---"
