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

/*
const onBoxClick = function (event) {
  if ($(event.target).text() === '' && store.gameOver === false) {
    if (store.currentPlayer === store.player1) {
      gameboard[$(event.target).data('cell-index')] = 'X'
      $(event.target)
        .css('background-color', 'coral') // changes div bg to coral
        .text('X')
      api.updateGame()
        .then(ui.onClickforXSuccess)
        .catch(ui.onError)
    }
  } else if (store.currentPlayer === store.player2) {
    gameboard[$(event.target).data('cell-index')] = 'O'
    $(event.target)
      .css('background-color', 'lightblue') // changes div bg to lightblue
      .text('O') // fills empty space with O
    const data = getFormFields(event.target)
    api.updateGame(data.game)
      .then(ui.onClickforOSuccess)
      .catch(ui.onError)
  }
  checkForWinner()
}
/*
const onClickforX = function (event) {
  if ($(event.target).text() === '' && store.gameOver === false) {
    gameboard[$(event.target).data('cell-index')] = 'X'
    $(event.target)
      .css('background-color', 'coral') // changes div bg to coral
      .text('X')
    checkForWinner()
    // api call update vs create?
    const data = getFormFields(event.target)
    api.updateGame(data.game.id)
      .then(ui.onClickforXSuccess)
      .catch(ui.onError)
  }
}

const onClickforO = function (event) {
  if ($(event.target).text() === '' && store.gameOver === false) {
    gameboard[$(event.target).data('cell-index')] = 'O'
    $(event.target)
      .css('background-color', 'lightblue')
      .text('O') // fills empty space with O
    checkForWinner()
    // api call
    const data = getFormFields(event.target)
    api.updateGame(data.game.id)
      .then(ui.onClickforOSuccess)
      .catch(ui.onError)
  }
}

const onSwitchPlayer = (event) => {
  if (store.currentPlayer === 'X') {
    onClickforX(event)
    store.currentPlayer = store.player2
  } else if (store.currentPlayer === 'O') {
    onClickforO(event)
    store.currentPlayer = store.player1
  } console.log('currentPlayer is', store.currentPlayer)
}

const isGameOver = () => {
  if (checkForWinner() === true) {
    store.gameOver = true
    store.currentPlayer = store.player1
    // $('.box').off('click', onSwitchPlayer)
  } else {
    store.gameOver = false
    if (store.currentPlayer === store.player1) {
      store.currentPlayer = store.player2
    } else {
      store.currentPlayer = store.player1
    }
    // $('.box').on('click', onSwitchPlayer)
  }
}
*/
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

/*
const checkForWinner = () => {
  if ( // 1st row win
    (gameboard[0] === 'X' && gameboard[1] === 'X' && gameboard[2] === 'X') ||
    (gameboard[0] === 'O' && gameboard[1] === 'O' && gameboard[2] === 'O')
  ) {
    console.log('Winner!')
    $('#gameboard-message').text('Winner')
    store.gameOver = true
  } else if ( // 2nd row win
    (gameboard[3] === 'X' && gameboard[4] === 'X' && gameboard[5] === 'X') ||
    (gameboard[3] === 'O' && gameboard[4] === 'O' && gameboard[5] === 'O')
  ) {
    console.log('Winner!')
    $('#gameboard-message').text('Winner')
    store.gameOver = true
  } else if ( // 3rd row win
    (gameboard[6] === 'X' && gameboard[7] === 'X' && gameboard[8] === 'X') ||
    (gameboard[6] === 'O' && gameboard[7] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
    $('#gameboard-message').text('Winner')
    store.gameOver = true
  } else if ( // 1st column win
    (gameboard[0] === 'X' && gameboard[3] === 'X' && gameboard[6] === 'X') ||
    (gameboard[0] === 'O' && gameboard[3] === 'O' && gameboard[6] === 'O')
  ) {
    console.log('Winner!')
    $('#gameboard-message').text('Winner')
    store.gameOver = true
  } else if ( // 2nd column win
    (gameboard[1] === 'X' && gameboard[4] === 'X' && gameboard[7] === 'X') ||
    (gameboard[1] === 'O' && gameboard[4] === 'O' && gameboard[7] === 'O')
  ) {
    console.log('Winner!')
    $('#gameboard-message').text('Winner')
    store.gameOver = true
  } else if ( // 3rd column win
    (gameboard[2] === 'X' && gameboard[5] === 'X' && gameboard[8] === 'X') ||
    (gameboard[2] === 'O' && gameboard[5] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
    $('#gameboard-message').text('Winner')
    store.gameOver = true
  } else if ( // diagonal win from top left
    (gameboard[0] === 'X' && gameboard[4] === 'X' && gameboard[8] === 'X') ||
    (gameboard[0] === 'O' && gameboard[4] === 'O' && gameboard[8] === 'O')
  ) {
    console.log('Winner!')
    $('#gameboard-message').text('Winner')
    store.gameOver = true
  } else if ( // diagonal win from top right
    (gameboard[2] === 'X' && gameboard[4] === 'X' && gameboard[6] === 'X') ||
    (gameboard[2] === 'O' && gameboard[4] === 'O' && gameboard[6] === 'O')
  ) {
    $('#gameboard-message').text('Winner')
    store.gameOver = true
  } else if (!(gameboard.includes(''))) {
    console.log('Tie! No winner!')
  } else {
    console.log(store.gameOver)
    store.gameOver = false
  }
}
*/
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
/*
const onUpdateGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateGame(data.game.id)
    .then(ui.onUpdateSuccess)
    .catch(ui.onError)
}
*/
const onCreateGame = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createGame(data.game)
    .then(ui.onCreateSuccess)
    .catch(ui.onError)
}

/*
const onHover = function (event) {
  event.preventDefault()
  if (store.currentPlayer === store.player1 && $(event.target).text() === '') {
    $(event.target)
      .css('background-color', 'coral')
    $('.box').on('mouseout', onHoverOut)
  } else {
    $(event.target)
      .css('background-color', 'lightblue')
  }
}

const onHoverOut = function (event) {
  event.preventDefault()
  if (store.currentPlayer === store.player1) {
    $(event.target)
      .css('background-color', 'coral')
    $('.box').on('mouseout', onHoverOut)
  } else {
    $(event.target)
      .css('background-color', 'lightblue')
  }
}
*/

const addHandlers = () => {
  $('games-index').on('submit', onGetGames)
  $('game-show').on('submit', onShowGame)
  $('#create-game').on('click', onCreateGame)
  // $('.box').on('click', onSwitchPlayer)
  $('.box').on('click', onBoxClick)
  // $('.box').on('mouseover', onHover)
  $('#games-played').on('click', onGetGamesLength)
}

module.exports = {
  addHandlers
}
