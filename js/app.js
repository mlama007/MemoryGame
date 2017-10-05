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

//StopWatch from https://www.codeproject.com/articles/29330/javascript-stopwatch
function StopWatch(){
    var startTime = null;
    var stopTime = null;
    var running = false;
    this.start = function(){        
        if (running == true)
            return;
        else if (startTime != null)
            stopTime = null;
        
        running = true;    
        startTime = getTime();
    }
    this.stop = function(){
        
        if (running == false)
            return;    
        
        stopTime = getTime();
        running = false;
    }
    this.duration = function(){
        if (startTime == null || stopTime == null)
            return 'Undefined';
        else
            return (stopTime - startTime) / 1000;
    }

    this.isRunning = function() { return running; }

    function getTime(){
        var day = new Date();
        return day.getTime();
    }

}
//timer creates new stop wacth
let timer = new StopWatch();

// Loop through each card and create its HTML
newGame = () => {
    tilesFlipped = 0;
    let output = '';
    for (let i = 0; i < deck.cards.length; i++) {
        output += `<li class="${deck.cards[i].class}" onclick="clickFunction(this)"><a class="${deck.cards[i].icon}"></a></li>`; 
    };
    document.getElementById('deck').innerHTML = output;
    document.getElementsByClassName('moves')[0].innerHTML = 0;
    numMoves = 0;
    seenTiles = [];
    tilesMatched = [];
    shuffle(deck.cards);
    timer = new StopWatch();
}

//Function when card is clicked
clickFunction = (element) => {
    
    //Start the timer
    timer.start();

    //increase number of moves by 1 for every click
    numMoves +=1;
    document.getElementsByClassName('moves')[0].innerHTML = numMoves;
    
    //Change stars earned
    let numStars = 3;
    //if user has more than 20 moves, take off 1 star
    if ( numMoves > 20 ){
        document.getElementById("1").style.display="none";
        numStars -=1;
    }
    //if user has more than 30 moves, take off 1 star
    if ( numMoves > 30 ){
        document.getElementById("2").style.display="none";
        numStars -=1;
    }
    //if user has more than 40 moves, take off 1 star
    if ( numMoves > 40 ){
        document.getElementById("3").style.display="none";
        numStars -=1;
    }

    //add 1 for every card flipped
    tilesFlipped += 1;
    
    //only allow flips if there are < or = 2 flipped cards
    if (tilesFlipped <= 2 ){ 
        
        //flip and show card
        element.setAttribute("class", "card open show");
        
        //add card into a list called seenTiles
        seenTiles.push(element);
        console.log(seenTiles);
        console.log(seenTiles[0].children[0].className);
        console.log(seenTiles[1].children[0].className);
        
        //if icons (className) on card DO match
        if (seenTiles[0].children[0].className == seenTiles[1].children[0].className){
            
            //mark cards as a match set
            seenTiles[0].setAttribute("class", "card match");
            seenTiles[1].setAttribute("class", "card match");   
            
            //add macthes to a list called tilesMatched
            tilesMatched.push(seenTiles[0]);
            tilesMatched.push(seenTiles[1]);
            console.log(tilesMatched.length);
            
            //empty seenTiles array (holds opened cards)      
            seenTiles = [];
            tilesFlipped = 0;

            //if number of cards matched = number or cards, then win the game
            if (tilesMatched.length == deck.cards.length){

                //stop timer
                timer.stop();

                //don't display container with game
                document.getElementsByClassName("container")[0].style.visibility= "hidden";

                //display winning message / number of stars / number of moves made / time length of game
                document.getElementsByClassName('win')[0].style.display="block";
                
                document.getElementsByClassName('insertStars')[0].innerHTML = numStars;             
                document.getElementsByClassName('enterNumMoves')[0].innerHTML = numMoves;             
                document.getElementsByClassName('enterTime')[0].innerHTML = timer.duration();             
            }
        }     

        //if className(icons) DO NOT match
        else if (seenTiles[0].children[0].className != seenTiles[1].children[0].className){            
            
            //Wait a bit before closing card
            setTimeout(function() {
                
                //Close mismatched cards
                seenTiles[0].setAttribute("class", "card close");
                seenTiles[1].setAttribute("class", "card close");
                
                //remove cards listed under seenTiles array
                seenTiles = [];            
            }, 500);
            //reset number of flipped cards          
            tilesFlipped = 0;
        }        
    }    
}
//Start a new game (reshuffle, reset time and number of moves)
newGame();

newBoard = ()=>{
    //display winning message / number of stars / number of moves made / time length of game
    document.getElementsByClassName('win')[0].style.display="none";
    //don't display container with game
    document.getElementsByClassName("container")[0].style.visibility= "visible";
    
    
    newGame();
}
