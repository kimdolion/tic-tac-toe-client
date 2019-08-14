curl  "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
--include \
--request GET\
--header "Content-Type: application/json" \
--header "Authorization: Token token=${TOKEN}" \
--data '{
  "game": {
    "id": "'"${ID}"'",
    "cells": ["o","x","o","x","o","x","o","x","o"],
    "over": true,
    "player_x": {
      "id": 1,
      "email": "and@and.com"
    },
    "player_o": null
  }
}
'
echo
