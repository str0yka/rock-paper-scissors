import 'dotenv/config';
import { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import url from 'url';

import { rooms } from './db/index.js';
import { getWinner } from './utils/helpers/index.js';
import { SERVER_MESSAGE_EVENT, CLIENT_MESSAGE_EVENT } from './utils/constants/index.js';
import RoomService from './services/room-service.js';
import UserService from './services/user-service.js';
import BroadcastService from './services/broadcast-service.js';

const app = express();

const wss = new WebSocketServer({ port: process.env.WS_PORT }, () =>
  console.log(`WS Server started on PORT: ${process.env.WS_PORT}`),
);

const broadcastService = new BroadcastService(wss);

wss.on('connection', (ws, req) => {
  const {
    query: { roomId, username },
  } = url.parse(req.url, true);

  const room = RoomService.findRoom(roomId);
  if (!room) return;

  const role = room.players.length < 2 ? 'player' : 'spectator';
  const user = UserService.createUser({ ...(username !== '' && { username }), role });
  RoomService.addPlayer(user, room);

  ws.roomId = room.id;
  ws.userId = user.id;

  broadcastService.send(SERVER_MESSAGE_EVENT.PUT_ROOM, room, (client) => client.roomId === room.id);
  broadcastService.send(SERVER_MESSAGE_EVENT.PUT_USER, user, (client) => client.userId === user.id);

  ws.on('message', (message) => {
    message = JSON.parse(message);

    switch (message.event) {
      case CLIENT_MESSAGE_EVENT.CHOICE: {
        const room = RoomService.findRoom(ws.roomId);

        if (!room) return;

        const user = room.players.find((player) => player.id === ws.userId);
        const opponent = room.players.find((player) => player.id !== ws.userId);

        if (!user || user.role !== 'player') return;

        user.choice = message.choice;

        if (opponent?.choice) {
          room.winner = getWinner(user, opponent);
        }

        broadcastService.send(SERVER_MESSAGE_EVENT.PUT_ROOM, room, (client) => client.roomId === room.id);
        broadcastService.send(SERVER_MESSAGE_EVENT.PUT_USER, user, (client) => client.userId === user.id);
        break;
      }
      case CLIENT_MESSAGE_EVENT.RESTART: {
        const room = rooms.find((room) => room.id === ws.roomId);

        if (!room || !room.winner) return;

        room.winner = null;
        room.players = room.players.map((player) => ({ ...player, choice: null }));

        broadcastService.send(SERVER_MESSAGE_EVENT.PATCH_USER, { choice: null }, (client) => client.roomId === roomId);
        broadcastService.send(SERVER_MESSAGE_EVENT.PUT_ROOM, room, (client) => client.roomId === roomId);
        break;
      }
      default: {
        break;
      }
    }
  });

  ws.on('close', () => {
    if (user.role === 'player') {
      const room = RoomService.findRoom(ws.roomId);

      if (room?.winner) return;

      room.players = room.players.filter((player) => player.id !== user.id);

      broadcastService.send(SERVER_MESSAGE_EVENT.PUT_ROOM, room, (client) => client.roomId === roomId);
    }
  });
});

app.use(cors());
app.use(express.json());

app.get('/new', (req, res) => {
  const { id } = RoomService.createRoom();
  res.status(200).json({ roomId: id });
});

app.listen(process.env.API_PORT, () => console.log(`API Server started on PORT: ${process.env.API_PORT}`));
