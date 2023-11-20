import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Spinner } from '~/components/common';
import { EntryRoom, GameButton, GameStatus } from './components';
import { CHOICES, CLIENT_MESSAGE_EVENT, SERVER_MESSAGE_EVENT } from '~/utils/constants';
import { useIntl } from '~/features/intl';

export const GamePage = () => {
  const { roomId } = useParams();
  const intl = useIntl();
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const socket = useRef<WebSocket | null>(null);

  const firstPlayer =
    user?.role === 'player'
      ? room?.players.find((player) => player.id === user?.id)
      : room?.players[0];

  const secondPlayer =
    user?.role === 'player'
      ? room?.players.find((player) => player.id !== user?.id)
      : room?.players[1];

  const connect = (username: string) => {
    setConnected(true);

    socket.current = new WebSocket(
      `${import.meta.env.VITE_WS_URL}?roomId=${roomId}&username=${username}`,
    );

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data) as
        | Message<typeof SERVER_MESSAGE_EVENT.PATCH_ROOM, Partial<Room>>
        | Message<typeof SERVER_MESSAGE_EVENT.PATCH_USER, Partial<User>>
        | Message<typeof SERVER_MESSAGE_EVENT.PUT_ROOM, Room>
        | Message<typeof SERVER_MESSAGE_EVENT.PUT_USER, User>;

      if (message.event === SERVER_MESSAGE_EVENT.PUT_ROOM) {
        setRoom(message.data);
      } else if (message.event === SERVER_MESSAGE_EVENT.PUT_USER) {
        setUser(message.data);
      } else if (message.event === SERVER_MESSAGE_EVENT.PATCH_USER) {
        setRoom((prevRoom) => (prevRoom ? { ...prevRoom, ...message.data } : prevRoom));
      } else if (message.event === SERVER_MESSAGE_EVENT.PATCH_ROOM) {
        setUser((prevUser) => (prevUser ? { ...prevUser, ...message.data } : prevUser));
      }
    };
  };

  const choose = (choice: Choice) => {
    const message = {
      event: CLIENT_MESSAGE_EVENT.CHOICE,
      choice,
    };

    socket.current?.send(JSON.stringify(message));
  };

  const restart = () => {
    const message = {
      event: CLIENT_MESSAGE_EVENT.RESTART,
    };

    socket.current?.send(JSON.stringify(message));
  };

  if (!connected) return <EntryRoom onConnect={connect} />;
  if (!user || !firstPlayer || !room) return <Spinner />;

  return (
    <div className="flex flex-col items-center gap-6">
      {secondPlayer && (
        <p className="text-sm font-medium text-neutral-500">{secondPlayer.username}</p>
      )}
      <div className="flex gap-6">
        {CHOICES.map((choice) => (
          <GameButton
            key={choice}
            choice={choice}
            firstPlayer={secondPlayer}
            secondPlayer={firstPlayer}
            winner={room.winner}
            showChosen={user.role === 'spectator'}
            disabled
          />
        ))}
      </div>
      <GameStatus
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        user={user}
        winner={room.winner}
      />
      {room.winner && user.role === 'player' && (
        <Button onClick={restart}>{intl.t('button.restart')}</Button>
      )}
      <div className="flex gap-6">
        {CHOICES.map((choice) => (
          <GameButton
            key={choice}
            choice={choice}
            firstPlayer={firstPlayer}
            secondPlayer={secondPlayer}
            winner={room.winner}
            showChosen
            disabled={user.role === 'spectator' || !!firstPlayer.choice}
            onChoose={choose}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-neutral-500">{firstPlayer.username}</p>
    </div>
  );
};
