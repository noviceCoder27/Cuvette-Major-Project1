// Values used in multiple functions
const moves = ["Rock", "Paper", "Scissors"];
let computer = document.querySelector('.computer-score');
let user = document.querySelector('.player-score');
const nextButton = document.querySelector('.next');
const resetButton = document.querySelector('.reset');
const playingButtons = document.querySelector('.play-btns');
const roundResult = document.querySelector('.round-result');
const userSelectedButton = document.querySelector('.player-btn');
const computerSelectedButton = document.querySelector('.computer-btn');
//

window.onload = () => {
    if(localStorage.getItem("computerScore") && localStorage.getItem("playerScore")) {
        computer.innerHTML = localStorage.getItem("computerScore");
        user.innerHTML = localStorage.getItem("playerScore");
    } else {
        computer.innerHTML = "0";
        user.innerHTML = "0";
    }
}

function computerMove() {
    const random = Math.floor(Math.random()*moves.length);
    return moves[random];
}

computerMove();

function userMove() {
    const buttons = document.querySelectorAll('.play-btn');
    buttons.forEach(btn => btn.addEventListener('click',(e) => {
        const myMove =  e.target.value || e.target.parentElement.value;
        const pcMove = computerMove();
        const resultMessage = decideWinner(myMove,pcMove);
        oneRoundResult(resultMessage,myMove,pcMove);
        result(resultMessage);
    }));
}

userMove();

const decideWinner = (player1,player2) => {
    if(moves.includes(player1) && moves.includes(player2)) {
        switch(player1) {
            case "Rock":
                if(player2 === "Rock") return "TIE UP";
                if(player2 === "Paper") return "YOU LOSE";
                return "YOU WIN";
            case "Paper":
                if(player2 === "Rock") return "YOU WIN";
                if(player2 === "Paper") return "TIE UP";
                return "YOU LOSE";
            case "Scissors":
                if(player2 === "Rock") return "YOU LOSE";
                if(player2 === "Paper") return "TIE WIN";
                return "TIE UP";
        }
    } else {
        throw Error("Invalid Move");
    }
}

const oneRoundResult = (message,userChoice,computerChoice) => {
    const resultText = document.querySelector('.result-text');
    userSelectedButton.value = userChoice;
    computerSelectedButton.value = computerChoice;
    assignIconToButton(userSelectedButton);
    assignIconToButton(computerSelectedButton);
    displayResultMessage(message,resultText)
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
    
    playingButtons.classList.add('hide');
    roundResult.classList.remove('hide');
    playAgain();
}

const playAgain = () => {
    const replay = document.querySelector('.replay');
    replay.addEventListener('click',() => {
        updatePlayingArea();
    });
}

const updatePlayingArea = () => {
    roundResult.classList.add('hide');
    playingButtons.classList.remove('hide');
    nextButton.classList.add('hide');
    removePrevValue(userSelectedButton,computerSelectedButton);
}

const removePrevValue = (userBtn,computerBtn) => {
    if(userBtn.firstElementChild && computerBtn.firstElementChild) {
        userBtn.removeChild(userBtn.firstElementChild);
        computerBtn.removeChild(computerBtn.firstElementChild);
        userBtn.classList.remove(`${userBtn.value}-btn`);
        computerBtn.classList.remove(`${computerBtn.value}-btn`);
    }
}

const result = (message) => {
    let userScore = parseInt(user.innerHTML);
    let computerScore = parseInt(computer.innerHTML);
    switch(message) {
        case "YOU WIN":
            userScore++;
            nextButton.classList.remove('hide');
            showLayersOverButton("user");
            resultTally(userScore,computerScore);
            break;
        case "YOU LOSE":
            computerScore++;
            nextButton.classList.add('hide');
            showLayersOverButton("computer");
            resultTally(userScore,computerScore);
            break;
        case "TIE UP":
            nextButton.classList.add('hide');
            showLayersOverButton("");
            resultTally(userScore,computerScore);
            break;
        default:
            throw Error("Error receiving message");
    }
}

const showLayersOverButton = (player) => {
    const userChoice = document.querySelectorAll('.player-border');
    const computerChoice = document.querySelectorAll('.computer-border'); 
    switch(player) {
        case "user":
            userChoice.forEach(choice => choice.classList.remove('layer-hide'));
            computerChoice.forEach(choice => choice.classList.add('layer-hide'));
            break;
        case "computer": 
            computerChoice.forEach(choice => choice.classList.remove('layer-hide'));
            userChoice.forEach(choice => choice.classList.add('layer-hide'));
            break;
        default: 
            computerChoice.forEach(choice => choice.classList.add('layer-hide'));
            userChoice.forEach(choice => choice.classList.add('layer-hide'));
            break;
    }
}

const resultTally = (userScore,computerScore) => {
    computer.innerHTML = String(computerScore);
    user.innerHTML = String(userScore);
    localStorage.setItem("computerScore",computerScore);
    localStorage.setItem("playerScore",userScore);
}

const showVictory = () => {
    const playingArea = document.querySelector('.playing-area');
    const victoryPage = document.querySelector('.victory');
    const playAgain = document.querySelector('.play-again');
    nextButton.addEventListener('click', () => toggleToHurray(playingArea,victoryPage));
    playAgain.addEventListener('click',() => {
        removePrevValue(userSelectedButton,computerSelectedButton);
        toggleToPlayingArea(playingArea,victoryPage)
    });
}

showVictory();

const toggleToHurray = (playingArea,victoryPage) => {
    nextButton.classList.add('hide');
    resetButton.classList.add('hide');
    playingArea.classList.add('hide');
    victoryPage.classList.remove('hide');
}

const toggleToPlayingArea = (playingArea,victoryPage) => {
    resetButton.classList.remove('hide');
    playingButtons.classList.remove('hide');
    playingArea.classList.remove('hide');
    roundResult.classList.add('hide');
    victoryPage.classList.add('hide');
}

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




