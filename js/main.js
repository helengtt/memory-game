
// A list that holds all cards
const card = document.getElementsByClassName('card');
// getElementsByClassName() returns array-like HTMLCollection / NodeList instead of an array, array-like object inherits object.prototype instead of Array.prototype.
// creat cards array
const cards = [...card];

// display the clicked cards' symbol
let displayCard = function(){
    this.setAttribute('style', 'background: #02b3e4; font-size: 33px; cursor: default;');
}

// set up the event listener for a card
for (const card of cards){
    card.addEventListener('click', displayCard);
};
