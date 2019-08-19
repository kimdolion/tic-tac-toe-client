# Tic-Tac-Toe README

### Technologies Used
HTML, CSS, javascript, Boostrap, AJAX

### Development Process
Created a wireframe with general layout of the webpage with a focus on minimal appearance/simple function to keep myself grounded in "not focusing on making it pretty".

Began the HTML file with the skeleton of a gameboard using divs with class labels to help with targeting it for event listeners later.
Started making curl scripts for authentication. Began updating HTML with form inputs for sign-in, sign-up, sign-out, change password, and a button for placeholder button for games.

Began branching to focus features and have better version control going forward.

Feature2: attempted to set up curl scripts for the game to help guide understanding of what needed to be coded.

Feature3: created gameboard with click event listeners for the gameboard container. Will reset all boxes upon signing out.

Feature4: added in win conditions, new game button, and display games button. buttons and game board are hidden until successful sign in. Display games will tell you how many games have been played so far.
-hit roadblock; rewrote on paper what the click expectations were, switched from having two separate clicks for x's and o's to have a nest if else statement for clicking on the gameboard.


### Problem-Solving
Git Version Control
  -I had started using my master for my starter code not realizing that is what a branch is for. After many branch merges and attempts at rebasing, I just copied over the correct code into the master branch to override all of the issues that were coming from having bad branching.

Game Logic
  -I talked with consultants and cohort members through a lot of ideas, frustration, and confusion over the syntax/logic. I wrote out pseudocode in notebooks and talking outloud to myself to think through the process. I also started leaving comments on code and trying to make a mental map of where each piece of code was and how they were entangled with each other. Began to do a lot of trial and error of moving pieces around while trying to better understand what the code was doing. While I was doing this, I began just deleting the code which left me more confused than not, so I switched to commenting out the code while making adjustments.

Styling Issues
  -Game winner text was being applied to the previous styling then immediately overwritten by another message. I talked it out with another person in the cohort to see if they saw what was happening. Realized that the winner would be announced on the previous click's color then the message would be updated with the correct color and the next turn messaging, which meant that the checkforwinner with its coloring would be called in the wrong order. Began trial and error to move pieces around to try to get the winner message to display properly. Added a store.winner variable to the checkforwinner function then used an if else statement in my ui to change the message when appropriate.

### Unsolved Problems
I'd like to make use of the various other form functions regarding showing a game, showing all games played, and possibly returning to an unfinished game. The forms are in the html, and many of the JS pieces are set up but there just isn't enough time at the moment for me to implement them.

Of course, I'd also like to have better styling. Would have liked to make use of modals for the sign-in/up parts and for displaying games played but currently too worried about breaking the game for the nth time.

### Wireframes and User Stories
I created a GoogleDoc with my wireframes with bonus goals for once I got the game working.
[Wireframes and Game Logic](https://docs.google.com/document/d/11EOo66GlwZ4Z36bkBZ1rLE_e6uPFOURrwaPe-qyy9tY/edit?usp=sharing)

I created a GoogleDoc with my user stories with bonus goals for once I got the game working.
[User Stories](https://docs.google.com/document/d/1iTRYgMV0XK1UHUHtS1pb5L_2ZRFf8WYD2LOeXDgZZbU/edit?usp=sharing)
## Additional Resources
