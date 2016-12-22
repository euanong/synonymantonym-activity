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

def processEntry(entry):
	print entry
	page = requests.get('http://www.english-for-students.com/'+entry+'.html')
	#print page.text
	soup = BeautifulSoup(page.text, 'html.parser')
	first = False
	syns = []
	ants = []
	synflag = True
	for elem in soup(text=re.compile(r"^1\.	.+", re.MULTILINE)):
		if first==False:
			#print "Synonyms"
			first = True
			synflag = True
		else:
			#print "Antonyms"
			synflag = False
		for child in elem.parent.descendants:
			#print child
			#print "--"
			a = child.encode('utf-8').replace('\n', '')
			if len(a)>0:
				if RepresentsInt(a[0]):
					c = child.split('	', 1)[-1].lower().replace('\n', '').strip()
					#print c
					#print "---"
					if synflag==True:
						syns.append(c)
					else:
						ants.append(c)
	#print "Next"
	first = False
	for elem in soup(text=re.compile(r"nyms: $")):
		if first==False:
			#print "Synonyms"
			first = True
			synflag = True
		else:
			#print "Antonyms"
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
					if '	' in c:
						c = c.split('	', 1)[-1].lower().replace('\n', '').strip()
					#print c
					#print "---"
					if synflag==True:
						syns.append(c)
					else:
						ants.append(c)
	if len(syns)==0 and len(ants)==0:
		first = False
		for elem in soup(text=re.compile(r"Contextual Examples:")):
			if first==False:
				#print "Synonyms"
				first = True
				synflag = True
			else:
				#print "Antonyms"
				synflag = False
			#print elem
			elem = elem.find_previous("span")
			for child in elem.descendants:
				#print str(child)
				#print "--"
				a = child.encode('utf-8').replace('\n', '')
				if len(a)>0:
					if a[0].isalpha():
						c = a.lower().replace('\n', '').strip()
						if '	' in c:
							c = c.split('	', 1)[-1].lower().replace('\n', '').strip()
						#print c
						#print "---"
						if synflag==True:
							syns.append(c)
						else:
							ants.append(c)
	if len(syns)==0 or len(ants)==0:
		return ""
	finalstr = "{\""+entry.lower()+"\": {\"synonyms\": "
	string = ""
	string += "["
	for i in syns:
		string+="\""+i+"\","
	string = string[:-1]+"]"
	print string
	finalstr += string+", \"antonyms\": "
	string = ""
	string += "["
	for i in ants:
		string+="\""+i+"\","
	string = string[:-1]+"]"
	print string
	finalstr += string+"}},"
	return finalstr

#{"abandon": {"synonyms": [],"antonyms": []}}
if __name__ == '__main__':
	f = open('newwords.js', 'a')
	lines = [line.rstrip('\n') for line in open('wordslist.txt')]
	#lines = ["Benevolence"]
	for i in lines:
		temp = processEntry(i)
		if temp!="":
			try:
				temp.encode('utf-8')
				f.write(temp)
				print temp
			except Exception as e:
				print "ERROR"
	f.close()