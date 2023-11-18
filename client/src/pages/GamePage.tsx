import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Button, Input } from '~/components';
import { IconPaper, IconRock, IconScissors } from '~/components/common/icons';

type Choice = 'PAPER' | 'ROCK' | 'SCISSORS';

interface User {
  id: string;
  username: string;
  role: 'player' | 'spectator';
  choice: Choice | null;
}

interface Player extends User {
  role: 'player';
}

interface Room {
  id: string;
  players: Player[];
  winner: null | Player | 'DRAW';
}

export const GamePage = () => {
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const { roomId } = useParams();
  const socket = useRef<WebSocket | null>(null);

  const firstPlayer =
    user?.role === 'player'
      ? room?.players.find((player) => player.id === user?.id)
      : room?.players[0];

  const secondPlayer =
    user?.role === 'player'
      ? room?.players.find((player) => player.id !== user?.id)
      : room?.players[1];

  const connect = () => {
    setConnected(true);

    socket.current = new WebSocket(`ws://localhost:5000?roomId=${roomId}&username=${username}`);

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data) as
        | { event: 'PATCH_ROOM'; room: Partial<Room> }
        | { event: 'PATCH_USER'; user: Partial<User> }
        | { event: 'PUT_ROOM'; room: Room }
        | { event: 'PUT_USER'; user: User };

      if (message.event === 'PUT_ROOM') {
        setRoom(message.room);
      }

      if (message.event === 'PUT_USER') {
        setUser(message.user);
      }

      if (message.event === 'PATCH_ROOM') {
        setRoom((prevRoom) => (prevRoom ? { ...prevRoom, ...message.room } : prevRoom));
      }

      if (message.event === 'PATCH_USER') {
        setUser((prevUser) => (prevUser ? { ...prevUser, ...message.user } : prevUser));
      }
    };
  };

  const choice = (choice: Choice) => {
    const message = {
      event: 'choice',
      choice,
    };

    socket.current?.send(JSON.stringify(message));
  };

  const restart = () => {
    const message = {
      event: 'restart',
    };

    socket.current?.send(JSON.stringify(message));
  };

  if (!connected) {
    return (
      <main className="flex h-screen items-center justify-center">
        <form
          className="flex max-w-sm flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            connect();
          }}
        >
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              maxLength={30}
            />
          </div>
          <Button type="submit">Connect</Button>
        </form>
      </main>
    );
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {secondPlayer && (
          <p className="text-sm font-medium text-neutral-500">{secondPlayer.username}</p>
        )}
        <div className="flex gap-6">
          <button
            className={cn(
              'rounded border border-neutral-950/20 p-2 transition-transform enabled:hover:bg-neutral-950/10 enabled:active:scale-95',
              { 'bg-blue-400': user?.id !== firstPlayer?.id && secondPlayer?.choice === 'ROCK' },
              {
                'bg-green-400':
                  room?.winner !== 'DRAW' &&
                  room?.winner?.id === secondPlayer?.id &&
                  secondPlayer?.choice === 'ROCK',
              },
              {
                'bg-red-400':
                  room?.winner !== 'DRAW' &&
                  room?.winner?.id === firstPlayer?.id &&
                  secondPlayer?.choice === 'ROCK',
              },
              { 'bg-orange-400': room?.winner === 'DRAW' && secondPlayer?.choice === 'ROCK' },
            )}
            disabled
          >
            <IconRock />
          </button>
          <button
            className={cn(
              'rounded border border-neutral-950/20 p-2 transition-transform enabled:hover:bg-neutral-950/10 enabled:active:scale-95',
              {
                'bg-blue-400': user?.id !== firstPlayer?.id && secondPlayer?.choice === 'SCISSORS',
              },
              {
                'bg-green-400':
                  room?.winner !== 'DRAW' &&
                  room?.winner?.id === secondPlayer?.id &&
                  secondPlayer?.choice === 'SCISSORS',
              },
              {
                'bg-red-400':
                  room?.winner !== 'DRAW' &&
                  room?.winner?.id === firstPlayer?.id &&
                  secondPlayer?.choice === 'SCISSORS',
              },
              { 'bg-orange-400': room?.winner === 'DRAW' && secondPlayer?.choice === 'SCISSORS' },
            )}
            disabled
          >
            <IconScissors />
          </button>
          <button
            className={cn(
              'rounded border border-neutral-950/20 p-2 transition-transform enabled:hover:bg-neutral-950/10 enabled:active:scale-95',
              { 'bg-blue-400': user?.id !== firstPlayer?.id && secondPlayer?.choice === 'PAPER' },
              {
                'bg-green-400':
                  room?.winner !== 'DRAW' &&
                  room?.winner?.id === secondPlayer?.id &&
                  secondPlayer?.choice === 'PAPER',
              },
              {
                'bg-red-400':
                  room?.winner !== 'DRAW' &&
                  room?.winner?.id === firstPlayer?.id &&
                  secondPlayer?.choice === 'PAPER',
              },
              { 'bg-orange-400': room?.winner === 'DRAW' && secondPlayer?.choice === 'PAPER' },
            )}
            disabled
          >
            <IconPaper />
          </button>
        </div>
        <p className="text-xl font-semibold">
          {!secondPlayer && 'Ждем второго пользователя'}
          {!room?.winner &&
            secondPlayer &&
            user?.role !== 'player' &&
            'Ждём пока игроки сделают выбор'}
          {!room?.winner &&
            user?.role === 'player' &&
            secondPlayer &&
            !secondPlayer.choice &&
            !firstPlayer?.choice &&
            'Ну же, выбирайте!'}
          {!room?.winner &&
            user?.role === 'player' &&
            secondPlayer &&
            secondPlayer.choice &&
            !firstPlayer?.choice &&
            'Ждём вас!'}
          {!room?.winner &&
            user?.role === 'player' &&
            secondPlayer &&
            !secondPlayer.choice &&
            firstPlayer?.choice &&
            'Ждём второго пользователя...'}
          {room?.winner &&
            room.winner !== 'DRAW' &&
            user?.role === 'player' &&
            room.winner.id === user.id &&
            'Вы победили!'}
          {room?.winner &&
            room.winner !== 'DRAW' &&
            user?.role === 'player' &&
            room.winner.id !== user.id &&
            'Вы проиграли 😔'}
          {room?.winner &&
            room?.winner !== 'DRAW' &&
            user?.role !== 'player' &&
            `Победитель: ${room.winner.username}`}
          {room?.winner && room?.winner === 'DRAW' && 'Ничья!'}
        </p>
        {room?.winner && user?.role === 'player' && <Button onClick={restart}>Заново</Button>}
        <div className="flex gap-6">
          <button
            className={cn(
              'rounded border border-neutral-950/20 p-2 transition-transform enabled:hover:bg-neutral-950/10 enabled:active:scale-95',
              { 'bg-blue-400': firstPlayer?.choice === 'ROCK' },
              {
                'bg-green-400':
                  room?.winner !== 'DRAW' &&
                  secondPlayer &&
                  room?.winner?.id === firstPlayer?.id &&
                  firstPlayer?.choice === 'ROCK',
              },
              {
                'bg-red-400':
                  room?.winner !== 'DRAW' &&
                  secondPlayer &&
                  room?.winner?.id === secondPlayer?.id &&
                  firstPlayer?.choice === 'ROCK',
              },
              { 'bg-orange-400': room?.winner === 'DRAW' && firstPlayer?.choice === 'ROCK' },
            )}
            disabled={user?.role !== 'player' || !!firstPlayer?.choice}
            onClick={() => choice('ROCK')}
          >
            <IconRock />
          </button>
          <button
            className={cn(
              'rounded border border-neutral-950/20 p-2 transition-transform enabled:hover:bg-neutral-950/10 enabled:active:scale-95',
              {
                'bg-blue-400': firstPlayer?.choice === 'SCISSORS',
              },
              {
                'bg-green-400':
                  room?.winner !== 'DRAW' &&
                  secondPlayer &&
                  room?.winner?.id === firstPlayer?.id &&
                  firstPlayer?.choice === 'SCISSORS',
              },
              {
                'bg-red-400':
                  room?.winner !== 'DRAW' &&
                  secondPlayer &&
                  room?.winner?.id === secondPlayer?.id &&
                  firstPlayer?.choice === 'SCISSORS',
              },
              { 'bg-orange-400': room?.winner === 'DRAW' && firstPlayer?.choice === 'SCISSORS' },
            )}
            disabled={user?.role !== 'player' || !!firstPlayer?.choice}
            onClick={() => choice('SCISSORS')}
          >
            <IconScissors />
          </button>
          <button
            className={cn(
              'rounded border border-neutral-950/20 p-2 transition-transform enabled:hover:bg-neutral-950/10 enabled:active:scale-95',
              { 'bg-blue-400': firstPlayer?.choice === 'PAPER' },
              {
                'bg-green-400':
                  room?.winner !== 'DRAW' &&
                  secondPlayer &&
                  room?.winner?.id === firstPlayer?.id &&
                  firstPlayer?.choice === 'PAPER',
              },
              {
                'bg-red-400':
                  room?.winner !== 'DRAW' &&
                  secondPlayer &&
                  room?.winner?.id === secondPlayer?.id &&
                  firstPlayer?.choice === 'PAPER',
              },
              { 'bg-orange-400': room?.winner === 'DRAW' && firstPlayer?.choice === 'PAPER' },
            )}
            disabled={user?.role !== 'player' || !!firstPlayer?.choice}
            onClick={() => choice('PAPER')}
          >
            <IconPaper />
          </button>
        </div>
        <p className="text-sm font-medium text-neutral-500">{firstPlayer?.username}</p>
      </div>
    </main>
  );
};
