// LAB02 
//  Rock Paper Scissors 
//200594634
const prompt = require("prompt");



//  prompt 
// display
prompt.message = "";

prompt.delimiter = "";


// this is the schema to 
// validate user input
const schema = {
  properties: {
    userSelection: {
      description: "Choose ROCK, PAPER, or SCISSORS:",
      pattern: /^(rock|paper|scissors)$/i,
      message: "Please select an option ROCK, PAPER, or SCISSORS",
    //   added required
      required: true,
    },
  },
};


// this will generate computer
//  move based on random number
function getComputerSelection() {
    //random number
    //  between 0.0 and 1.0
  const r = Math.random();
 
  if (r <= 0.34) return "PAPER";
  if (r <= 0.67) return "SCISSORS";
  return "ROCK";
}

// here this part of code 
// decides winner using rock paper and scissors rule
function decideWinner(user, comp) {
  if (user === comp) return " Oops it's a tie";
  const beats = { ROCK: "SCISSORS", SCISSORS: "PAPER", PAPER: "ROCK" };
  return beats[user] === comp ? "User Wins" : "Computer Wins";
}
//main function
async function main() {

    //this will start the prompt
  prompt.start();
  
    //this will ask user for an input and read their choice
    const { userSelection } = await prompt.get(schema);
    const user = userSelection.trim().toUpperCase();
    const computer = getComputerSelection();
//print both choice
console.log(`\nUser chose: ${user}`);
    console.log(`Computer chose: ${computer}`);
    //display winner
    console.log(`\n${decideWinner(user, computer)}`);
  }
 


main();


//completed LAB02