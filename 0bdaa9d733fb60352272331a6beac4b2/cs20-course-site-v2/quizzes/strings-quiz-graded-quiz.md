---
title: "Strings Quiz [Graded Quiz]"
layout: "default"
published: false
item_id: "ged0b6399896cbade3a2535661ab2f1e0"
primary_module_slug: "19-python-conditionals-and-loops"
primary_position: 11
nav_title: "Strings Quiz [Graded Quiz]"
secondary_module_slug: "22-python"
secondary_position: 3
---

# Strings Quiz [Graded Quiz]

*Quiz*

**Points:** 9.0

As per usual, please answer the following questions without having your Python interpreter open -- just use your brain!


## Questions

### Question 1

**String Questions**

How many times is the word HELLO printed by the following statements?

```
s = "computer science"
for ch in s:
   print("HELLO")
```


- [ ] 14
- [ ] 15
- [x] 16
- [ ] Error, the for statement needs to use the range function.

### Question 2

**String Questions**

What is printed by the following statements?

```
s = "python"
excl = "!"
print(s+excl*3)
```


- [x] python!!!
- [ ] python!python!python!
- [ ] pythonpythonpython!
- [ ] Error, you cannot perform concatenation and repetition at the same time.

### Question 3

**String Questions**

What is printed by the following statements?

```
s = "experiment"
print(s[4])
```


- [ ] e
- [x] r
- [ ] expe
- [ ] Error, you cannot use the [ ] operator with a string.

### Question 4

**String Questions**

What is printed by the following statements?

```
s = "experiment"
print(s[-6])
```


- [x] r
- [ ] -m
- [ ] Error. Can't use a negative number as an index
- [ ] i

### Question 5

**String Questions**

How many times is the string LOOP printed by the following statements?

```
s = "just wonderful outside"  
for i in range(s.count("u")):
    print("LOOP")
```


- [ ] Error - you can't loop over the .count() method
- [ ] 1
- [x] 3
- [ ] -6

### Question 6

**String Questions**

What is printed by the following statements?

```
s = "pomegranate"
print(s[3:6])
```


*(Short answer / fill-in-the-blank question)*

### Question 7

**String Questions**

What is printed by the following statements:

```
word = "antelope"  
print(word[4:])
```


*(Short answer / fill-in-the-blank question)*

### Question 8

**String Questions**

What is printed by the following statements:

```
first = "balloon"
second = "parade"  
loc = first.find("l")
print(second[loc])
```


- [ ] a
- [ ] e
- [x] r
- [ ] d
- [ ] p

### Question 9

**String Questions**

What is printed by the following statements:

```
word = "understanding"  
result = ""  
for i in range(len(word)):  
    current = word[i]  
    if i % 2 == 0:  
        result += current.upper()
print(result)
```


*(Short answer / fill-in-the-blank question)*
