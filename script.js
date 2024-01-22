const validInput = ["rock", "paper", "scissors"];
game();

/**
 * Plays 5 rounds of Rock, Paper, Scissors. For each round, the player enters their
 * choices in the console. The opponent's choice is randomly generated. Each round's
 * results and the overall results are printed to the console.
 */
function game() {
    console.log(`Welcome to Rock Paper Scissors! The winner is determined from a Best-of-5 format.`);
    
    try {
        let score = 0;
        for(i = 0; i < 5; i++) {
            let playerChoice;
            // Marks start of round
            while(true) {
                playerChoice = prompt("Choose your weapon: ").toLowerCase();
                if(!validInput.includes(playerChoice)) {
                    console.log("Invalid choice: please pick from [rock, paper, scissors].");
                    continue;
                } else {
                    console.log(`ROUND ${i+1}: You picked ${playerChoice}`);
                    
                    const compChoice = getComputerChoice();
                    let result = evaluateRound(playerChoice, compChoice);
                    // Tie detected, start the round over
                    if(result == 0) { continue; }
                    else if(result == 1) { score++ }
                    else { score--; }
                }
                break;
            }
            // Best-of-5 determined early
            if(score == 3) {
                console.log(`WINNER!!! You won in ${i+1} rounds.`);
                return;
            } else if(score == -3) {
                console.log(`LOSER!!! You lost in ${i+1} rounds.`);
                return;
            }
        }
    
        // Evaluate the game
        if(score > 0) {
            console.log(`WINNER!!! You won in 5 rounds.`);
        } else if(score < 0) {
            console.log(`LOSER!!! You lost in 5 rounds.`);
        }
    } catch(error) {
        console.error(error);
    }
    
}

/**
 * Determines the winner of a Rock-Paper-Scissors rounds given
 * the choices made by the player and opponent.
 * @param {string} playerSelection - The player's choice, one of [rock, paper, scissors]
 * @param {string} computerSelection - The computer's random choice, one of [rock, paper, scissors]
 * @returns {integer} 1 - player wins the round | -1 - player loses the round | 0 - player tied
 */
function evaluateRound(playerSelection, computerSelection) {
    let result;
    switch(playerSelection) {
        case "rock":
            if(computerSelection === "paper") {
                result = -1;
            }
            else if(computerSelection === "scissors") {
                result = 1;
            }
            else {
                result = 0;
            }
            break;
        case "paper":
            if(computerSelection === "scissors") {
                result = -1;
            }
            else if(computerSelection === "rock") {
                result = 1;
            }
            else {
                result = 0;
            }
            break;
        case "scissors":
            if(computerSelection === "rock") {
                result = -1;
            }
            else if(computerSelection === "paper") {
                result = 1;
            }
            else {
                result = 0;
            }
            break;
        default:
            // do nothing
    }
    if(result === undefined) { 
        throw new Error("Unexpected error."); 
    } else if(result > 0) {
        console.log(`Round won; ${playerSelection} beats ${computerSelection}!`);
    } else if(result < 0) {
        console.log(`Round lost; ${computerSelection} beats ${playerSelection}...`);
    } else {
        console.log("It's a tie! Try again.");
    }
    
    return result;
}

/**
 * Generates a random number and maps it to
 * a valid choice in Rock-Paper-Scissors
 * @returns {string} One of [rock, paper, scissors]
 */
function getComputerChoice() {
    const num = Math.floor(Math.random() * 3);
    if(num === 0) return "rock";
    else if (num === 1) return "paper";
    else return "scissors";
}