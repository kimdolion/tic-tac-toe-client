'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#message').text('Signed up successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const signUpFailure = function (error) {
  $('#message').text(error)
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

const signInSuccess = function (data) {
  $('#message').text('Signed in successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  store.user = data.user
  $('#hideOnceSignIn').css('display', 'none')
  $('#hide').css('display', 'block')
}

const signInFailure = function (error) {
  $('#message').text(error)
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

const signOutSuccess = function () {
  $('#message').text('Signed out successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('form').trigger('reset')
  store.user = null
  $('#hide').css('display', 'none')
  $('#hideOnceSignIn').css('display', 'block')
}

const signOutFailure = function (error) {
  $('#message').text(error)
  $('#message').removeClass()
  $('#message').addClass('failure')
}

const changePasswordSuccess = function () {
  $('.hide').css('display', 'block')
  $('#message').text('Changed password successfully')
  $('#message').removeClass()
  $('#message').addClass('success')
  $('form').trigger('reset')
  $('#hide').css('display', 'block')
  $('#hideOnceSignIn').css('display', 'block')
}

const changePasswordFailure = function (error) {
  $('#message').text(error)
  $('#message').removeClass()
  $('#message').addClass('failure')
  $('form').trigger('reset')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
