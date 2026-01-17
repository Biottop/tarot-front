// tarot-front/src/App.jsx
import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import HomeScreen from "./components/HomeScreen";
import { useGameSocket } from "./ws/useGameSocket";

export default function App() {
  const [showHome, setShowHome] = useState(true);
  const [playerCount, setPlayerCount] = useState(5);

  const {
    players,
    hand,
    phase,
    chienCards,
    discardCards,
    trick,
    preneur,
    calledPlayer,
    kingPlayed,
    sendBid,
    sendCallKing,
    sendDiscard,
    sendPlayCard,
    setDiscardCards,
    setHand
  } = useGameSocket(showHome, playerCount);

  if (showHome) {
    return (
      <HomeScreen
        onStart={(n) => {
          setPlayerCount(n);
          setShowHome(false);
        }}
      />
    );
  }

  return (
    <div className="app-root">
      <Table
        players={players}
        myCards={hand}
        phase={phase}
        chienCards={chienCards}
        discardCards={discardCards}
        onToggleDiscard={setDiscardCards}
        onValidateDiscard={sendDiscard}
        onBid={sendBid}
        onCallKing={sendCallKing}
        onPlayCard={sendPlayCard}
        trick={trick}
        preneur={preneur}
        calledPlayer={calledPlayer}
        kingPlayed={kingPlayed}
        setMyCards={setHand}
      />
    </div>
  );
}