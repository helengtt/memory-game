/*
 * Create a list that holds all cards
 */
const cardElement = document.querySelector('.deck');
cardElement.innerHTML =`
    <li class="card">
        <i class="fa fa-diamond"></i>
    </li>
    <li class="card">
        <i class="fa fa-paper-plane-o"></i>
    </li>
    <li class="card">
        <i class="fa fa-anchor"></i>
    </li>
    <li class="card">
        <i class="fa fa-bolt"></i>
    </li>
    <li class="card">
        <i class="fa fa-cube"></i>
    </li>
    <li class="card">
        <i class="fa fa-anchor"></i>
    </li>
    <li class="card">
        <i class="fa fa-leaf"></i>
    </li>
    <li class="card">
        <i class="fa fa-bicycle"></i>
    </li>
    <li class="card">
        <i class="fa fa-diamond"></i>
    </li>
    <li class="card">
        <i class="fa fa-bomb"></i>
    </li>
    <li class="card">
        <i class="fa fa-leaf"></i>
    </li>
    <li class="card">
        <i class="fa fa-bomb"></i>
    </li>
    <li class="card">
        <i class="fa fa-bolt"></i>
    </li>
    <li class="card">
        <i class="fa fa-bicycle"></i>
    </li>
    <li class="card">
        <i class="fa fa-paper-plane-o"></i>
    </li>
    <li class="card">
        <i class="fa fa-cube"></i>
    </li>
`;
const card = document.getElementsByClassName('card');
// getElementsByClassName() returns array-like HTMLCollection / NodeList instead of an array, array-like object inherits object.prototype instead of Array.prototype.
// creat cards array
const cards = [...card];

// display the clicked cards' symbol
let displayCard = function(){
    this.setAttribute('style', 'background: #02b3e4; font-size: 33px; cursor: default;');
}

// set up the click event listener for a card
for (const card of cards){
    card.addEventListener('click', displayCard);
};
