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
function createCard(){
    let symbolList = shuffle(symbols);
    const deck = document.querySelector('.deck');
    // add each card's HTML to the page
    for (const symbol of symbolList){
        const cardHtmlText = `<li class="card"><i class="${symbol}"></i></li>`;
        deck.insertAdjacentHTML('beforeend', cardHtmlText);
    }
    // set up the click event listener for a card
    const cardElement = document.getElementsByClassName('card');
    const cards = [...cardElement];
    for (const card of cards){
        card.addEventListener('click', onClick);
    }
}

window.onload = createCard();

let clicks = 0;
function onClick(event){
    // debug matched cards being clicked
    // debug double clicking one card
    if (this.classList.contains('match') || this.classList.contains('open')) {
        event.preventDefault();
    }
    // debug multiple cards display problem with flag variable
    else if (flag === false) {
        displayCard(this);
        matchCard();
    }
    // start timer on first click
    clicks++;
    if (clicks === 1 ){
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
    openedCards[0].classList.add('match','bounce-in');
    openedCards[1].classList.add('match','bounce-in');
    openedCards[0].classList.remove('open');
    openedCards[1].classList.remove('open');
    openedCards = [];
}

// if the cards do not match, hide the cards
let flag = false;
// debug multiple cards display with flag variable
function unmatched(){
    flag = true;
    openedCards[0].classList.add('shake');
    openedCards[1].classList.add('shake');
    setTimeout (function(){
        openedCards[0].classList.remove('open', 'shake');
        openedCards[1].classList.remove('open', 'shake');
        openedCards = [];
        flag = false;
    },500);
}

// increment the move counter and display it on the page
let moves = 0;
const starElement = document.getElementsByClassName('fa-star');
const i = starElement.length;

function moveCounter(){
    const movesElement = document.querySelector('.moves');
    movesElement.innerHTML = moves;
    // star rating
    if (moves === 0){
        for (const star of starElement){
            star.classList.remove('hidestar');
        }
    } else if (moves > 12 && moves <= 20) {
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
        setTimeout(congrats,500);
    }
}

// Congratulations Popup
function congrats(){
    const popup = document.querySelector('.popup');
    popup.classList.add('popup-show');
    // check icon zoom in
    const zoomIn = document.querySelector('.fa-check-circle');
    zoomIn.classList.add('zoom-in');
    // score result
    const scoreResult = document.querySelector('.score-result');
    const hidestar = document.getElementsByClassName('hidestar');
    let stars = i - hidestar.length;
    scoreResult.innerHTML = `With ${moves} Moves and ${stars} Stars. Wooooooo!`;
    // overlay
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('overlay-show');
    // play again button event listener
    const playagain = document.querySelector('.play-again');
    playagain.addEventListener('click', function(){
        restart();
        popup.classList.remove('popup-show');
        overlay.classList.remove('overlay-show');
        zoomIn.classList.remove('zoom-in');
    });
}

// reset the game
let reset = document.querySelector('.fa-repeat');
reset.addEventListener('click', restart);

function restart(){
    // reset cards
    const removeCards = document.querySelectorAll('.card');
    for (const removeCard of removeCards){
        removeCard.remove();
    }
    seconds = 0;
    clicks = 0; // start timer after click
    createCard();
    // reset moves
    moves = 0;
    moveCounter();
    // reset stars
    const hidestars = document.querySelectorAll('.fa-star');
    for (const hidestar of hidestars){
        hidestar.classList.remove('hidestar');
    }
    // reset timer
    clearInterval(timerInterval);
    const removeTimer = document.querySelector('.timer');
    removeTimer.textContent = '';
}

