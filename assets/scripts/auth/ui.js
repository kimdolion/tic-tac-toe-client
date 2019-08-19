'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#message')
    .text('Signed up successfully')
    .removeClass()
    .addClass('success')
  $('form').trigger('reset')
  setTimeout(() => {
    $('#message')
      .text('')
      .css('background-color', 'white')
      .removeClass('success')
  }, 5000)
}

const signUpFailure = function () {
  $('#message')
    .text('Error on sign up')
    .removeClass()
    .addClass('failure')
}

const signInSuccess = function (data) {
  $('#message')
    .text('Signed in successfully')
    .removeClass()
    .addClass('success')
  setTimeout(() => {
    $('#message')
      .text('')
      .css('background-color', 'white')
      .removeClass('success')
  }, 5000)
  store.user = data.user
  $('#hideOnceSignIn').css('display', 'none')
  $('#hide').css('display', 'block')
}

const signInFailure = function () {
  $('#message')
    .text('Error on sign in')
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
  $('#hideUntilNewGame').css('display', 'none')
  $('#hideOnceSignIn').css('display', 'block')
  $('.box')
    .html('')
    .css('background-color', 'white')
  $('#gameboard-message')
    .html('')
    .css('background-color', 'white')
  setTimeout(() => {
    $('#message')
      .text('')
      .css('background-color', 'white')
      .removeClass('success')
  }, 5000)
}

const signOutFailure = function () {
  $('#message')
    .text('Error on sign out')
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
  setTimeout(() => {
    $('#message')
      .text('')
      .css('background-color', 'white')
      .removeClass('success')
  }, 5000)
}

const changePasswordFailure = function () {
  $('#message')
    .text('Error on change password, please try again!')
    .removeClass()
    .addClass('failure')
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
