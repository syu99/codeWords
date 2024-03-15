// Define the alphabet
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Initialize increment and decrement objects, and currentWord variable
let increments = {};
let decrements = {};
let currentWord = '';

// Function to create buttons for each letter in the alphabet
function createButton(letter) {
  const button = document.createElement('button');
  // Get numeric value for the letter
  const value = getLetterValue(letter);
  const orderNumber = getLetterOrderNumber(letter);
  // Set button text content with blue color for letters
  button.innerHTML = `<span style="color: yellow;">${letter}</span> nº${orderNumber} (<span style="color: red;">${value}</span>)`;
  // Add event listener for button click
  button.addEventListener('click', () => handleButtonClick(letter));
  return button;
}

// Function to handle button click
function handleButtonClick(letter) {
  incrementValue(letter);
}

// Function to get the numeric value of a letter
function getLetterValue(letter) {
  const values = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8,
    'R': 9, 'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };
  return values[letter] || 0;
}

// Function to get the order number of a letter in the alphabet
function getLetterOrderNumber(letter) {
  return alphabet.indexOf(letter.toUpperCase()) + 1;
}

// Function to generate buttons for each letter in the alphabet
function generateButtons() {
  const buttonsContainer = document.getElementById('buttons-container');
  for (const letter of alphabet) {
    buttonsContainer.appendChild(createButton(letter));
  }
}

// Function to increment the value of a letter
function incrementValue(letter) {
  increments[letter] = (increments[letter] || 0) + 1;
  updateWord(letter);
  calculateTotal();
  playButtonSound();
}

// Function to decrement the value of a letter
function decrementValue(letter) {
  decrements[letter] = (decrements[letter] || 0) + 1;
  updateWord(letter, true);
  calculateTotal();
  playButtonSound();
}

// Function to update the current word based on increment or decrement
function updateWord(letter, isDecrement = false) {
  if (isDecrement) {
    currentWord = currentWord.slice(0, -1);
  } else {
    currentWord += letter;
  }
  document.getElementById('word-display').textContent = currentWord;
}

// Function to calculate the total numeric value and update the result
function calculateTotal() {
  let total = 0;
  for (const letter in increments) {
    total += getLetterValue(letter) * increments[letter];
  }
  for (const letter in decrements) {
    total -= getLetterValue(letter) * decrements[letter];
  }
  document.getElementById('result').textContent = total;
  document.getElementById('numerology').textContent = reduceToSingleDigit(total);
}

// Function to play a button click sound
function playButtonSound() {
  const audio = document.getElementById('buttonSound');
  audio.play();
}

// Function to reduce a number to a single digit
function reduceToSingleDigit(num) {
  while (num > 9) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

// Function to reset the result and clear input fields
function resetResult() {
  increments = {};
  decrements = {};
  currentWord = '';
  document.getElementById('word-display').textContent = '';
  document.getElementById('word-input').value = '';
  calculateTotal();
}

// Event listener for when the window is loaded
window.onload = function() {
  generateButtons();
  document.addEventListener('keydown', handleKeyPress);
};

// Function to handle key presses
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
    const lastLetter = currentWord.charAt(currentWord.length - 1).toUpperCase();
    updateWord(lastLetter, true);
  } else if (key === 'Enter' || key === 'ArrowDown' || key === ' ') {
    event.preventDefault();
    resetResult();
  }
}
