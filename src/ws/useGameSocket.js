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

  useEffect(() => {
    if (showHome) return;
    const WS_URL = import.meta.env.DEV ? "ws://127.0.0.1:8787/ws/P0" : import.meta.env.VITE_WS_URL;
    const socket = createSocket(WS_URL);
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: "join_game",
        players: playerCount
      }));
    };
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      // JOUEURS
      if (msg.type === "players") {
        setPlayers(msg.players);
      }
      // MAIN DISTRIBUÉE
      if (msg.type === "hand") {
        const sorted = sortHandSmart(msg.cards);
        setHand(sorted);
        setPhase(PHASES.BIDDING);
        setChienCards([]);
        setDiscardCards([]);
        setTrick([]);
      }
      // APPEL DU ROI
      if (msg.type === "call_king") {
        setPhase(PHASES.CALL_KING);
        setPreneur(msg.preneur);
      }
      if (msg.type === "king_called") {
        setCalledPlayer(msg.called_player);
      }
      if (msg.type === "king_played") {
        setKingPlayed(true);
      }
      // CHIEN
      if (msg.type === "chien_revealed") {
        setChienCards(msg.cards);
        setPreneur(msg.preneur);
        setPhase(PHASES.CHIEN_REVEALED);
        setTimeout(() => {
          setHand(prev => sortHandSmart([...prev, ...msg.cards]));
          setPhase(PHASES.DISCARD);
        }, 3000);
      }
      if (msg.type === "chien_hidden") {
        setPhase(PHASES.CHIEN_HIDDEN);
        setPreneur(msg.preneur);
      }
      // ÉCART
      if (msg.type === "start_discard") {
        setPhase(PHASES.DISCARD);
      }
      if (msg.type === "discard_accepted") {
        setDiscardCards([]);
        setPhase(PHASES.PLAYING);
      }
      // JEU DES CARTES
      if (msg.type === "start_play") {
        setPhase(PHASES.PLAYING);
      }
      if (msg.type === "card_played") {
        setTrick(prev => [...prev, msg]);
        // Retirer la carte de la main du joueur humain
        if (msg.player_id === "P0") {
          setHand(prev =>
            prev.filter(c => !(c.suit === msg.card.suit && c.value === msg.card.value))
          );
        }
      }
      if (msg.type === "trick_won") {
        setTrick([]);
      }
      // ERREURS
      if (msg.type === "error") {
        console.log("CLIENT ERROR:", msg.message);
      }
    };
    return () => socket.close();
  }, [showHome, playerCount]);
  // ACTIONS ENVOYÉES AU SERVEUR
  function sendBid(bid) {
    getSocket().send(JSON.stringify({ type: "bid", bid }));
  }
  function sendCallKing(suit) {
    getSocket().send(JSON.stringify({ type: "call_king", suit }));
  }
  function sendDiscard() {
    getSocket().send(JSON.stringify({
      type: "discard_done",
      cards: discardCards
    }));
  }
  function sendPlayCard(card) {
    getSocket().send(JSON.stringify({
      type: "play_card",
      card
    }));
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
