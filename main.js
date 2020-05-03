async function startGame() {
  console.log("Game has started!!!")

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

  console.log('The word is:', word)
  console.log(splitString);

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

  splitString.forEach(createLetterSpace);

  // When you click the guess button...
  guessButton.onclick = function (event) {
    const letterGuessed = document.getElementById("letter-guess").value;
    const allLetters = document.querySelectorAll('#letters div');
    document.getElementById("chances").innerText = numberOfChances;

    if (word.includes(letterGuessed) === false) {
      numberOfChances--
      document.getElementById("chances").innerText = numberOfChances;
    };

    if (arrayOfGuessedLetters.includes(letterGuessed)) {
      alert('You cannot guess the same letter twice.')
      return
    }
    else {
      arrayOfGuessedLetters.push(letterGuessed)
      document.getElementById("guessed-letters").innerText = arrayOfGuessedLetters;
    }

    console.log(arrayOfGuessedLetters)

    allLetters.forEach(function (div, index) {
      if (letterGuessed === splitString[index]) {
        div.innerText = letterGuessed;
      };
    });

    function winLoseMessage() {
      const arrayOfAllLetters = Array.prototype.slice.call(allLetters);
      const allSpacesFull = arrayOfAllLetters.every(function (div) {
        return div.innerText.length === 1;
      });

      console.log(allSpacesFull);

      if (numberOfChances === 0) {
        gameResultMessage.innerText = 'You lose.'
        guessButton.disabled = true;

      } else if (numberOfChances > 0 && allSpacesFull) {
        gameResultMessage.innerText = 'You win!'
      }
    };

    winLoseMessage();
  };

  startOverButton.onclick = function (event) {
    location.reload();
  };


};

startGame();

// function name(letter) {
//   arrayOfGuessedLetters.

// }