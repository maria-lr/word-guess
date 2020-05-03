async function startGame() {
  const result = await fetch('https://random-word-api.herokuapp.com/word?number=1');
  const formattedResult = await result.json();
  const word = formattedResult[0];
  const guessButton = document.getElementById("guess");
  const startOverButton = document.getElementById("reset");
  let gameResultMessage = document.getElementById('game-result');
  const lettersArea = document.getElementById("letters")
  const splitString = word.split("");
  let numberOfChances = 10;
  document.getElementById("chances").innerText = numberOfChances;
  let arrayOfGuessedLetters = [];

  // Tells person what the word is if they check the console.
  console.log('The word is:', word)

  // How to create a new element and define its design.
  function createLetterSpace() {
    let newLetterSpace = document.createElement("div");
    newLetterSpace.style.borderBottom = "1px solid black";
    newLetterSpace.style.maxHeight = "100px";
    newLetterSpace.style.minHeight = "80px";
    newLetterSpace.style.maxWidth = "100px";
    newLetterSpace.style.minWidth = "80px";
    newLetterSpace.style.display = "inline-block";
    newLetterSpace.style.margin = "5px";
    lettersArea.appendChild(newLetterSpace)
  };

  // Makes a new underline appear for each letter of the word. 
  splitString.forEach(createLetterSpace);

  // When you click the guess button...
  guessButton.onclick = function (event) {
    const letterGuessed = document.getElementById("letter-guess").value;

    // Creates a node list (an array of elements) 
    const allLetters = document.querySelectorAll('#letters div');

    // Take away a chance if a letter is not in the word.
    if (word.includes(letterGuessed) === false) {
      numberOfChances--
      document.getElementById("chances").innerText = numberOfChances;
    };

    // Push each letter guessed into an array. Then make that letter appear on the screen. If the letter guessed is already in the array, show a message and do not allow further action.
    if (arrayOfGuessedLetters.includes(letterGuessed)) {
      alert('You cannot guess the same letter twice.')
      return
    }
    else {
      arrayOfGuessedLetters.push(letterGuessed)
      document.getElementById("guessed-letters").innerText = arrayOfGuessedLetters;
    }

    // For every letter space, check to see if the letter guessed matches a letter and it's position in the word. If it does, make the guessed letter appear in the letter space.
    allLetters.forEach(function (div, index) {
      if (letterGuessed === splitString[index]) {
        div.innerText = letterGuessed;
      };
    });

    // Show a Win message if all of the letters have been guessed before the chances run out. Show a lose message if the chances reach 0 before all the letters have been guessed correctly.
    function winLoseMessage() {

      // Convert node list into array.
      const arrayOfAllLetters = Array.prototype.slice.call(allLetters);

      // A full space is one with one letter in it. All spaces are full if every letter space has one letter in it.
      const allSpacesFull = arrayOfAllLetters.every(function (div) {
        return div.innerText.length === 1;
      });

      console.log("Are all spaces full?", allSpacesFull);

      if (numberOfChances === 0) {
        gameResultMessage.innerText = 'You lose.'

        // Do not allow more guesses after the number of chances hits 0.
        guessButton.disabled = true;

      } else if (numberOfChances > 0 && allSpacesFull) {
        gameResultMessage.innerText = 'You win!'
      }
    };

    // Run the winLoseMessage function.
    winLoseMessage();
  };

  // Make the page refresh when the Start Over button is clicked.
  startOverButton.onclick = function (event) {
    location.reload();
  };


};

// Run the game.
startGame();