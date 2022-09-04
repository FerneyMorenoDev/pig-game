'use strict';
import {
  rollDiceBtn,
  holdBtn,
  newGameBtn,
  startGameBtn,
  dice,
  players,
  playersNameContainer,
  playersName1,
  playersName2,
  player1,
  player2,
  activePlayer,
  currentPlayerScore,
  scoreActivePlayer,
} from './variables.js';

let accScore = 0;
const PLAYER_ONE = 'player 1';
const PLAYER_TWO = 'player 2';

startGameBtn.addEventListener('click', event => {
  event.preventDefault();
  playersNameContainer.classList.add('hidden');

  player1.textContent = playersName1.value || PLAYER_ONE;
  player2.textContent = playersName2.value || PLAYER_TWO;
});

const changePlayerTurn = () => {
  players.forEach(player => {
    player.classList.toggle('player--active');
  });

  activePlayer = document.querySelector('.player--active');
  currentPlayerScore = activePlayer.querySelector('.current-score');
  scoreActivePlayer = activePlayer.querySelector('.score');
};

rollDiceBtn.addEventListener('click', () => {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `./images/dice-${randomNumber}.png`;

  if (randomNumber !== 1) {
    accScore += randomNumber;
    currentPlayerScore.textContent = accScore;
  } else {
    accScore = 0;
    currentPlayerScore.textContent = 0;
    changePlayerTurn();
  }
});

holdBtn.addEventListener('click', () => {
  scoreActivePlayer.textContent = +scoreActivePlayer.textContent + accScore;
  if (+scoreActivePlayer.textContent >= 100) {
    activePlayer.classList.add('player--winner');
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
  }
  currentPlayerScore.textContent = 0;
  changePlayerTurn();
  accScore = 0;
});

newGameBtn.addEventListener('click', () => {
  playersNameContainer.classList.remove('hidden');
  dice.src = `./images/dice.png`;
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
  players.forEach(player => {
    player.classList.remove('player--winner', 'player--active');
    player.querySelector('.score').textContent = 0;
    player.querySelector('.current-score').textContent = 0;
  });
  playersName1.value = '';
  playersName2.value = '';
  document.querySelector('.player--0').classList.add('player--active');
});
