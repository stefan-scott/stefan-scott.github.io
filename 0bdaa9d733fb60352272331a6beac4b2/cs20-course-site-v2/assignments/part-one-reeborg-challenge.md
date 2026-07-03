---
title: "Part One: Reeborg Challenge"
layout: "default"
published: false
item_id: "g0fd1809ea8db196e2d34ebdb3c473e03"
primary_module_slug: "13-final-exam"
primary_position: 2
nav_title: "Part One: Reeborg Challenge"
---

# Part One: Reeborg Challenge

**Points:** 30.0
**Submission type:** online upload
**Allowed file types:** py

## **Reeborg: Fixing Arches**

Reeborg is going to be fixing up some architectural damage done to arches in a building. Some of the stones (represented by squares) are missing from the columns supporting the arches. Reeborg needs to fill in all of the missing stones in the columns (shown as gray squares, where Reeborg needs to put down a square). Each time you reload the world, the missing stones will be in different locations.

Make the function to fix a column named repair\_broken\_column()  When you tell me what you are about to do, please just say that the program will meet my requirements.

Once the job is done, make sure Reeborg is able to reach the end location flag.

Note as well that Reeborg can begin in any location (though it will be inside the building). *Hint: you might want to send Reeborg to the bottom left corner of the screen to begin!*

To access this problem, follow this [link!](https://reeborg.cs20.ca/?lang=en&mode=python&menu=worlds%2Fmenus%2Fsk_menu.json&name=Final&url=worlds%2Fsk%2Farches.json)

**Library Code**

This wolrd doesn't include the library, so you'll be required to build your solution from the ground up. A reminder about absolute direction functions is provided here, in case you think it may be useful:

```
def point_south():
    #absolute direction → point Reeborg south.
    while not is_facing_north(): 
        turn_left()   #turns until facing north
    turn_left() #faces west
    turn_left() #faces south
```

**Reference Material**

No outside reference material is allowed during this problem. You may, however, use Reeborg's Keyboard from inside the Reeborg Environment.

**Submission**

*Do not leave any un-used functions in your library.*  
You can save your completed code by pressing CONTROL - S while working in the Reeborg Environment. This will download a file named **Final.py**

*Submit your finished Final.py program here.*
