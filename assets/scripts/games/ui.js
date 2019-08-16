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

const onShowSuccess = function (responseData) {
  const gameHTML = (`
    <h4>ID: ${responseData.game.id}</h4>
  `)
  $('#game-display').html(gameHTML)
  $('form').trigger('reset')
}

const onUpdateSuccess = function (responseData) {
  $('#gameboard-message').text('You updated the game')
  store.game = responseData.game
}

const onCreateSuccess = function (responseData) {
  store.currentPlayer = 'X'
  store.gameOver = false
  $('#gameboard-message')
    .css('color', 'blue')
    .text('You created a new game!')
  $('.box')
    .css('background-color', 'white')
    .text('')
  $('#gameboard-message')
    .css('background-color', 'white')
    .text('')
  store.game = responseData.game
}

const onClickforXSuccess = function (responseData) {
  $('#gameboard-message')
    .css('color', 'black')
    .css('background-color', 'coral')
    .text('X took a turn! Now it\'s O\'s')
}
const onClickforOSuccess = function (responseData) {
  $('#gameboard-message')
    .css('color', 'black')
    .css('background-color', 'lightblue')
    .text('O took a turn! Now it\'s X\'s')
}

const winSuccess = function (responseData) {
  $('#gameboard-message')
    .text('Win!')
}

const onError = function (err) {
  console.error(err)
  $('#error-message').text('Something went wrong, please try again.')
  $('#error-message').addClass('failure')
  $('#error-message').html('')
  $('#error-message').removeClass('failure')
  $('form').trigger('reset')
}

module.exports = {
  onIndexSuccess,
  onShowSuccess,
  onUpdateSuccess,
  onCreateSuccess,
  onClickforXSuccess,
  onClickforOSuccess,
  winSuccess,
  onError
}
