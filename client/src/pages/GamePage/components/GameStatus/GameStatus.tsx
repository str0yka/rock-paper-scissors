interface GameStatusProps {
  firstPlayer: Player;
  secondPlayer?: Player;
  user: User;
  winner: Room['winner'];
}

export const GameStatus: React.FC<GameStatusProps> = ({
  user,
  firstPlayer,
  secondPlayer,
  winner,
}) => {
  const getStatus = () => {
    if (winner) {
      if (winner === 'DRAW') return 'Ничья!';
      if (winner.id === user.id) return 'Вы победили!';
      if (user.role === 'player') return 'Вы проиграли 😔';
      return `Победил ${winner.username}`;
    }

    if (!secondPlayer) return 'Ждём второго пользователя';
    if (user.role === 'spectator') return 'Ждём пока игроки сделают выбор';
    if (!secondPlayer.choice && !firstPlayer.choice) return 'Ну же выбирайте!';
    if (!secondPlayer.choice) return 'Ждём второго пользователя...';
    if (!firstPlayer.choice) return 'Ждём вас!';

    return '(❁´◡`❁)';
  };

  return <p className="text-xl font-semibold dark:text-neutral-50">{getStatus()}</p>;
};
