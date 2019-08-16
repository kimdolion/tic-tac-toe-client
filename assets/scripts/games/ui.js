'use strict'

const store = require('../store')

const onIndexSuccess = function (responseData) {
  console.log(responseData)
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

const onIndexLengthSuccess = function (responseData) {
  console.log(responseData)
  $('#games-length').html('')
  responseData.games.forEach(game => {
    return game.length
  })
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
  console.log(store.game)
}

const onClickforXSuccess = function (responseData) {
  $('#gameboard-message')
    .css('color', 'black')
    .css('background-color', 'coral')
    .text('X took a turn! Now it\'s O\'s')
  store.currentPlayer = store.player2
  store.game = responseData.game
}
const onClickforOSuccess = function (responseData) {
  $('#gameboard-message')
    .css('color', 'black')
    .css('background-color', 'lightblue')
    .text('O took a turn! Now it\'s X\'s')
  store.currentPlayer = store.player1
  store.game = responseData.game
}

const onError = function (err) {
  console.error(err)
  $('#gameboard-message')
    .text('Something went wrong, please try again.')
    .addClass('failure')
  setTimeout(() => {
    $('#gameboard-message')
      .text('')
      .css('background-color', 'white')
      .removeClass('failure')
  }, 3000)
}

module.exports = {
  onIndexSuccess,
  onIndexLengthSuccess,
  onShowSuccess,
  onUpdateSuccess,
  onCreateSuccess,
  onClickforXSuccess,
  onClickforOSuccess,
  onError
}
