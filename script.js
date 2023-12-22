let playerName = "Player"; // Default name
let playerScore = 0;
let computerScore = 0;

updatePlayerInfo();

function updatePlayerInfo() {
    document.getElementById('player-score').innerText = `${playerName}: ${playerScore}`;
    document.getElementById('computer-score').innerText = `Computer: ${computerScore}`;
}

function playGame(playerChoice) {
    if (playerScore >= 100 || computerScore >= 100) {
        restartGame();
        return;
    }

    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    const result = determineWinner(playerChoice, computerChoice);

    updateScore(result);

    const resultMessage = `${playerName} chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;

    document.getElementById('result').innerText = resultMessage;
}

function determineWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    }

    if (
        (player === 'rock' && (computer === 'scissors' || computer === 'lizard')) ||
        (player === 'paper' && (computer === 'rock' || computer === 'spock')) ||
        (player === 'scissors' && (computer === 'paper' || computer === 'lizard')) ||
        (player === 'lizard' && (computer === 'spock' || computer === 'paper')) ||
        (player === 'spock' && (computer === 'scissors' || computer === 'rock'))
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

function updateScore(result) {
    if (result === 'You win!') {
        playerScore++;
    } else if (result === 'Computer wins!') {
        computerScore++;
    }

    updatePlayerInfo();

    if (playerScore >= 100 || computerScore >= 100) {
        setTimeout(restartGame, 1500);
    }
}

function changePlayerName() {
    const newName = document.getElementById('new-player-name').value.trim();
    if (newName !== "") {
        playerName = newName;
        updatePlayerInfo();
        document.getElementById('new-player-name').value = "";
    }
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;

    updatePlayerInfo();

    document.getElementById('result').innerText = '';
}
