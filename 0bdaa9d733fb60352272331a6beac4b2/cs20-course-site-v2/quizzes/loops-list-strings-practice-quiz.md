---
title: Loops. List, Strings Practice Quiz
layout: default
published: false
item_id: gca1d9b6f8e1999258a8b1814e74561c8
primary_module_slug: 11-python-turtle-and-micro-bit
primary_position: 8
nav_title: Loops. List, Strings Practice Quiz
---

# Loops. List, Strings Practice Quiz

*Quiz*

**Points:** 8.0



## Questions

### Question 1

**Strings and Slices**

What is the output of the following:

```
my_string = "Great Britain"
my_slice = my_string[3:8]
print(my_slice)
```


*(Short answer / fill-in-the-blank question)*

### Question 2

**Strings and Slices**

What is the output of the following:

```
my_string = "Great Britain"
my_slice = my_string[-4:]
print(my_slice)
```


*(Short answer / fill-in-the-blank question)*

### Question 3

**Loops and Lists**

Which of the following list items will be printed out to the console?

```
my_list = ["Tokyo", "London", "Swift Current", "Brussels"]
for place in my_list:
    if len(place) > 6:
        print(place)
```


- [x] Swift Current
- [x] Tokyo
- [x] Brussels
- [x] London
- [x] No answer text provided.

### Question 4

**Loops and Lists**

Which of the following list items will be printed out to the console?

```
my_list = ["Tokyo", "London", "Swift Current", "Brussels"]
for i in range(len(my_list)):
    if i % 2 == 0:
        print(my_list[i])
```


- [x] Tokyo
- [x] Swift Current
- [x] Brussels
- [x] London

### Question 5

**Loops and Lists**

What will be printed out by the following code:

```
my_list = ["Tokyo", "London", "Swift Current", "Brussels"]
my_string = ""
for i in range(len(my_list)):
    current = my_list[i]
    my_string = my_string + current[i]
print(my_string)
```


*(Short answer / fill-in-the-blank question)*
