// Guessing game #1
document.getElementById("numberList").style.display = "none";
const guessingGame1 = document.getElementById("guessingGame1");

let randomNumber = Math.floor(Math.random() * 100) + 1;
const numberField = document.getElementById("numberField");
const numberButton = document.getElementById("numberButton");
const guesses = document.getElementById("guesses");
const tries = document.getElementById("tries");
const numberInfo = document.getElementById("numberInfo");
const lastResult = document.getElementById("lastResult");
let maxGuessCount = 10;
let guessCount = 1;
let resetButton;

function checkNumber() {
    const userNumber = Number(numberField.value);
    if (guessCount === 1) {
        document.getElementById("numberList").style.display = "block";
    }

    guesses.textContent += userNumber + ' ';
    tries.textContent = guessCount + "/" + maxGuessCount;

    if (userNumber === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.color = 'green';
        numberInfo.textContent = '';
        setNumberGameOver();
    } else if (guessCount === maxGuessCount) {
        lastResult.textContent = '!!!GAME OVER!!!';
        numberInfo.textContent = '';
        setNumberGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.color = 'red';
        if (userNumber < randomNumber) {
            numberInfo.textContent = 'Last guess was too low!';
        } else if (userNumber > randomNumber) {
            numberInfo.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    numberField.value = '';
    numberField.focus();
}

numberButton.addEventListener('click', checkNumber);

function setNumberGameOver() {
    numberField.disabled = true;
    numberButton.textContent = 'New';

    numberButton.removeEventListener('click', checkNumber);
    numberButton.addEventListener('click', resetNumberGame);
}

function resetNumberGame() {
    tries.textContent = 0 + "/" + maxGuessCount;
    guessCount = 1;

    numberButton.removeEventListener('click', resetNumberGame);
    numberButton.addEventListener('click', checkNumber);

    numberButton.textContent = 'Submit';
    guesses.textContent = 'Previous guesses: ';
    lastResult.textContent = '';
    numberField.disabled = false;
    numberField.value = '';
    numberField.focus();

    randomNumber = Math.floor(Math.random() * 100) + 1;
}
