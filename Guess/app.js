var randNum = getRandomIntInclusive(1, 10);
var remainGuesses = 3;
let message = document.querySelector('.message');
let btn = document.querySelector('#guess-btn');
btn.addEventListener('click', checkValue);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var numberInput;
function checkValue() {
    numberInput = document.querySelector('#guess-input');
    if (parseInt(numberInput.value) === randNum) {
        giveResponse(numberInput.value, 'green', ' is correct!', 'green');
        sayRestart();
        btn.removeEventListener('click', checkValue);
        btn.addEventListener('click', reset);
    }
    else {
        remainGuesses--;
        if (!remainGuesses) {
            giveResponse(numberInput.value, 'red', ` isn\'t correct. You have no guesess left`, 'red');
            sayRestart();
            btn.removeEventListener('click', checkValue);
            btn.addEventListener('click', reset);
        }
        else {
            giveResponse(numberInput.value, 'red', ` isn\'t correct. You have ${remainGuesses} guesses left`, 'red');
            numberInput.value = '';
        }
    }
}

function giveResponse(answer, brColor, response, answerColor) {
    numberInput.style.borderColor = brColor;
    message.innerHTML = answer + response;
    message.style.color = answerColor;
}

function reset() {
    randNum = getRandomIntInclusive(1, 10);
    remainGuesses = 3;
    numberInput.disabled = false;
    numberInput.value = '';
    numberInput.style.borderColor = 'grey';
    btn.value = 'Submit';
    message.innerHTML = '';
    btn.removeEventListener('click', reset);
    btn.addEventListener('click', checkValue);
}

function sayRestart() {
    numberInput.disabled = true;
    btn.value = 'Play again';
}