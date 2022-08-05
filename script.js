'use strict';

// Define a state
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let scores = [0, 0];

// Selecting element
const diceElement = document.querySelector('.dice');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const btnNewElement = document.querySelector('.btn--new');
const btnRollElement = document.querySelector('.btn--roll');
const btnHoldELement = document.querySelector('.btn--hold');

// Starting condition

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  diceElement.classList.add('hidden');
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Simple way to change player--active class
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');

  // Dumb way to change player--active class
  // if (player0Element.classList.contains('player--active')) {
  //   player0Element.classList.remove('player--active');
  //   player1Element.classList.add('player--active');
  // } else {
  //   player0Element.classList.add('player--active');
  //   player1Element.classList.remove('player--active');
  // }
};

// Rolling Dice
btnRollElement.addEventListener('click', function () {
  if (playing) {
    // Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display a dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // Check for rolled 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Holding the current score

btnHoldELement.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// Implementing a new game

btnNewElement.addEventListener('click', init);
