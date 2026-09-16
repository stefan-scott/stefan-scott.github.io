---
title: "Countdown with Sprites [Just For Fun - Scratch]"
layout: "default"
published: false
item_id: "gfafa4d88263928e822396852f7e8d934"
is_orphan: true
---

# Countdown with Sprites [Just For Fun - Scratch]

**Submission type:** not graded

## This is an OPTIONAL assignment -- you do not need to attempt it.

Often, we want to display text or numbers on the screen without using the say block. We have written a program that displays one number based upon a variable named digit. The original program is [available on the Scratch website here](http://scratch.mit.edu/projects/11107206/).

## How does the original code work?

We have created a MyDigit sprite with ten different costumes, one for each digit, as shown below. Costume 1 corresponds to the digit 1, costume 2 corresponds to the digit 2 and so on. Costume 10 corresponds to the digit 0. Each costume has a name (for example, one, as shown circled in yellow) and a number (for example, 1, as shown circled in red). 

![Digital display](../files/web_resources/Images/Lab02/Score_Display/Costumes.jpg "Digital display")

When we use the switch to costume block, we can specify either the name or the costume number. In the script below, we use the costume number (1-9) to set the costume unless the digit is 0. If the digit is 0, we cannot just tell it to switch to costume 0 (because there is no costume 0), so we have to use the name of the costume (zero).

![Example script using 'switch to costume'](../files/web_resources/Images/Lab02/Score_Display/DigitDisplay.gif "Example script using 'switch to costume'")

## Modulus

The !['Mod' block](../files/web_resources/Images/Lab02/Score_Display/modImage.jpg "'Mod' block")block is essential to completing the program efficiently. The modulus operator is used to return the remainder of a division operation. It might remind us how we answered division problems before we learned about decimals(e.g. 10 / 3 = 3 remainder 1). 10 mod 3 = 1. As you complete this assignment, consider the place value of each digit you need to change. If I am counting down from 25. I can grab the "5" off of 25 by doing 25 mod 10 since 25 mod 10 = 5. And I can grab the "2" by performing the following operation:   
  
[[25 - [25 mod 10]] mod 100] / 10 =   
[[25 - 5] mod 100] / 10 =   
[20 mod 100] / 10 =  
[20] / 10 =   
2(!)   
  
  
For more explanation on the mod block, right-click on the block and select Help. 

When you complete your project, it should work like this:  
<http://www.youtube.com/watch?v=DOEaBB7cwcE>

 As per usual, submit via a file upload or a URL to your published project on the Scratch website.
