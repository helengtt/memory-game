/*
 * Create a list that holds all card symbols
 */
const symbols = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-bomb', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle'];

/*
 * Display the cards on the page
 */

// shuffle cards (Shuffle function from http://stackoverflow.com/a/2450976)
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

// loop through each card and create its HTML
let symbolList = shuffle(symbols);

function creatCard(){
    const deck = document.querySelector('.deck');
    // add each card's HTML to the page
    for (const symbol of symbolList){
        const cardHtmlText = `<li class="card"><i class="${symbol}"></i></li>`;
        deck.insertAdjacentHTML('beforeend', cardHtmlText);
    }
}

window.onload = creatCard();

// set up the click event listener for a card
const cardElement = document.getElementsByClassName('card');
const cards = [...cardElement];

for (const card of cards){
    card.addEventListener('click', displayCard);
}

// display the clicked cards
// add the card to a *list* of "open" cards
let openedCards = [];

function displayCard(){
    this.classList.add('open');
    openedCards.push(this);
    matchCard();
}

// check to see if the two cards match
function matchCard(){
    if (openedCards.length === 2) { 
        if (openedCards[0].firstChild.className === openedCards[1].firstChild.className) {
            matched();
            moves++;
        } else {
            unmatched();
            moves++;
        }
    }
    // trigger moves counter
    moveCounter();
}

// if the cards do match, lock the cards
function matched(){
    openedCards[0].classList.add('match');
    openedCards[1].classList.add('match');
    openedCards[0].classList.remove('open');
    openedCards[1].classList.remove('open');
    openedCards = [];
}

// if the cards do not match, hide the cards
function unmatched(){
    setTimeout (function(){
        openedCards[0].classList.remove('open');
        openedCards[1].classList.remove('open');
        openedCards = [];
    },500);
}

// increment the move counter and display it on the page
let moves = 0;

function moveCounter(){
    let movesElement = document.getElementsByClassName('moves');
    movesElement[0].innerText = moves;
}