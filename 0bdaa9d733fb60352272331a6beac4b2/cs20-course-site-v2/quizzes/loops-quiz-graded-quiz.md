---
title: "Loops Quiz [Graded Quiz]"
layout: "default"
published: false
item_id: "g408c85a4c9d8f22999820489809ced4a"
primary_module_slug: "19-python-conditionals-and-loops"
primary_position: 7
nav_title: "Loops Quiz [Graded Quiz]"
---

# Loops Quiz [Graded Quiz]

*Quiz*

**Points:** 4.0

Please close your Python interpreter before answering the following. These questions need to be answered using only your brain!


## Questions

### Question 1

**Question 1**

What shape will the turtle alex draw when the code below is executed?

```
import turtle  
wn = turtle.Screen()  
wn.bgcolor("lightgreen")  
alex = turtle.Turtle()  
alex.pensize(3)  
for i in [0,1,2,3]: 
    alex.forward(50)  
    alex.left(90)  
wn.exitonclick()
```


- [ ] No shape will be drawn.
- [ ] A line segment.
- [ ] A triangle.
- [x] A square.

### Question 2

**Question 2**

In the following code, how many lines does this code print?

```
for number in [5, 4, 3, 2, 1, 0]:
    print("I have", number, "cookies.  I'm going to eat one.")
```


- [ ] 1
- [ ] 5
- [x] 6
- [ ] 10

### Question 3

**Question 3**

Assume that the turtle alex begins the following code facing east (right on your screen). What colour is the horizontal line on the bottom of the square alex draws?

```
import turtle #set up alex  
wn = turtle.Screen()  
wn.bgcolor("lightgreen")  
alex = turtle.Turtle()  
alex.pensize(3)  

for aColor in ["yellow", "red", "purple", "blue"]:   
    alex.color(aColor)  
    alex.forward(50)  
    alex.left(90)  

wn.exitonclick()
```


- [x] yellow
- [ ] red
- [ ] purple
- [ ] blue

### Question 4

**Question 4**

Which one of the following code fragments would output:

```
0  
1  
2  
3
```


- [ ] <pre>for i in range(3):<br>&nbsp; &nbsp; print(i)</pre>
- [x] <pre>for i in range(4):<br>    print(i)</pre>
- [ ] <pre>for i in [0,1,2,3,4]:<br>    print(i)</pre>
- [ ] <pre>i = 1<br>while (i &lt;= 3):<br>    print(i)<br>    i = i + 1</pre>
