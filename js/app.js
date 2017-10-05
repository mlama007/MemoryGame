//list holds all cards
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

// Shuffle cards
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
console.log(deck.cards);
console.log(deck.cards.length);

//variables
//tiles that have open and show class
let seenTiles = [];
//number of tiles flipped in this round
let tilesFlipped = 0;
//track number of moves
let numMoves = 0;
//tiles matched
let tilesMatched = [];

// Loop through each card and create its HTML
newGame = () => {
    tilesFlipped = 0;
    let output = '';
    for (let i = 0; i < deck.cards.length; i++) {
        output += `<li class="${deck.cards[i].class}" onclick="clickFunction(this)"><i class="${deck.cards[i].icon}"></i></li>`; 
    };
    document.getElementById('deck').innerHTML = output;
    document.getElementsByClassName('moves')[0].innerHTML = 0;
    numMoves = 0;
    seenTiles = [];
    shuffle(deck.cards);
}

//Function when card is clicked
clickFunction = (element) => {
    //increase number of moves by 1 for every click
    numMoves +=1;
    document.getElementsByClassName('moves')[0].innerHTML = numMoves;
    //add 1 for every card flipped
    tilesFlipped += 1;
    //only allow flips if there are < or = 2 flipped cards and element class is not match
    if (tilesFlipped <= 2 ){ 
        //flip and show card
        element.setAttribute("class", "card open show");
        //add card's child element which hold the icon to seenTiles
        seenTiles.push(element);
        console.log(seenTiles);
        console.log(seenTiles[0].children[0].className);
        console.log(seenTiles[1].children[0].className);
        
        //if className(icons) do match
        if (seenTiles[0].children[0].className == seenTiles[1].children[0].className){
            //remove open and show classes
            seenTiles[0].setAttribute("class", "card match");
            seenTiles[1].setAttribute("class", "card match");   
            //add to tilesMatched
            tilesMatched.push(seenTiles[0]);
            tilesMatched.push(seenTiles[1]);
            console.log(tilesMatched.length);
            //empty seenTiles array       
            seenTiles = [];
            tilesFlipped = 0;
            if (tilesMatched.length == deck.cards.length){
                alert("Congratulations!! You won!!!");
                newGame();
            }
        }        
        //if className(icons) do NOT match
        else if (seenTiles[0].children[0].className != seenTiles[1].children[0].className){            
            setTimeout(function() {
                //remove open and show classes, add close class
                seenTiles[0].setAttribute("class", "card close");
                seenTiles[1].setAttribute("class", "card close");
                //empty seenTiles array
                seenTiles = [];            
            }, 500);            
            tilesFlipped = 0;
        }        
    }    
}
//add each card's HTML to the page
newGame();