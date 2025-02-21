document.addEventListener("DOMContentLoaded", () => {
    const maxMoves = 10;
    let playerScore = 0;
    let computerScore = 0;
    let moves = 0;

    const rockBtn = document.querySelector(".rock");
    const paperBtn = document.querySelector(".paper");
    const scissorBtn = document.querySelector(".scissor");
    const playerOptions = [rockBtn, paperBtn, scissorBtn];
    const computerOptions = ["rock", "paper", "scissors"];

    const movesLeft = document.querySelector(".movesleft");
    const result = document.querySelector(".result");
    const playerScoreBoard = document.querySelector(".p-count");
    const computerScoreBoard = document.querySelector(".c-count");
    const chooseMove = document.querySelector(".move");
    const reloadBtn = document.querySelector(".reload");

    // Elementos de las imágenes
    const playerImg = document.querySelector(".imgUser img");
    const computerImg = document.querySelector(".imgComputer img");

    // Diccionario de imágenes
    const images = {
        rock: "rock.png",
        paper: "paper.png",
        scissors: "scissors.png",
    };

    // Función para determinar el ganador
    const determineWinner = (player, computer) => {
        if (player === computer) {
            result.textContent = "Tie";
        } else if (
            (player === "rock" && computer === "scissors") ||
            (player === "scissors" && computer === "paper") ||
            (player === "paper" && computer === "rock")
        ) {
            result.textContent = "Player Won";
            playerScore++;
            playerScoreBoard.textContent = playerScore;
        } else {
            result.textContent = "Computer Won";
            computerScore++;
            computerScoreBoard.textContent = computerScore;
        }
    };

    // Función para verificar si el juego ha terminado
    const checkGameOver = () => {
        if (moves === maxMoves) {
            playerOptions.forEach(option => (option.disabled = true));
            chooseMove.textContent = "Game Over!!";
            movesLeft.style.display = "none";

            if (playerScore > computerScore) {
                result.style.fontSize = "2rem";
                result.textContent = "You Won The Game!";
                result.style.color = "#308D46";
            } else if (playerScore < computerScore) {
                result.style.fontSize = "2rem";
                result.textContent = "You Lost The Game";
                result.style.color = "red";
            } else {
                result.style.fontSize = "2rem";
                result.textContent = "It's a Tie!";
                result.style.color = "grey";
            }

            reloadBtn.textContent = "Restart";
            reloadBtn.style.display = "flex";
            reloadBtn.addEventListener("click", () => window.location.reload());
        }
    };

    // Función para manejar la jugada
    const playGame = () => {
        playerOptions.forEach(option => {
            option.addEventListener("click", function () {
                moves++;
                movesLeft.textContent = `Moves Left: ${maxMoves - moves}`;

                const computerChoice = computerOptions[Math.floor(Math.random() * 3)];
                const playerChoice = this.textContent.toLowerCase();

                // Actualizar imágenes de elección
                playerImg.src = images[playerChoice];
                computerImg.src = images[computerChoice];

                determineWinner(playerChoice, computerChoice);
                checkGameOver();
            });
        });
    };

    playGame();
});