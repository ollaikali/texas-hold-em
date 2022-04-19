# Texas Hold'em Poker Game
## Description
Production level Texas Hold'em poker game done in Node.js
## Getting Started
******Please make sure you have at least Node version v16.13.0***
### Installation & Start:
* Clone this repository to any folder
* Open that folder in your code editor and type **npm install** (or **npm i**) in your terminal
* You can then type **node main.js** command to start the program in Node.js
### Dependencies:
* Inquirer: **npm install inquirer**
## Demo
  After installation of all required components and running **node main.js** in command line you will see a welcome message and the first question in the console.
  
  ![project demo image questions](https://i.ibb.co/QYxwb5T/Screenshot-line-question.png)
  
  Each question has some sort of validation. For example:
  
  **Cards validation.** Only standard playable cards can be entered (see **Rules** for the list of playable cards available).
  
  ![project demo image validation](https://i.ibb.co/H47d2tz/community-cards-validation.png)
  
  **Name validation.** Only letters of any case can be entered.
  
  ![project demo image validation](https://i.ibb.co/cTtZmPv/name-validation.png)   
  And so on...
  
  After answering all required questions and adding as many players as you want you will see something like this:
  
  ![project demo image answers](https://i.ibb.co/CKhd3jZ/Screenshot-lines-of-answers.png)
  
  After answering "yes" (y) to the "ready to play?" question, you will see the summary of all information you entered, results, combinations that were found, kicker cards of their highest combo, and ranking of players based on their hand value.
  
  ![project demo image](https://i.ibb.co/ysSVGv7/Screenshot-61.png)

# Rules
## Cards and Naming:

[Texas Hold'em Wiki](https://en.wikipedia.org/wiki/Texas_hold_'em)

### Faces:

1-9 represent their respective values. For others:

T	10

J	Jack

Q	Queen

K	King

A	Ace

### Suits:

H	Hearts

S	Spades

D	Diamonds

C	Clubs
