---
title: "Rock Paper Scissors"
layout: "default"
published: false
item_id: "g1011cc6be14e21b08c5189f40c1b618e"
primary_module_slug: "06-scratch-03-variables"
primary_position: 9
nav_title: "Rock Paper Scissors"
---

# Rock Paper Scissors

**Points:** 100.0
**Submission type:** online upload
**Allowed file types:** sb3,zip

For this program, you'll create a human vs. computer version of *Rock, Paper, Scissors*.

- The program should loop until a win condition has been met (best of 5). The current score should always be displayed.
- The user should be prompted for their choice, either by keyboard input or clicking on a sprite.
- The computer should then randomly choose its choice.
- The result of the round should be announced by a third sprite.
  - The current score should be updated
- Once a winner has been determined, it should be reported on the screen by a sprite.

**A few more details:**

When your two competing sprites (computer controlled and human controlled) have both made their choices, the sprites should display their current choice in a speech bubble:  
  
![Rock, Paper, Scissors Introduction](../files/web_resources/Images/Lab02/RockPaperScissorsIntro.jpg "Rock, Paper, Scissors Introduction")

Once you've got this much working, add a third character who will judge each round. When both of the competitng characters have made their choice, have *one of them* signal to the the third character, who will report who won the round (or if it was a tie).

- There are 9 possibilities you need to check for ( Rock - Rock,    Rock - Paper,     Rock - Scissors, etc...)
- If you think carefully about the logic, though, you can use less than 9 **if statements** to handle all 9 cases
  - by using additional **logical operators** you can reduce all the way down to 3 cases.

**When a round ends, when the game ends:**

Add **cat\_score** and **duck\_score** variables that keep track of how many times each character has won. Make these variables visible on the stage.

 The entire game should be done when one of the sprites has accumulated **three wins.** *(best of 5)*This sprite should be announced as the winner, and the entire program should start again.

**Control Flow Hint:**

In the game, there are 3 actions:

1. Player 1 Makes a Choice
2. Player 2 Makes a Choice
3. Judge Sprite determines who won the round and reports it

It is very important that these three steps *always happen in the same order.* A good way to control when a script runs is through use of broadcasts. The above psuedo-code could be improved to:

1. When Player 1 receives "Player 1's turn", Player 1 Makes a Choice, then Broadcasts "Player 2's turn"
2. When Player 2 receives "Player 2's turn", Player 2 Makes a Choice and Broadcasts "Time to Judge"
3. When the Judge receives, "Time to Judge", The judge determines who won the round, reports that to the screen, and if no sprite has reached 5 yet, broadcasts "Player 1's turn"

**Expert for Challenge**

- Add a choice at the start of the program where the game can either be human vs. computer or computer vs. computer. The computer-only version should follow the same procedure, but will execute autonomously and the user can watch the matches play out.

*Submit your project as a URL of your shared project on the Scratch website.*

**Outcomes**

CP1, FP1, FP2, FP3
