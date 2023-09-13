const moves = ["Rock", "Paper", "Scissors"];
let computer = document.getElementById('computer-score');
let player =document.getElementById('player-score');

window.onload = () => {
    if(localStorage.getItem("computerScore") && localStorage.getItem("playerScore")) {
        computer.innerHTML = localStorage.getItem("computerScore");
        player.innerHTML = localStorage.getItem("playerScore");
    }
}

const resultTally = (playerScore,computerScore) => {
    computer.innerHTML = String(computerScore);
    player.innerHTML = String(playerScore);
    localStorage.setItem("computerScore",computerScore);
    localStorage.setItem("playerScore",playerScore);
}


const  result = (message) => {
    let playerScore = parseInt(player.innerHTML);
    let computerScore = parseInt(computer.innerHTML);
    const nextButton = document.querySelector('.next');
    switch(message) {
        case "You Win":
            playerScore++;
            nextButton.classList.add('show');
            resultTally(playerScore,computerScore);
            break;
        case "You Lose":
            computerScore++;
            resultTally(playerScore,computerScore);
            break;
        case "Tie":
            resultTally(playerScore,computerScore);
            break;
    }
    
}

const reset = () => {
    const resetBtn = document.getElementById("reset");
    resetBtn.addEventListener('click', () => {
        resultTally(0,0);
    }); 
}

reset();


const winner = (p1,p2) => {
    if(moves.includes(p1) && moves.includes(p2)) {
        switch(p1) {
            case "Rock":
                return p2 === "Rock" ? "Tie": p2 === "Paper" ? "You Lose": "You Win";
            case "Paper":
                return p2 === "Rock" ? "You Win": p2 === "Paper" ? "Tie": "You Lose";
            case "Scissors":
                return p2 === "Rock" ? "You Lose": p2 === "Paper" ? "You Win": "Tie";
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
    let move
    const buttons = document.querySelectorAll('.play-btn');
    buttons.forEach(btn => btn.addEventListener('click',(e) => {
        move = e.target.innerHTML;
        const winnerMessage = winner(move,computerMove());
        result(winnerMessage);
    }));
}

playerMove();


