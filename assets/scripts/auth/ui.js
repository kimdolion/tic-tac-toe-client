'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#message')
    .text('Signed up successfully')
    .removeClass()
    .addClass('success')
  $('form').trigger('reset')
}

const signUpFailure = function (error) {
  $('#message')
    .text(error)
    .removeClass()
    .addClass('failure')
  $('form').trigger('reset')
}

const signInSuccess = function (data) {
  $('#message')
    .text('Signed in successfully')
    .removeClass()
    .addClass('success')
  console.log(data)
  store.user = data.user
  $('#hideOnceSignIn').css('display', 'none')
  $('#hide').css('display', 'block')
}

const signInFailure = function (error) {
  $('#message')
    .text(error)
    .removeClass()
    .addClass('failure')
  $('form').trigger('reset')
}

const signOutSuccess = function () {
  $('#message')
    .text('Signed out successfully')
    .removeClass()
    .addClass('success')
  $('form').trigger('reset')
  store.user = null
  $('#hide').css('display', 'none')
  $('#hideOnceSignIn').css('display', 'block')
  $('.box')
    .html('')
    .css('background-color', 'white')
  $('#gameboard-message')
    .html('')
    .css('background-color', 'white')
}

const signOutFailure = function (error) {
  $('#message')
    .text(error)
    .removeClass()
    .addClass('failure')
}

const changePasswordSuccess = function () {
  $('.hide').css('display', 'block')
  $('#message')
    .text('Changed password successfully')
    .removeClass()
    .addClass('success')
  $('form').trigger('reset')
  $('#hide').css('display', 'block')
  $('#hideOnceSignIn').css('display', 'block')
}

const changePasswordFailure = function (error) {
  $('#message').text(error)
    .removeClass()
    .addClass('failure')
    .trigger('reset')
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
