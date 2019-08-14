'use strict'

const config = require('../config')
const store = require('../store')

const index = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const show = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/games/' + formData.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/games/' + formData.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const create = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

/*
const game = function () {
  return $.ajax({
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
*/

module.exports = {
  index,
  show,
  create,
  update // ,
  // game
}
