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
// let gameOver = false

/*
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
*/
const onClickforX = function (event) {
  if ($(event.target).text() === '') {
    console.log('Clicked!')
    $(event.target).text('X') // fills empty space in div with X
    gameboard[$(event.target).data('cell-index')] = 'X'
    checkForWinner()
    // api call
    currentPlayer = player2 // switches current player to O
    $('#gameboard-message')
      .text('X took a turn! Now it\'s O\'s')
      .removeClass()
      .addClass('success')
    $(event.target).css('background-color', 'coral')
    console.log('selectSuccessX')
  }
}

const onClickforO = function (event) {
  if ($(event.target).text() === '') {
    $(event.target).text('O') // fills empty space with O
    gameboard[$(event.target).data('cell-index')] = 'O'
    checkForWinner()
    // api call
    currentPlayer = player1 // switches current player to X
    $('#gameboard-message')
      .text('O took a turn! Now it\'s X\'s')
      .removeClass()
      .addClass('success')
    $(event.target).css('background-color', 'lightblue')
    console.log('selectSuccessO')
  }
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
    return $('#gameboard-message').text('Winner')
  } else if ( // 2nd row win
    (gameboard[3] === 'X' && gameboard[4] === 'X' && gameboard[5] === 'X') ||
    (gameboard[3] === 'O' && gameboard[4] === 'O' && gameboard[5] === 'O')
  ) {
    console.log('Winner!')
    return $('#gameboard-message').text('Winner')
  } else if ( // 3rd row win
    (gameboard[6] === 'X' && gameboard[7] === 'X' && gameboard[8] === 'X') ||
    (gameboard[6] === 'O' && gameboard[7] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
    return $('#gameboard-message').text('Winner')
  } else if ( // 1st column win
    (gameboard[0] === 'X' && gameboard[3] === 'X' && gameboard[6] === 'X') ||
    (gameboard[0] === 'O' && gameboard[3] === 'O' && gameboard[6] === 'O')
  ) {
    console.log('Winner!')
    return $('#gameboard-message').text('Winner')
  } else if ( // 2nd column win
    (gameboard[1] === 'X' && gameboard[4] === 'X' && gameboard[7] === 'X') ||
    (gameboard[1] === 'O' && gameboard[4] === 'O' && gameboard[7] === 'O')
  ) {
    console.log('Winner!')
    return $('#gameboard-message').text('Winner')
  } else if ( // 3rd column win
    (gameboard[2] === 'X' && gameboard[5] === 'X' && gameboard[8] === 'X') ||
    (gameboard[2] === 'O' && gameboard[5] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
    return $('#gameboard-message').text('Winner')
  } else if ( // diagonal win from top left
    (gameboard[0] === 'X' && gameboard[4] === 'X' && gameboard[8] === 'X') ||
    (gameboard[0] === 'O' && gameboard[4] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
    return $('#gameboard-message').text('Win')
  } else if ( // diagonal win from top right
    (gameboard[2] === 'X' && gameboard[4] === 'X' && gameboard[6] === 'X') ||
    (gameboard[2] === 'O' && gameboard[4] === 'O' && gameboard[6] === 'O')
  ) {
    return $('#gameboard-message').text('Win')
  } else if (!(gameboard.includes(''))) {
    console.log('Tie! No winner!')
  }
}

const onGetGames = function () {
  api.indexGames()
    .then(ui.onIndexSuccess)
    .catch(ui.onError)
}

const onShowGame = function (event) {
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
    /*
    .then(() => {
      currentPlayer = 'X'
      $('.box')
        .text('')
        .css('background-color', 'white')
      $('#gameboard-message')
        .text('')
        .css('background-color', 'white')
    }) */
    .catch(ui.onError)
}
/*
const onGameDisplay = function (event) {
  $('.container').css('display', 'none')
  $('#hideUntilGames').css('display', 'block')
  $('message')
    .text('')
    .css('background-color', 'white')
}
*/
const addHandlers = () => {
  $('games-index').on('submit', onGetGames)
  $('game-show').on('submit', onShowGame)
  $('game-update').on('submit', onUpdateGame)
  $('#create-game').on('click', onCreateGame)
  $('.box').on('click', onSwitchPlayer)
  // $('#display-games-info').on('click', onGameDisplay)
}

module.exports = {
  addHandlers
}
