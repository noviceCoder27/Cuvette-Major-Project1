// Values used in multiple functions
const moves = ["Rock", "Paper", "Scissors"];
let computer = document.querySelector('.computer-score');
let player = document.querySelector('.player-score');
const nextButton = document.querySelector('.next');
const resetButton = document.querySelector('.reset');
const playerButtons = document.querySelector('.play-btns');
const roundResult = document.querySelector('.round-result');
const playerSelectedBtn = document.querySelector('.player-btn');
const computerSelectedBtn = document.querySelector('.computer-btn');
//

window.onload = () => {
    if(localStorage.getItem("computerScore") && localStorage.getItem("playerScore")) {
        computer.innerHTML = localStorage.getItem("computerScore");
        player.innerHTML = localStorage.getItem("playerScore");
    } else {
        computer.innerHTML = "0";
        player.innerHTML = "0";
    }
}

const assignIconToButton = (btn) => {
    const img = document.createElement("img");
    if(btn) {
        img.setAttribute('src', `./assets/${btn.value}.png`);
        img.setAttribute('alt', `${btn.value}`);
        btn.appendChild(img);
        btn.classList.add(`${btn.value}-btn`);
    } else {
        throw Error('Error while receiving value');
    }
}

const removePrevValue = (playerBtn,computerBtn) => {
    if(playerBtn.firstElementChild && computerBtn.firstElementChild) {
        playerBtn.removeChild(playerBtn.firstElementChild);
        computerBtn.removeChild(computerBtn.firstElementChild);
        playerBtn.classList.remove(`${playerBtn.value}-btn`);
        computerBtn.classList.remove(`${computerBtn.value}-btn`);
    }
}

const updatePlayingArea = () => {
    roundResult.classList.add('hide');
    playerButtons.classList.remove('hide');
    nextButton.classList.add('hide');
    removePrevValue(playerSelectedBtn,computerSelectedBtn);
}

const playAgain = () => {
    const replay = document.querySelector('.replay');
    replay.addEventListener('click',() => {
        updatePlayingArea();
    });
}

const displayResultMessage = (message,resultText) => {
    if(message !== "TIE UP") {
        resultText.innerHTML = 
        `
        <p class = "main-text">${message}</p>
        <p class = "sub-text">AGAINST PC</p>
        `;
    } else {
        resultText.innerHTML = message;
    }
    
    playerButtons.classList.add('hide');
    roundResult.classList.remove('hide');
    playAgain();
}

const oneRoundResult = (message,playerChoice,computerChoice) => {
    const resultText = document.querySelector('.result-text');
    playerSelectedBtn.value = playerChoice;
    computerSelectedBtn.value = computerChoice;
    assignIconToButton(playerSelectedBtn);
    assignIconToButton(computerSelectedBtn);
    displayResultMessage(message,resultText)
}

const resultTally = (playerScore,computerScore) => {
    computer.innerHTML = String(computerScore);
    player.innerHTML = String(playerScore);
    localStorage.setItem("computerScore",computerScore);
    localStorage.setItem("playerScore",playerScore);
}

const showLayers = (p) => {
    const playerChoice = document.querySelectorAll('.player-border');
    const computerChoice = document.querySelectorAll('.computer-border'); 
    switch(p) {
        case "player":
            playerChoice.forEach(choice => choice.classList.remove('layer-hide'));
            computerChoice.forEach(choice => choice.classList.add('layer-hide'));
            break;
        case "computer": 
            computerChoice.forEach(choice => choice.classList.remove('layer-hide'));
            playerChoice.forEach(choice => choice.classList.add('layer-hide'));
            break;
        default: 
            computerChoice.forEach(choice => choice.classList.add('layer-hide'));
            playerChoice.forEach(choice => choice.classList.add('layer-hide'));
            break;
    }
}

const  result = (message) => {
    let playerScore = parseInt(player.innerHTML);
    let computerScore = parseInt(computer.innerHTML);
    switch(message) {
        case "YOU WIN":
            playerScore++;
            nextButton.classList.remove('hide');
            showLayers("player");
            resultTally(playerScore,computerScore);
            break;
        case "YOU LOSE":
            computerScore++;
            nextButton.classList.add('hide');
            showLayers("computer");
            resultTally(playerScore,computerScore);
            break;
        case "TIE UP":
            nextButton.classList.add('hide');
            showLayers("");
            resultTally(playerScore,computerScore);
            break;
    }
}

const toggleToHurray = (playingArea,victoryPage) => {
    nextButton.classList.add('hide');
    resetButton.classList.add('hide');
    playingArea.classList.add('hide');
    victoryPage.classList.remove('hide');
}

const toggleToPlayingArea = (playingArea,victoryPage) => {
    resetButton.classList.remove('hide');
    playerButtons.classList.remove('hide');
    playingArea.classList.remove('hide');
    roundResult.classList.add('hide');
    victoryPage.classList.add('hide');
}


const showVictory = () => {
    const playingArea = document.querySelector('.playing-area');
    const victoryPage = document.querySelector('.victory');
    const playAgain = document.querySelector('.play-again');
    nextButton.addEventListener('click', () => toggleToHurray(playingArea,victoryPage));
    playAgain.addEventListener('click',() => {
        removePrevValue(playerSelectedBtn,computerSelectedBtn);
        toggleToPlayingArea(playingArea,victoryPage)
    });
}

showVictory();

const reset = () => {
    resetButton.addEventListener('click', () => {
        resultTally("0","0");
        nextButton.classList.add('hide');
        updatePlayingArea();
    });    
}

reset();

const toggleRuleBox = () => {
    const rulesBox = document.querySelector('.rule-box');
    const closeButton = document.querySelector('.cross'); 
    const openButton = document.querySelector('.rules');
    openButton.addEventListener('click', () => {
        rulesBox.classList.remove('rule-hide');
    });
    closeButton.addEventListener('click', () => {
        rulesBox.classList.add('rule-hide');
    });
}

toggleRuleBox();

const winner = (player1,player2) => {
    if(moves.includes(player1) && moves.includes(player2)) {
        switch(player1) {
            case "Rock":
                return player2 === "Rock" ? "TIE UP": player2 === "Paper" ? "YOU LOSE": "YOU WIN";
            case "Paper":
                return player2 === "Rock" ? "YOU WIN": player2 === "Paper" ? "TIE UP": "YOU LOSE";
            case "Scissors":
                return player2 === "Rock" ? "YOU LOSE": player2 === "Paper" ? "YOU WIN": "TIE UP";
        }
    } else {
        throw Error("Invalid Move");
    }
}

function computerMove() {
    const random = Math.floor(Math.random()*moves.length);
    return moves[random];
}

computerMove();

function playerMove() {
    const buttons = document.querySelectorAll('.play-btn');
    buttons.forEach(btn => btn.addEventListener('click',(e) => {
        const myMove =  e.target.value || e.target.parentElement.value;
        const pcMove = computerMove();
        const winnerMessage = winner(myMove,pcMove);
        oneRoundResult(winnerMessage,myMove,pcMove);
        result(winnerMessage);
    }));
}

playerMove();


