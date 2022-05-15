'use strict';
let activePlayer = document.querySelector('.player--active');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const startGameBtn = document.querySelector('.btn--start-game');
const dice = document.querySelector('.dice');
const players = document.querySelectorAll('.player');
const playersNameContainer = document.querySelector('.add-players-name');
const playersName1 = document.querySelector('.player-1-name');
const playersName2 = document.querySelector('.player-2-name');
const player1 = document.getElementById('name--0');
const player2 = document.getElementById('name--1');
let currentPlayerScore = activePlayer.querySelector('.current-score');
let scoreActivePlayer = activePlayer.querySelector('.score');

let accScore = 0;

startGameBtn.addEventListener('click', event => {
  event.preventDefault();
  const playerName1 = playersName1.value;
  const playerName2 = playersName2.value;
  playersNameContainer.classList.add('hidden');

  player1.textContent = playerName1 ? playerName1 : 'player 1';
  player2.textContent = playerName2 ? playerName2 : 'player 2';
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
    player.classList.remove('player--winner');
    player.classList.remove('player--active');
    player.querySelector('.score').textContent = 0;
    player.querySelector('.current-score').textContent = 0;
  });
  document.querySelector('.player--0').classList.add('player--active');
});
