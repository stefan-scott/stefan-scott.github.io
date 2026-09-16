---
title: Functions Quiz [Graded Quiz]
layout: default
published: false
item_id: gbefa08cab190783c7af409d17c128125
primary_module_slug: 11-python-turtle-and-micro-bit
primary_position: 13
nav_title: Functions Quiz [Graded Quiz]
secondary_module_slug: 22-python
secondary_position: 2
---

# Functions Quiz [Graded Quiz]

*Quiz*

**Points:** 12.0

Please close your Python interpreter before answering the following. These questions need to be answered using only your brain!


## Questions

### Question 1

**Functions**

Which of the following is a valid way to begin the definition of a function in Python?


- [x] def some_function():
- [ ] function some_function()
- [ ] def some_function()
- [ ] function some_function():

### Question 2

**Functions**

What is the output of the following program?

```
def my_function( num1, num2 ):
    thing_one = num2 + 5  
    thing_two = num1 - 2  
    print( thing_one )
  
my_function( 6, 7)
```


- [ ] 11
- [x] 12
- [ ] 5
- [ ] 4

### Question 3

**Functions**

What is the output of the following program?

```
def my_function( num1, num2 ):  
    thing_one = num2 + 5  
    thing_two = num1 - 2  
    result = another_function( thing_two)  
    print( result )  
  
def another_function( something ):  
    return something * 2  
  
my_function( 6, 7 )
```


- [x] 8
- [ ] 24
- [ ] 6
- [ ] 4

### Question 4

**Functions**

What does the following program print out?

```
def my_function( x ):  
    x = x + 3  
    return x
  
x = 2  
my_function(x)  
print(x)
```


- [x] 2
- [ ] 5
- [ ] 3
- [ ] program will crash

### Question 5

**Boolean Functions**

What is a **Boolean Function?**


*(Short answer / fill-in-the-blank question)*

### Question 6

**Functions**

What does the following program print out?

```
def my_function( x, y ):
    if x > y:  
        result = "X"  
    elif x == y:  
        result = "Tie!"  
    else:  
        result = "Y"  
    return result  
    print("The result is: " + result)
  
x = 4  
y = 6  
my_function( 10, 2 )
```


- [x] Nothing will be printed out.
- [ ] The result is: X
- [ ] The result is: Tie!
- [ ] The result is: Y

### Question 7

**Functions**

What does the following program print out?

```
def do_math( num1, num2 ):
    result = num1 + tripler( num2 )  
    print( result )
  
  
do_math( 4, 5 )  
  
def tripler( n ):  
    result = n * 3  
    return result
```


- [x] Program will crash
- [ ] 19
- [ ] 15
- [ ] 27

### Question 8

**penPaper**

*This is a "pen-and-paper" problem.*

- *You may construct your solution in this [online editor](https://stefan-scott.github.io/paper/)*
- *This editor **does not** have the capability to run the code*
  - *instead, you are the computing agent. Solve as best you can.*
- *Once complete, copy-paste the code into the text field below*

**Theme Park Ticketing System**

*You are tasked with writing some code to help manage pricing of tickets for a theme park. Below are three functions to compose. Once complete, copy-paste your function code into the text field below.*

**base\_price() function**

Create a function called base price that takes in a person's **age** and returns their **base ticket price.**

- - - If age is **under 5** → return **0**
    - If age is **5–12** → return **10**
    - If age is **13–64** → return **20**
    - If age is **65 or older** → return **12**

**apply\_discount() function**

This function should take in:

- - - **price**                 #Base ticket price (int)
    - **has\_coupon**#True or False

If `hasCoupon` is **true**, subtract **25%** from the price, otherwise return the original price.

**final\_price() function**

This function should take in an **age** as well as **whether the customer has a coupon or not.**

- - - Calls **base\_price** function
    - Send the results into **apply\_discount**
    - Returns the final ticket price


*(Short answer / fill-in-the-blank question)*
