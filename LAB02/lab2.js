// LAB02 
//  Rock Paper Scissors 

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
  const r = Math.random();
  if (r <= 0.34) return "PAPER";
  if (r <= 0.67) return "SCISSORS";
  return "ROCK";
}

