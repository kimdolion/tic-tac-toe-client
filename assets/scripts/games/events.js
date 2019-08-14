'use strict'

const api = require('./api')
const ui = require('./ui')

const onSelect = function (event) {
  event.preventDefault()
  console.log('select ran!')
    .then(ui.selectSuccess)
    .catch(ui.selectFailure)
}

const addHandlers = () => {
  $('#gameboard').on('click', onSelect)
}

module.exports = {
  addHandlers
}
