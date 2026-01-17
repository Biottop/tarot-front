// tarot-front/src/ws/socket.js

let socket = null;

export function createSocket(url) {
  socket = new WebSocket(url);
  return socket;
}

export function getSocket() {
  return socket;
}
