let card;
let selections = [];
let moves = 0;
let cards = ["🐬", "🐬", "🐙", "🐙", "🐢", "🐢", "🐍", "🐍", "🦅", "🦅", "🦜", "🦜", "🦍", "🦍", "🐅", "🐅", "🦓", "🦓", "🐐", "🐐", "🦒", "🦒", "🐘", "🐘", "🦘", "🦘", "🦢", "🦢", "🦉", "🦉", "🦩", "🦩", "🐌", "🐌", "🐝", "🐝"];
const startBtn = document.getElementById("start-button");
const startTxt = document.getElementById("start-text");
const gameBoard = document.getElementById("game-board");

function play(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    console.log(cards);

    for (i = 0; i < cards.length; i++) {
        let card = document.createElement("div");
        card.id = "card";
        card.className = `card${i+1}`;
        card.innerHTML = cards[i];
        document.getElementById("game-board").appendChild(card);

        card.addEventListener("click", () => {
            selections.push(card.innerHTML);
            moves++;
            if (selections.length == 2) {
                if (selections[0] == selections[1]) {
                    console.log("correct");
                }
                selections = [];
            }
        });
    }

    return cards;
}

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    startTxt.style.display = "none";
    gameBoard.style.display = "flex";
});

play(cards);