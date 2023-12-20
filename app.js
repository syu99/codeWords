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
  // Assuming a case-insensitive alphabetical order
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
function updateWord(letter, isDecrement) {
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
  const values = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8,
    'R': 9, 'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  };

  // Iterate through letters and calculate total based on increments and decrements
  for (const letter in values) {
    total += (values[letter] * increments[letter] || 0) - (values[letter] * decrements[letter] || 0);
  }
  // Update the result element
  document.getElementById('result').textContent = total;

  // Display the reduced numerological value as a single digit
  document.getElementById('numerology').textContent = reduceToSingleDigit(total);
}

// Function to reset the result and clear input fields
function resetResult() {
  increments = {};
  decrements = {};
  currentWord = '';
  document.getElementById('word-display').textContent = '';
  document.getElementById('word-input').value = ''; // Clear the input field
  calculateTotal();
}

// Function to play a button click sound
function playButtonSound() {
  const audio = document.getElementById('buttonSound');
  audio.play();
}

// Function to handle key presses
function handleKeyPress(event) {
  const key = event.key.toUpperCase();

  // Check if the key is a letter in the alphabet
  if (alphabet.includes(key)) {
    // Increment or decrement based on shift key
    if (event.shiftKey) {
      decrementValue(key);
    } else {
      incrementValue(key);
    }
  } else if (key === 'Backspace') {
    // Handle backspace key to update the current word
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
    // Handle enter, arrow down, or space keys to reset the result
    event.preventDefault();
    resetResult();
  } else if (key.length === 1) {
    // Increment or decrement for other keys
    if (event.shiftKey) {
      decrementValue(key);
    } else {
      incrementValue(key);
    }
  }
}

// Function to reduce a number to a single digit
function reduceToSingleDigit(num) {
  while (num > 9) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
}

// Event listener for when the window is loaded
window.onload = function () {
  // Generate buttons for each letter
  generateButtons();
  // Add event listener for key presses
  document.addEventListener('keydown', handleKeyPress);
};
