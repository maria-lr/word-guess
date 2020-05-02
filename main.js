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
    //below snippet doesn't work, need to fix/find a way to make it work.
    if (allLetters.innerText === letterGuessed) {
      guessButton.disabled = true;
    }

    // console.log("What is allLetters? ", allLetters);
    // console.log("What is splitString? ", splitString);
    // console.log("What is letterGuessed? ", letterGuessed)
    //Check if the letter guessed matches a letter in the mystery word.
    allLetters.forEach(function (div, index) {
      // console.log("Running the forEach on index: ", index);
      // console.log(`Does the letter guessed (${letterGuessed}) equal the item in the splitString array at position ${index}? `, letterGuessed === splitString[index])
      if (letterGuessed === splitString[index]) {
        div.innerText = letterGuessed;
      };
    });



    function winLoseMessage() {
      const arrayOfAllLetters = Array.prototype.slice.call(allLetters);

      // console.log('all letters is...', arrayOfAllLetters)


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
