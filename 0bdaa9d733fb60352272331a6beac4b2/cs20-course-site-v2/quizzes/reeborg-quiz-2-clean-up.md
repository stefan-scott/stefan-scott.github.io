---
title: "Reeborg Quiz 2: Clean Up"
layout: "default"
published: true
item_id: "g8b9953d535a93e2425655d403b4ebc7c"
primary_module_slug: "08-reeborg-constrained-language"
primary_position: 6
nav_title: "Reeborg Quiz 2: Clean Up"
---

# Reeborg Quiz 2: Clean Up

*Quiz*

**Points:** 10.0

This is our first Reeborg quiz, to test our understanding of **functions, loops, and conditionals.** Be sure to read the question instructions carefully, as well as the general rules laid out below:

**Hints**

*1. As a class we wrote some absolute direction functions. Here is a reminder of one, in case you'd like to use it.*

```
def point_south():
    #absolute direction → point Reeborg south.
    while not is_facing_north(): 
        turn_left()   #turns until facing north
    turn_left() #faces west
    turn_left() #faces south
```

*2. Reeborg will not start in the same row as the shelf.*

**Reference Material**

No outside reference material is allowed during this problem. You may, however, use Reeborg's Keyboard from inside the Reeborg Environment.


*(No machine-readable questions found in this quiz export.)*
