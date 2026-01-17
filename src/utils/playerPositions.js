// tarot-front/src/utils/playerPositions.js

export function getBotPlayerId(players, position) {
  const count = players.length;
  const mapping = {
    "top-left": 1,
    "top-right": 2,
    "left": count === 4 ? 1 : 3,
    "right": count === 4 ? 3 : 4,
    "top": 2
  };
  return players[mapping[position]];
}
