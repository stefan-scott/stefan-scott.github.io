---
title: Functions Practice Quiz
layout: default
published: false
item_id: gf98fa2d691f16cbf4299430683983b73
primary_module_slug: 11-python-turtle-and-micro-bit
primary_position: 12
nav_title: Functions Practice Quiz
---

# Functions Practice Quiz

*Quiz*

**Points:** 5.0



## Questions

### Question 1

**Function Anatomy**

In the function below, what is **name** (in terms of function anatomy)?

def greeting(name):

complete = "Hello, " + name + ". It is nice to meet you!"  
return complete

result = greeting("Mr. Scott")  
print( greeting ("Chris") )


- [x] parameter
- [ ] argument
- [ ] signature
- [ ] return value
- [ ] fruitful function

### Question 2

**Functions**

What is the output of the following function?

def do\_math(a, b):

a += 2  
b \*= 2  
print ( a + b )

do\_math( 3 , 4 )


- [x] 13
- [ ] 7
- [ ] 11
- [ ] 14

### Question 3

**Functions**

What is the output of the following program?

def calculate\_area ( side\_length ):

area = side\_length \* side\_length  
return area

area = 10  
calculate\_area( 5 )  
print( area )


- [x] 10
- [ ] 25
- [ ] program will crash
- [ ] 35

### Question 4

**Execution Flow**

What will be printed to the screen in the following program?

def function\_a():

print( "A" )  
function\_b()  
print( "A" )

def function\_b():

function\_c()  
print( "B" )

def function\_c():

print( "C" )

function\_a()


- [x] ACBA
- [ ] AABC
- [ ] ABCA
- [ ] BCAA
- [ ] CBAA

### Question 5

**Functions**

def function\_a ( n ):

result = n \* n  
return result

def function\_b ( value, extra ):

value = value \* 3  
value = value + extra  
return value

extra = 4  
print( function\_a( 6 ) + function\_b( 5 ) )


- [x] program will crash
- [ ] 51
- [ ] 55
- [ ] 61
- [ ] 65
