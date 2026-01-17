// tarot-front/src/components/OpponentHand.jsx
import { getPlayerIcon } from "../utils/teamIcons";

export default function OpponentHand({
  position,
  playerId,
  preneur,
  calledPlayer,
  kingPlayed,
  count
}) {
  // Icône (épée / bouclier)
  const icon = getPlayerIcon({
    preneur,
    calledPlayer,
    kingPlayed,
    playerId,
    count
  });
  // Positionnement visuel
  const positions = {
    "top-left": { top: "10%", left: "15%" },
    "top-right": { top: "10%", right: "15%" },
    "top": { top: "5%", left: "50%", transform: "translateX(-50%)" },
    "left": { top: "50%", left: "5%", transform: "translateY(-50%)" },
    "right": { top: "50%", right: "5%", transform: "translateY(-50%)" }
  };
  const style = {
    position: "absolute",
    ...positions[position],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px"
  };
  return (
    <div style={style}>
      {/* Avatar */}
      <div style={{ position: "relative" }}>
        <img
          src="/assets/avatar_bot.png"
          alt="Bot Avatar"
          style={{
            width: "min(8vw, 70px)",
            aspectRatio: "3 / 5",
            objectFit: "contain"
          }}
        />
        {/* Icône preneur */}
        {playerId === preneur && (
          <img
            src="/assets/crossedSwords.png"
            alt="Preneur"
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              width: "18px",
              height: "18px",
              objectFit: "contain"
            }}
          />
        )}
        {/* Icône équipe (épée / bouclier) */}
        {icon && (
          <img
            src={`/assets/${icon}.png`}
            alt={icon}
            style={{
              position: "absolute",
              top: "-5px",
              left: "-5px",
              width: "18px",
              height: "18px",
              objectFit: "contain"
            }}
          />
        )}
      </div>
      {/* Dos des cartes */}
      <div
        style={{
          display: "flex",
          gap: "4px"
        }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <img
            key={i}
            src="/assets/cards/back.png"
            alt="Hidden card"
            style={{
              width: "min(4vw, 40px)",
              aspectRatio: "3 / 5",
              objectFit: "contain"
            }}
          />
        ))}
      </div>
    </div>
  );
}
