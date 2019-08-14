'use strict'
const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

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

const onSelect = function (event) {
  event.preventDefault()
  console.log('Clicked!')
  ui.selectSuccess()
}

module.exports = {
  onGetGames,
  onGetGame,
  onUpdateGame,
  onCreateGame,
  onSelect
}
