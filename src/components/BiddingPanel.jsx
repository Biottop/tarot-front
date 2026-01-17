// tarot-front/src/components/BiddingPanel.jsx

export default function BiddingPanel({ onBid }) {
  const bids = [
    { key: "passe", label: "Passe" },
    { key: "petite", label: "Petite" },
    { key: "pousse", label: "Pousse" },
    { key: "garde", label: "Garde" },
    { key: "garde_sans", label: "Garde Sans" },
    { key: "garde_contre", label: "Garde Contre" }
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
      {bids.map(b => (
        <button
          key={b.key}
          onClick={() => onBid(b.key)}
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
          {b.label}
        </button>
      ))}
    </div>
  );
}
