'use strict'

const store = require('../store')

const onIndexSuccess = function (responseData) {
  $('#game-display').html('')
  responseData.games.forEach(game => {
    const gameHTML = (`
      <h4>Game: ${game.id}</h4>
      <p>ID: ${game.id}</p>
      <br>
    `)
    $('#game-display').append(gameHTML)
  })
}

const onGetGamesSuccess = responseData => {
  if (responseData.games.length > 0) {
    const lengthGames = responseData.games.length
    $('#games-length')
      .text(`You've Played ${lengthGames} Games!`)
    setTimeout(() => {
      $('#games-length')
        .text('')
    }, 5000)
  }
}

const onShowSuccess = function (responseData) {
  const gameHTML = (`
    <h4>ID: ${responseData.game.id}</h4>
  `)
  $('#game-display').html(gameHTML)
  $('form').trigger('reset')
}

const onUpdateSuccess = function (responseData) {
  store.game = responseData.game
}

const onCreateSuccess = function (responseData) {
  $('#hideUntilNewGame')
    .css('display', 'block')
  store.game = responseData.game
  store.gameboard = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]
  $('.box')
    .css('background-color', 'white')
    .text('')
  $('#gameboard-message')
    .css('background-color', 'white')
    .text('')
  store.currentPlayer = store.player1
  store.gameOver = false
  store.winner = ''
}

const onClickforXSuccess = function (responseData) {
  $('#gameboard-message')
    .css('color', 'black')
    .css('background-color', 'coral')
  if (store.winner === '') {
    $('#gameboard-message').text('X took a turn! Now it\'s O\'s')
  } else if (store.winner === 'Player X wins!') {
    $('#gameboard-message').text(store.winner)
  } else if (store.winner === 'Tie Game!') {
    $('#gameboard-message')
      .text(store.winner)
      .css('background-color', '#caede0')
  }
  store.currentPlayer = store.player2
  store.game = responseData.game
}
const onClickforOSuccess = function (responseData) {
  $('#gameboard-message')
    .css('color', 'black')
    .css('background-color', 'lightblue')
  if (store.winner === '') {
    $('#gameboard-message').text('O took a turn! Now it\'s X\'s')
  } else if (store.winner === 'Player O wins!') {
    $('#gameboard-message').text(store.winner)
  } else if (store.winner === 'Tie Game!') {
    $('#gameboard-message')
      .text(store.winner)
      .css('background-color', '#caede0')
  }
  store.currentPlayer = store.player1
  store.game = responseData.game
}

const onError = function () {
  $('#gameboard-message')
    .text('Something went wrong, please try again.')
    .addClass('failure')
  setTimeout(() => {
    $('#error-message')
      .text('')
      .css('background-color', 'white')
      .removeClass('failure')
  }, 3000)
}

module.exports = {
  onIndexSuccess,
  onGetGamesSuccess,
  onShowSuccess,
  onUpdateSuccess,
  onCreateSuccess,
  onClickforXSuccess,
  onClickforOSuccess,
  onError
}
