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

            if (card.classList.contains("unflipped")) {
                card.classList.remove("unflipped");
                card.classList.add("flipped");
            }

            selections.push(card.innerHTML);
            cardsSelected.push(card);
            console.log(cardsSelected);
            moves++;
            if (selections.length == 2 && (cardsSelected[0] != cardsSelected[1])) {
                setTimeout(function() {
                    if (cardsSelected[0] == cardsSelected[1]) {
                        return;
                    }
                    else if (selections[0] == selections[1]) {
                        console.log("correct");
                        completed++;
                        cardsSelected[0].classList.remove("flipped");
                        cardsSelected[0].classList.add("completed");
                        cardsSelected[1].classList.remove("flipped");
                        cardsSelected[1].classList.add("completed");
                    }
                    else {
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
                        endTxt.innerHTML = `Well done! You completed the game in ${moves} moves! Click below to play again.`
                        playAgain.addEventListener("click", () => {
                            completion.style.display = "none";
                            startTxt.style.display = "none";
                            gameBoard.style.display = "flex";
                            completed = 0;
                            moves = 0;
                            play(cards);
                        })
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
    play(cards);
});