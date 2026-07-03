---
title: "Part One: Theory Portion"
layout: "default"
published: false
item_id: "g39ce9319c4ab314f300ee3beb2eff044"
primary_module_slug: "13-final-exam"
primary_position: 1
nav_title: "Part One: Theory Portion"
---

# Part One: Theory Portion

*Quiz*

**Points:** 29.0

Please complete the following questions.

Supports allowed:

- Your brain
- Paper/pencil  **or** paint program on computer
- Calculator

**Phones must be out of sight, no other browser tabs/programs may be open.**


## Questions

### Question 1

**Data Types**

What is the data type of the following:

2.5


- [ ] int
- [ ] boolean
- [ ] str
- [x] float

### Question 2

**Data Types 2**

What is the data type of:

"my cat's breath smells like cat food"


- [ ] float
- [ ] int
- [x] string
- [ ] boolean

### Question 3

**Loops**

Which of the following statements is used to create a loop that executes as long as a condition is true?


- [ ] for
- [x] while
- [ ] until
- [ ] def

### Question 4

**General Programming**

What are comments for?


- [ ] To tell the computer what you mean in your program.
- [x] For the people who are reading your code to know, in natural language, what the program is doing.
- [ ] None, they are extraneous information that is not needed.
- [ ] None in a short program. They are only needed for really large programs.

### Question 5

**General Programming 2**

An algorithm is:


- [ ] A solution to a problem that can be solved by a computer.
- [x] A step by step list of instructions that if followed exactly will solve the problem under consideration.
- [ ] A series of instructions implemented in a programming language
- [ ] A special kind of notation used by computer scientists

### Question 6

**Python - if elif else**

What will the following code print?

```
if 4 < 4:  
    print('A')  
elif 3 < 4:  
    print('B')  
else:  
    print('C')  
print('D')
```


- [ ] A C
- [ ] A
- [ ] A B
- [ ] A D
- [ ] B
- [x] B D
- [ ] Nothing, the code won't run.

### Question 7

**Python - strings**

What is printed by the following statements?

```
s = "python"
excl = "!"
print(f"{excl} s {excl}")
```


*(Short answer / fill-in-the-blank question)*

### Question 8

**Python - for turtles**

What shape will the turtle alex draw when the code below is executed?

```
import turtle  
wn = turtle.Screen()  
alex = turtle.Turtle()
```

```
for i in [0,1,2]:   
    alex.forward(50)  
    alex.left(120)
```

```
wn.exitonclick()
```


- [ ] No shape will be drawn.
- [ ] A line segment.
- [x] A triangle.
- [ ] A square.

### Question 9

**Python - strings**

What is printed by the following statements?

```
s = "computer science"
print(s[3])
```


- [ ] m
- [x] p
- [ ] n
- [ ] Error, you cannot use the [ ] operator with a string.

### Question 10

**Strings**

What is printed by the following statements?

```
s = "computer science" 
print(s[:-6])
```


- [x] computer s
- [ ] cience
- [ ] comput
- [ ] Error, you are missing a number inside the []

### Question 11

**Python - strings**

What is printed by the following statements?

```
s = "computer science"
print(s[2:10])
```


- [ ] computer
- [ ] science
- [x] mputer s
- [ ] Error, you cannot have two numbers inside the [ ].

### Question 12

**Python - lists**

What is printed by the following statements?

```
my_list = [1, 2, "three", 5, -1, 99.9]
print(my_list[5])
```


- [ ] -1
- [ ] Error
- [ ] 5
- [x] 99.9

### Question 13

**Python - lists**

What is printed by the following statements?

```
my_list = [1, 2, "three", [0 ,"zero", 1], 5, -1, 99.9]
print(my_list[3][1])
```


*(Short answer / fill-in-the-blank question)*

### Question 14

**Python - loops**

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

### Question 15

**Logic**

What is the output of the following program?

```
def boolean_confusion( a,b ):  
    return a == 6 and ( not a == 10 )
```

```
boolean_confusion( 6,10 )
```


- [x] True
- [ ] False

### Question 16

**Logic**

Assuming:

```
a = 6   
b = 10
```

What does the following statement evaluate to?

```
a == 6 and (b == 10 and not not not not not not a == 6 )
```


- [x] True
- [ ] False

### Question 17

**Logic**

assuming:

```
a = 6  
b = 10
```

What does the following statement evaluate to:

```
not ( not a == 10 or a == 10) and b == 6
```


- [ ] True
- [x] False

### Question 18

**Functons**

In the following code fragment, what is:

```
 def sneaky_add( a, b ):
```

in terms of function anatomy?

```
def sneaky_add( a, b ):  
    result = a + b + 1  
    return result
```

```
sneaky_add( 32,68 )
```


- [x] signature
- [ ] argument
- [ ] parameter
- [ ] function call

### Question 19

**Loops**

What is printed out when the following code is run?

```
text = "python"  
result = ""  
  
for thing in range( len( text ) ):  
    result += thing  
  
print( thing )
```


- [x] Error - program will crash
- [ ] python
- [ ] 01234
- [ ] thingthingthingthingthingthing

### Question 20

**Lists**

What is the output of the following program?

```
my_list = [4, 2, 8, 5]  
my_list.pop(2)  
my_list.append(True)  
my_list[2] = 10  
  
print(my_list)
```

Note: for your answer, enter the contents of the list within square brackets, and with each item separated by a comma.  
  
For example:    **[45, 46, "Red", 48]**


*(Short answer / fill-in-the-blank question)*
