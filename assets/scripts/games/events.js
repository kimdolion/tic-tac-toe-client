'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields.js')

store.gameboard = [
  '', '', '',
  '', '', '',
  '', '', ''
]

store.player1 = 'X'
store.player2 = 'O'
store.currentPlayer = store.player1
store.gameOver = false

const onBoxClick = function (event) {
  if ($(event.target).text() === '' && store.gameOver === false) {
    if (store.currentPlayer === store.player1) {
      store.gameboard[$(event.target).data('cell-index')] = 'X'
      $(event.target)
        .css('background-color', 'coral') // changes div bg to coral
        .text('X')
      const index = $(event.target).data('cell-index')
      api.updateGame('X', index, store.gameOver)
        .then(ui.onClickforXSuccess)
        .catch(ui.onError)
      checkForWinner()
    } else if (store.currentPlayer === store.player2) {
      store.gameboard[$(event.target).data('cell-index')] = 'O'
      $(event.target)
        .css('background-color', 'lightblue') // changes div bg to lightblue
        .text('O') // fills empty space with O
      const index = $(event.target).data('cell-index')
      api.updateGame('O', index, store.gameOver)
        .then(ui.onClickforOSuccess)
        .catch(ui.onError)
      checkForWinner()
    }
  } else if (store.gameboard[$(event.target).text()] !== '' && store.gameOver === false) {
    $('#gameboard-message').text('You must click an empty square!')
  } else if (store.gameOver === true) {
    $('#gameboard-message').text('Time to start a new game!')
  }
}

const checkForWinner = () => {
  // check for X win
  if (
    (store.gameboard[0] === 'X' && store.gameboard[1] === 'X' && store.gameboard[2] === 'X') ||
    (store.gameboard[3] === 'X' && store.gameboard[4] === 'X' && store.gameboard[5] === 'X') ||
    (store.gameboard[6] === 'X' && store.gameboard[7] === 'X' && store.gameboard[8] === 'X') ||
    (store.gameboard[0] === 'X' && store.gameboard[3] === 'X' && store.gameboard[6] === 'X') ||
    (store.gameboard[1] === 'X' && store.gameboard[4] === 'X' && store.gameboard[7] === 'X') ||
    (store.gameboard[2] === 'X' && store.gameboard[5] === 'X' && store.gameboard[8] === 'X') ||
    (store.gameboard[0] === 'X' && store.gameboard[4] === 'X' && store.gameboard[8] === 'X') ||
    (store.gameboard[2] === 'X' && store.gameboard[4] === 'X' && store.gameboard[6] === 'X')
  ) {
    console.log('Player X wins!')
    store.winner = 'Player X wins!'
    store.gameOver = true
  } else if (
    (store.gameboard[0] === 'O' && store.gameboard[1] === 'O' && store.gameboard[2] === 'O') ||
    (store.gameboard[3] === 'O' && store.gameboard[4] === 'O' && store.gameboard[5] === 'O') ||
    (store.gameboard[6] === 'O' && store.gameboard[7] === 'O' && store.gameboard[8] === 'O') ||
    (store.gameboard[0] === 'O' && store.gameboard[3] === 'O' && store.gameboard[6] === 'O') ||
    (store.gameboard[1] === 'O' && store.gameboard[4] === 'O' && store.gameboard[7] === 'O') ||
    (store.gameboard[2] === 'O' && store.gameboard[5] === 'O' && store.gameboard[8] === 'O') ||
    (store.gameboard[0] === 'O' && store.gameboard[4] === 'O' && store.gameboard[8] === 'O') ||
    (store.gameboard[2] === 'O' && store.gameboard[4] === 'O' && store.gameboard[6] === 'O')
  ) {
    console.log('Player O wins!')
    store.winner = 'Player O wins!'
    store.gameOver = true
  } else if (
    (store.gameboard[0] !== '' && store.gameboard[1] !== '' && store.gameboard[2] !== '' &&
    store.gameboard[3] !== '' && store.gameboard[4] !== '' && store.gameboard[5] !== '' &&
    store.gameboard[6] !== '' && store.gameboard[7] !== '' && store.gameboard[8] !== '')
  ) {
    console.log('Tie game')
    store.gameOver = true
    store.winner = 'Tie Game! Time to start a new game!'
  }
}

const onGetGames = function () {
  const data = getFormFields(event.target)
  api.indexGames(data.game)
    .then(ui.onIndexSuccess)
    .catch(ui.onError)
}

const onGetGamesLength = function () {
  const data = getFormFields(event.target)
  api.indexGames(data.game)
    .then(ui.onGetGamesSuccess)
    .catch(ui.onError)
}

const onShowGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.showGame(data.game.id)
    .then(ui.onShowSuccess)
    .catch(ui.onError)
}

const onCreateGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createGame(data.game)
    .then(ui.onCreateSuccess)
    .catch(ui.onError)
}

const addHandlers = () => {
  $('games-index').on('submit', onGetGames)
  $('game-show').on('submit', onShowGame)
  $('#create-game').on('click', onCreateGame)
  $('.box').on('click', onBoxClick)
  $('#games-played').on('click', onGetGamesLength)
}

module.exports = {
  addHandlers
}
