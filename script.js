let card;
let selections = [];
let cardsSelected = [];
let moves = 0;
let completed = 0;
let cards = ["🐬", "🐬", "🐙", "🐙", "🐢", "🐢", "🐍", "🐍", "🦅", "🦅", "🦜", "🦜", "🦍", "🦍", "🐅", "🐅", "🦓", "🦓", "🐐", "🐐", "🦒", "🦒", "🐘", "🐘", "🦘", "🦘", "🦢", "🦢", "🦉", "🦉", "🦩", "🦩", "🐌", "🐌", "🐝", "🐝"];
const startBtn = document.getElementById("start-button");
const startTxt = document.getElementById("start-text");
const gameBoard = document.getElementById("game-board");
const endTxt = document.getElementById("end-text");
const playAgain = document.getElementById("play-again");
const resetGame = document.getElementById("reset-game");
const resetCards = document.querySelectorAll("#game-board #card");
const movesMade = document.getElementById("moves");
const correct = new Audio("sounds/correct_sfx.mp3");
const incorrect = new Audio("sounds/incorrect_sfx.mp3");
const flip = new Audio("sounds/flip_sfx.mp3");

function play(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    console.log(cards);

    for (i = 0; i < cards.length; i++) {
        let card = document.createElement("div");
        card.id = "card";
        card.className = `${i+1} unflipped`;
        card.innerHTML = cards[i];
        document.getElementById("game-board").appendChild(card);

        card.addEventListener("click", () => {
            if (selections.length >= 2 || card.classList.contains("flipped") || card.classList.contains("completed")) {
                return;
            }
            flip.play();

            if (card.classList.contains("unflipped")) {
                card.classList.remove("unflipped");
                card.classList.add("flipped");
            }

            selections.push(card.innerHTML);
            cardsSelected.push(card);
            console.log(cardsSelected);
            moves++;
            movesMade.innerHTML = `Moves: ${moves}`;
            if (selections.length == 2 && (cardsSelected[0] != cardsSelected[1])) {
                setTimeout(function() {
                    if (cardsSelected[0] == cardsSelected[1]) {
                        return;
                    }
                    else if (selections[0] == selections[1]) {
                        console.log("correct");
                        completed++;
                        correct.play();
                        cardsSelected[0].classList.remove("flipped");
                        cardsSelected[0].classList.add("completed");
                        cardsSelected[1].classList.remove("flipped");
                        cardsSelected[1].classList.add("completed");
                    }
                    else {
                        incorrect.play();
                        cardsSelected[0].classList.remove("flipped");
                        cardsSelected[0].classList.add("unflipped");
                        cardsSelected[1].classList.remove("flipped");
                        cardsSelected[1].classList.add("unflipped");
                    }
        
                    selections = [];
                    cardsSelected = [];

                    if (completed == 18) {
                        gameBoard.style.display = "none";
                        let deleteCards = document.querySelectorAll("#game-board #card");
                        deleteCards.forEach(card => {
                            card.remove();
                        });
                        completion.style.display = "flex";
                        resetGame.style.display = "none";
                        movesMade.style.display = "none";
                        endTxt.innerHTML = `Well done! You completed the game in ${moves} moves! Click below to play again.`
                    }
                }, 750);
            }
        });
    }
    return cards;
}

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    startTxt.style.display = "none";
    gameBoard.style.display = "flex";
    resetGame.style.display = "flex";
    movesMade.style.display = "flex";
    play(cards);
});

resetGame.addEventListener("click", () => {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    selections = [];
    cardsSelected = [];
    moves = 0;
    completed = 0;
    movesMade.innerHTML = `Moves: ${moves}`;
    gameBoard.style.display = "flex";
    endTxt.innerHTML = "";
    completion.style.display = "none";
    play(cards);
});

playAgain.addEventListener("click", () => {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    completion.style.display = "none";
    startTxt.style.display = "none";
    gameBoard.style.display = "flex";
    resetGame.style.display = "flex";
    completed = 0;
    moves = 0;
    movesMade.innerHTML = `Moves: ${moves}`;
    play(cards);
});