window.onload = function(){
  var alphabet = ['a','b','c','d','e','f','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
  'w','x','y','z']; //pool of letters to be used in guessing

  var movies = ['Pulp Fiction', 'Goodfellas', 'Titanic', 'Forrest Gump',
        'Jurassic Park', 'The Matrix', 'The Silence of the Lambs','The Big Lebowski',
        'Schindler\'s List', 'Toy Story','Fight Club', 'Terminator Two', 'Home Alone',
        'Groundhog Day','Boogie Nights', 'Heat', 'Fargo', 'Seven', 'The Sixth Sense',
        'Trainspotting','Good Will Hunting', 'American Beauty', 'Boyz in the Hood',
        'Dumb and Dumber', 'Starship Troopers', 'Clerks', 'The Truman Show'];


  var wordBeingPlayed = null; //
  var lettersOfWord = [];//
  var matchingLetters = [];//
  var guessedLetters = [];//
  var guessesLeft = 0; //
  var letterGuessed = null;//
  var wins = 0;//

  setup = function(){
    this.wordBeingPlayed = movies[Math.floor(Math.random()*movies.length)];
    this.lettersOfWord = this.wordBeingPlayed.split("");
    this.wordView();
    this.updateGuessesLeft();
  }

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

  updateGuessesLeft = function(letter){

    if((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfWord.indexOf(letter) === -1)){
      this.guessedLetters.push(letter);
      this.guessesLeft--;

      //innerHTML stuff
    }
  }

  setTotalGuesses = fucntion(){
    this.guessesLeft = this.lettersOfWord.length + 3;

    //innerHTML stuff
  }

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
    
  }

  var getHint; //links the hint button to element getHint
  var guess; //player guess element
  var lives = 10; //number of lives the player has before the hangman is complete
  var counter; //a counter element on the number of correct guesses
  var space; //number of spaces in the word

  //Creates the alphabet buttons to be used to guess the movie title
  var buttons = function (){
    var alphabetButtons = document.getElementsById('buttons'); //creates new buttons for the alphabet buttons in the html document
    var letters = document.createElement('ul'); //creates a list of each letter of the alphabet in the html document

    for(var i = 0; i < alphabet.length; i++){
        letters.id="alphabet";
        var alphabetList = document.createElement('li');
        alphabetList.innerHTML = alphabet[i];
        alphabetList.id="letters";
        alphabetList.innerHTML = alphabet[i];
        check();//calls the check function to identify if the letter has already been clicked
        alphabetButtons.appendChild(letters);
        letter.appendChild(alphabetList);
      }
    }

  }
}
