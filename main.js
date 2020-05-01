let wordToGuess = null;

fetch('https://random-word-api.herokuapp.com/word?number=1')
  .then((res) => res.json())
  .then((result) => {
    // console.log(result)
    wordToGuess = result[0];





  });

// console.log('log after fetch request', wordToGuess);

const button = document.getElementById("guess");



button.onclick = function (event) {

};

// Accessible focus ring invisible until user tabs. Code from: https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2.
function handleFirstTab(e) {
  if (e.keyCode === 9) {
    // the "I am a keyboard user" key
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
  }
}

window.addEventListener("keydown", handleFirstTab);




function waitForStuff() {

  console.log("1 We called our funtion!!")

  fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then((res) => res.json())
    .then((result) => {
      console.log('2 Fetch has finished!!!')
    });

  console.log("3 This is after our fetch in the code")

}

async function waitForStuffFORREAL() {
  console.log('1')
  const result = await fetch('https://random-word-api.herokuapp.com/word?number=1');
  const formattedResult = await result.json();
  console.log('2 result is..', formattedResult)
  console.log('3')

}

// waitForStuff();
// waitForStuffFORREAL();






















async function startGame() {
  console.log("Game has started!!!")

  const result = await fetch('https://random-word-api.herokuapp.com/word?number=1');
  const formattedResult = await result.json();
  const word = formattedResult[0];

  console.log('The word is:', word)

  const splitString = word.split("");
  console.log(splitString);
  const numberOfLetters = word.length;
  document.getElementById("letter-quantity").innerText = numberOfLetters;

  // document.getElementById("word").innerText = word;

  let numberOfChances = 10;
  document.getElementById("chances").innerText = numberOfChances;

  const guessButton = document.getElementById("guess");
  const startOverButton = document.getElementById("reset");
  const letterGuessed = document.getElementById("letter-guess").innerText;

  function createLetterSpace() {
    let letterSpace = document.createElement("div");
    letterSpace.style.border = "1px solid black";
    letterSpace.style.height = "100px";
    letterSpace.style.width = "100px";
    letterSpace.style.display = "inline-block";
    document.getElementById("letters").appendChild(letterSpace);

  }

  splitString.forEach(createLetterSpace);


  // letterSpace.id = "letters-container"




  guessButton.onclick = function (event) {
    if (word.includes(letterGuessed)) {

    }
    else {
      numberOfChances--
    }
  };

  startOverButton.onclick = function (event) {
    location.reload();
  };

  function startOver() { }
}

startGame();