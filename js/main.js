
// display icon when a card is clicked

const card = document.getElementsByClassName('card');
// getElementsByClassName() returns array-like HTMLCollection / NodeList instead of an array, array-like object inherits object.prototype instead of Array.prototype.
// creat cards array
const cards = [...card];
for (const card of cards)
    card.addEventListener('click', function(){
    this.setAttribute('style', 'background: #02b3e4; font-size: 33px;');
})

