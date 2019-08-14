'use strict'

const store = require('../store')

const selectSuccess = function (data) {
  $('#message').text('Signed in successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  console.log('signInSuccess ran. Data is :', data)
  store.user = data.user
}

const selectFailure = function (error) {
  $('#message').text(error)
  $('#message').removeClass()
  $('#message').addClass('failure')
}

module.exports = {
  selectSuccess,
  selectFailure
}
