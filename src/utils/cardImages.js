// tarot-front/src/utils/cardImages.js

export function getCardImage(suit, value) {
  const s = suit.toLowerCase();
  const valueName = {
    11: "jack",
    12: "knight",
    13: "queen",
    14: "king"
  }[value] || value;
  if (s === "trumps") {
    return `/assets/cards/trump_${value}.png`;
  }
  if (s === "fool") {
    return `/assets/cards/fool.png`;
  }
  return `/assets/cards/${s}_${valueName}.png`;
}
