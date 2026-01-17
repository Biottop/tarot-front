// tarot-front/src/components/Dog.jsx
import Card from "./Card";

export function Dog({ cards = [], revealed = false }) {
  const cardWidth = Math.min(window.innerWidth * 0.08, 90);
  const overlap = -(cardWidth * 0.4);

  return (
    <div
      style={{
        display: "flex",
        gap: `${overlap}px`,
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        borderRadius: "12px",
        background: "rgba(0,0,0,0.4)"
      }}
    >
      {cards.map((c, i) => (
        <div
          key={`${c.suit}-${c.value}-${i}`}
          style={{
            width: cardWidth,
            height: cardWidth * (5 / 3),
            position: "relative"
          }}
        >
          {revealed ? (
            <Card suit={c.suit} value={c.value} width={cardWidth} />
          ) : (
            <img
              src="/assets/cards/back.png"
              alt="Hidden card"
              style={{
                width: cardWidth,
                aspectRatio: "3 / 5",
                objectFit: "contain"
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
