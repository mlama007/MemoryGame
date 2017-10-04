/*
 * Create a list that holds all of your cards
 */
const deck = {
    cards: [
        {
            name: 'anchor',
            icon: 'fa fa-anchor',
            class: 'card'
        },
        {
            name: 'anchor',
            icon: 'fa fa-anchor',
            class: 'card'
        },
        {
            name: 'bicycle',
            icon: 'fa fa-bicycle',
            class: 'card'
        },
        {
            name: 'bicycle',
            icon: 'fa fa-bicycle',
            class: 'card'
        },
        {
            name: 'bolt',
            icon: 'fa fa-bolt',
            class: 'card'
        },
        {
            name: 'bolt',
            icon: 'fa fa-bolt',
            class: 'card'
        },
        {
            name: 'bomb',
            icon: 'fa fa-bomb',
            class: 'card'
        },
        {
            name: 'bomb',
            icon: 'fa fa-bomb',
            class: 'card'
        },
        {
            name: 'cube',
            icon: 'fa fa-cube',
            class: 'card'
        },
        {
            name: 'cube',
            icon: 'fa fa-cube',
            class: 'card'
        },
        {
            name: 'diamond',
            icon: 'fa fa-diamond',
            class: 'card'
        },        
        {
            name: 'diamond',
            icon: 'fa fa-diamond',
            class: 'card'
        },        
        {
            name: 'leaf',
            icon: 'fa fa-leaf',
            class: 'card'
        },
        {
            name: 'leaf',
            icon: 'fa fa-leaf',
            class: 'card'
        },
        {
            name: 'plane',
            icon: 'fa fa-paper-plane-o',
            class: 'card'
        },
        {
            name: 'plane',
            icon: 'fa fa-paper-plane-o',
            class: 'card'
        }
    ]
}
let memoryValue = [];
let memoryTilesID = [];
let tilesFlipped = 0;

//consoles all card names
// for (let i = 0; i < deck.cards.length; i++) {
//     console.log(deck.cards[i].name);
//     console.log(deck.cards[i].icon);
//     console.log(deck.cards[i].class);
// }

/*
* Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
// Shuffle and log results
shuffle(deck.cards);
// console.log(deck.cards);

// Loop through each card and create its HTML
newBoard = () => {
    tilesFlipped = 0;
    let output = '';
    for (let i = 0; i < deck.cards.length; i++) {
        console.log(`<li class="${deck.cards[i].class}"><i class="${deck.cards[i].icon}"></i></li>`);
        output += `<li class="${deck.cards[i].class}"><i class="${deck.cards[i].icon}"></i></li>`; 
    }
    document.getElementById('deck').innerHTML = output;    
}
newBoard();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// const cardSelect = document.getElementsByClassName("card");
// let cardName = deck.cards.name;
// let cardClass = deck.cards.class;


// cardSelect.on("click", function(event){
//     deckClass = "card open show";
//     console.log(deckClass);
// });


// // document.getElementsByClassName('card').addEventListener("click", function () { 
// //     alert('Hello, world!');
// //     cardSelect.innerHTML = "card open show"
// // });