---
title: "Strings Assignment"
layout: "default"
published: false
item_id: "g411c2ccaf8f7115f9ef694db6cb772dc"
primary_module_slug: "20-python-boolean-logic-images-strings-and-lists"
primary_position: 7
nav_title: "Strings Assignment"
---

# Strings Assignment

**Points:** 10.0
**Submission type:** online upload
**Allowed file types:** py,txt

## Pig Latin translator

[Video Explanation](https://youtu.be/hk6vAHWgKGc)

## Description

A group of Vatican City police officers are planning a trip to Saskatoon, Saskatchewan. Since they only speak Pig Latin, they will need to translate a lot of English phrases. Write a simple program to perform basic English to Pig Latin translation.

### Translation rules

1. If a word has no letters, don't translate it.
2. All punctuation should be preserved. **[Extra for Experts]**
3. If the word begins with a capital letter, then the translated word should too. **[Extra for Experts]**
4. Separate each word into two parts. The first part is called the "prefix" and extends from the beginning of the word up to, but not including, the first vowel. (The letter "y" will be considered a vowel.) The rest of the word is called the "stem".
5. The Pig Latin text is formed by reversing the order of the prefix and stem and adding the letters "ay" to the end. For example, "sandwich" is composed of "s" + "andwich" + "ay" + "." and would translate to "andwichsay."
6. If the word contains no consonents, let the prefix be empty and the word be the stem. The word ending should be "yay" instead of merely "ay." For example, "I" would be "Iyay".

## Phase 1

Your first task is to produce a function that takes one argument, a word, and returns the portion of the word up to, but not including the first vowel. For example, if you sent `'banana'` to your function, it should return `'b'`. Sending `'Sibley'` should return `'S'`, `'stream'` should return `'str'`, and `'break'` should return `'br'`.

## Phase 2

Using what you learned from Phase 1, write a function (or functions) that takes a single word as an argument and returns the word with the prefix and stem reversed.

## Phase 3

Modify the function from Phase 2 to properly handle the "ay" word ending. If you are attempting the extras for experts, you should also modify your function to deal with capital letters and punctuation.

## Final Phase

### Input

Your program should perform translation one line at a time. The program will continue to accept input until it is terminated by a Ctrl-D character (force quit), or you can designate a special word to indicate the program should quit.

### Output

Program output should follow each input line. The translation rules will determine how each word is translated.

### Sample session

```
--> Stop
Opstay
--> No littering
Onay itteringlay
--> No shirts, no shoes, no service
Onay irtsshay, onay oesshay, onay ervicesay
--> No persons under 14 admitted
Onay ersonspay underay 14 admitteday
--> Hey buddy, get away from my car!
Eyhay uddybah, etgay awayyay omfray ymay arcay!
--> ^D
```

**More Extras for Experts**

- Make your translator program keep a record of all of the translations it has performed, by outputting each translation to both the screen and to a text file called translation\_history.txt.
- Create a special mode that will allow the user to select a text file, convert each word in the text file and print it out the converted version [way, way harder than required. Not necessary to obtain full marks, but pretty cool. Might want to look at easygui and the easygui.fileopenbox method.]
