let playerName = "Player"; // Default name
let playerScore = 0;
let computerScore = 0;

updatePlayerInfo();

function updatePlayerInfo() {
    document.getElementById('player-score').innerText = `${playerName}: ${playerScore}`;
    document.getElementById('computer-score').innerText = `Computer: ${computerScore}`;
}

function playGame(playerChoice) {
    if (playerScore >= 10 || computerScore >= 10) {
        // Game is already over, don't proceed
        return;
    }

    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    const result = determineWinner(playerChoice, computerChoice);

    updateScore(result);

    const resultMessage = `${playerName} chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;

    document.getElementById('result').innerText = resultMessage;

    if (playerScore >= 10 || computerScore >= 10) {
        // Check for a winner when someone reaches 10 points
        declareWinner();
        // Disable game buttons
        disableGameButtons();
    } else if (result === 'You win!') {
        // Player wins a round, show the success message
        showRoundWinMessage();
        // Update scoreboard immediately
        updatePlayerInfo();
    } else if (result === 'Computer wins!') {
        // Computer wins a round, show the error message
        showRoundLostMessage();
        // Update scoreboard immediately
        updatePlayerInfo();
    }
}

function determineWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    }

    if (
        (player === 'scissors' && (computer === 'paper' || computer === 'lizard')) ||
        (player === 'paper' && (computer === 'rock' || computer === 'spock')) ||
        (player === 'rock' && (computer === 'lizard' || computer === 'scissors')) ||
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
        // Add pumping animation to player scoreboard
        document.querySelector('.player-score').classList.add('score-increase-animation');
    } else if (result === 'Computer wins!') {
        computerScore++;
        // Add pumping animation to computer scoreboard
        document.querySelector('.computer-score').classList.add('score-increase-animation');
    }

    // Update the player and computer score displays
    updatePlayerInfo();

    // Remove the pumping animation class after the animation is complete
    setTimeout(() => {
        document.querySelector('.player-score').classList.remove('score-increase-animation');
        document.querySelector('.computer-score').classList.remove('score-increase-animation');
    }, 500); // Adjust the duration to match the pump animation duration
}

function declareWinner() {
    let winnerMessage = '';
    if (playerScore >= 10) {
        winnerMessage = `${playerName} wins the game!`;
        showGameWinMessage();
    } else if (computerScore >= 10) {
        winnerMessage = 'Computer wins the game!';
        showGameLostMessage();
    }

    document.getElementById('result').innerText = winnerMessage;
}

function disableGameButtons() {
    document.getElementById('rock-btn').disabled = true;
    document.getElementById('paper-btn').disabled = true;
    document.getElementById('scissors-btn').disabled = true;
    document.getElementById('lizard-btn').disabled = true;
    document.getElementById('spock-btn').disabled = true;
}

function showRoundWinMessage() {
    Swal.fire({
        position: "top",
        icon: "success",
        title: "You won the round!",
        showConfirmButton: false,
        timer: 1500
    });
}

function showRoundLostMessage() {
    Swal.fire({
        position: "top",
        icon: "error",
        title: "You lost the round!",
        showConfirmButton: false,
        timer: 1500
    });
}

function showGameWinMessage() {
    Swal.fire({
        title: "You Win!!",
        text: "You won the game!",
        icon: "success"
    });
}

function showGameLostMessage() {
    Swal.fire({
        icon: "error",
        title: "You Lost!",
        text: "Loser!",
        footer: '<a href="#">You are lame!</a>'
    });
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

    enableGameButtons();
}

function enableGameButtons() {
    document.getElementById('rock-btn').disabled = false;
    document.getElementById('paper-btn').disabled = false;
    document.getElementById('scissors-btn').disabled = false;
    document.getElementById('lizard-btn').disabled = false;
    document.getElementById('spock-btn').disabled = false;
}
