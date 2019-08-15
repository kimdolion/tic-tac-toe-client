'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const gameboard = [
  '', '', '',
  '', '', '',
  '', '', ''
]

const player1 = 'X'
const player2 = 'O'
let currentPlayer = player1
console.log(currentPlayer)
let clickCounter = 0
// let gameOver = false

const winConditions = [
  ['0, 1, 2'],
  ['3, 4, 5'],
  ['6, 7, 8'],
  ['0, 3, 6'],
  ['1, 4, 7'],
  ['2, 5, 8'],
  ['2, 4, 6'],
  ['0, 4, 8']
]

const onClickforX = function (event) {
  if ($(event.target).html() !== 'O' && $(event.target).html() !== 'X') {
    console.log('Clicked!')
    $(event.target).text('X') // fills empty space in div with X
    gameboard[$(event.target).data('cell-index')] = 'X'
    checkForWinner()
    // api call
    currentPlayer = player2 // switches current player to O
    if (clickCounter < 9) {
      clickCounter++
    } else {
      clickCounter = 0
    }
    $('#gameboard-message')
      .text('X took a turn! Now it\'s O\'s')
      .removeClass()
      .addClass('success')
    $(event.target).css('background-color', 'coral')
    console.log('selectSuccessX')
  } console.log('clickCounter is', clickCounter)
}

const onClickforO = function (event) {
  if ($(event.target).html() !== 'O' && $(event.target).html() !== 'X') {
    $(event.target).text('O') // fills empty space with O
    gameboard[$(event.target).data('cell-index')] = 'O'
    checkForWinner()
    currentPlayer = player1 // switches current player to X
    if (clickCounter < 9) {
      clickCounter++
    } else {
      clickCounter = 0
    }
    $('#gameboard-message')
      .text('O took a turn! Now it\'s X\'s')
      .removeClass()
      .addClass('success')
    $(event.target).css('background-color', 'lightblue')
    console.log('selectSuccessO')
  } console.log('clickCounter is', clickCounter)
}

const onSwitchPlayer = (event) => {
  if (currentPlayer === 'X') {
    onClickforX(event)
  } else if (currentPlayer === 'O') {
    onClickforO(event)
  } console.log('currentPlayer is', currentPlayer)
}

const checkForWinner = () => {
  if ( // 1st row win
    (gameboard[0] === 'X' && gameboard[1] === 'X' && gameboard[2] === 'X') ||
    (gameboard[0] === 'O' && gameboard[1] === 'O' && gameboard[2] === 'O')
  ) {
    console.log('Winner!')
  } else if ( // 2nd row win
    (gameboard[3] === 'X' && gameboard[4] === 'X' && gameboard[5] === 'X') ||
    (gameboard[3] === 'O' && gameboard[4] === 'O' && gameboard[5] === 'O')
  ) {
    console.log('Winner!')
  } else if ( // 3rd row win
    (gameboard[6] === 'X' && gameboard[7] === 'X' && gameboard[8] === 'X') ||
    (gameboard[6] === 'O' && gameboard[7] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
  } else if ( // 1st column win
    (gameboard[0] === 'X' && gameboard[3] === 'X' && gameboard[6] === 'X') ||
    (gameboard[0] === 'O' && gameboard[3] === 'O' && gameboard[6] === 'O')
  ) {
    console.log('Winner!')
  } else if ( // 2nd column win
    (gameboard[1] === 'X' && gameboard[4] === 'X' && gameboard[7] === 'X') ||
    (gameboard[1] === 'O' && gameboard[4] === 'O' && gameboard[7] === 'O')
  ) {
    console.log('Winner!')
  } else if ( // 3rd column win
    (gameboard[2] === 'X' && gameboard[5] === 'X' && gameboard[8] === 'X') ||
    (gameboard[2] === 'O' && gameboard[5] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
  } else if ( // diagonal win from top left
    (gameboard[0] === 'X' && gameboard[4] === 'X' && gameboard[8] === 'X') ||
    (gameboard[0] === 'O' && gameboard[4] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
  } else if ( // diagonal win from top right
    (gameboard[2] === 'X' && gameboard[4] === 'X' && gameboard[6] === 'X') ||
    (gameboard[2] === 'O' && gameboard[4] === 'O' && gameboard[6] === 'O')
  ) {
    console.log('Winner!')
  } else {
    console.log('Next turn!')
  } // this does not spit out winner or loser. it is not checking winconditions. It is updating the JS gameboard array
}
/*
const checkWinner = (event) => {
  if (clickCounter === 9) {
    $('#gameboard-message')
      .text('It\'s a TIE!')
      .css('background-color', 'lightgreen') // tie shows message and is green
    console.log('tieSuccess')
    clickCounter = 0
    currentPlayer = player1
  } else if (clickCounter >= 5) {
    if (gameboard.includes('X')) {
      $('#gameboard-message')
        .text('X\'s Win!!!')
        .css('background-color', 'lightblue') // X's win then show their color
      console.log('xWinSuccess')
      clickCounter = 0
      currentPlayer = player1
      console.log(clickCounter, currentPlayer)
    } else if (gameboard.includes('O')) {
      winConditions()
      $('#gameboard-message')
        .text('O\'s Win!!!')
        .css('background-color', 'coral') // O's win then show their color
      console.log('oWinSuccess')
      clickCounter = 0
    }
    currentPlayer = player1
  }
}
*/

const onGetGames = function () {
  api.indexGames()
    .then(ui.onIndexSuccess)
    .catch(ui.onError)
}

const onGetGame = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.showGame(formData)
    .then(ui.onShowSuccess)
    .catch(ui.onError)
}

const onUpdateGame = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.updateGame(formData)
    .then(ui.onUpdateSuccess)
    .catch(ui.onError)
}

const onCreateGame = function (event) {
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateSuccess)
    .then(() => {
      currentPlayer = 'X'
      $('.box')
        .html('')
        .css('background-color', 'white')
      $('#gameboard-message')
        .html('')
        .css('background-color', 'white')
    })
    .catch(ui.onError)
}

const addHandlers = () => {
  $('games-index').on('submit', onGetGames)
  $('game-show').on('submit', onGetGame)
  $('game-update').on('submit', onUpdateGame)
  $('#game-button').on('click', onCreateGame)
  $('.box').on('click', onSwitchPlayer)
  // $('.box').on('click', checkWinner)
}

module.exports = {
  addHandlers
}
