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
    card.addEventListener('click', onClick);
}

// debug multiple cards display with flag variable
function onClick(){
    if (flag === false) {
        displayCard(this);
        matchCard();
    }
    // start timer on first click
    if (seconds === 0) {
        startTimer();
    }
}

// display the clicked cards
// add the card to a *list* of "open" cards
let openedCards = [];

function displayCard(card){
    card.classList.add('open');
    openedCards.push(card);
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
    // stop timer when all cards matched
    stopTimer();
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
let flag = false;
// debug multiple cards display with flag variable
function unmatched(){
    flag = true;
    setTimeout (function(){
        openedCards[0].classList.remove('open');
        openedCards[1].classList.remove('open');
        openedCards = [];
        flag = false;
    },500);
}

// increment the move counter and display it on the page
let moves = 0;

function moveCounter(){
    const movesElement = document.querySelector('.moves');
    movesElement.innerHTML = moves;
    // star rating
    const starElement = document.getElementsByClassName('fa-star');
    const i = starElement.length;
    if (moves > 12 && moves <= 20) {
        starElement[i-1].classList.add('hidestar');
    } else if (moves > 20) {
        starElement[i-2].classList.add('hidestar');
    }
}

// timer function
let seconds = 0;
let timer = document.querySelector('.timer');
let timerInterval;
function startTimer(){
    timerInterval = 
    setInterval (function(){
        timer.innerHTML = `${parseInt(seconds/3600)} hours ${parseInt((seconds%3600)/60)} mins ${seconds%60} secs`;
        seconds++;
    }, 1000);
}
// stop timer when all cards matched
let matchedCards = document.getElementsByClassName('match');
function stopTimer(){
    if (matchedCards.length === 16){
        clearInterval(timerInterval);
    }
}
