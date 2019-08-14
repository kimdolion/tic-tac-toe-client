'use strict'

const store = require('../store')

const onIndexSuccess = function (responseData) {
  console.log(responseData)
  $('#game-display').html('')
  responseData.games.forEach(game => {
    const gameHTML = (`
      <h4>Game: ${game.title}</h4>
      <p>Author: ${game.author}</p>
      <p>ID: ${game.id}</p>
      <br>
    `)
    $('#game-display').append(gameHTML)
  })
}

const onShowSuccess = function (responseData) {
  console.log(responseData)
  const gameHTML = (`
    <h4>Title: ${responseData.game.title}</h4>
    <p>Author: ${responseData.game.author}</p>
    <br>
  `)
  $('#game-display').html(gameHTML)
  $('form').trigger('reset')
}

const onUpdateSuccess = function (responseData) {
  $('#update-game-message').html('You updated the game')
  $('#game-display').html('Games have changed! Click "Get All Games" again to see all the games.')
  $('#update-game-message').addClass('success')
  $('#update-game-message').html('')
  $('#update-game-message').removeClass('success')
  $('form').trigger('reset')
}

const onCreateSuccess = function () {
  $('#create-game-message').html('You created a new game!')
  if (!($('#game-display').html() === '')) {
    $('#game-display').html('Games have changed! Click "Get All Games" again to see all the games.')
  }
  $('#create-game-message').addClass('success')
  $('#create-game-message').html('')
  $('#create-game-message').removeClass('success')
  $('form').trigger('reset')
}

const onError = function (err) {
  console.error(err)
  $('#error-message').html('Something went wrong, please try again.')
  $('#error-message').addClass('failure')
  $('#error-message').html('')
  $('#error-message').removeClass('failure')
  $('form').trigger('reset')
}

const selectSuccess = function () {
  $('#gameboard-message').text('Selected a box!')
  $('#gameboard-message').removeClass()
  $('#gameboard-message').addClass('success')
  $(event.target).html('X')
  console.log('selectSuccess')
}

const selectFailure = function (error) {
  $('#gameboard-message').text(error, 'You cannot select that')
  $('#gameboard-message').removeClass()
  $('#gameboard-message').addClass('select failure')
}

module.exports = {
  onIndexSuccess,
  onShowSuccess,
  onUpdateSuccess,
  onCreateSuccess,
  onError,
  selectSuccess,
  selectFailure
}
