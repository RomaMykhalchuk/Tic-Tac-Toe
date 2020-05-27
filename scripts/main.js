'use strict';

const X_CLASS = 'x';
const CIRLCE_CLASS = 'circle';
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageText = document.querySelector(
  '[data-winning-message-text]'
);
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;

  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRLCE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRLCE_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
  setBoardHoverClass();
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRLCE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageElement.innerText = 'Draw!';
  } else {
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Win`;
  }
  winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRLCE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRLCE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(current) {
  return WINNING_COMBOS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(current);
    });
  });
}
