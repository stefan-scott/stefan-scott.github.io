---
title: Loops, Lists, Strings Quiz
layout: default
published: false
item_id: g4b42e2b236149fd6869169bca1d8416c
primary_module_slug: 11-python-turtle-and-micro-bit
primary_position: 9
nav_title: Loops, Lists, Strings Quiz
---

# Loops, Lists, Strings Quiz

*Quiz*

**Points:** 10.0

This quiz will challenge your current understanding of Python **for** and **while** loops, and will also incorporate bits and pieces of data types, Strings, and lists.


## Questions

### Question 1

**While Loops**

What is the output of the following program?

```
i = 1
while True:
     if i % 3 == 0:
          break
     print(i)
     i += 1
```


- [x] 1<br>2
- [ ] 1<br>2<br>3
- [ ] error
- [ ] infinite loop

### Question 2

**While Loops**

What is the output of the following code?

```
i = 1
while False:
     if i < 0:
          break
     print(i)
     i += 2
```


- [x] No output
- [ ] 1<br>3<br>5<br>7<br><span>(and so on...)</span>
- [ ] 1
- [ ] 1<br>2<br>3<br>4<br>(and so on...)

### Question 3

**Strings and Slices**

What is the output of the following:

```
my_string = "pomegranate"
print(my_string[3:6])
```


*(Short answer / fill-in-the-blank question)*

### Question 4

**Predict the Output**

What will be the output of the following program?

```
num = add_two(5)
print(add_two(num))

def add_two(x):
     return x+2
```


- [x] Error.
- [ ] 7
- [ ] 9
- [ ] 11

### Question 5

**For Loops**

```
my_list = [1, 1, 2, 3, 5, 8, 13]
var = 0

for i in my_list:
     var = var + i
     print(var)
```


- [x] 1<br>2<br>4<br>7<br>12<br>20<br>33
- [ ] 1<br>1<br>2<br>3<br>5<br>8<br>13
- [ ] 33
- [ ] Error.

### Question 6

**Lists and Slices**

After the following code is run, what will be stored in **my\_list?**

```
source = ["Apple", "Orange", "Peach", "Pear"]

my_list = source[1:-1]
```


- [x] ["Orange", "Peach"]
- [ ] ["Apple", "Orange", "Peach"]
- [ ] ["Apple", "Orange", "Peach", "Pear"]
- [ ] ["Orange", "Peach", "Pear"]

### Question 7

**Predict the Output**

```
source = ["Apple", "Orange", "Peach", "Pear"]

for word in source:
     if word[1] == "e":
          print("Yes")
     else:
          print("No")
```


- [x] No<br>No<br>Yes<br>Yes
- [ ] Yes<br>Yes<br>No<br>No
- [ ] No<br>No<br>No<br>No
- [ ] Yes<br>Yes<br>Yes<br>Yes

### Question 8

**Predict the Output**

What will the output be for the following program?

```
my_list = [1, 1, 2, 3, 5, 8, 13]

if len(my_list) > 6:
     print ("A")
if my_list[3] < 4:
     print ("B")
else:
     print("C")
```


- [x] A<br>B
- [ ] A<br>C
- [ ] A<br>B<br>C
- [ ] B
- [ ] C
- [ ] A
- [ ] B<br>C

### Question 9

**Predict the Output**

What will the output be for the following program?

```
my_list = [1, 1, 2, 3, 5, 8, 13]

if len(my_list) > 6:
     print ("A")
elif my_list[3] < 4:
     print ("B")
else:
     print("C")
```


- [x] A
- [ ] B
- [ ] C
- [ ] A<br>B
- [ ] A<br>C
- [ ] A<br>B<br>C
- [ ] B<br>C
