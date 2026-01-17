// tarot-front/src/components/Card.jsx
import { getCardImage } from "../utils/cardImages";

export default function Card({ suit, value, width = 100 }) {
  const src = getCardImage(suit, value);
  return (
    <img
      src={src}
      alt={`${suit} ${value}`}
      style={{
        width,
        aspectRatio: "3 / 5",
        objectFit: "contain",
        userSelect: "none",
        pointerEvents: "none"
      }}
    />
  );
}
