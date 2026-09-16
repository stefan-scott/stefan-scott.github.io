---
title: Choose Your Own Adventure
layout: default
published: false
item_id: gfff4c1aa844854a8d635b18c9a142647
primary_module_slug: 14-python-holding-folder
primary_position: 20
nav_title: Choose Your Own Adventure
---

# Choose Your Own Adventure

**Points:** 10.0
**Submission type:** online upload
**Allowed file types:** py,jpg,docx,ai,png

Decisions, decisions!

In this project, you'll be required to create a "Choose Your Own Adventure" text-based game. The program should unfold in different ways, depending on choices you allow the user to make. The story, scene, and characters are up to you, but the following elements must be included:

1. **Planning: A Flow Chart!**Before you start programming, begin by constructing a flow chart outlining the different decisions and branches that will be necessary for this program. You may make the flow-chart on paper or digitally, but it must be handed in with this project; a completed flow chart is one of the base requirements for this project.
2. **Start with a Name**Begin by asking the user to supply the protagonist's (or antagonist's?)  name. Use this name throughout the adventure.
3. **Logical Operators**   
     
   To practice using logical operators, you must incorporate all three (and, or, not) into this program.
4. **Number of Interactions**   
     
   A good choose-your own adventure should have several different decision opportunities. In your program, the user must be able to make at least 5 different choices that guide the program down different paths.
5. **The element of chance**   
     
   We recently have been working with the concept of pseudo-random number generation. Incorporate usage of random numbers to simulate a degree of chance in possible consequences of user decisions in the adventure.
6. **Play again?**   
     
   Once the game has concluded, prompt the user to see if they would like to play again and have your program act accordingly.

Expert Challenge

1. **Inventory**   
     
   Add a list (called inventory) into your program so that the user can have a collection of items in his/her possession. Have decision-making branches be dependent on whether the user has (or chooses to use) particular items.

![satchel.png](../files/web_resources/satchel.png)

*A few list methods that may come in handy:*

- .append() - add a new element to the end of the list    <https://www.w3schools.com/python/ref_list_append.asp>
- .remove() - remove a particular piece of data from a list   <https://www.w3schools.com/python/ref_list_remove.asp>
- **in** keyword - can check if something is in a list:

  ```
  my_list = ["apple", "orange"]
  if "orange" in my_list:
      print("found it!")
  ```
