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
  console.log(responseData)
  const gameHTML = (`
    <h4>ID: ${responseData.game.id}</h4>
  `)
  $('#game-display').html(gameHTML)
  $('form').trigger('reset')
}

const onUpdateSuccess = function (responseData) {
  $('#update-game-message').html('You updated the game')
  store.game = responseData.game
}

const onCreateSuccess = function (responseData) {
  $('#create-game-message').html('You created a new game!')
  store.game = responseData.game
  console.log(store)
}

const onError = function (err) {
  console.error(err)
  $('#error-message').html('Something went wrong, please try again.')
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
  onError
}
