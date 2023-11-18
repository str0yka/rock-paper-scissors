import 'dotenv/config';
import { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import url from 'url';

import { rooms } from './db/index.js';
import { getWinner } from './utils/helpers/index.js';
import RoomService from './services/room-service.js';
import UserService from './services/user-service.js';

const app = express();

const wss = new WebSocketServer({ port: process.env.WS_PORT }, () =>
  console.log(`WS Server started on PORT: ${process.env.WS_PORT}`),
);

const broadcastRoom = (event, room) => {
  const message = {
    event,
    room,
  };

  wss.clients.forEach((client) => {
    if (client.roomId === room.id) {
      client.send(JSON.stringify(message));
    }
  });
};

const broadcastUser = (event, user) => {
  const message = {
    event,
    user,
  };

  wss.clients.forEach((client) => {
    if (client.userId === user.id) {
      client.send(JSON.stringify(message));
    }
  });
};

wss.on('connection', (ws, req) => {
  const {
    query: { roomId, username },
  } = url.parse(req.url, true);

  const room = RoomService.findRoom(roomId);
  if (!room) return;

  const role = room.players.length < 2 ? 'player' : 'spectator';
  const user = UserService.createUser({ ...(username !== '' && { username }), role });
  RoomService.addPlayer(user, room);

  ws.roomId = roomId;
  ws.userId = user.id;

  broadcastRoom('PUT_ROOM', room);
  broadcastUser('PUT_USER', user);

  ws.on('message', (message) => {
    message = JSON.parse(message);

    switch (message.event) {
      case 'choice': {
        const room = RoomService.findRoom(ws.roomId);

        if (!room) return;

        const user = room.players.find((player) => player.id === ws.userId);
        const opponent = room.players.find((player) => player.id !== ws.userId);

        if (!user || user.role !== 'player') return;

        user.choice = message.choice;

        if (opponent?.choice) {
          room.winner = getWinner(user, opponent);
        }

        broadcastRoom('PUT_ROOM', room);
        broadcastUser('PUT_USER', user);
        break;
      }
      case 'restart': {
        const room = rooms.find((room) => room.id === ws.roomId);

        if (!room || !room.winner) return;

        room.winner = null;
        room.players = room.players.map((player) => ({ ...player, choice: null }));

        const patchUserMessage = {
          event: 'PATCH_USER',
          user: { choice: null },
        };

        const patchRoomMessage = {
          event: 'PUT_ROOM',
          room,
        };

        wss.clients.forEach((client) => {
          if (client.roomId === roomId) {
            client.send(JSON.stringify(patchUserMessage));
            client.send(JSON.stringify(patchRoomMessage));
          }
        });

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

      const changeRoomMessage = {
        event: 'PUT_ROOM',
        room,
      };

      wss.clients.forEach((client) => {
        if (client.roomId === roomId) {
          client.send(JSON.stringify(changeRoomMessage));
        }
      });
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
