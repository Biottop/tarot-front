// tarot-front/src/components/HomeScreen.jsx

export default function HomeScreen({ onStart }) {
  const options = [
    { value: 3, label: "3 joueurs" },
    { value: 4, label: "4 joueurs" },
    { value: 5, label: "5 joueurs" }
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        background: "linear-gradient(135deg, #0b6b37, #05371b)"
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "3rem",
          marginBottom: "20px",
          textShadow: "0 0 10px rgba(0,0,0,0.5)"
        }}
      >
        Tarot en Ligne
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px"
        }}
      >
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onStart(opt.value)}
            style={{
              padding: "12px 20px",
              fontSize: "1.2rem",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#1a1a1a",
              color: "white",
              border: "1px solid #444",
              minWidth: "140px"
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
