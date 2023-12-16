const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let increments = {};
let decrements = {};
let currentWord = '';

function createButton(letter) {
  const button = document.createElement('button');
  const value = getLetterValue(letter);
  button.innerHTML = `${letter} (${value}) <button onclick="incrementValue('${letter}')">+</button>
                       <button onclick="decrementValue('${letter}')">-</button>`;
  return button;
}

function getLetterValue(letter) {
  const values = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8,
    'R': 9, 'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };

  return values[letter] || 0;
}

function generateButtons() {
  const buttonsContainer = document.getElementById('buttons-container');
  for (const letter of alphabet) {
    buttonsContainer.appendChild(createButton(letter));
  }
}

function incrementValue(letter) {
  increments[letter] = (increments[letter] || 0) + 1;
  updateWord(letter);
  calculateTotal();
  playButtonSound();
}

function decrementValue(letter) {
  decrements[letter] = (decrements[letter] || 0) + 1;
  updateWord(letter, true);
  calculateTotal();
  playButtonSound();
}

function updateWord(letter, isDecrement) {
  if (isDecrement) {
    currentWord = currentWord.slice(0, -1);
  } else {
    currentWord += letter;
  }
  document.getElementById('word').textContent = `Mot en cours : ${currentWord}`;
}

function calculateTotal() {
  let total = 0;
  const values = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8,
    'R': 9, 'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };

  for (const letter in values) {
    total += (values[letter] * increments[letter] || 0) - (values[letter] * decrements[letter] || 0);
  }
  document.getElementById('result').textContent = total;

  // Afficher la valeur numérologique réduite à un seul chiffre
  document.getElementById('numerology').textContent = reduceToSingleDigit(total);
}

function resetResult() {
  increments = {};
  decrements = {};
  currentWord = '';
  document.getElementById('word').textContent = 'Mot en cours : ';
  calculateTotal();
}

function playButtonSound() {
  const audio = document.getElementById('buttonSound');
  audio.play();
}

function handleKeyPress(event) {
  const key = event.key.toUpperCase();

  if (alphabet.includes(key)) {
    if (event.shiftKey) {
      decrementValue(key);
    } else {
      incrementValue(key);
    }
  } else if (key === 'Backspace') {
    event.preventDefault();
    if (currentWord.length > 0) {
      const lastLetter = currentWord.charAt(currentWord.length - 1);
      if (event.shiftKey) {
        decrementValue(lastLetter);
      } else {
        updateWord(lastLetter, true);
      }
    }
  } else if (key === 'Enter' || key === 'ArrowDown' || key === ' ') {
    event.preventDefault();
    resetResult();
  } else if (key.length === 1) {
    if (event.shiftKey) {
      decrementValue(key);
    } else {
      incrementValue(key);
    }
  }
}

// Fonction pour réduire à un seul chiffre
function reduceToSingleDigit(num) {
  while (num > 9) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
}

window.onload = function () {
  generateButtons();
  document.addEventListener('keydown', handleKeyPress);
};
