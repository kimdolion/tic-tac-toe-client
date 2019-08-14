curl "https://tic-tac-toe-wdi.herokuapp.com/games/create-game" \
  --include \
  --request POST\
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "game": {
    "id": "'"${ID}"'"
    "cells": ["","","","","","","","",""],
    "over": false,
    "player_x": {
      "id": 1,
      "email": "'"${EMAIL}"'"
    },
    "player_o": null
  }
}'

echo
