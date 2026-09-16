---
title: Python Basics Graded Quiz (Data Types, Variables, Control)
layout: default
published: false
item_id: g746c10396fc9997e47a3aa081f5ca52a
primary_module_slug: 10-python-basics
primary_position: 4
nav_title: Python Basics Graded Quiz (Data Types, Variables, Control)
---

# Python Basics Graded Quiz (Data Types, Variables, Control)

*Quiz*

**Points:** 10.0

Having spent some time gaining familiarity with the basic syntax and usage of Python, this graded quiz will challenge your current understanding. The following topics are included:

- Data Types and Variables
- Errors
- Conditions (IF/ELIF/ELSE)
- Loops (While)


## Questions

### Question 1

**Data Types**

What is the data type of:  **True**


- [x] bool
- [ ] String
- [ ] int
- [ ] float

### Question 2

**Data Types**

What is the data type of:  **145.0**


- [x] float
- [ ] int
- [ ] bool
- [ ] String

### Question 3

**While Loops**

What will be printed out when the following code is run?

```
number = 0
while number < 5:
    number = number + 1
    if number == 0 or number == 2:
        continue
    elif number == 3:
        break
    print(number)
```


- [x] 1
- [ ] 0<br>1<br>2<br>3<br>4
- [ ] 1<br>2<br>3<br>4<br>5
- [ ] 1<br>3

### Question 4

**While Loops**

What will happen when the following code is run?

```
number = 10
while number >= 5:
    if number != 6 and number != 8:
        print(number)
    number = number + 1
```


- [x] Will result in an infinite loop.
- [ ] 10<br>9<br>7<br>5
- [ ] 10<br>9<br>8<br>7<br>6<br>5
- [ ] 8<br>6

### Question 5

**Exceptions**

If the user enters **99** and then **violet**, what will happen?

```
age = input("Please enter your age: ")
best_color = input("Enter your favourite color: ")
print(age + best_color)
```


- [x] Program will run successfully.
- [ ] TypeError
- [ ] ValueError
- [ ] IndexError

### Question 6

**Coding Challenge**

*This is a "pen-and-paper" problem.*

- *You may construct your solution in this [online editor](https://stefan-scott.github.io/paper/)*
- *This editor **does not** have the capability to run the code*
  - *instead, you are the computing agent. Solve as best you can.*
- *Once complete, copy-paste the code into the text field below*

Create a function called **doubler().** This function should:

- **repeatedly** ask the user to enter either a number or the word quit
  - if the word "quit" is entered, the function can end
  - if a number is entered, print out **the value twice as large as that number**
- You can assume the user will enter either "quit" or a valid number; you don't need to handle other types of input.


*(Short answer / fill-in-the-blank question)*
