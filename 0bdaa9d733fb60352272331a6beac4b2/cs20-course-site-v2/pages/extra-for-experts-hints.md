---
title: "Extra for Experts Hints"
layout: "default"
published: false
item_id: "g2993d7584b249875c509ebe29f833f98"
primary_module_slug: "21-javascript"
primary_position: 5
nav_title: "Extra for Experts Hints"
---

# Extra for Experts Hints

The Skeleton code provided on the GitHub site shows us how to chain single instructions with a time delay in between with the client.after() notation.

A problem presents itself when designing the extra for experts portion, as your user-defined functions turnRight(), forward(), etc... need to combine a few actions (move/turn, wait, stop). *There is another way to add a time delay in javascript that may be useful for these user-defined functions:*

**setTimeout(function,delay);**

setTimeout will call the function passed in as the first argument after a delay in milliseconds, defined in the second argument.

If you create a user-defined function to stop the drone():

function stopDrone(){

client.stop()

}

A sample user-defined function using setTimeout might look like this:

function turnLeftThenTurnRight(){

client.counterClockwise(0.3);  
setTimeout(stopDrone,1000);  
client.clockwise(0.5);  
setTimeout(stopDrone,600);

}
