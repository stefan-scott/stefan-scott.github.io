---
title: "Temperature Conversion"
layout: "default"
published: true
item_id: "g8d6cb5557333cf3a3c92600f690ccd24"
primary_module_slug: "10-python-basics"
primary_position: 2
nav_title: "Temperature Conversion"
---

# Temperature Conversion

**Points:** 10.0
**Submission type:** online upload
**Allowed file types:** py

![degrees.png](../files/web_resources/degrees.png)

Write a Python program that will convert between degrees Celsius to degrees Fahrenheit.

**Base Requirements:**

Part One:

Write a function called **c\_to\_f(),**which will do the following:

- Ask the user to input a temperature in Celsius

- Convert that value to Fahrenheit, and store that value in a variable

- Print a message to the console saying what the converted temperature's value is.

Part Two:

Write a similar function, called f**\_to\_c(),**which will do the following:

- Ask the user to input a temperature in Fahrenheit

- Convert that value to Celsius, and store that value in a variable

- Print a message to the console saying what the converted temperature's value is.

Part Three:

Have your program begin by letting the user choose which type of conversion they would like to run:  **f\_to\_c()** or **c\_to\_f()** .

- You may ask them to indicate their choice by entering a String or a numeric value.

Call the appropriate function based on the user's selection.

Style:

Your program must include both a comment header as well as inline comments, as described below.

**Sample Output:** 

*Reference the following sample output to double-check that your program yields the correct conversions:*

Type 'C' for Celsius to Fahrenheit or 'F' for the reverse: C  
Enter a temperature in Celcius: 46  
That is 114.8 degrees Fahrenheit

Type 'C' for Celsius to Fahrenheit or 'F' for the reverse: C  
Enter a temperature in Celcius: 0  
That is 32.0 degrees Fahrenheit

Type 'C' for Celsius to Fahrenheit or 'F' for the reverse: F  
Enter a temperature in Fahrenheit: 35.6  
That is 2.0 degrees Celsius

**Additional Tips:**

As this is the first Python assignment you are going to submit, the following notes might be useful:

- be sure to include a comment header in your code, which means your Python file should start with something like

```
#######################################################  
# Stefan Scott  
# Computer Science 20  
# October 23, 2017  
#   
# Temperature Conversion Program  
# Purpose: To convert a temperature from degrees to Fahrenheit.  
#######################################################
```

- make sure you save your file as a .py file. That is the only type of file you'll be able to upload for this assignment.

- use *input()* to allow the user to type in the temperature that should be converted [remember that *input()* will always return string-type data]

**Challenge Features**

- try to foolproof the input (in other words, make sure your program doesn't crash if I type in "frank" instead of 15). *Hint: Check out the [**try** and **except**](https://docs.python.org/3/tutorial/errors.html) keywords (read 8.3).*
- add the ability to convert to/from Kelvin as well (in one direction only - to either Celsius or Fahrenheit, *whichever you choose*)
