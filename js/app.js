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

//variables
//tiles that have open and show class
let seenTiles = [];
//number of tiles flipped in this round
let tilesFlipped = 0;
//track number of moves
let numMoves = 0;
//tiles matched
let tilesMatched = [];


//Stopwatch from https://codepen.io/_Billy_Brown/pen/dbJeh

class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    
    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
        ${pad0(times[0], 2)}:\
        ${pad0(times[1], 2)}:\
        ${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results')
);


// Loop through each card and create its HTML
newGame = () => {
    tilesFlipped = 0;
    let output = '';
    for (let i = 0; i < deck.cards.length; i++) {
        output += `<li class="listItem"><button class="${deck.cards[i].class}" onclick="stopwatch.start();clickFunction(this)"><div class="${deck.cards[i].icon}"></div></button></li>`; 
    };
    document.getElementById('deck').innerHTML = output;
    document.getElementsByClassName('moves')[0].innerHTML = 0;
    numMoves = 0;
    seenTiles = [];
    tilesMatched = [];
    shuffle(deck.cards);
    stopwatch.reset();
    stopwatch.restart();
    document.getElementsByClassName("1")[0].style.visibility="visible";
    document.getElementsByClassName("1")[1].style.visibility="visible";
    document.getElementsByClassName("2")[0].style.visibility="visible";
    document.getElementsByClassName("2")[1].style.visibility="visible";
    document.getElementsByClassName("3")[0].style.visibility="visible";
    document.getElementsByClassName("3")[1].style.visibility="visible";
}

//Function when card is clicked
clickFunction = (element) => {

    //if card is already flipped, log message
    if (element.getAttribute("class") === "card open show" || element.getAttribute("class") === "card match" ){
        console.log("already opened");
        document.getElementById('announce').innerHTML = "<p aria-live='polite'>Card already opened</p>";
    }
    else {
        
        //only allow flips if there are < or = 2 flipped cards
        if (tilesFlipped < 2 ){ 
            //add 1 for every card flipped
            tilesFlipped += 1;

            //flip and show card
            element.setAttribute("class", "card open show");
            
            //add card into a list called seenTiles
            seenTiles.push(element);

            if (tilesFlipped === 2) {
                numMoves++;
                document.getElementsByClassName('moves')[0].innerHTML = numMoves;
                //if user has more than 15 moves, take off 1 star
                if ( numMoves > 15 ){
                    document.getElementsByClassName("1")[0].style.visibility="hidden";
                    document.getElementsByClassName("1")[1].style.visibility="hidden";
                }
                //if user has more than 20 moves, take off 1 star
                if ( numMoves > 20 ){
                    document.getElementsByClassName("2")[0].style.visibility="hidden";
                    document.getElementsByClassName("2")[1].style.visibility="hidden";
                }
            }
            
            //if icons (className) on card DO match
            if (tilesFlipped === 2 && seenTiles[0].children[0].className === seenTiles[1].children[0].className){
                //mark cards as a match set
                seenTiles[0].setAttribute("class", "card match");
                seenTiles[1].setAttribute("class", "card match");   
                
                //add macthes to a list called tilesMatched
                tilesMatched.push(seenTiles[0]);
                tilesMatched.push(seenTiles[1]);
                
                //empty seenTiles array (holds opened cards)      
                seenTiles = [];
                tilesFlipped = 0;
                
                //if number of cards matched = number or cards, then win the game
                if (tilesMatched.length === deck.cards.length){
                    //stop timer
                    stopwatch.stop();
                    
                    //don't display memory game
                    document.getElementsByClassName("container")[0].style.visibility= "hidden";
                    
                    //display winning message / number of stars / number of moves made / time length of game
                    document.getElementsByClassName('win')[0].style.display="block";
                    
                    document.getElementsByClassName('enterNumMoves')[0].innerHTML = numMoves;                       
                    document.getElementsByClassName('time')[0].innerHTML = document.getElementsByClassName('stopwatch')[0].innerHTML;                       
                    document.getElementsByClassName("1")[1].style.visibility="hidden";
                    document.getElementsByClassName("2")[1].style.visibility="hidden";
                    document.getElementsByClassName("3")[1].style.visibility="hidden";
                    
                }

                // setTimeout(function() {
                    console.log('ML match')
                    document.getElementById('announce').innerHTML = "<p aria-live='polite'>Found a match!</p>";
                    console.log('ML announce', document.getElementById('announce'));
                // }, 3000);
            }     

            //if className(icons) DO NOT match
            else if (tilesFlipped === 2 && seenTiles[0].children[0].className !== seenTiles[1].children[0].className){            
                
                //Wait a bit before closing card
                setTimeout(function() {
                    
                    //Close mismatched cards
                    seenTiles[0].setAttribute("class", "card close");
                    seenTiles[1].setAttribute("class", "card close");
                    
                    //remove cards listed under seenTiles array
                    seenTiles = [];  
                    //reset number of flipped cards          
                    tilesFlipped = 0;          
                }, 500);

                // setTimeout(function() {
                    console.log('ML not match')
                    document.getElementById('announce').innerHTML = "<p aria-live='polite'>No match found!</p>";
                    console.log('ML announce', document.getElementById('announce'));
                // }, 3000);
                
            }   
        }          
    }
}
//Start a new game (reshuffle, reset time and number of moves)
newGame();

newBoard = ()=>{
    //don't display winning message
    document.getElementsByClassName('win')[0].style.display="none";
    //display container with game
    document.getElementsByClassName("container")[0].style.visibility= "visible";
    
    
    newGame();
}
