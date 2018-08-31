/*
 * Create a list that holds all card symbols
 */
const symbols = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle'];

/*
 * Display the cards on the page
 */

// - shuffle cards (Shuffle function from http://stackoverflow.com/a/2450976)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//  - loop through each card and create its HTML
//  - add each card's HTML to the page
let symbolList = shuffle(symbols);
function creatCard(){
    const deck = document.querySelector('.deck');
    for (const symbol of symbolList){
        const cardHtmlText = `<li class="card"><i class="${symbol}"></i></li>`;
        deck.insertAdjacentHTML('beforeend', cardHtmlText);
    }
}

window.onload = creatCard();

// display the clicked cards
let displayCard = function(){
    this.setAttribute('style', 'background: #02b3e4; font-size: 33px; cursor: default;');
}

// set up the click event listener for a card
const cardElement = document.getElementsByClassName('card');
const cards = [...cardElement];
for (const card of cards){
    card.addEventListener('click', displayCard);
}
