---
title: "Madlib"
layout: "default"
published: true
item_id: "g3b8239c67b31c7fced3ee41594dd9ebe"
primary_module_slug: "10-python-basics"
primary_position: 7
nav_title: "Madlib"
---

# Madlib

**Points:** 10.0
**Submission type:** online upload
**Allowed file types:** py,txt,zip

To practice input/output in Python, you will make **two Mad Libs**.

At the start of the program, you should ask the user which MadLib they want. Once the user has selected a MadLib, your program should take in input from the user, then use that input when outputting a story or poem.

If you are not familiar with madlibs, you may want to investigate what they are by searching the web for a “madlibs website”. In essence, you want to take a familiar story and make it funny by randomly placing your users words into the story. Feel free to use any old school rhyme, or something of your own creation. Though it can be difficult with user input, try to make sure your story makes sense.

```
Humpty Dumpty sat on a wall,
Humpty Dumpty had a great fall.
All the king's horses and all the king's men
Couldn't put Humpty together again.
```

In your program, you could take user input:

```
Person's First Name: Bree
Person's Last Name: Janzen
Verb (past tense action): ran
Job Title (such as principal, electrician, etc.): plumber
Animal (plural): dogs
```

After processing the user input, your program could print out:

```
Bree Janzen ran on a wall,
Bree Janzen had a great fall.
All the plumber's dogs and all the plumber's men
Couldn't put Bree together again.
```

Both of your madlibs should take in at least 5 words from the user, but no more than 10. Feel free to use any old school rhyme, or something of your own creation. Though it can be difficult with user input, try to make sure your story makes sense.

Remember to use a comment header at the top of your program!

**Base Requirements**

1. Your program must include **Two different madlibs.** Begin the program by asking the user which madlib they would like to try (option 1 or 2).
   - Before starting the second madlib, read the expert challenge requirements below, as the second madlib will be slightly different if you choose to tackle that challenge.
2. Each madlib should ask the user for at least 5 input words (entered by the user), but no more than 10.
3. Comment Header at the top of the program is required, as well as some inline comments to describe the different sections to the program.  
   *HINT: we've looked at formatted (f)* strings; using these may make for simple handling of multi-line text and substitutions of the user's word selections.

**Challenge Features**

- For the second madlib, instead of letting the user enter words when running the program, have your program choose the input words **randomly.** There are two options for how to do this, one easier and one a bit harder:   
  ***NOTE:** each option has a different max mark for this section*

Lists of Words *[this option worth 0.5/1]*

Create a list of possible words, and have Python choose one of these words [at random](http://stackoverflow.com/questions/306400/how-do-i-randomly-select-an-item-from-a-list-using-python).

Read words from External Files *[this option worth 1/1]*

Create text files for each of the parts of speech that you will require (ie. nouns.txt, adjectives.txt, etc) and have the computer randomly choose one of the words from the appropriate text file to complete the madlib.

- - - In our class demo, we look at reading data from a file and storing each line as an item in a list. If you were present for this demo I'd suggest following a similar approach where each work is stored on its own line in the text file.
    - Another option, however, would be to store all the words on a single line, separated by a single character (either a space, or a semicolon)  
        
      excited angry uncertain crazy        OR       excited;angry;uncertain;crazy
    - Then you have two tasks:
      - to read that line from a file and store it in a variable as a string. [(see here for reading one line)](https://www.w3schools.com/python/python_file_open.asp)
      - to create a list from that string that contains all the individual words [(see here for splitting a string)](https://www.w3schools.com/python/ref_string_split.asp)
