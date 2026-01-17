// tarot-front/src/utils/rulesClient.js

export function isOudler(card) {
  return (
    (card.suit === "TRUMPS" && (card.value === 1 || card.value === 21)) ||
    card.value === 0 // Excuse
  );
}

export function isTrump(card) {
  return card.suit === "TRUMPS";
}

export function isColor(card) {
  return card.suit !== "TRUMPS";
}

export function canDiscard(card, hand) {
  if (card.value === 14) return false; // Roi
  if (isOudler(card)) return false;
  if (isTrump(card)) {
    if (hand.some(c => isColor(c))) return false;
  }
  return true;
}

export function isValidPlay(card, hand, trickCards) {
  if (trickCards.length === 0) return true; // Premier joueur
  if (card.value === 0) return true; // Excuse
  const leadCard = trickCards[0];
  const leadSuit = leadCard.suit;
  const hasLeadSuit = hand.some(c => c.suit === leadSuit);
  if (hasLeadSuit) {
    return card.suit === leadSuit;
  }
  const hasTrumps = hand.some(c => c.suit === "TRUMPS");
  if (hasTrumps) {
    if (card.suit !== "TRUMPS") return false;
    const trumpsInTrick = trickCards
      .filter(c => c.suit === "TRUMPS")
      .map(c => c.value);
    const highestTrump = trumpsInTrick.length > 0 ? Math.max(...trumpsInTrick) : null;
    if (highestTrump !== null) {
      const hasHigherTrump = hand.some(
        c => c.suit === "TRUMPS" && c.value > highestTrump
      );
      if (hasHigherTrump) {
        return card.value > highestTrump;
      }
    }
    return true;
  }
  return true; // Pisse
}
