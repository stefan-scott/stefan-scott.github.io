---
title: "Javascript Reference and Class Examples"
layout: "default"
published: false
item_id: "g93375cba6d0f1c624d726d4509ccaf86"
primary_module_slug: "21-javascript"
primary_position: 1
nav_title: "Javascript Reference and Class Examples"
---

# Javascript Reference and Class Examples

For this mini-unit, we'll be developing in Javascript. There are some syntactical differences between it and the languages we have previously used, but the underlying fundamental concepts of computer science still apply. Use the following quick references to look up how certain structures (variables, conditions, loops) are implemented in this language.

Quick Reference One: <http://www.cheat-sheets.org/saved-copy/jsquick.pdf>

Quick Reference Two: <https://gist.github.com/thegitfather/9c9f1a927cd57df14a59c268f118ce86>

Array Methods: <http://www.w3schools.com/jsref/jsref_obj_array.asp>

user input:

var name = prompt("What is your name?");

print to console:

console.log(name);  
console.log("Thanks for using this program!");

**Class Exercises:**

1. Write a function called max that *returns* the maximum of the two numbers passed in as parameters. For example, if you made a call like  
      
   var x = max(10, 14);   
   x should have the value 14.   
     
   For your program, you need to define the function and call it and print out the result like  
     
    var x = max(10, 14);  
    println("The max is " + x);
2. Write a program that calculates the area of a rectangle.  
    Ask the user for the width and height. Store this information in two variables. Use this information to determine the area. Print out a message with the answer.

**On Your Own:**

1. Arrays: You are given an array of names of people who are in line. Try using if statements and the indexOf   
    method of arrays to see if Bob is in line.  
     
   var line = ["Sam", "Lisa", "Laurie", "Bob", "Ryan"];  
   var line2 = ["Tony", "Lisa", "Laurie", "Karen"];  
     
   You should print whether Bob is in each line. Your console should look print something like this:  
     
   Bob is in the first line.  
   Bob is not in the second line.
2. You are given an array of names of people who are in line for movie tickets. Use the remove element  
    to remove the first person from the line twice, as if you have just given them their tickets.  
     
   var line = ["Sam", "Lisa", "Laurie", "Bob", "Ryan"];  
     
   You should write a function to print everyone in line. Then print the line before and after removing the people. The console should print this:  
     
    Sam, Lisa, Laurie, Bob, Ryan   
   Laurie, Bob, Ryan
3. Design a program that does the following:   
     
   Creates an empty array called **things** Using **raw\_input**, ask the user to enter 5 strings and add (push) them to **things   
   Print** the list   
   Using **prompt**, ask the user to enter 2 different numbers between 0 and 4   
   Remove the elements at the indices of those two numbers.   
         - For this step, look through the quick reference to see what operations are available for arrays!  
         - you may need to think outside the box a bit!  
   **Print** the updated list.
