// tarot-front/src/utils/teamIcons.js

export function getPlayerIcon({ preneur, calledPlayer, kingPlayed, playerId, count }) {
  if (!preneur) return null;
  if (count !== 5) {
    if (playerId !== preneur) return "shield";
    return null;
  }
  if (!kingPlayed) return null;
  if (playerId === calledPlayer) return "sword";
  if (playerId !== preneur) return "shield";
  return null;
}
