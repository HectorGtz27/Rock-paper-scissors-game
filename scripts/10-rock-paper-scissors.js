let score = {
  wins: 0,
  losses: 0,
  ties: 0,
};

const savedScore = JSON.parse(localStorage.getItem("score"));
if (savedScore) {
  score = savedScore;
}

updateScoreElement();

let isAutoPlaying = false;
let intervalId;
const autoPlayButton = document.querySelector(".auto-play-button");
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove2 = pickComputerMove();

      makeMove(playerMove2);
    }, 1000);
    autoPlayButton.innerText = "Stop Auto Play";
    isAutoPlaying = true;
  } else {
    // Like this we stop the auto play when the button is clicked again
    clearInterval(intervalId);
    autoPlayButton.innerText = "Auto Play";
    isAutoPlaying = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  makeMove("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  makeMove("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  makeMove("scissors");
});

document.querySelector(".reset-score-button").addEventListener("click", () => {
  warning();
});

document.querySelector(".auto-play-button").addEventListener("click", () => {
  autoPlay();
});

// In here we add the event listener to the whole body, so we can listen to
// the keydown event
document.body.addEventListener("keydown", (event) => {
  console.log(event);
  if (event.key === "r") {
    console.log("r");
    makeMove("rock");
  } else if (event.key === "p") {
    console.log("p");
    makeMove("paper");
  } else if (event.key === "s") {
    console.log("s");
    makeMove("scissors");
  } else if (event.key === "a") {
    console.log("a");
    autoPlay();
  } else if (event.key === "Backspace") {
    console.log("Backspace");
    resetScore();
  }
});

function makeMove(playerMove) {
  const computerMove = pickComputerMove();
  const resultElement = document.querySelector(".js-result");

  if (playerMove === computerMove) {
    resultElement.innerHTML = `Tie.`;
    score.ties += 1;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    resultElement.innerHTML = `You win.`;
    score.wins += 1;
  } else {
    resultElement.innerHTML = `You lose.`;
    score.losses += 1;
  }

  const movesElement = document.querySelector(".js-moves-chosen");
  movesElement.innerHTML = `
          You
          <img src="images/${playerMove}-emoji.png" class="move-icon">
          <img src="images/${computerMove}-emoji.png" class="move-icon">
          Computer
        `;

  updateScoreElement();
  localStorage.setItem("score", JSON.stringify(score));
}

function warning() {
  const warningContainer = document.querySelector(".warning-container");
  warningContainer.style.display = "block";

  const buttonYes = document.querySelector(".yes-button");
  const buttonNo = document.querySelector(".no-button");

  buttonYes.addEventListener("click", () => {
    resetScore();
    warningContainer.style.display = "none";
  });

  buttonNo.addEventListener("click", () => {
    warningContainer.style.display = "none";
  });
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  updateScoreElement();
  localStorage.removeItem("score");
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove;

  if (randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `
          Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
        `;
}
