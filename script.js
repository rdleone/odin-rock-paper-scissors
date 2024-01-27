const POINTS_TO_WIN = 5;

const gameText = document.querySelector('.game-text');
const btnContainer = document.querySelector('.btn-container');
const buttons = document.querySelectorAll('button');


let playerScore = 0;
let opponentScore = 0;

btnContainer.addEventListener('click', (event) => {
    
    const target = event.target;
    // target.setAttribute("style","background-color: green");
    const compChoice = getComputerChoice();

    buttons.forEach((button) => {
        if(button.id == target.id) {
            button.setAttribute("style","background-color: green");
        } else if(button.id == compChoice) {
            button.setAttribute("style","background-color: red");
        }
        else {
            button.setAttribute("style","background-color: aquamarine");
        }
    })

    let result = evaluateRound(target.id, compChoice);

    // Update score
    switch(result) {
        case 1:
            playerScore++;
        break;
        case -1:
            opponentScore++;
        break;
        case 0:
            // do nothing
        break;
        default:

        break;
    }

    const roundData = {
        playerChoice: target.innerText.toLowerCase(),
        opponentChoice: compChoice,
        result: result
    };

    updateGameText(gameText, roundData, playerScore, opponentScore);

    // Game over, reset
    if(playerScore == POINTS_TO_WIN || opponentScore == POINTS_TO_WIN) {
        playerScore = 0;
        opponentScore = 0;
    }

});

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

/**
 * Display new game info based on the state of the game by
 * creating and adding text elements to the provided text container
 * @param {Node} gameText The <div> containing the game text elements
 * @param {object} roundData Information from the most recent round
 * @param {string} roundData.playerChoice The player's last move
 * @param {string} roundData.opponentChoice The computer opponent's last move
 * @param {integer} roundData.result The round's result as provided by evaluateRound
 * @param {integer} playerScore The player's current score
 * @param {integer} opponentScore The computer opponent's score
 */
function updateGameText(gameText, roundData, playerScore, opponentScore) {
    removeAllChildNodes(gameText);

    let mainText = document.createElement('h1');
    let subText = document.createElement('h2');
    gameText.appendChild(mainText);
    gameText.appendChild(subText);

    if(playerScore == POINTS_TO_WIN) {
        mainText.textContent = 'YOU WIN !!!';
        subText.textContent = `Final Score: Player ${playerScore} , Opponent ${opponentScore}`;
    } else if(opponentScore == POINTS_TO_WIN) {
        mainText.textContent = 'You lose...';
        subText.textContent = `Final Score: Player ${playerScore} , Opponent ${opponentScore}`;
    } else {
        switch(roundData.result) {
            case 1:
                mainText.textContent = `Round won; ${roundData.playerChoice} beats ${roundData.opponentChoice}`;
            break;
            case -1:
                mainText.textContent = `Round lost; ${roundData.opponentChoice} beats ${roundData.playerChoice}`;
            break;
            case 0:
                mainText.textContent = `It's a tie! Try again.`;
            break;
            default:
                mainText.textContent = 'ERROR';
            break;
        }
        subText.textContent =  `Current Score: Player ${playerScore} , Opponent ${opponentScore}`;
    }
}

/**
 * Helper function used to clear game text
 * @param {Node} parent Node containing the children to remove
 */
function removeAllChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}