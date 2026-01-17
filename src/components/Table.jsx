// tarot-front/src/components/Table.jsx
import Hand from "./Hand";
import OpponentHand from "./OpponentHand";
import { Dog } from "./Dog";
import BiddingPanel from "./BiddingPanel";
import CallKingPanel from "./CallKingPanel";
import DiscardPanel from "./DiscardPanel";
import TrickDisplay from "./TrickDisplay";
import { getBotPlayerId } from "../utils/playerPositions";

export default function Table({
  players,
  myCards,
  phase,
  onBid,
  chienCards,
  onCallKing,
  discardCards,
  onToggleDiscard,
  onValidateDiscard,
  onPlayCard,
  trick,
  preneur,
  calledPlayer,
  kingPlayed,
}) {
  const count = players.length;

  return (
    <div className="table">

      {(phase === "bidding" || phase === "chien_hidden") && (
        <BiddingPanel onBid={onBid} />
      )}

      {count === 5 && phase === "call_king" && (
        <CallKingPanel onCallKing={onCallKing} />
      )}

      {phase === "discard" && (
        <DiscardPanel
          discardCards={discardCards}
          onToggleDiscard={onToggleDiscard}
          onValidateDiscard={onValidateDiscard}
          requiredDiscard={chienCards.length}
        />
      )}

      {phase === "chien_revealed" && (
        <div className="table-center">
          <Dog revealed cards={chienCards} />
        </div>
      )}

      <TrickDisplay trick={trick} />

      <Hand
        cards={myCards}
        discardCards={discardCards}
        onCardClick={phase === "discard" ? onToggleDiscard : onPlayCard}
        phase={phase}
        trick={trick}
        preneur={preneur}
        myPlayerId={players[0]}
        calledPlayer={calledPlayer}
        kingPlayed={kingPlayed}
        count={count}
      />

      {/* Opponents */}
      {count === 3 && (
        <>
          <OpponentHand
            position="top-left"
            playerId={getBotPlayerId(players, "top-left")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
          <OpponentHand
            position="top-right"
            playerId={getBotPlayerId(players, "top-right")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
        </>
      )}

      {count === 4 && (
        <>
          <OpponentHand
            position="left"
            playerId={getBotPlayerId(players, "left")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
          <OpponentHand
            position="top"
            playerId={getBotPlayerId(players, "top")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
          <OpponentHand
            position="right"
            playerId={getBotPlayerId(players, "right")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
        </>
      )}

      {count === 5 && (
        <>
          <OpponentHand
            position="top-left"
            playerId={getBotPlayerId(players, "top-left")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
          <OpponentHand
            position="top-right"
            playerId={getBotPlayerId(players, "top-right")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
          <OpponentHand
            position="left"
            playerId={getBotPlayerId(players, "left")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
          <OpponentHand
            position="right"
            playerId={getBotPlayerId(players, "right")}
            preneur={preneur}
            calledPlayer={calledPlayer}
            kingPlayed={kingPlayed}
            count={count}
          />
        </>
      )}
    </div>
  );
}