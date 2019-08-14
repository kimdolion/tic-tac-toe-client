'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

// let gameboard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
const player1 = 'X'
const player2 = 'O'
let currentPlayer = player1

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
    ui.onClickSuccessX()
    currentPlayer = player1
  }
}

const onClickO = function (event) {
  if ($(event.target).html() !== 'O' && $(event.target).html() !== 'X') {
    console.log('Clicked!')
    $(event.target).text('O')
    ui.onClickSuccessO()
    currentPlayer = player2
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
}

module.exports = {
  addHandlers
}
