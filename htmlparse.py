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

page = requests.get('http://www.english-for-students.com/Absolute.html')
#print page.text
soup = BeautifulSoup(page.text, 'html.parser')
first = False
syns = []
ants = []
synflag = True
for elem in soup(text=re.compile(r"^1\.	.+", re.MULTILINE)):
	if first==False:
		print "Synonyms"
		first = True
		synflag = True
	else:
		print "Antonyms"
		synflag = False
	for child in elem.parent.descendants:
		#print child
		#print "--"
		a = child.encode('utf-8').replace('\n', '')
		if len(a)>0:
			if RepresentsInt(a[0]):
				c = child.split('	', 1)[-1].lower().replace('\n', '').strip()
				print c
				print "---"
				if synflag==True:
					syns.append(c)
				else:
					ants.append(c)
print "Next"
first = False
for elem in soup(text=re.compile(r"nyms: $")):
	if first==False:
		print "Synonyms"
		first = True
		synflag = True
	else:
		print "Antonyms"
		synflag = False
	#print elem
	elem = elem.find_next("span")
	for child in elem.descendants:
		#print str(child)
		#print "--"
		a = child.encode('utf-8').replace('\n', '')
		if len(a)>0:
			if a[0].isalpha():
				c = a.lower().replace('\n', '').strip()
				print c
				print "---"
				if synflag==True:
					syns.append(c)
				else:
					ants.append(c)

string = ""
string += "["
for i in syns:
	string+="\""+i+"\","
string = string[:-1]+"]"
print string

string = ""
string += "["
for i in ants:
	string+="\""+i+"\","
string = string[:-1]+"]"
print string
