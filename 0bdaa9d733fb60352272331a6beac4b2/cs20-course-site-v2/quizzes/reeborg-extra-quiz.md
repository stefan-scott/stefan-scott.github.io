---
title: "Reeborg Extra Quiz"
layout: "default"
published: false
item_id: "gcb27c276ef81df97a07e5005f62c51a5"
primary_module_slug: "08-reeborg-constrained-language"
primary_position: 7
nav_title: "Reeborg Extra Quiz"
---

# Reeborg Extra Quiz

*Quiz*

**Points:** 1.0
**Time limit:** 30 minutes

We've spent several days working on our **problem-solving** abilities in the Reeborg Environment. This quiz will be a chance to show what you've learned so far.

Don't forget - large problems can typically be *decomposed* into multiple smaller problems that can be solved and tested on their own!

**About your Library:**

For this quiz, you may keep the following in your library if you want:

- turn\_right()
- turn\_around()
- point\_north(),  point\_west(),  point\_south(),  point\_east()
- If you don't have the absolute direction functions, here is a reminder in case you'd like to use one:

```
def point_south():
    #absolute direction → point Reeborg south.
    while not is_facing_north(): 
        turn_left()   #turns until facing north
    turn_left() #faces west
    turn_left() #faces south
```

*Please remove all other library functions before beginning to build your solution. Any other functions you may need should be created as you work on this quiz.*


*(No machine-readable questions found in this quiz export.)*
