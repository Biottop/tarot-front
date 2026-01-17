// tarot-front/src/components/Hand.jsx
import Card from "./Card";
import { getPlayerIcon } from "../utils/teamIcons";
import { canDiscard, isValidPlay } from "../utils/rulesClient";

export default function Hand({
  cards,
  onCardClick,
  discardCards,
  phase,
  trick,
  preneur,
  myPlayerId,
  calledPlayer,
  kingPlayed,
  count
}) {
  const safeDiscardCard = Array.isArray(discardCards) ? discardCards : [];
  // Cartes réellement dans la main (hors écart)
  const currentHand = cards.filter(
    c => !safeDiscardCard.some(d => d.suit === c.suit && d.value === c.value)
  );

  // Découpage en deux rangées
  const half = Math.ceil(cards.length / 2);
  const topRow = cards.slice(0, half);
  const bottomRow = cards.slice(half);

  // Dimensions
  const cardWidth = Math.min(window.innerWidth * 0.12, 110);
  const overlap = -(cardWidth * 0.45);
  const verticalOffset = Math.min(Math.max(window.innerWidth * 0.05, 60), 140);

  // Icône (épée / bouclier)
  const icon = getPlayerIcon({
    preneur,
    calledPlayer,
    kingPlayed,
    playerId: myPlayerId,
    count
  });

  const renderRow = (row) =>
    row.map((c, i) => {
      const inDiscard = safeDiscardCard.some(
        d => d.suit === c.suit && d.value === c.value
      );

      let isValid = true;

      if (phase === "discard") {
        isValid = inDiscard || canDiscard(c, currentHand);
      } else if (phase === "playing") {
        isValid = isValidPlay(c, cards, trick.map(p => p.card));
      }

      return (
        <div
          key={`${c.suit}-${c.value}-${i}`}
          onClick={() => {
            if (isValid) onCardClick(c);
          }}
          style={{
            marginLeft: i === 0 ? 0 : overlap,
            width: cardWidth,
            height: cardWidth * (5 / 3),
            cursor: isValid ? "pointer" : "not-allowed",
            filter: isValid ? "none" : "grayscale(100%) brightness(0.7)",
            position: "relative"
          }}
        >
          <Card suit={c.suit} value={c.value} width={cardWidth} />
        </div>
      );
    });

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 0,
        width: "100%",
        height: "200px",
        pointerEvents: "auto",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center"
      }}
    >
      {/* Avatar joueur */}
      <div style={{ position: "relative", marginRight: "20px" }}>
        <img
          src="/assets/avatar_player.png"
          alt="Player Avatar"
          style={{
            width: "min(10vw, 90px)",
            aspectRatio: "3 / 5",
            objectFit: "contain"
          }}
        />

        {/* Icône preneur */}
        {myPlayerId === preneur && (
          <img
            src="/assets/crossedSwords.png"
            alt="Preneur"
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              width: "20px",
              height: "20px",
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
              width: "20px",
              height: "20px",
              objectFit: "contain"
            }}
          />
        )}
      </div>

      {/* Cartes */}
      <div style={{ position: "relative", flex: 1, maxWidth: "80%" }}>
        <div
          style={{
            position: "absolute",
            bottom: verticalOffset,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: `${overlap}px`,
            zIndex: 1
          }}
        >
          {renderRow(topRow)}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: `${overlap}px`,
            zIndex: 2
          }}
        >
          {renderRow(bottomRow)}
        </div>
      </div>
    </div>
  );
}
