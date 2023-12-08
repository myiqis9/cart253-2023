## Project 2 - Room Escape Game
### by Viviana Ema Radu for CART 253

This is a point & click escape room puzzle game. Using your mouse, navigate through a gruesome, barren locked room, find items to add to your inventory, and use them to solve various puzzles in order to make your way out... as an impending feeling of doom looms above you.

#### Creative Direction
This game is heavily inspired by point & click adventure games and locked room type puzzle games from the early 2000's era. Mainly, the more indie low-budget ones that were popular on free publishing websites such as Newgrounds. The door needing to be opened by cubes is a direct homage to the *Cube Escape* series which I was obsessed with back when I was a kid. Other direct inspirations would be games on the Nintendo DS such as *Zero Escape* which inspired the cutscenes and the *Rusty Lake* and *Alice is Dead* flash game series for overall art style and scenarios. I was also inspired by a beloved free indie game of mine, *If On A Winter's Night, Four Travellers* for the feeling of simple yet accomplishing puzzles and vaguely old-timey room design. 

I wanted to go with the vibe of a barren, simple room where things are clearly *off.* Bloodstains hidden inside cupboards, large creepy statues placed right in the middle of a room... and is that a dead bird?

All the art of the game was drawn by myself, and I ended up having much less time to devote to it than I hoped, so it stayed pretty simple in colors and shapes. Thanks to that, though, I got to color coordinate my game easier, since relevant elements stand out much easier as the only splash of color against an otherwise somber crimson-beige background. I've changed the direction of how I drew some objects to make my game as accessible to new gamers as possible. Things such as the cubes and the scrap of paper are very contrasted to give an indication that their color coding is important. 

Some major items that aren't color coded still stand out, notably the angel statue and deer taxidermy. The angel statue is a direct nod at the Weeping Angels from *Dr. Who*, while the deer taxidermy is a inspired from *Rusty Lake Hotel*. There's also the stuffed dead crow by the window. The imagery of taxidermy felt fitting for a game with the possible theme of being stuck in time, trapped in a cold room that feels almost like purgatory. I wanted to keep the possibility of the game branching off into a possible storyline.

All sounds were taken from freesounds.org. Their crediting can be found in AudioPlayer.js. Additionally, the background music used throughout my game is of the Gnossiennes (1 through 4) by Erik Satie. 

#### User Experience
Like all classic point & click games, I wanted to stay simple and keep user control mouse-only. There are arrows to indicate where you can move between rooms and players are mostly expected to click around everywhere until things happen.

Because I'm keeping to the classic flash game point & click vibe, I didn't think a tutorial was necessary, since indications on how to move around are clear and players will be drawn to clicking on whatever's colorful and pick up intuitively on trying things out. 

The inventory system is more complex, letting you drag items and swap them around your inventory, because moving stuff around to organize items by relevancy such as pairing up cubes could be useful to some players. Additionally, I just think it's more fun than it staying static. The drag was mostly referenced from my previous Project 1, in which I used a similar mechanic for the fox food. The biggest challenge I hesitated on was on how to make sure the inventory checks before adding an item in case the inventory is full, but it turned out to have a simple solution. Overall, this was also one of the most fun parts to code.

The text cutscenes aren't too long to not take too much space away from the gameplay, but I felt adding a bit of dialogue to create a setting would add to the user immersion in thinking there's more than meets the eye to this simple room to escape from. Originally, I was meaning to do something similar to *Alice is Dead*, in which there is a small dialogue prompt box above the inventory that offers new dialogue for everything the player clicks or for when they try to make certain items interact with certain objects. It would help with figuring out the puzzles as well as add characterization to the assumed player character. This ended up being scrapped mostly because my game is complicated enough as it is! But if I had time to add more, that was definitely the next thing in order.

#### Technical Work
There are a lot of classes for a lot of different objects that can be interacted with. I made all puzzles one very big class with a billion constructor variables in my original prototype, and then I realized almost immediately that it was never going to work unless I wanted a bunch of messy code piled into never ending if else statements.

I ended up having to constantly add new branching classes for a lot of individual objects, even for the slighest little changes in behavior from each other. I think this ended up having my code more organized, though, and definitely more easy to look through when I separated each object clearly from each other. An object I struggled more with was the statue, as the cutscenes took me a while to remember as I wasn't too familiar with the workings of JavaScript's SetInterval. 

The main problem I had for a while was just how *much* was in my game. Displaying each scene and letting the player interact with it caused me so many problems early on. I had to set a small milisecond cooldown with SetTimeout to only allow the player to interact with one thing at a time, because the game checks for every single thing you click on when the player clicks, and some objects inevitably overlap. This would break my game constantly, notably because arrows were sometimes placed over objects that would mess up the active scene displaying. This added the new problem that only one thing being interacted with meant I had to make sure that one thing would be the *right* thing each time. It took me a long time to come up with what became such a simple solution for that one (iterating through the arrays backwards, since objects on top get drawn last).

P5 sound library was fun to use and I think my idea of the sound becoming louder the close the player is to the radio was especially fun to implement. I did struggle with it since we spent so little time in class on it though, and I ended up giving up on things like looping the background audio, because the reverb was making it really janky for me.

Most of all, what I spent most of my time doing was just cleaning my code and rearranging everything so that everything is properly separated and makes sense. This definitely helped me a lot in becoming more organized and efficient in my work. 

#### Conclusion
What a fun project! This was a game that I dreamed of taking a shot at doing for a while, and it definitely won't be my last attempt. I've always been a big fan of point & click puzzle games and their endless potential. I'm very happy with my end result.