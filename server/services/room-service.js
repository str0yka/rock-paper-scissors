import { v4 as uuidv4 } from 'uuid';

import { rooms } from '../db/index.js';

class RoomService {
  createRoom() {
    const roomId = uuidv4();

    const room = {
      id: roomId,
      players: [],
      winner: null,
    };

    rooms.push(room);

    return room;
  }

  addPlayer(user, room) {
    if (user.role !== 'player') return;
    if (room.players.length >= 2) return;

    room.players.push(user);
  }

  findRoom(roomId) {
    return rooms.find((room) => room.id === roomId);
  }
}

export default new RoomService();
