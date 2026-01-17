// tarot-front/src/utils/sortHand.js
const RED = ["HEARTS", "DIAMONDS"];
const BLACK = ["SPADES", "CLUBS"];

function buildDynamicSuitOrder(cards) {
  const suitsInHand = new Set(cards.map(c => c.suit));
  const reds = RED.filter(s => suitsInHand.has(s));
  const blacks = BLACK.filter(s => suitsInHand.has(s));
  const order = [];
  if (reds.length === 2 && blacks.length === 2) {
    order.push(reds[0], blacks[0], reds[1], blacks[1]);
  } else if (reds.length === 1 && blacks.length === 2) {
    order.push(blacks[0], reds[0], blacks[1]);
  } else if (reds.length === 2 && blacks.length === 1) {
    order.push(reds[0], blacks[0], reds[1]);
  } else if (reds.length === 1 && blacks.length === 1) {
    order.push(reds[0], blacks[0]);
  } else if (reds.length === 0 && blacks.length > 0) {
    order.push(...blacks);
  } else if (blacks.length === 0 && reds.length > 0) {
    order.push(...reds);
  }
  if (suitsInHand.has("TRUMPS")) order.push("TRUMPS");
  if (suitsInHand.has("FOOL")) order.push("FOOL");
  return order;
}

export function sortHandSmart(cards) {
  const suitOrder = buildDynamicSuitOrder(cards);
  return [...cards].sort((a, b) => {
    const sa = suitOrder.indexOf(a.suit);
    const sb = suitOrder.indexOf(b.suit);
    if (sa !== sb) return sa - sb;
    return a.value - b.value;
  });
}
