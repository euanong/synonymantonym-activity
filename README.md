# synonymantonym-activity
A Synonym-Antonym sorting game for Sugar Labs.

Improve your English vocabulary by testing yourself on synonyms and antonyms of over 700 words. Just drag and drop the synonyms and antonyms into the right column as they fall down the screen. Don't let them reach the bottom!

Description
-----------
When the user loads the activity, a target word will appear on-screen, and synonyms and antonyms of the target word will drop from the top of the screen at random intervals. The aim of the user is to score as many points as they can without running out of lives.

To score points, the user must drag the falling words to the correct column depending on whether they are synonyms or antonyms of the target word; for each correct sorted word they will score points equal to the level the user is on (starting from level 1). The user begins the game with 5 lives; the user loses a life every time they make a mistake (i.e. sort a word into the wrong column) and for every word that reaches the bottom of the screen without being sorted. If the user loses all their lives, the game is over - they will restart at level 1 with 5 lives and a score of 0. 

If the user processes all of the words for a given target word (either by sorting them correctly or incorrectly, or by letting them reach the bottom of the screen) without losing all of their lives, they will progress to the next level - the speed of words falling from the top of the screen will increase, they will gain 1 extra life and each word they sort correctly will increase their score by 1 more than it had done previously.

Bugfixes, Improvements and Reporting Bugs
-----------------------------------------
This is only a 'first draft' of the application made in 3 days for Google Code-In 2016 - it still probably contains a number of bugs and many features can be optimised. One major 'feature'/bug to note is that, on resize, the game will reset to the state it was in before commencing the current level - the word, synonyms and antonyms will remain the same but the user's lives and score will return to the state they were in when the current level started. This should be improved eventually - but it's rather troublesome to sort out. 

There are a number of 'TODO's/improvements scheduled for this application, some of which are a scoreboard, randomised word speeds, definitions for words and improving the drag-drop functionality of words. These will also be improved eventually; please bear in mind, though, that the developer is still in school and is very busy so progress on this application could be slow.

As with most Sugar applications, this application is FOSS (Free, Open Source Software) - any contributions from the community with bugfixes or improvements are very much welcome and would be greatly appreciated. Issues can be posted [here](https://github.com/eohomegrownapps/synonymantonym-activity/issues) - if you could find the time to show this application some love by improving it it would greatly help the Sugar community and I would be very grateful! :)

Credits
-------
This project was created by Euan Ong (eohomegrownapps) for Google Code-In 2016.

Words, synonyms and antonyms were taken from [www.english-for-students.com](http://www.english-for-students.com/Synonyms-A.html).

Issues and improvements were suggested by the students and mentors at Google Code-In 2016.