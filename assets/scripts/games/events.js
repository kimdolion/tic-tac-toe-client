'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const gameboard = [
  '', '', '',
  '', '', '',
  '', '', ''
]

const player1 = 'X'
const player2 = 'O'
let currentPlayer = player1
let clickCounter = 0

const winConditions = [
  ['X', 'X', 'X', '', '', '', '', '', ''],
  ['', '', '', 'X', 'X', 'X', '', '', ''],
  ['', '', '', '', '', '', 'X', 'X', 'X'],
  ['X', '', '', 'X', '', '', 'X', '', ''],
  ['', 'X', '', '', 'X', '', '', 'X', ''],
  ['', '', 'X', '', '', 'X', '', '', 'X'],
  ['X', '', '', '', 'X', '', '', '', 'X'],
  ['', '', 'X', '', 'X', '', 'X', '', ''],
  ['O', 'O', 'O', '', '', '', '', '', ''],
  ['', '', '', 'O', 'O', 'O', '', '', ''],
  ['', '', '', '', '', '', 'O', 'O', 'O'],
  ['O', '', '', 'O', '', '', 'O', '', ''],
  ['', 'O', '', '', 'O', '', '', 'O', ''],
  ['', '', 'O', '', '', 'O', '', '', 'O'],
  ['O', '', '', '', 'O', '', '', '', 'O'],
  ['', '', 'O', '', 'O', '', 'O', '', '']
]

const checkWinner = (event) => {
  if (clickCounter === 9) {
    $('#gameboard-message')
      .text('It\'s a TIE!')
      .removeClass()
      .addClass('success')
      .css('background-color', 'lightgreen')
    console.log('tieSuccess')
    clickCounter = 0
  } else if (clickCounter >= 5) {
      if () {
      $('#gameboard-message')
        .text('X\'s Win!!!')
        .removeClass()
        .addClass('success')
        .css('background-color', 'lightblue')
        console.log('tieSuccess')
        clickCounter = 0
      } else {
        $('#gameboard-message')
          .text('O\'s Win!!!')
          .removeClass()
          .addClass('success')
          .css('background-color', 'coral')
          console.log('tieSuccess')
          clickCounter = 0
        }
      }
    }

const onGetGames = function () {
  api.index()
    .then(ui.onIndexSuccess)
    .catch(ui.onError)
}

const onGetGame = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.show(formData)
    .then(ui.onShowSuccess)
    .catch(ui.onError)
}

const onUpdateGame = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.update(formData)
    .then(ui.onUpdateSuccess)
    .catch(ui.onError)
}

const onCreateGame = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.create(formData)
    .then(ui.onCreateSuccess)
    .catch(ui.onError)
}

const onClickX = function (event) {
  if ($(event.target).html() !== 'O' && $(event.target).html() !== 'X') {
    console.log('Clicked!')
    $(event.target).text('X')
    currentPlayer = player1
    clickCounter++
    $('#gameboard-message')
      .text('Player X took their turn! Now it\'s O\'s')
      .removeClass()
      .addClass('success')
    $(event.target).css('background-color', 'coral')
    console.log('selectSuccessX')
  }
}

const onClickO = function (event) {
  if ($(event.target).html() !== 'O' && $(event.target).html() !== 'X') {
    console.log('Clicked!')
    $(event.target).text('O')
    currentPlayer = player2
    clickCounter++
    $('#gameboard-message')
      .text('Player O took their turn! Now it\'s X\'s')
      .removeClass()
      .addClass('success')
    $(event.target).css('background-color', 'lightblue')
    console.log('selectSuccessO')
  }
}

const onSwitchPlayer = (event) => {
  if (currentPlayer === 'X') {
    onClickO(event)
  } else {
    onClickX(event)
  } console.log('currentPlayer is', currentPlayer)
}

const addHandlers = () => {
  $('games-index').on('submit', onGetGames)
  $('game-show').on('submit', onGetGame)
  $('game-update').on('submit', onUpdateGame)
  $('game-create').on('submit', onCreateGame)
  $('.box').on('click', onSwitchPlayer)
  $('.box').on('click', checkWinner)
}

module.exports = {
  addHandlers
}
