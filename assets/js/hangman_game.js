window.onload = function(){
  var alphabet = ['a','b','c','d','e','f','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
  'w','x','y','z']; //pool of letters to be used in guessing

  var movies = ['Pulp Fiction', 'Goodfellas', 'Titanic', 'Forrest Gump',
        'Jurassic Park', 'The Matrix', 'The Silence of the Lambs','The Big Lebowski',
        'Schindler\'s List', 'Toy Story','Fight Club', 'Terminator Two', 'Home Alone',
        'Groundhog Day','Boogie Nights', 'Heat', 'Fargo', 'Seven', 'The Sixth Sense',
        'Trainspotting','Good Will Hunting', 'American Beauty', 'Boyz in the Hood',
        'Dumb and Dumber', 'Starship Troopers', 'Clerks', 'The Truman Show'];


  var wordBeingPlayed = null; //creates a variable for the word being played in the game to be used as a reference
  var lettersOfWord = [];//creates an array of the letters in the word to reference in comparative statements
  var matchingLetters = [];//creates an array of matching letters
  var guessedLetters = [];//creates an array of letters the user has already guessed
  var guessesLeft = 0; //creates a variable of the number of guesses the player can make
  var letterGuessed = null;//creates a variable for the letter the player has guessed
  var wins = 0;//creates a variable for how many wins the player has

//sets up the hangman game by picking a random movie
//splits up the letters of the movie and puts them in the lettersOfWord array
//and creates a space of blanks
  setup = function(){
    this.wordBeingPlayed = movies[Math.floor(Math.random()*movies.length)];
    this.lettersOfWord = this.wordBeingPlayed.split("");
    this.buildWordView();
    this.updateGuessesLeft();
  }

//updates the page whenever the number of guesses reaches zero
//or if the player wins a game
  updatePage = function(letter){
    if(this.guessesLeft === 0){
      this.restart();
    }
    else{
      this.updateGuessedLetters(letter);
      this.matchingLetters(letter);
      this.buildWordView();

      if(this.updateWins() === true){
        this.restart();
      }
    }
  }

//updates the number of guesses the player has left by comparing the input
//to the guessedLetters array and whether the letter is in the word
  updateGuessesLeft = function(letter){

    if((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfWord.indexOf(letter) === -1)){
      this.guessedLetters.push(letter);
      this.guessesLeft--;

      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(", ");
    }
  }

//sets the total number of guesses the player can make to the length of the word plus 3
  updateTotalGuesses = function(){
    this.guessesLeft = this.lettersOfWord.length + 3;

    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  }

//
  updateMatchingLetters = function(letter){
    for(var i = 0; i < this.lettersOfWord.length; i++){
      if((letter === this.lettersOfWord[i]) && (this.matchingLetters.indexOf(letter) === -1)){
        this.matchingLetters.push(letter);
      }
    }
  }

  buildWordView = function(){
    var wordView = "";
    console.log(wordView);
    for(var i = 0; i < this.lettersOfWord.length; i++){
      if(this.matchingLetters.indexOf(this.lettersOfWord[i]) !== -1){
        wordView += this.lettersOfWord[i];
      }
      else{
        wordView += "&nbsp;&nbsp";
      }
    }
    document.querySelector("#current-word").innerHTML = wordView;
  }

//a function to restart the game
  restart = function(){
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordBeingPlayed = null;
    this.lettersOfWord = [];
    this.matchingLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.letterGuessed = null;
    this.wins = 0;
    this.setup();
    this.buildWordView();
  }

//a function that tallies the number of wins the player has
  updateWins = function(){
    var win;
    if(this.matchingLetters.length === 0){
      win = false;
    }
    else{
      win = true;
    }

    for(var i = 0; i < this.lettersOfWord.length; i++){
      if(this.matchingLetters.indexOf(this.lettersOfWord[i]) === -1){
        win = false;
      }
    }

    if(win === true){
      this.wins = this.wins+1;
      document.querySelector("#wins").innerHTML = this.wins;


      return true;
    }
    else{
      return false;
    }
  }

  setup();
  document.onkeyup = function(event){
    letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    updatePage(letterGuessed);
  }


  // var getHint; //links the hint button to element getHint
  // var guess; //player guess element
  // var lives = 10; //number of lives the player has before the hangman is complete
  // var counter; //a counter element on the number of correct guesses
  // var space; //number of spaces in the word
  //
  // //Creates the alphabet buttons to be used to guess the movie title
  // var buttons = function (){
  //   var alphabetButtons = document.getElementsById('buttons'); //creates new buttons for the alphabet buttons in the html document
  //   var letters = document.createElement('ul'); //creates a list of each letter of the alphabet in the html document
  //
  //   for(var i = 0; i < alphabet.length; i++){
  //       letters.id="alphabet";
  //       var alphabetList = document.createElement('li');
  //       alphabetList.innerHTML = alphabet[i];
  //       alphabetList.id="letters";
  //       alphabetList.innerHTML = alphabet[i];
  //       check();//calls the check function to identify if the letter has already been clicked
  //       alphabetButtons.appendChild(letters);
  //       letter.appendChild(alphabetList);
  //     }
  //   }
  //
  // }
