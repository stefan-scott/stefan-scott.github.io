---
title: Python Basics Practice Quiz (Data Types, Variables, Control)
layout: default
published: false
item_id: gd89317169993f73b4746148375f9cf10
primary_module_slug: 10-python-basics
primary_position: 3
nav_title: Python Basics Practice Quiz (Data Types, Variables, Control)
---

# Python Basics Practice Quiz (Data Types, Variables, Control)

*Quiz*

**Points:** 7.0

Having spent some time gaining familiarity with the basic syntax and usage of Python, this quiz will challenge your current understanding. The following topics are included:

- Data Types and Variables
- Errors
- Conditions (IF/ELIF/ELSE)
- Loops (While)


## Questions

### Question 1

**Data Types**

What is the data type of:  **"1.5"**


- [x] String
- [ ] float
- [ ] int
- [ ] bool

### Question 2

**Data Types**

What is the data type of:  **999**


- [x] int
- [ ] String
- [ ] float
- [ ] bool

### Question 3

**Conditional Statements**

After the following code is run, what is the value stored in the variable **number?**

```
number = 10
if number > 5:
    number = number + 5
elif number > 10:
    number = number - 15
else:
    number = 1
```


- [x] 15
- [ ] 0
- [ ] 1
- [ ] 10

### Question 4

**While Loops**

```
my_num = 5
while my_num > 0:
    print(my_num)
    my_num = my_num - 1
```


- [x] 5<br>4<br>3<br>2<br>1
- [ ] This will result in a TypeError
- [ ] 5<br>4<br>3<br>2<br>1<br>0
- [ ] This will result in an infinite loop.

### Question 5

**While Loops**

What will be printed out when the following code is run?

```
my_num = 0
while my_num <= 4:
    my_num = my_num + 1
    if my_num == 3:
        break
    print(my_num)
 
```


- [x] 1<br>2
- [ ] 1<br>2<br>3<br>4<br>5
- [ ] 0<br>1<br>2<br>3<br>4
- [ ] 1<br>2<br>3

### Question 6

**Exceptions**

If the user enters **"apple"**, what will happen?

```
temperature = input("enter a temperature in degrees: ")
temperature = float(temperature)
 
```


- [x] ValueError
- [ ] TypeError
- [ ] IndexError
- [ ] Program will run successfully.
