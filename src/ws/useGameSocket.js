// tarot-front/src/ws/useGameSocket.js
import { useEffect, useState } from "react";
import { createSocket, getSocket } from "./socket";
import { sortHandSmart } from "../utils/sortHand";
import { PHASES } from "../utils/phases";

export function useGameSocket(showHome, playerCount) {
  const [players, setPlayers] = useState([]);
  const [hand, setHand] = useState([]);
  const [phase, setPhase] = useState(PHASES.WAITING);
  const [chienCards, setChienCards] = useState([]);
  const [discardCards, setDiscardCards] = useState([]);
  const [trick, setTrick] = useState([]);
  const [preneur, setPreneur] = useState(null);
  const [calledPlayer, setCalledPlayer] = useState(null);
  const [kingPlayed, setKingPlayed] = useState(false);

  // Empêche d'envoyer des actions avant que le backend soit prêt
  const canAct = (expectedPhase) => {
    if (!getSocket()) return false;
    if (phase !== expectedPhase) return false;
    return true;
  };

  useEffect(() => {
    if (showHome) return;

    const WS_URL = import.meta.env.DEV
      ? "ws://127.0.0.1:8787/ws/room2/P0"
      : import.meta.env.VITE_WS_URL;

    const socket = createSocket(WS_URL);

    socket.onopen = () => {
      console.log("[FRONT] WebSocket OPEN");

      // Petit délai pour laisser Wrangler monter le Worker
      setTimeout(() => {
        console.log("[FRONT] Sending join_game");
        socket.send(
          JSON.stringify({
            type: "join_game",
            players: playerCount
          })
        );
      }, 50);
    };

    socket.onmessage = (event) => {
      console.log("[FRONT] Received WS message:", event.data);
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "players":
          setPlayers(msg.players);
          break;

        case "hand": {
          const sorted = sortHandSmart(msg.cards);
          setHand(sorted);
          setPhase(PHASES.BIDDING);
          setChienCards([]);
          setDiscardCards([]);
          setTrick([]);
          break;
        }

        case "call_king":
          setPhase(PHASES.CALL_KING);
          setPreneur(msg.preneur);
          break;

        case "king_called":
          setCalledPlayer(msg.called_player);
          break;

        case "king_played":
          setKingPlayed(true);
          break;

        case "chien_revealed":
          setChienCards(msg.cards);
          setPreneur(msg.preneur);
          setPhase(PHASES.CHIEN_REVEALED);

          setTimeout(() => {
            setHand((prev) => sortHandSmart([...prev, ...msg.cards]));
            setPhase(PHASES.DISCARD);
          }, 3000);
          break;

        case "chien_hidden":
          setPhase(PHASES.CHIEN_HIDDEN);
          setPreneur(msg.preneur);
          break;

        case "start_discard":
          setPhase(PHASES.DISCARD);
          break;

        case "discard_accepted":
          setDiscardCards([]);
          setPhase(PHASES.PLAYING);
          break;

        case "start_play":
          setPhase(PHASES.PLAYING);
          break;

        case "card_played":
          setTrick((prev) => [...prev, msg]);

          if (msg.player_id === "P0") {
            setHand((prev) =>
              prev.filter(
                (c) => !(c.suit === msg.card.suit && c.value === msg.card.value)
              )
            );
          }
          break;

        case "trick_won":
          setTrick([]);
          break;

        case "error":
          console.warn("CLIENT ERROR:", msg.message);
          break;
      }
    };

    return () => socket.close();
  }, [showHome, playerCount]);

  // ───────────────────────────────────────────────
  // ACTIONS ENVOYÉES AU SERVEUR (protégées)
  // ───────────────────────────────────────────────

  function sendBid(bid) {
    if (!canAct(PHASES.BIDDING)) return;
    getSocket().send(JSON.stringify({ type: "bid", bid }));
  }

  function sendCallKing(suit) {
    if (!canAct(PHASES.CALL_KING)) return;
    getSocket().send(JSON.stringify({ type: "call_king", suit }));
  }

  function sendDiscard() {
    if (!canAct(PHASES.DISCARD)) return;
    getSocket().send(
      JSON.stringify({
        type: "discard_done",
        cards: discardCards
      })
    );
  }

  function sendPlayCard(card) {
    if (!canAct(PHASES.PLAYING)) return;
    getSocket().send(
      JSON.stringify({
        type: "play_card",
        card
      })
    );
  }

  return {
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
  };
}
