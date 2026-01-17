// tarot-front/src/components/DiscardPanel.jsx

export default function DiscardPanel({
  discardCards,
  onValidateDiscard,
  requiredDiscard
}) {
  const remaining = requiredDiscard - discardCards.length;

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
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        zIndex: 500
      }}
    >
      <div style={{ color: "white", fontSize: "1.1rem" }}>
        {remaining > 0
          ? `Sélectionnez ${remaining} carte${remaining > 1 ? "s" : ""} à écarter`
          : "Écart complet — validez"}
      </div>

      <button
        onClick={onValidateDiscard}
        disabled={remaining !== 0}
        style={{
          padding: "10px 16px",
          fontSize: "1rem",
          borderRadius: "8px",
          cursor: remaining === 0 ? "pointer" : "not-allowed",
          background: remaining === 0 ? "#1a1a1a" : "#555",
          color: "white",
          border: "1px solid #444"
        }}
      >
        Valider l’écart
      </button>
    </div>
  );
}
