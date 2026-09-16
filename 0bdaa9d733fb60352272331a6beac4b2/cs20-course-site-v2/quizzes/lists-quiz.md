---
title: "Lists Quiz"
layout: "default"
published: false
item_id: "gfc3326f450b9cf1f21acf01a2b769d89"
primary_module_slug: "20-python-boolean-logic-images-strings-and-lists"
primary_position: 4
nav_title: "Lists Quiz"
---

# Lists Quiz

*Quiz*

**Points:** 6.0

Please answer the following questions using just your brain (no Python interpreters open, please!).


## Questions

### Question 1

**Question 1**

What is printed by the following statements?

```
alist = [3, 67, "cat", 56, "dog", 3.14, False]
print(alist[5])
```


- [ ] "dog"
- [ ] Error
- [ ] False
- [x] 3.14

### Question 2

**Question 2**

What is printed by the following statements?

```
alist = [3, 67, "cat", [56, 57, "dog"], [ ], 3.14, False]
print(alist[2][0])
```


- [ ] 56
- [x] c
- [ ] cat
- [ ] Error, you cannot have two index values unless you are using slicing.

### Question 3

**Question 3**

What is printed by the following statements?

```
alist = [3, 67, 'cat', 56, 'dog', 3.14, False, 'foo']
print(alist[4:6])
```


- [x] ['dog', 3.14]
- [ ] [56, 'dog']
- [ ] ['dog', 3.14, False]
- [ ] [56, 'dog', 3.14]

### Question 4

**Question 4**

What is printed by the following statements?

```
alist = [3, 67, 'cat', 56, 'dog', 3.14, False, 'foo']
print(alist[:4])
```


- [ ] [3,67,'cat']
- [x] [3,67,'cat',56]
- [ ] 'dog'
- [ ] 56

### Question 5

**Question 5**

What is printed by the following statements?

```
alist = [4,2,8,6,5]
alist.append(True)
alist.append(False)
print(alist)
```


- [ ] [4,2,8,6,5,False,True]
- [x] [4,2,8,6,5,True,False]
- [ ] [True,False,4,2,8,6,5]

### Question 6

**List Manipulation**

What is printed by the following statements?

```
alist = [4,2,8,5]  
alist.pop(2)
alist.append(True)
alist[2] = 10
print(alist)
```


*(Short answer / fill-in-the-blank question)*
