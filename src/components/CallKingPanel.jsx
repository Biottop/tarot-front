// tarot-front/src/components/CallKingPanel.jsx

export default function CallKingPanel({ onCallKing }) {
  const suits = [
    { key: "SPADES", label: "Pique" },
    { key: "CLUBS", label: "Trèfle" },
    { key: "HEARTS", label: "Cœur" },
    { key: "DIAMONDS", label: "Carreau" }
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.6)",
        padding: "20px",
        borderRadius: "12px",
        display: "flex",
        gap: "10px",
        zIndex: 500
      }}
    >
      {suits.map(s => (
        <button
          key={s.key}
          onClick={() => onCallKing(s.key)}
          style={{
            padding: "10px 16px",
            fontSize: "1rem",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#1a1a1a",
            color: "white",
            border: "1px solid #444"
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
