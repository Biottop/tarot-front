// src/components/TrickDisplay.jsx
import Card from "./Card";

export default function TrickDisplay({ trick }) {
  if (!trick || trick.length === 0) return null;

  const cardWidth = Math.min(window.innerWidth * 0.08, 90);

  return (
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        gap: "20px",
        padding: "10px",
        background: "rgba(0,0,0,0.4)",
        borderRadius: "12px",
        zIndex: 300
      }}
    >
      {trick.map((play, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <Card
            suit={play.card.suit}
            value={play.card.value}
            width={cardWidth}
          />

          <div
            style={{
              color: "white",
              fontSize: "0.8rem",
              opacity: 0.8
            }}
          >
            {play.player_id}
          </div>
        </div>
      ))}
    </div>
  );
}
